

export const Form:React.FC<any> = ({sendComment,comment,setComment}) => {
    return (
        <form onSubmit={sendComment} className="flex  justify-between items-center mt-2">
                        <input type="text" placeholder="add a comment"  className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm   w-full"  onChange={e=>setComment(e.target.value)} value={comment}  required/>
                        <button   type="submit" className="rounded-md bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2 ">Add</button>
        </form>
    )
}
