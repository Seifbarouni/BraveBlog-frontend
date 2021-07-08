import {authenticationData} from "../../Hooks/useAuth";
import {io, Socket} from "socket.io-client";
import { useEffect ,useState} from "react";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";


interface Props{
    authData:authenticationData,
}

export const Live:React.FC<Props> = ({authData}) => {
    const [socket,setSocket]=useState<Socket<DefaultEventsMap,DefaultEventsMap>>();
    const [rooms,setRooms]=useState<number[]>([]);
    const makeReq=()=>{
        socket?.emit("get-all-rooms-request")
    }
    const join=()=>{
        socket?.emit("joinRoom",authData.userId)
    }
    useEffect(() => {
        setSocket(io("http://localhost:3001"));
        return () => {
            socket?.disconnect();
        }

    }, [])
    useEffect(()=>{
        socket?.on("get-all-rooms-response",(data:number[])=>{
            setRooms(data);
        })
    },[socket])
    return (
        <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border-2 border-white  hover:border-black lg:w-1/2 w-3/4"  onClick={makeReq}>
            <div onClick={join}>Join room</div>
             <div  className="mt-1 flex items-center justify-between">
                 <div className="flex items-center">
               <img src="https://avatars.githubusercontent.com/u/59934550?v=4" alt="img"  className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"/>
              <div className="lg:text-base text-sm ml-2">username</div>
                 </div>
                 <div className="rounded-full h-2 w-2 bg-red-600 mr-3 animate-pulse">
                 </div>
             </div>
             <div className="mt-2 ml-10 lg:ml-12 font-bold lg:text-lg">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis libero repellat. <br />
                 Rooms : {JSON.stringify(rooms)}
             </div>
          </div>
        </div>
    )
}
