import { useState } from 'react';

interface authenticationData{
  message :string,
  jwt :string,
  username :string,
  email :string,
  picUrl :string,
  userId :number
}

export default function useAuth() {
  const getAuthData = () => {
    const auth = localStorage.getItem('auth');
    if(auth!=null)return JSON.parse(auth);
    
    return {message:"not authenticated",
    jwt :"",
    username :"",
    email :"",
    picUrl :"",
    userId :-1
  }
  };

  const [authData, setAuthData] = useState<authenticationData>(getAuthData());

  const saveData= (userData:authenticationData) => {
    localStorage.setItem('auth', JSON.stringify(userData));
    setAuthData(userData);
  };
  return {
    saveData,
    authData
  }
}