import React from 'react'
import Navbar from '../components/Navbar'
import Settings from '../components/Settings'
import { useAuth } from "../context/Auth-context";

const Setting = () => {

  const { isAuth,authToken } = useAuth();//authToken
  
    if (!isAuth) {
      // user not logged in → show sign-in page
      return <Signin />;
    }

  return (
    <div>
      <Navbar/>
      <Settings/>
    </div>
  )
}

export default Setting
