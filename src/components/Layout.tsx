import { useEffect, useState } from "react";
import Post from "./Post";

interface PostWithoutBg{
      id:number,
      title:string,
      user:string,
      createdAt:string,
      likes:number
  }

const Layout:React.FC=()=>{
    const [posts, setPosts] = useState<PostWithoutBg[]>([]);
    useEffect(() => {
        const fetchData = async()=>{
            const resp = await fetch("http://localhost:9000/api/v1/posts");
            setPosts(await resp.json());
        }

        fetchData();
        return () => {
           // 
        }
    }, [])
    return (
        <div className="flex flex-col  items-center mb-2">
            {posts.map((post)=>{
                return (<Post key={post.id} username={post.user} title={post.title} likes={post.likes} createdAt={post.createdAt} postId={post.id}/>)
            })}
            
        </div>
    )
}

export default Layout;