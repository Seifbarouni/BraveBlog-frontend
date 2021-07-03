import { useState } from "react";
import {Link} from "react-router-dom";
import LoginPopup from "./Popups/LoginPopup";
import RegisterPopup from "./Popups/RegisterPopup";



const Navbar:React.FC<any>= ({authData,setAuthData})=> {
  const [isLoginModalOpen, setLoginModal] = useState<boolean>(false);
  const [isRegisterModalOpen, setRegisterModal] = useState<boolean>(false);
  
  
  const OpenLoginModal=()=>{
    setLoginModal(true);
  }
  const OpenRegisterModal=()=>{
    setRegisterModal(true);
  }
  const logout=()=>{
    setAuthData({message:"not authenticated"})
    localStorage.removeItem("auth");
  }
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
      <div className="cursor-pointer mr-2 hover:text-gray-700">My posts</div>
      <div className="cursor-pointer mr-2 hover:text-gray-700">New post</div>
      <div className="cursor-pointer mr-2 hover:text-gray-700" onClick={logout}>Logout</div>
      <img src={authData.picUrl} alt="profile pic" className="h-10 w-10 rounded-full" title={authData.username}/>
    </div>
    }
      
    </div>
    )
};

export default Navbar;