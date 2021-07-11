import { useEffect, useState } from "react";
import { useAnimation } from "../../Hooks/useAnimation";
import Loading from "../Spinners/Loading";
import Post from "./Post";

interface Props{
    user:string,
    jwt:string
}

interface PostWithoutBg{
    id:number,
    title:string,
    content:string
    user:string,
    createdAt:string,
    likes:number
}

export const AllPostsByUserId:React.FC<Props> = ({user,jwt}) => {
    const [userPosts, setUserPosts] = useState<PostWithoutBg[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const {props,a}= useAnimation();
    useEffect(() => {
        document.title = "Brave Blog | My posts"
        const fetchData = async()=>{
            const resp = await fetch(`http://localhost:9000/api/v1/posts/us/${user}`,{
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              }
            });
            setUserPosts(await resp.json());
        }

        fetchData();
        setLoading(false);
        return () => {}
    }, [user,jwt])
    return (
        <div>
            {!loading ?
        <div>
            {userPosts.length!==0?
               <a.div style={props} className="flex flex-col  items-center mb-2">
            {userPosts.map((post)=>{
                return (<Post key={post.id} username={post.user} title={post.title} likes={post.likes} createdAt={post.createdAt} postId={post.id} content={post.content}/>)
            })}
        </a.div> :
                <div className="text-center mt-12 text-xl font-bold">
                You have no posts!
              </div>
                }
        </div>    
        :
        <Loading/>
        }
            
        </div>
    )
}