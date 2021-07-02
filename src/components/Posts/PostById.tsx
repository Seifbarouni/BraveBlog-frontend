import {useParams,useLocation} from "react-router-dom";
import { useEffect, useState } from "react"

export default function  PostById({jwt}){
  const GetUserUrlFromLocationState=()=>{
    const location = useLocation();
    return location.state?.userUrl;
  }
  const {id} = useParams();
  const [like, setLike] = useState(false);
  const userUrl = GetUserUrlFromLocationState()
  const updateLike = ()=>{
    setLike(!like)
  }
  const [post, setPost] = useState({
    id:0,
    title:"",
    content:"",
    user:"",
    bgUrl:"",
    createdAt:"",
    likes:0
  });
    useEffect(() => {
        const fetchData = async()=>{
            const resp = await fetch(`http://localhost:9000/api/v1/posts/${id}`,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            });
            setPost(await resp.json());
        }

        fetchData();
        return () => {
           // 
        }
    }, [id,jwt])
    return (
        <div className="flex  justify-center lg:w-1/2 self-center">
            <div className="mt-6 p-4 md:flex hidden">
            <span className="flex flex-col items-center font-bold"  onClick={updateLike}><img src={like?"/images/like.svg":"/images/blacklike.svg"} alt="heart" className="h-16 w-16 cursor-pointer" /> <span >{post.likes}</span></span>
            </div>
        <div className="bg-white  rounded-md shadow-md mt-2 cursor-pointer  mr-0 sm:mr-2 sm:ml-2">
            <div>
                <img src={post.bgUrl} alt="" className="object-scale-down  w-full rounded-t-md"/>
            </div>
          <div className="flex flex-col p-2">
              <div className="font-bold mt-2 lg:text-2xl text-lg hover:text-blue-600">
              {post.title}
            </div>
            <div className="flex md:hidden mt-3">
            <span className="flex items-center font-bold"  onClick={updateLike}><img src={like?"/images/like.svg":"/images/blacklike.svg"} alt="heart" className="h-6 w-6 cursor-pointer" /> <span className="ml-1">{post.likes}</span></span>
            </div>
            <div className="flex items-center justify-between mt-4">
            <span className="flex items-center" >
                <div  className="">
                  <img src={userUrl} alt="userPic" className="rounded-full h-8 w-8"/>
                </div>
              <div className="lg:text-base text-sm ml-1">{post.user} &nbsp;   {post.createdAt}</div>
            </span>
           <span>{Math.floor((Math.random()*10)+1)} min read</span>
             </div>
            
          </div>
           <div className="lg:text-xl text-lg p-2">
                 {post.content}
             </div>
        </div>
        </div>
    )
}