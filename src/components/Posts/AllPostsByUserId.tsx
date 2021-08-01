import { useEffect, useState } from "react";
import { useAnimation } from "../../Hooks/useAnimation";
import { PostWithBg } from "../../interfaces/interfaces";
import Loading from "../Spinners/Loading";
import Post from "./Post";

interface Props {
  user: string;
  jwt: string;
}

export const AllPostsByUserId: React.FC<Props> = ({ user, jwt }) => {
  const [userPosts, setUserPosts] = useState<PostWithBg[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { props, a } = useAnimation();
  useEffect(() => {
    document.title = "Brave Blog | My posts";
    const fetchData = async () => {
      const resp = await fetch(
        `https://brave-blog-api.herokuapp.com/api/v1/posts/us/${user}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const p = await resp.json();
      p.forEach((pos: PostWithBg) => {
        if (pos.saves === null) pos.saves = 0;
      });
      setUserPosts(p);
    };

    fetchData();
    setLoading(false);
  }, [user, jwt]);
  return (
    <div>
      {userPosts.length !== 0 ? (
        <a.div style={props} className="flex flex-col  items-center mb-2">
          <span className="mt-2 font-extrabold md:text-lg  lg:w-1/2 w-3/4">
            My posts
          </span>
          {userPosts.map((post) => {
            return (
              <Post
                key={post.id}
                username={post.user}
                title={post.title}
                likes={post.likes}
                saves={post.saves}
                createdAt={post.createdAt}
                postId={post.id}
                content={post.content}
                authenticatedUser={user}
                setAllPosts={setUserPosts}
                jwt={jwt}
                bgUrl="empty"
              />
            );
          })}
        </a.div>
      ) : (
        <div>
          {loading ? (
            <div className="text-center mt-12 text-xl font-bold">
              You have no posts!
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};
