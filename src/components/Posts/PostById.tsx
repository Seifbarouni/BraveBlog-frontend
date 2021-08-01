import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "../Spinners/Loading";
import { useAnimation } from "../../Hooks/useAnimation";
import { PostWithBg, LocationState } from "../../interfaces/interfaces";

interface Props {
  jwt: string;
  userId: number;
}

interface Params {
  id: string;
}

export const PostById: React.FC<Props> = ({ jwt, userId }) => {
  const { id } = useParams<Params>();
  const [like, setLike] = useState<string>("not liked");
  const [saved, setSaved] = useState<string>("not saved");
  const [likesNumber, setLikesNumber] = useState<number>(0);
  const [savesNumber, setSavesNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { props, a } = useAnimation();
  const { userUrl, minRead } = useLocation<LocationState>().state;
  const updateLike = () => {
    like === "liked" ? setLike("not liked") : setLike("liked");
  };
  const updateSave = () => {
    saved === "saved" ? setSaved("not saved") : setSaved("saved");
  };
  const [post, setPost] = useState<PostWithBg>({
    id: 0,
    title: "",
    content: "",
    user: "",
    bgUrl: "",
    createdAt: "",
    likes: 0,
    saves: 0,
  });
  const checkIfPostLiked = async () => {
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/l/didLike/${id}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLike(await resp.text());
  };
  const checkIfPostSaved = async () => {
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/s/didSave/${id}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setSaved(await resp.text());
  };
  useEffect(() => {
    const fetchPostData = async () => {
      document.title = "Brave Blog | Post " + id;
      const resp = await fetch(
        `https://brave-blog-api.herokuapp.com/api/v1/posts/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const temppost = await resp.json();
      setPost(temppost);
      setLikesNumber(temppost.likes);
      setSavesNumber(temppost.saves !== null ? temppost.saves : 0);
    };

    fetchPostData();
    checkIfPostLiked();
    checkIfPostSaved();
    setLoading(false);
    // eslint-disable-next-line
  }, [id, jwt, userId]);
  const dislikePost = async () => {
    setLikesNumber(likesNumber - 1);
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/l/dislike/${id}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const message = await resp.text();
    if (message !== "Success") alert(message);
  };
  const likePost = async () => {
    setLikesNumber(likesNumber + 1);
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/l/like/${id}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const message = await resp.text();
    if (message !== "Success") alert(message);
  };
  const savePost = async () => {
    setSavesNumber(savesNumber + 1);
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/s/save/${id}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const message = await resp.text();
    if (message !== "Success") alert(message);
  };
  const unsavePost = async () => {
    setSavesNumber(savesNumber - 1);
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/s/unsave/${id}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const message = await resp.text();
    if (message !== "Success") alert(message);
  };
  return (
    <div className="flex  justify-center lg:w-1/2">
      {!loading ? (
        <a.div style={props} className="flex  justify-center  self-center mb-2">
          <div className="mt-8  md:flex flex-col hidden w-1/12 justify-start h-full sticky  top-20">
            <div
              className="flex flex-col items-center"
              onClick={updateLike}
              title={like === "liked" ? "dislike" : "like"}
            >
              <img
                src={
                  like === "liked"
                    ? "/images/like.svg"
                    : "/images/blacklike.svg"
                }
                alt="heart"
                onClick={like === "liked" ? dislikePost : likePost}
                className="cursor-pointer h-6 w-6"
              />{" "}
              <span className="font-bold mt-2">{likesNumber}</span>
            </div>
            <div
              className="flex flex-col items-center mt-6"
              onClick={updateSave}
              title={saved === "saved" ? "unsave" : "save"}
            >
              <img
                src={
                  saved === "saved" ? "/images/saved.svg" : "/images/save.svg"
                }
                alt="archive"
                onClick={saved === "saved" ? unsavePost : savePost}
                className="cursor-pointer h-6 w-6"
              />{" "}
              <span className="font-bold mt-2">{savesNumber}</span>
            </div>
          </div>

          <div className="bg-white  rounded-md shadow-md mt-2  mr-0 sm:mr-2 sm:ml-2 w-11/12">
            <div>
              <img
                src={post.bgUrl}
                alt=""
                className="object-fit  w-full rounded-t-md"
              />
            </div>
            <div className="flex flex-col p-2">
              <div className="font-bold mt-2 lg:text-3xl text-xl hover:text-blue-600 cursor-pointer">
                {post.title}
              </div>
              <div className="flex md:hidden mt-3">
                <span
                  className="flex items-center font-bold"
                  onClick={updateLike}
                  title={like === "liked" ? "dislike" : "like"}
                >
                  <img
                    src={
                      like === "liked"
                        ? "/images/like.svg"
                        : "/images/blacklike.svg"
                    }
                    alt="heart"
                    onClick={like === "liked" ? dislikePost : likePost}
                    className="h-6 w-6 cursor-pointer"
                  />{" "}
                  <span className="ml-1">{likesNumber}</span>
                </span>

                <div
                  className="flex items-center ml-4 font-bold"
                  onClick={updateSave}
                  title={saved === "saved" ? "unsave" : "save"}
                >
                  <img
                    src={
                      saved === "saved"
                        ? "/images/saved.svg"
                        : "/images/save.svg"
                    }
                    alt="archive"
                    onClick={saved === "saved" ? unsavePost : savePost}
                    className="cursor-pointer h-6 w-6"
                  />{" "}
                  <span className="ml-1">{savesNumber}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="flex items-center">
                  <div className="">
                    <img
                      src={userUrl}
                      alt="userPic"
                      className="rounded-full h-8 w-8"
                    />
                  </div>
                  <div className="lg:text-base text-sm ml-1">
                    {post.user} &nbsp; {post.createdAt}
                  </div>
                </span>
                <span>{minRead} min read</span>
              </div>
            </div>
            <div className="lg:text-xl text-lg p-2">
              <ReactMarkdown className="prose prose-blue md:prose-lg">
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </a.div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
