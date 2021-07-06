import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";
import DropDown from "./DropDown";
import LoginPopup from "./Popups/LoginPopup";
import NewPostPopup from "./Popups/NewPostPopup";
import RegisterPopup from "./Popups/RegisterPopup";



const Navbar:React.FC<any>= ({authData,setAuthData})=> {
  const [isLoginModalOpen, setLoginModal] = useState<boolean>(false);
  const [isRegisterModalOpen, setRegisterModal] = useState<boolean>(false);
  const [isAddPostModalOpen, setAddPostModal] = useState<boolean>(false);
  const [isDropdownOpen, setDropdown] = useState<boolean>(false);
  
  
  const OpenLoginModal=()=>{
    setLoginModal(true);
  }
  const OpenRegisterModal=()=>{
    setRegisterModal(true);
  }
  const OpenAddPostModal=()=>{
    setAddPostModal(true);
  }
  const logout=()=>{
    setAuthData({message:"not authenticated"})
    localStorage.removeItem("auth");
  }
  const toggleDropdown=()=>{
    setDropdown(!isDropdownOpen);
  }
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e:any)=>{
        if(dropdownRef.current &&!dropdownRef.current.contains(e.target)){
          setDropdown(false);
        }
    }
    document.addEventListener("mousedown",handleClickOutside
    ,true);
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[dropdownRef])
  const logo="/images/logo.png"
    return (
        <div className="border flex items-center lg:justify-around justify-between p-2 bg-white shadow-sm">
      <Link to="/"  className="flex items-center cursor-pointer">
        <img src={logo} alt="" className="h-12 w-12"/>
        <span className="font-bold ml-2">Blaviken</span>
      </Link>
      {authData&&authData.message!=="Success" &&
      <div className="flex items-center">
      
      {isLoginModalOpen ? <LoginPopup setLoginModal={setLoginModal} setAuthData={setAuthData}/>:""}
      {isRegisterModalOpen ? <RegisterPopup setRegisterModal={setRegisterModal} setAuthData={setAuthData}/>:""}
      <span className="hover:underline cursor-pointer" onClick={OpenLoginModal}>Log in</span>
      <span className="rounded-full bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2" onClick={OpenRegisterModal}>Register</span>
    </div>}
    {authData&&authData.message==="Success" &&
    <div className="flex items-center sm:text-base text-sm font-bold">
      <Link to="/myPosts"  className="cursor-pointer mr-2 hover:text-gray-700">My posts</Link>
      <div className="cursor-pointer mr-2 hover:text-gray-700" onClick={OpenAddPostModal}>New post</div>
      {isAddPostModalOpen ? <NewPostPopup setAddPostModal={setAddPostModal} authData={authData}/> :""}
      <div  className="relative cursor-pointer">
      <img src={authData.picUrl} alt="profile pic" className="h-10 w-10 rounded-full ring-2 ring-gray-700" title={authData.username} onClick={toggleDropdown}/>
      <div className="h-2 w-2 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
      {isDropdownOpen &&
     <DropDown dropdownRef={dropdownRef} logout={logout}/>
      }
      </div>
    </div>
    }
      
    </div>
    )
};

export default Navbar;