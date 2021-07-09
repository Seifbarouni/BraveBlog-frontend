import {authenticationData} from "../../Hooks/useAuth";
import {Redirect, useParams} from "react-router-dom"
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";


interface Props{
    authData:authenticationData,
    socket:Socket<DefaultEventsMap,DefaultEventsMap>|undefined
}
interface Params{
    userId:string,
    username:string
}
export const LivePost:React.FC<Props> = ({authData,socket}) => {
    const {userId,username}=useParams<Params>();
    const [text,setText]=useState<string>("");
    const [title,setTitle]=useState<string>("");
    const [streamEnded,setStreamEnded]=useState<boolean>(false);
    const joinRoom=()=>{
        socket?.emit("joinRoom",`room/${userId}/${username}`)
    }
    const createRoom=()=>{
        socket?.emit("createRoom",`room/${userId}/${username}`)
    }
    const updateText=(e:any)=>{
        setText(e.target.value)
        socket?.emit("textData",{room:`room/${userId}/${username}`,text:e.target.value})
    }
    const updateTitle=(e:any)=>{
        setTitle(e.target.value)
        socket?.emit("getTitle",{room:`room/${userId}/${username}`,title:e.target.value})
    }
    useEffect(()=>{
        if(authData.username===username){createRoom()}
        else joinRoom()
        return ()=>{
            if(authData.username===username)
                socket?.emit("cleanRoom",`room/${userId}/${username}`);
        }
    },[])
    useEffect(()=>{
        socket?.on("error",()=>{
            window.location.href="/"
        })
    },[socket])
    useEffect(()=>{
        socket?.on("getTextData",(data)=>{
            setText(data)
        })
    },[socket])
    useEffect(()=>{
        socket?.on("getTitle",(data)=>{
            setTitle(data)
        })
    },[socket])
    useEffect(()=>{
        socket?.on("end",()=>{
            setStreamEnded(true)
            if((authData&&authData.username!==username) || (authData&&authData.message!=="Success")){
                setTimeout(()=>{
                    window.location.href="/"
                },2000)
            }
        })
    },[socket])
    return (
        
            <div className="flex flex-col items-center justify-center w-full">
                {streamEnded && <div className="w-full bg-red-600 text-gray-100 text-center font-bold md:text-base text-sm px-1 py-2">Stream ended</div>}
            {authData && authData.message==="Success" && authData.username===username?
            <div className="flex flex-col justify-center items-center">
                <div className="mt-2 font-bold">It's easy and free to post your thinking on any topic and connect with millions of readers.</div>
                <input type="text" placeholder="Title"  onChange={updateTitle}className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm" required autoFocus/>
                <textarea className="mt-2 placeholder-gray-700 ring-1  ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm lg:w-1/2 w-3/4 " cols={30} rows={10}  onChange={updateText}>{text}</textarea>
            </div>
                :
                <div className="flex flex-col  items-center ">
                <div className="mt-2 font-bold">{username}'s post</div>
                <div className="mt-2 font-bold">Title : {title}</div>
                <div className=" lg:w-4/3 w-full ring-2 ring-black rounded-md p-1 mt-2">
                <ReactMarkdown className="prose prose-blue md:prose-lg break-all">{text}</ReactMarkdown>
                </div>
            </div>
        }
        </div>
    )
}
