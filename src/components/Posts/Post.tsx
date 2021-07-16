import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  postId: number;
  authenticatedUser?: string;
  jwt?: string;
  setAllPosts?: any;
  bgUrl: string;
}

const Post: React.FC<Props> = ({
  username,
  title,
  likes,
  createdAt,
  postId,
  content,
  authenticatedUser,
  setAllPosts,
  jwt,
  bgUrl,
}) => {
  const [userUrl, setUserUrl] = useState<string>("");
  const [minRead, setMinRead] = useState<number>(0);
  const link = "/post/" + postId;
  const wpm = 200;

  const deletePost = async () => {
    setAllPosts((prevPosts: any) => {
      return [...prevPosts.filter((post: any) => post.id !== postId)];
    });
    const resp = await fetch(
      `https://brave-blog-api.herokuapp.com/api/v1/posts/deletePost/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await resp.text();
    if (data !== "Success") alert(data);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    deletePost();
  };
  useEffect(() => {
    const getImage = async (username: string) => {
      const resp = await fetch(
        `https://brave-blog-api.herokuapp.com/getUser/${username}`
      );
      const data = await resp.text();
      setUserUrl(data);
    };
    const calculateMinRead = () => {
      const mR = Math.round(content.split(" ").length / wpm);
      if (mR === 0) return 1;
      return mR;
    };
    getImage(username);
    setMinRead(calculateMinRead());
  }, [username]);
  return (
    <Link
      to={{
        pathname: link,
        state: { userUrl: userUrl, minRead: minRead },
      }}
      className={
        bgUrl !== "empty"
          ? "flex flex-col  bg-white rounded-md shadow-md mt-2 cursor-pointer  border  hover:border-gray-700 border-white lg:w-1/2 w-3/4 relative"
          : "flex flex-col  bg-white p-2 rounded-md shadow-md mt-2 cursor-pointer  border border-white hover:border-gray-700 lg:w-1/2 w-3/4 relative"
      }
    >
      {bgUrl !== "empty" && (
        <div>
          <img
            src={bgUrl}
            alt=""
            className="object-cover lg:h-56  h-48 w-full rounded-t-md"
          />
        </div>
      )}
      {authenticatedUser && authenticatedUser === username && (
        <div
          title="delete post"
          onClick={handleDelete}
          className="absolute right-1 top-1 cursor-pointer transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-300 p-1 rounded-md"
        >
          <span>
            <img src="images/delete.svg" alt="deletePost" />
          </span>
        </div>
      )}
      <div className={bgUrl != "empty" ? "flex w-full p-2" : "flex w-full"}>
        <div className="mt-1 w-10 lg:w-12">
          <img
            src={userUrl}
            alt="img"
            className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="lg:text-base text-sm ml-1">
            {username} <br />
            {createdAt}
          </div>
          <div className="font-bold mt-2 lg:text-lg">{title}</div>

          <div className="mt-2 flex justify-between items-center text-gray-600 lg:text-base text-sm w-full">
            <span className="flex items-center">
              <img src="/images/like.svg" alt="" className="h-4 w-4" />{" "}
              <span className="ml-1">
                {likes} like{likes !== 1 ? "s" : ""}
              </span>
            </span>
            <span>{minRead} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
