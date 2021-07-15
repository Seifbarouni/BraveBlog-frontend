import { authenticationData } from "../../Hooks/useAuth";
import { Redirect, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { LiveChat } from "./LiveChat";
import { Form } from "./Form";
import { render } from "@testing-library/react";

interface Props {
  authData: authenticationData;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
}
interface Params {
  userId: string;
  username: string;
}

interface Comment {
  user: string;
  comment: string;
}

export const LivePost: React.FC<Props> = ({ authData, socket }) => {
  const { userId, username } = useParams<Params>();
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [streamEnded, setStreamEnded] = useState<boolean>(false);
  const joinRoom = () => {
    socket?.emit("joinRoom", `room/${userId}/${username}`);
  };
  const createRoom = () => {
    socket?.emit("createRoom", `room/${userId}/${username}`);
  };
  const updateText = (e: any) => {
    setText(e.target.value);
    socket?.emit("textData", {
      room: `room/${userId}/${username}`,
      text: e.target.value,
    });
  };
  const updateTitle = (e: any) => {
    setTitle(e.target.value);
    socket?.emit("getTitle", {
      room: `room/${userId}/${username}`,
      title: e.target.value,
    });
  };
  const sendComment = (e: React.FormEvent) => {
    e.preventDefault();
    socket?.emit("comment", {
      room: `room/${userId}/${username}`,
      user: authData.username,
      comment: comment,
    });
    setComment("");
  };
  useEffect(() => {
    if (authData.username === username) {
      createRoom();
    } else joinRoom();
    return () => {
      if (authData.username === username)
        socket?.emit("cleanRoom", `room/${userId}/${username}`);
      else socket?.emit("leave", `room/${userId}/${username}`);
    };
  }, []);
  useEffect(() => {
    if (!socket) return;

    socket.on("error", () => {
      window.location.href = "/";
    });
    socket.on("getTextData", (data) => {
      setText(data);
    });
    socket.on("getTitle", (data) => {
      setTitle(data);
    });

    socket.on("comment", (comment: Comment) => {
      setAllComments((prev) => [...prev, comment]);
    });
    socket.on("end", () => {
      setStreamEnded(true);
      if (
        (authData && authData.username !== username) ||
        (authData && authData.message !== "Success")
      ) {
        setTimeout(() => {
          window.location.href = "/live";
        }, 1000);
      }
    });
  }, [socket]);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {streamEnded && (
        <div className="w-full bg-red-600 text-gray-100 text-center font-bold md:text-base text-sm px-1 py-2">
          Stream ended
        </div>
      )}
      {authData &&
      authData.message === "Success" &&
      authData.username === username ? (
        <div className="flex lg:flex-row flex-col  justify-center mb-2 ">
          <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-md mt-2 p-1 lg:w-3/4 relative ">
            <div className="absolute bg-red-600 rounded-full h-2 w-2 right-1 top-1 animate-pulse"></div>
            <div className="mt-2 font-bold">
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </div>
            <input
              type="text"
              placeholder="Title"
              onChange={updateTitle}
              className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm mt-2  w-3/4"
              required
              autoFocus
            />
            <textarea
              className="mt-2 mb-2 placeholder-gray-700 ring-2  ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm w-3/4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              cols={30}
              rows={10}
              onChange={updateText}
              defaultValue={text}
            ></textarea>
          </div>
          <div className="bg-white shadow-md rounded-md mt-2 p-1 lg:ml-2 lg:w-1/4 flex flex-col h-96">
            <span className="mt-2 font-extrabold">Live chat</span>
            <LiveChat allComments={allComments} />
            <Form
              sendComment={sendComment}
              comment={comment}
              setComment={setComment}
            />
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col  justify-center mb-2">
          <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-md mt-2 p-1 lg:w-3/4 relative">
            <div className="absolute bg-red-600 rounded-full h-2 w-2 right-1 top-1 animate-pulse"></div>
            <div className="mt-2 font-bold invisible">
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </div>
            <div className="mt-2 font-bold">{username}'s post</div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm mt-2  w-3/4"
              readOnly
            />
            <div className=" w-3/4 ring-2 ring-black rounded-sm p-1 mt-2 mb-12">
              <ReactMarkdown className="prose prose-blue md:prose-lg break-words">
                {text}
              </ReactMarkdown>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md mt-2 p-1 lg:ml-2 lg:w-1/4 flex flex-col h-96">
            <span className="mt-2 font-extrabold">Live chat</span>
            <LiveChat allComments={allComments} />
            {authData && authData.message === "Success" && (
              <Form
                sendComment={sendComment}
                comment={comment}
                setComment={setComment}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
