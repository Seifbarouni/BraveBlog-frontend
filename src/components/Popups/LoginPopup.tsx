import React, { useState } from "react";
import { useAnimation } from "../../Hooks/useAnimation";

interface Props {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthData: any;
  loginRef: React.Ref<HTMLDivElement>;
}

export const LoginPopup: React.FC<Props> = ({
  setLoginModal,
  setAuthData,
  loginRef,
}) => {
  const [lUsername, setLUsername] = useState<string>("");
  const [lPassword, setLPassword] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");
  const { props, a } = useAnimation();
  const closeModal = () => {
    setLoginModal(false);
  };
  const login = async (username: string, password: string) => {
    const resp = await fetch("https://brave-blog-api.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await resp.json();
    if (data.message !== "Success") {
      setErrMessage(data.message);
    } else {
      setAuthData(data);
      setLoginModal(false);
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(lUsername, lPassword);
  };
  return (
    <div className="min-h-screen  fixed  left-0 top-0  flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <a.div
        style={props}
        className="w-full  max-w-lg p-5 relative  sm:rounded-md shadow-lg  bg-white sm:h-auto h-full"
        ref={loginRef}
      >
        <span className="absolute right-0 top-0 p-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            onClick={closeModal}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>

        <div>
          <span className="flex justify-center mb-5">
            <img src="/images/logo.png" alt="" className="h-10 w-10" />
          </span>
          <span className="font-bold md:text-lg">Log in</span>
          {errMessage !== "" && (
            <div className="mt-1 text-red-600">{`❌ ${errMessage}`}</div>
          )}
          <form className="mt-3 flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setErrMessage("");
                setLUsername(e.target.value);
              }}
              className="placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm"
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setErrMessage("");
                setLPassword(e.target.value);
              }}
              className="mt-2 placeholder-gray-700 ring-1 ring-black focus:ring-2 focus:outline-none px-1 py-1 rounded-sm"
              required
            />
            <div className="flex justify-end mt-3 items-center">
              <div
                className="hover:underline cursor-pointer"
                onClick={closeModal}
              >
                Cancel
              </div>
              <button
                type="submit"
                className="rounded-md bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </a.div>
    </div>
  );
};
