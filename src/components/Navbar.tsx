import {Link} from "react-router-dom";
import {DropDown} from "./DropDown";
import {LoginPopup} from "./Popups/LoginPopup";
import {NewPostPopup} from "./Popups/NewPostPopup";
import {RegisterPopup} from "./Popups/RegisterPopup";
import { useOutsideAlerter } from "../Hooks/useOutsideAlerter";



export const Navbar:React.FC<any>= ({authData,setAuthData})=> {
  
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
    setOpen(!isOpen);
  }
  const {ref,isOpen,setOpen} = useOutsideAlerter(false);
  const {ref:loginRef,isOpen:isLoginModalOpen,setOpen:setLoginModal} = useOutsideAlerter(false);
  const {ref:registerRef,isOpen:isRegisterModalOpen,setOpen:setRegisterModal} = useOutsideAlerter(false);
  const {ref:newPostRef,isOpen:isAddPostModalOpen,setOpen:setAddPostModal} = useOutsideAlerter(false);
  
  const logo="/images/logo.png"
    return (
        <div className="border flex items-center lg:justify-around justify-between p-2 bg-white shadow-sm sticky top-0 z-50">
      <Link to="/"  className="flex items-center cursor-pointer">
        <img src={logo} alt="" className="h-12 w-12"/>
        <span className="font-bold ml-2">Blaviken</span>
      </Link>
      {authData&&authData.message!=="Success" &&
      <div className="flex items-center">
      
      {isLoginModalOpen ? 
<LoginPopup setLoginModal={setLoginModal} setAuthData={setAuthData} loginRef={loginRef}/>
      :""}
      {isRegisterModalOpen ? <RegisterPopup setRegisterModal={setRegisterModal} setAuthData={setAuthData} registerRef={registerRef}/>:""}
      <div className="mr-4 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        <img src="/images/live.svg" alt="" />
      </div>
      <span className="hover:underline cursor-pointer mr-4" onClick={OpenLoginModal}>Log in</span>
      <span className="rounded-md bg-black  hover:bg-gray-800 cursor-pointer text-white px-4 py-1 " onClick={OpenRegisterModal}>Register</span>
    </div>}
    {authData&&authData.message==="Success" &&
    <div className="flex items-center sm:text-base text-sm font-bold">
      <div className="mr-2 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        <img src="/images/live.svg" alt="" />
      </div>
      <Link to="/myPosts"  className="cursor-pointer mr-2 hover:text-gray-700">My posts</Link>
      <div className="cursor-pointer mr-2 hover:text-gray-700" onClick={OpenAddPostModal}>New post</div>
      {isAddPostModalOpen ? <NewPostPopup setAddPostModal={setAddPostModal} authData={authData} newPostRef={newPostRef}/> :""}
      <div  className="relative cursor-pointer">
      <img src={authData.picUrl} alt="profile pic" className="h-10 w-10 rounded-full ring-2 ring-gray-700" title={authData.username} onClick={toggleDropdown}/>
      <div className="h-2 w-2 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
      {isOpen &&
     <DropDown dropdownRef={ref} logout={logout}/>
      }
      </div>
    </div>
    }
      
    </div>
    )
}