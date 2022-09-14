import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Live } from "./components/Live/Live";

import Navbar from "./components/Navbar";
import Loading2 from "./components/Spinners/Loading2";
const LivePost = React.lazy(() => import("./components/Live/LivePost"));
const AllPostsByUserId = React.lazy(
  () => import("./components/Posts/AllPostsByUserId")
);
const UserProfile = React.lazy(() => import("./components/User/UserProfile"));
const MainPage = React.lazy(() => import("./components/MainPage"));
const PostById = React.lazy(() => import("./components/Posts/PostById"));
const SavedPostsByUserId = React.lazy(
  () => import("./components/Posts/SavedPostsByUserId")
);

export default function App() {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  useEffect(() => {
    setSocket(io("https://braveblog-live-server-production.up.railway.app/"));
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
        <Suspense fallback={<Loading2 />}>
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
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
