import { useEffect, useRef, useState } from "react"

interface Comment{
    user:string,
    comment:string,
}
interface Props{
    allComments:Comment[]
}
export const LiveChat:React.FC<Props> = ({allComments}) => {
    const ref = useRef<HTMLDivElement>(null);
    const colors = ["red","yellow","green","blue","indigo","purple","pink"];

    useEffect(()=>{
        if(ref){
            ref.current?.addEventListener('DOMNodeInserted', (e:any) => {
                const { currentTarget: target } = e;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
              });
        }
    },[])
    return (
        <div ref={ref}  className="bg-gray-200  rounded-md mt-2 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 inline-block overflow-x-hidden lg:w-56">
            {allComments.length!==0 && allComments.map((comment:Comment)=>{
        return(<div key={`${comment.user}++${comment.comment}`}  className="ml-2 break-words"><span className={`font-bold text-${colors[Math.floor(Math.random()*colors.length)]}-600`}>{comment.user} :</span> {comment.comment}</div>)
    })}
            
        </div>
    )
}
