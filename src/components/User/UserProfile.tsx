import React, { useEffect, useState } from "react";
import { useAnimation } from "../../Hooks/useAnimation";
import {authenticationData} from "../../Hooks/useAuth";

interface Props{
    authData : authenticationData
    setAuthData:any
}

export const UserProfile:React.FC<Props> = ({authData,setAuthData}) => {
    const[newUsername,setNewUsername]=useState<string>(authData.username);
    const[newEmail,setNewEmail]=useState<string>(authData.email);
    const[newImage,setNewImage]=useState<string>(authData.picUrl);
    const[totalLikes,setTotalLikes]=useState<string>("");
    const {props,a}=useAnimation();

    useEffect(() => {
        document.title = "Brave Blog | Profile";
        const getTotalLikes = async()=>{
            const resp = await fetch(`https://brave-blog-api.herokuapp.com/api/v1/posts/likes/${authData.username}`,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData.jwt}`,
              },
            });
            setTotalLikes(await resp.text());
        }

        getTotalLikes();
    }, [authData.username,authData.jwt])

    const updateProfile = async(newUsername:string,newEmail:string,newImage:string)=>{
        if(newUsername!==authData.username|| newEmail!==authData.email || newImage!==authData.picUrl){
            const resp = await fetch("https://brave-blog-api.herokuapp.com/updateUser",{
                method:"POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData.jwt}`,
              },
              body: JSON.stringify({
                username:authData.username,
                newUsername:newUsername,
                newEmail:newEmail,
                newImage : newImage
            }),
            });
            const data = await resp.text();
            if(data!=="Success"){alert(data)}
            else{
                if(newUsername!==authData.username){
                    setAuthData({message:"not authenticated"});
                    localStorage.removeItem("auth");
                }else {
                setAuthData({
                    message:authData.message,
                    jwt:authData.jwt,
                    username:authData.username,
                    userId:authData.userId,
                    email:newEmail,
                    picUrl:newImage,
                });
                    window.location.reload()
                };
            };
        }
    }    
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        updateProfile(newUsername,newEmail,newImage);
    }
    return (
        <a.div style={props} className="text-center  flex flex-col items-center">
                <div className="flex items-center px-1 py-2 bg-yellow-200 rounded-sm w-full mb-2 justify-center">
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> </svg>
                    </span>
                    <span className="ml-1 font-bold md:text-base text-sm">If you change your username you need to re-login with your new credentials</span>
                </div>
                <a href={authData.picUrl} target="_blank" rel="noreferrer">
                <img src={authData.picUrl} alt="userProfilePic"  className="rounded-full ring-2 ring-gray-700 w-60 h-60"/>
                </a>
                <div className="mt-4">Total likes : {totalLikes}</div>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                <input type="text" defaultValue={newUsername} onChange={(e)=>setNewUsername(e.target.value)} placeholder="Username" className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required/>
                <input type="email" defaultValue={newEmail}  onChange={(e)=>setNewEmail(e.target.value)}placeholder="Email" className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm ml-2" required/>
                </div>
                <input type="url" defaultValue={newImage} onChange={(e)=>setNewImage(e.target.value)}placeholder="Image URL" className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm mt-4 w-full" required/>
                <button type="submit" className=" bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 mt-4 w-full rounded-sm">Update infromation</button>
            </form>
        </a.div>
    )
}