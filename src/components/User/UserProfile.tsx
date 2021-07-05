import React, { useState } from "react";
import {authenticationData} from "../useAuth";

interface Props{
    authData : authenticationData
    setAuthData:any
}


const UserProfile:React.FC<Props> = ({authData,setAuthData}) => {
    const[newUsername,setNewUsername]=useState<string>(authData.username);
    const[newEmail,setNewEmail]=useState<string>(authData.email);
    const[newImage,setNewImage]=useState<string>(authData.picUrl);

    const updateProfile = async(newUsername:string,newEmail:string,newImage:string)=>{
        if(newUsername!==authData.username|| newEmail!==authData.email || newImage!==authData.picUrl){
            const resp = await fetch("http://localhost:9000/updateUser",{
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
                setAuthData({message:authData.message,
                jwt :authData.jwt,
                username :newUsername,
                email :newEmail,
                picUrl :newImage,
                userId :authData.userId
              })
                window.location.reload()
            };
        }
    }    
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        updateProfile(newUsername,newEmail,newImage);
    }
    return (
        <div className="text-center mt-2 flex flex-col items-center">
            <div className="w-64 h-64 ">
                <img src={authData.picUrl} alt="userProfilePic"  className="rounded-full ring-2 ring-gray-700"/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                <input type="text" defaultValue={newUsername} onChange={(e)=>setNewUsername(e.target.value)} placeholder="Username" className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required/>
                <input type="email" defaultValue={newEmail}  onChange={(e)=>setNewEmail(e.target.value)}placeholder="Email" className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm ml-2" required/>
                </div>
                <input type="url" defaultValue={newImage} onChange={(e)=>setNewImage(e.target.value)}placeholder="Image URL" className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm mt-4 w-full" required/>
                <button type="submit" className=" bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 mt-4 w-full">Update infromation</button>
            </form>
        </div>
    )
}

export default UserProfile;