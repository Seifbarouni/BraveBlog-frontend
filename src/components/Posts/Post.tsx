import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

interface PostWithoutBg{
  id:number,
  title:string,
  content:string
  user:string,
  createdAt:string,
  likes:number
}

interface Props{
  username:string,
  title:string,
  content:string,
  likes:number,
  createdAt:string,
  postId:number,
  authenticatedUser?:string,
  jwt?:string,
  setAllPosts?:any
}

const Post:React.FC<Props>=({username,title,likes,createdAt,postId,content,authenticatedUser,setAllPosts,jwt})=>{
  const [userUrl, setUserUrl] = useState<string>("");
  const [minRead, setMinRead] = useState<number>(0);
  const link = "/post/"+postId;
  const wpm = 200;
  
  const deletePost = async ()=>{
    setAllPosts((prevPosts:any)=>{
      return [...prevPosts.filter((post:any)=>post.id!==postId)]
    })
    const resp = await fetch(`https://brave-blog-api.herokuapp.com/api/v1/posts/deletePost/${postId}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },})
    const data = await resp.text();
    if(data!="Success")alert(data)
  }

  const handleDelete = (e:Event,postId:number)=>{
    e.stopPropagation();
    e.preventDefault();
    deletePost()

  }
  useEffect(()=>{
    const getImage = async (username:string)=> {
      const resp = await fetch(`https://brave-blog-api.herokuapp.com/getUser/${username}`);
      const data = await resp.text();
      setUserUrl(data);
  }
  const calculateMinRead=()=>{
    const mR = Math.round(content.split(" ").length/wpm);
    if(mR===0)return 1
    return mR
  }
  getImage(username);
  setMinRead(calculateMinRead())
  },[username])
    return (
          <Link to={{
            pathname:link,
            state:{userUrl:userUrl,minRead:minRead},
          }} className="flex bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border-2 border-white  hover:border-black lg:w-1/2 w-3/4 relative">
           {authenticatedUser&& authenticatedUser===username &&<div title="delete post" onClick={(e:any)=>handleDelete(e,postId)}className="absolute right-1 top-1 cursor-pointer transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-300 p-1 rounded-md"> <span>
             <img src="images/delete.svg" alt="deletePost" />
             </span></div> } 
             <div  className="mt-1">
               <img src={userUrl} alt="img"  className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"/>
             </div>
             <div className="w-full">
              <div className="lg:text-base text-sm ml-1">{username} <br />{createdAt}</div>
              <div className="font-bold mt-2 lg:text-lg">
                {title} 
                </div>

                <div  className="mt-2 flex justify-between items-center text-gray-600 lg:text-base text-sm w-full">
                  <span className="flex items-center"><img src="/images/like.svg" alt="" className="h-4 w-4" /> <span className="ml-1">{likes} like{likes!==1?"s":""}</span></span>
                  <span >{minRead} min read</span>
                </div>
             </div>
          </Link>
    )
}

export default Post;