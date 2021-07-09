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
    return (
        
            <div className="flex items-center justify-center ">
            {authData && authData.message==="Success" && authData.username===username?
            <div className="w-full flex flex-col justify-center items-center">
                <div className="mt-2 font-bold">It's easy and free to post your thinking on any topic and connect with millions of readers.</div>
                <textarea className="mt-2 placeholder-gray-700 ring-1  ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm lg:w-1/2 w-3/4" cols={30} rows={10}  onChange={updateText}>{text}</textarea>
            </div>
                :
                <div className="w-full flex flex-col justify-center items-center">
                <div className="mt-2 font-bold">{username}'s post</div>
                <ReactMarkdown className="prose prose-blue md:prose-lg">{text}</ReactMarkdown>
            </div>
        }
        </div>
    )
}
