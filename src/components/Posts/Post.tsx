import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

interface Props{
  username:string,
  title:string,
  content:string,
  likes:number,
  createdAt:string,
  postId:number
}

const Post:React.FC<Props>=({username,title,likes,createdAt,postId,content})=>{
  const [userUrl, setUserUrl] = useState<string>("");
  const [minRead, setMinRead] = useState<number>(0);
  const link = "/post/"+postId;
  const wpm = 200;
  useEffect(()=>{
    const getImage = async (username:string)=> {
      const resp = await fetch(`http://localhost:9000/getUser/${username}`);
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
          }} className="flex bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border-2 border-white  hover:border-black lg:w-1/2 w-3/4">
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