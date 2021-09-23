import { Link } from "react-router-dom";
import { useState } from "react";

import { DropDown } from "./DropDown";
import { LoginPopup } from "./Popups/LoginPopup";
import { NewPostPopup } from "./Popups/NewPostPopup";
import { RegisterPopup } from "./Popups/RegisterPopup";
import { useOutsideAlerter } from "../Hooks/useOutsideAlerter";

const Navbar: React.FC<any> = ({ authData, setAuthData }) => {
  const OpenLoginModal = () => {
    setLoginModal(true);
  };
  const OpenRegisterModal = () => {
    setRegisterModal(true);
  };
  const OpenAddPostModal = () => {
    setAddPostModal(true);
  };
  const logout = () => {
    setAuthData({ message: "not authenticated" });
    setIsDropDownOpen(false);
    localStorage.removeItem("auth");
  };
  const toggleDropdown = () => {
    setOpen(!isOpen);
  };
  const { ref, isOpen, setOpen } = useOutsideAlerter(false);
  const {
    ref: loginRef,
    isOpen: isLoginModalOpen,
    setOpen: setLoginModal,
  } = useOutsideAlerter(false);
  const {
    ref: registerRef,
    isOpen: isRegisterModalOpen,
    setOpen: setRegisterModal,
  } = useOutsideAlerter(false);
  const {
    ref: newPostRef,
    isOpen: isAddPostModalOpen,
    setOpen: setAddPostModal,
  } = useOutsideAlerter(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  return (
    <div className="border flex sm:flex-row flex-col sm:items-center lg:justify-around justify-between p-2 bg-white shadow-sm sticky top-0 z-50 ">
      <div className="flex items-center">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src="/images/logo.png" alt="" className="h-12 w-12" />
        </Link>
        <span className="font-bold ml-2">Brave Blog</span>
      </div>
      {authData && authData.message !== "Success" && (
        <div className="flex items-center">
          {isLoginModalOpen ? (
            <LoginPopup
              setLoginModal={setLoginModal}
              setAuthData={setAuthData}
              loginRef={loginRef}
            />
          ) : (
            ""
          )}
          {isRegisterModalOpen ? (
            <RegisterPopup
              setRegisterModal={setRegisterModal}
              setAuthData={setAuthData}
              registerRef={registerRef}
            />
          ) : (
            ""
          )}
          <Link
            to="/live"
            className="mr-4 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:flex hidden"
          >
            <img src="/images/live.svg" alt="" />
          </Link>
          <span
            className="hover:underline cursor-pointer mr-4 sm:flex hidden"
            onClick={OpenLoginModal}
          >
            Log in
          </span>
          <span
            className="rounded-md bg-black  hover:bg-gray-800 cursor-pointer text-white px-4 py-1 sm:flex hidden"
            onClick={OpenRegisterModal}
          >
            Register
          </span>
          <span
            className="cursor-pointer flex sm:hidden mr-2 absolute right-2 top-7"
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <img
              src="/images/down-arrow.svg"
              alt="openDropDown"
              className="h-3 w-3"
            />
          </span>
          {isDropDownOpen && (
            <div className="flex flex-col sm:hidden ml-14 font-bold">
              <Link
                to="/live"
                className="mr-4 cursor-pointer hover:text-gray-700 border-b border-gray-400 w-full"
              >
                Live
              </Link>
              <span
                className="mr-4 cursor-pointer hover:text-gray-700 border-b border-gray-400 w-full"
                onClick={OpenLoginModal}
              >
                Log in
              </span>
              <span
                className="mr-4 cursor-pointer hover:text-gray-700 w-full"
                onClick={OpenRegisterModal}
              >
                Register
              </span>
            </div>
          )}
        </div>
      )}
      {authData && authData.message === "Success" && (
        <div className="flex items-center  font-bold">
          <Link
            to="/live"
            className="mr-2 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:flex hidden"
          >
            <img src="/images/live.svg" alt="" />
          </Link>
          <Link
            to="/myPosts"
            className="cursor-pointer mr-2 hover:text-gray-700 sm:flex hidden"
          >
            My posts
          </Link>
          <div
            className="cursor-pointer mr-2 hover:text-gray-700 sm:flex hidden"
            onClick={OpenAddPostModal}
          >
            New post
          </div>
          <Link
            to="/saved"
            className="cursor-pointer mr-2 hover:text-gray-700 sm:flex hidden"
          >
            Saved
          </Link>
          {isAddPostModalOpen ? (
            <NewPostPopup
              setAddPostModal={setAddPostModal}
              authData={authData}
              newPostRef={newPostRef}
            />
          ) : (
            ""
          )}
          <div className="relative cursor-pointer">
            <img
              src={authData.picUrl}
              alt="profile pic"
              className="h-10 w-10 rounded-full ring-2 ring-gray-700 sm:flex hidden"
              title={authData.username}
              onClick={toggleDropdown}
            />
            <div className="h-2 w-2 rounded-full bg-green-500 absolute right-0 bottom-0 sm:flex hidden"></div>
            {isOpen && <DropDown dropdownRef={ref} logout={logout} />}
          </div>
          <span
            className="cursor-pointer flex sm:hidden mr-2 absolute right-2 top-7"
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <img
              src="/images/down-arrow.svg"
              alt="openDropDown"
              className="h-3 w-3"
            />
          </span>
          {isDropDownOpen && (
            <div className="flex flex-col sm:hidden ml-14 font-bold">
              <Link
                to="/live"
                className="mr-4 cursor-pointer hover:text-gray-700 border-b border-gray-400 w-full"
              >
                Live
              </Link>
              <Link
                to="/myPosts"
                className="cursor-pointer mr-2 hover:text-gray-700 border-b border-gray-400 w-full "
              >
                My posts
              </Link>
              <div
                className="cursor-pointer mr-2 hover:text-gray-700 border-b border-gray-400 w-full"
                onClick={OpenAddPostModal}
              >
                New post
              </div>
              <Link
                to="/profile"
                className="cursor-pointer mr-2 hover:text-gray-700 border-b border-gray-400 w-full"
              >
                Profile
              </Link>
              <Link
                to="/saved"
                className="cursor-pointer mr-2 hover:text-gray-700 border-b border-gray-400 w-full"
              >
                Saved
              </Link>
              <div
                className="cursor-pointer mr-2 hover:text-gray-700"
                onClick={logout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
