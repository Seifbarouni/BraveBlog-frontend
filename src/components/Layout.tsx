import Post from "./Post";

export default function Layout(){
    return (
        <div className="flex flex-col  items-center mb-2">
            <Post k={1}/>
            <Post k={2}/>
            <Post k={3}/>
            <Post k={4}/>
        </div>
    )
}