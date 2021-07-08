import {authenticationData} from "../../Hooks/useAuth";
import {io, Socket} from "socket.io-client";
import { useEffect ,useState} from "react";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";


interface Props{
    authData:authenticationData,
}

interface RoomData{
    userId:string,
    username:string,
}

export const Live:React.FC<Props> = ({authData}) => {
    const [socket,setSocket]=useState<Socket<DefaultEventsMap,DefaultEventsMap>>();
    const [rooms,setRooms]=useState<string[]>([]);
    const [roomsData,setRoomsData]=useState<RoomData[]>([]);

    /* const getImageRequest = async (username:string)=> {
        const resp= await fetch(`http://localhost:9000/getUser/${username}`);
        const res = await resp.text();
        return res;
    }
    const getImage=(username:string):string=>{
        return JSON.stringify(getImageRequest(username));
    } */
    const join=()=>{
        socket?.emit("joinRoom",`live/${authData.userId}/${authData.username}`)
    }
    useEffect(() => {
        setSocket(io("http://localhost:3001"));
        return () => {
            socket?.disconnect();
        }

    }, [])
    useEffect(()=>{
        socket?.on("get-all-rooms-response",(data:string[])=>{
            setRooms(data);
            const rData = data.map(room=>{
                    const text = room.split("/");
                    return {
                        userId:text[1],
                        username:text[2]
                    }
            });
            setRoomsData(rData);
        })
    },[socket])
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="flex items-center px-1 py-2 bg-yellow-200 rounded-sm w-full mb-2 justify-center">
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> </svg>
                    </span>
                    <span className="ml-1 font-bold md:text-base text-sm">This feature is not done yet</span>
                </div>
            {authData.message==="Success" && <div className="right-0 mr-2 px-2 py-1 bg-blue-600 text-white mt-2 rounded-md cursor-pointer hover:bg-blue-700" onClick={join}>Go live !</div>}
            
        {roomsData.length!==0?
        roomsData.map((room)=>{
        return(<div key={room.userId} className="flex flex-col bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border-2 border-white  hover:border-black lg:w-1/2 w-3/4"  >
             <div  className="mt-1 flex items-center justify-between">
                 <div className="flex items-center">
               <img src={authData.picUrl} alt="img"  className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"/>
              <div className="lg:text-base text-sm ml-2">{room.username} is live!</div>
                 </div>
                 <div className="rounded-full h-2 w-2 bg-red-600 mr-3 animate-pulse">
                 </div>
             </div>
          </div>)
        })
        
    :<div className="mt-2 font-extrabold">No one is live right now</div>  }
        </div>
    )
}
