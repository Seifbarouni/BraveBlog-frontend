import {Link} from "react-router-dom"

export default function Post({k}){
  const link = "/post/"+k

    return (
        <Link to={link}  className="bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border-2 border-white  hover:border-black">
          <div className="flex ">
             <div  className="bg-blue-700 rounded-full h-8 w-8 px-4 py-1"></div>
             <div>
              <div className="lg:text-base text-sm ml-1">Seif Barouni <br /> Jun 25</div>
              <div className="font-bold mt-2 lg:text-lg">
                5 GitHub Projects to make you a better DevOps Engineer ⚡ 
                </div>

                <div  className="mt-2 flex justify-between items-center text-gray-600 lg:text-base text-sm">
                  <span className="flex items-center"><img src="./like.svg" alt="" className="h-4 w-4" /> <span className="ml-1">700 likes</span></span>
                  <span >2 min read</span>
                </div>
             </div>
          </div>
        </Link>
    )
}