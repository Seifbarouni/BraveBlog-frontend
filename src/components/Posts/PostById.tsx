//import {useParams} from "react-router-dom";

export default function  PostById(){
   // const {id} = useParams();
    return (
        <div className="flex  justify-center lg:w-2/3 self-center">
            <div className="mt-6 ml-2 mr-2 p-4 md:flex hidden">
            <span className="flex flex-col items-center"><img src="/images/like.svg" alt="" className="h-6 w-6 cursor-pointer" /> <span className="mt-2">700</span></span>
            </div>
        <div className="bg-white  rounded-md shadow-md mt-2 cursor-pointer  mr-0 sm:mr-2">
            <div className="">
                <img src="/images/bg.jpg" alt="" className="object-fit h-48 w-full rounded-t-md"/>
            </div>
          <div className="flex flex-col p-2">
              <div className="font-bold mt-2 lg:text-2xl text-lg">
                5 GitHub Projects to make you a better DevOps Engineer ⚡ 
            </div>
            <div className="flex items-center justify-between mt-4">
            <span className="flex items-center" >
                <div  className="bg-blue-700 rounded-full h-8 w-8 px-4 py-1"></div>
              <div className="lg:text-base text-sm ml-1">Seif Barouni  Jun 25</div>
            </span>
           <span>2 min read</span>
             </div>
            
          </div>
           <div className="lg:text-xl text-lg p-2">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore reprehenderit nam, nostrum reiciendis maiores aperiam laudantium odit consectetur error ea. Rem nostrum omnis nisi ducimus minima inventore. Odit, totam eos?
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vel ipsa labore repellat, fugit quae sed accusamus ea aut dignissimos doloremque autem necessitatibus recusandae rem, odit in vitae facilis sit.
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis similique sequi repudiandae, unde dolorem, officiis voluptatem vel nihil eaque fugit aliquid placeat dignissimos nisi assumenda sit soluta iusto id inventore.
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aspernatur itaque doloremque minus sunt, molestiae hic dolore ea commodi fuga sit ducimus nostrum cumque consectetur eligendi soluta at dolorem deleniti!
             </div>
        </div>
        </div>
    )
}