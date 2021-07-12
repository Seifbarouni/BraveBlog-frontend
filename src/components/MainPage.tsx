import { useEffect, useState } from "react";
import { useAnimation } from "../Hooks/useAnimation";
import Post from "./Posts/Post";
import Loading from "./Spinners/Loading";

interface PostWithoutBg{
      id:number,
      title:string,
      content:string,
      user:string,
      createdAt:string,
      likes:number
  }

export const MainPage:React.FC=()=>{
    const [posts, setPosts] = useState<PostWithoutBg[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const {props,a}= useAnimation();
    useEffect(() => {
        document.title = "Brave Blog"
        const fetchData = async()=>{
            const resp = await fetch("https://brave-blog-api.herokuapp.com/api/v1/posts");
            setPosts(await resp.json());
        }
        fetchData();
        setLoading(false);
        return () => {}
    }, [])
    return (
        <div>
             {loading===true ?<Loading/>: <a.div style={props} className="flex flex-col  items-center mb-2">
        {posts.map((post)=>{
            return (<Post key={post.id} username={post.user} title={post.title} likes={post.likes} createdAt={post.createdAt} postId={post.id} content={post.content}/>)
        })}
        </a.div>
        
    } 
        </div>
      
        
    )
}