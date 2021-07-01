import { useState } from 'react';

export default function useAuth() {
  const getAuthData = () => {
    const auth = localStorage.getItem('auth');
    if(auth!=null)return JSON.parse(auth);
    
    return {message:"not authenticated"}
  };

  const [authData, setAuthData] = useState(getAuthData());

  const saveData = userData => {
    localStorage.setItem('auth', JSON.stringify(userData));
    setAuthData(userData);
  };
  return {
    saveData,
    authData
  }
}