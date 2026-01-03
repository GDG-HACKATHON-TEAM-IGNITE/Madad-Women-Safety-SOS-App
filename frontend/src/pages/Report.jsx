import React from 'react'
import Reports from '../components/Reports'
import Navbar from '../components/Navbar'
import { useAuth } from "../context/Auth-context";

const Report = () => {
  const { isAuth,authToken } = useAuth();//authToken
  
    if (!isAuth) {
      // user not logged in → show sign-in page
      return <Signin />;
    }
  return (
    <div>
      <Navbar/>
      <Reports/>
    </div>
  )
}

export default Report
