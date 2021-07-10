interface Comment{
    user:string,
    comment:string,
}
interface Props{
    allComments:Comment[]
}
export const LiveChat:React.FC<Props> = ({allComments}) => {
    return (
        <div className="bg-gray-200  rounded-md mt-2 overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {allComments.length!==0 && allComments.map((comment:Comment)=>{
        return(<div key={`${comment.user}++${comment.comment}`}  className="ml-2"><span className="font-bold">{comment.user} :</span> {comment.comment}</div>)
    })}
            
        </div>
    )
}
