interface Comment{
    user:string,
    comment:string,
}
interface Props{
    allComments:Comment[]
}
export const LiveChat:React.FC<Props> = ({allComments}) => {
    return (
        <div className="bg-gray-200 h-full rounded-md mt-2 overflow-x-auto">
        {allComments.map((comment:Comment)=>{
        return(<div key={`${comment.user}++${comment.comment}`}  className="ml-2"><span className="font-bold">{comment.user} :</span> {comment.comment}</div>)
    })}
        </div>
    )
}
