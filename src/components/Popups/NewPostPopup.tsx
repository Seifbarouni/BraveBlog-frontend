import { useState } from "react";
import moment from 'moment';

interface Props{
    setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>,
    authData:any
}

const NewPostPopup:React.FC<Props> = ({setAddPostModal,authData}) => {
    const[title,setTitle]=useState<string>("");
    const[imageUrl,setImageUrl]=useState<string>("");
    const[content,setContent]=useState<string>("");
    const closeModal = ()=>{
        setAddPostModal(false);
    }
    const post = async (title:string,imageUrl:string,content:string)=>{
        const resp = await fetch("http://localhost:9000/api/v1/posts/addPost",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.jwt}`,
            },
            body: JSON.stringify({
                title:title,
                content:content,
                user:authData.username,
                bgUrl:imageUrl,
                createdAt:moment().format('ll'),
                likes:0
            }),
        });
        const data = await resp.text();
        if(data!=="Success"){alert(data)}
        setAddPostModal(false);
        window.location.reload();
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        post(title,imageUrl,content);
    }
    return (
        <div className="min-h-screen  fixed  left-0 top-0  flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>

                <div className="md:w-1/2 sm:2/3 w-full p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    <span className="absolute right-0 top-0 p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"   onClick={closeModal} viewBox="0 0 24 24" stroke="currentColor">
            <path  d="M6 18L18 6M6 6l12 12" />
            </svg></span>

     <div>
     <span className="flex justify-center mb-5">
<img src="/images/logo.png" alt="" className="h-10 w-10"/>
</span>
         <span className="font-bold md:text-lg">Add post</span>
         <form className="mt-3 flex flex-col" onSubmit={handleSubmit}>
             <input type="text" placeholder="Title"  onChange={e=>setTitle(e.target.value)}className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required autoFocus/>
             <input type="url" placeholder="Image URL"  onChange={e=>setImageUrl(e.target.value)}
              className="mt-2 placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required/>
              <textarea className="mt-2 placeholder-gray-700 ring-1  ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm"  onChange={e=>setContent(e.target.value)}placeholder="Post content" cols={30} rows={10} required></textarea>
            <div className="flex justify-end mt-3 items-center">
                <div className="hover:underline cursor-pointer" onClick={closeModal}>Cancel</div>
                <button type="submit" className="rounded-full bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2">Post</button>
            </div>
         </form>
     </div>
        </div>
        </div>
    )
}
export default NewPostPopup;