import {useParams,useLocation} from "react-router-dom";
import { useEffect, useState } from "react"

export default function  PostById({jwt,userId}){
  const GetUserUrlFromLocationState=()=>{
    const location = useLocation();
    return location.state?.userUrl;
  }
  const {id} = useParams();
  const [like, setLike] = useState("not liked");
  const [likesNumber,setLikesNumber]=useState(0);
  const userUrl = GetUserUrlFromLocationState()
  const updateLike = ()=>{
    like==="liked" ? setLike("not liked"):setLike("liked")
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
        const fetchPostData = async()=>{
            const resp = await fetch(`http://localhost:9000/api/v1/posts/${id}`,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            });
            const temppost = await resp.json()
            setPost(temppost);
            setLikesNumber(temppost.likes);
        }

        const checkIfPostLiked = async ()=>{
          const resp = await fetch(`http://localhost:9000/l/didLike/${id}/${userId}`,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            });
            setLike(await resp.text());
        }

        fetchPostData();
        checkIfPostLiked();

        return () => {
        }
    }, [id,jwt,userId])
    const dislikePost=async()=>{
      setLikesNumber(likesNumber-1);
      setLike("not liked");
      const resp = await fetch(`http://localhost:9000/l/dislike/${id}/${userId}`,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            });
      const message = await resp.text();
      if(message!=="Success")alert(message);
    }
    const likePost=async ()=>{
      setLikesNumber(likesNumber+1);
      setLike("liked");
      const resp = await fetch(`http://localhost:9000/l/like/${id}/${userId}`,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            });
      const message = await resp.text();
      if(message!=="Success")alert(message);
    }
    return (
        <div className="flex  justify-center lg:w-1/2 self-center">
            <div className="mt-6 p-4 md:flex hidden">
            <span className="flex flex-col items-center font-bold"  onClick={updateLike}><img src={like==="liked"?"/images/like.svg":"/images/blacklike.svg"} alt="heart" onClick={like==="liked"?dislikePost:likePost}  className="h-16 w-16 cursor-pointer" /> <span >{likesNumber}</span></span>
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
            <span className="flex items-center font-bold"  onClick={updateLike}><img src={like==="liked"?"/images/like.svg":"/images/blacklike.svg"} alt="heart" onClick={like==="liked"?dislikePost:likePost} className="h-6 w-6 cursor-pointer" /> <span className="ml-1">{likesNumber}</span></span>
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