import React, { useState } from "react";
import { useAnimation } from "../../Hooks/useAnimation";

interface Props{
    setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>,
    setAuthData:any
    registerRef:React.Ref<HTMLDivElement>
}

export const RegisterPopup:React.FC<Props>=({setRegisterModal,setAuthData,registerRef})=>{
    const[rUsername,setRUsername]=useState<string>("");
    const[rPassword,setRPassword]=useState<string>("");
    const[rEmail,setREmail]=useState<string>("");
    const[rImgUrl,setRImgUrl]=useState<string>("");
    const {props,a} = useAnimation();
    const closeModal = ()=>{
        setRegisterModal(false)
    }

  const register = async (username:string,password:string,imgUrl:string,email:string)=>{
    const resp = await fetch("http://localhost:9000/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username:username,
            email:email,
            picUrl:imgUrl,
            password:password
        }),
    });
    const data = await resp.json();
    if(data.message!=="Success"){alert(data.message)}
    setAuthData(data);
    setRegisterModal(false);
}
const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    register(rUsername,rPassword,rImgUrl,rEmail);
}
    return (
        <div className="min-h-screen  animated fadeIn faster  fixed  left-0 top-0  flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
     <a.div  style={props} className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white" ref={registerRef}>
         <span className="absolute right-0 top-0 p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"  onClick={closeModal} viewBox="0 0 24 24" stroke="currentColor">
  <path   d="M6 18L18 6M6 6l12 12" />
</svg></span>

     <div>
     <span className="flex justify-center mb-5">
<img src="/images/logo.png" alt="" className="h-10 w-10"/>
</span>
Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br />
         <span className="font-bold md:text-lg">Register</span>
         <form className="mt-3 flex flex-col" onSubmit={handleSubmit} >
             <input type="text" placeholder="Username"  onChange={e=>setRUsername(e.target.value)} className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required autoFocus/>
             <input type="email" placeholder="Email"  onChange={e=>setREmail(e.target.value)} 
             className="mt-2 placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required />
             <input type="url" placeholder="Image Url" 
              onChange={e=>setRImgUrl(e.target.value)} 
             className="mt-2 placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required />
             <input type="password" placeholder="Password" 
              onChange={e=>setRPassword(e.target.value)} 
             className="mt-2 placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required/>
            <div className="flex justify-end mt-3 items-center">
                <div className="hover:underline cursor-pointer" onClick={closeModal}>Cancel</div>
                <button type="submit" className="rounded-md bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2">Register</button>
            </div>
         </form>
     </div>
     </a.div>
   </div>
    )
}