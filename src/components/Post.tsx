import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

export default function Post({username,title,likes,createdAt}){
  const [userUrl, setUserUrl] = useState("");
 
  useEffect(()=>{
    const getImage = async (username:string)=> {
      const resp = await fetch(`http://localhost:9000/getUser/${username}`);
      const data = await resp.text();
      setUserUrl(data);
  }
  getImage(username);
  })
    return (
        <Link to="/post/x"  className="bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border-2 border-white  hover:border-black">
          <div className="flex ">
             <div  className="mt-1">
               <img src={userUrl} alt="img"  className="h-8 w-8 rounded-full "/>
             </div>
             <div>
              <div className="lg:text-base text-sm ml-1">{username} <br />{createdAt}</div>
              <div className="font-bold mt-2 lg:text-lg">
                {title} 
                </div>

                <div  className="mt-2 flex justify-between items-center text-gray-600 lg:text-base text-sm">
                  <span className="flex items-center"><img src="/images/like.svg" alt="" className="h-4 w-4" /> <span className="ml-1">{likes} likes</span></span>
                  <span >2 min read</span>
                </div>
             </div>
          </div>
        </Link>
    )
}