import { useState } from "react";
import {Link} from "react-router-dom";
import LoginPopup from "./Popups/LoginPopup";
import RegisterPopup from "./Popups/RegisterPopup";

export default function Navbar () {
  const [isLoginModalOpen, setLoginModal] = useState(false);
  const [isRegisterModalOpen, setRegisterModal] = useState(false);
  const OpenLoginModal=():void=>{
    setLoginModal(true);
  }
  const OpenRegisterModal=():void=>{
    setRegisterModal(true);
  }
  const logo="/images/logo.png"
    return (
        <div className="border flex items-center lg:justify-around justify-between p-2 bg-white shadow-sm">
      <Link to="/"  className="flex items-center cursor-pointer">
        <img src={logo} alt="" className="h-12 w-12"/>
        <span className="font-bold ml-2">Blaviken</span>
      </Link>
      <div className="flex items-center">
      
        {isLoginModalOpen ? <LoginPopup setLoginModal={setLoginModal}/>:""}
        {isRegisterModalOpen ? <RegisterPopup setRegisterModal={setRegisterModal}/>:""}
        <span className="hover:underline cursor-pointer" onClick={OpenLoginModal}>Log in</span>
        <span className="rounded-full bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2" onClick={OpenRegisterModal}>Register</span>
      </div>
    </div>
    )
};