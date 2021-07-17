import { useEffect, useState } from "react";
import { useAnimation } from "../Hooks/useAnimation";
import { PostWithBg } from "../interfaces";
import Post from "./Posts/Post";
import Loading from "./Spinners/Loading";

export const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<PostWithBg[]>([]);
  const [focusedTab, setFocusedTab] = useState<string>("Feed");
  const { props, a } = useAnimation();
  const shuffleArray = (array: PostWithBg[]) => {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  };
  const feed = () => {
    setFocusedTab("Feed");
    setPosts(shuffleArray(posts));
  };
  const mostLiked = () => {
    setFocusedTab("mostLiked");
    posts.sort((el1, el2) => {
      return el2.likes - el1.likes;
    });
    setPosts(posts);
  };
  useEffect(() => {
    document.title = "Brave Blog";
    const fetchData = async () => {
      const resp = await fetch(
        "https://brave-blog-api.herokuapp.com/api/v1/posts"
      );
      setPosts(await resp.json());
    };
    fetchData();
  }, []);
  return (
    <div>
      {posts.length === 0 ? (
        <Loading />
      ) : (
        <a.div
          style={props}
          className="flex flex-col  items-center mb-2 right-0"
        >
          <div className="mt-2 font-extrabold md:text-lg  lg:w-1/2 w-3/4 flex justify-between">
            <span>Posts</span>
            <div>
              <span
                onClick={feed}
                className={
                  focusedTab === "Feed"
                    ? "mr-2 border-b-2 border-black cursor-pointer hover:bg-gray-300 p-1 rounded-t-md"
                    : "mr-2 cursor-pointer hover:bg-gray-300 p-1 rounded-t-md"
                }
              >
                Feed
              </span>
              <span
                onClick={mostLiked}
                className={
                  focusedTab !== "Feed"
                    ? "border-b-2 border-black cursor-pointer hover:bg-gray-300 p-1 rounded-t-md"
                    : " cursor-pointer hover:bg-gray-300 p-1 rounded-t-md"
                }
              >
                Most liked
              </span>
            </div>
          </div>
          <Post
            key={posts[0].id}
            username={posts[0].user}
            title={posts[0].title}
            likes={posts[0].likes}
            createdAt={posts[0].createdAt}
            postId={posts[0].id}
            content={posts[0].content}
            bgUrl={posts[0].bgUrl}
          />
          {posts.map((post, i) => {
            return (
              <div className="w-full flex justify-center">
                {posts[i + 1] !== undefined && (
                  <Post
                    key={posts[i + 1].id}
                    username={posts[i + 1].user}
                    title={posts[i + 1].title}
                    likes={posts[i + 1].likes}
                    createdAt={posts[i + 1].createdAt}
                    postId={posts[i + 1].id}
                    content={posts[i + 1].content}
                    bgUrl="empty"
                  />
                )}
              </div>
            );
          })}
        </a.div>
      )}
    </div>
  );
};
