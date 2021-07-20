import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { PostById } from "./components/Posts/PostById";
import { Navbar } from "./components/Navbar";
import useAuth from "./hooks/useAuth";
import { AllPostsByUserId } from "./components/Posts/AllPostsByUserId";
import { UserProfile } from "./components/User/UserProfile";
import { Live } from "./components/Live/Live";
import { LivePost } from "./components/Live/LivePost";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { SavedPostsByUserId } from "./components/Posts/SavedPostsByUserId";

export default function App() {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  useEffect(() => {
    setSocket(io("https://brave-blog-live-server.herokuapp.com"));
    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line
  }, []);
  const { authData, saveData } = useAuth();
  return (
    <div>
      <BrowserRouter>
        <Navbar setAuthData={saveData} authData={authData} />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/post/:id">
            {authData && authData.message === "Success" ? (
              <div className="flex justify-center">
                <PostById jwt={authData.jwt} userId={authData.userId} />
              </div>
            ) : (
              <div className="text-center mt-12 text-xl font-bold">
                You need to be logged in to access page content! <br />
                <Link
                  to="/"
                  className="text-center text-gray-700 text-lg hover:underline"
                >
                  Go home
                </Link>
              </div>
            )}
          </Route>
          <Route path="/myPosts">
            {authData && authData.message === "Success" ? (
              <AllPostsByUserId user={authData.username} jwt={authData.jwt} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/profile">
            {authData && authData.message === "Success" ? (
              <UserProfile authData={authData} setAuthData={saveData} />
            ) : (
              <div className="text-center mt-12 text-xl font-bold">
                You need to be logged in! <br />
                <Link
                  to="/"
                  className="text-center text-gray-700 text-lg hover:underline"
                >
                  Go home
                </Link>
              </div>
            )}
          </Route>
          <Route path="/saved">
            <SavedPostsByUserId
              user={authData.username}
              jwt={authData.jwt}
              userId={authData.userId}
            />
          </Route>
          <Route path="/live">
            <Live authData={authData} socket={socket} />
          </Route>
          <Route path="/room/:userId/:username">
            <LivePost authData={authData} socket={socket} />
          </Route>
          <Route>
            <div className="text-center mt-12 text-xl font-bold">
              Page not found! <br />
              <Link
                to="/"
                className="text-center text-gray-700 text-lg hover:underline"
              >
                Go home
              </Link>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
