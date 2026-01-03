import React from 'react'
import Qsos from '../components/Qsos'
import { useAuth } from "../context/Auth-context";

const Sos = () => {

  const { isAuth,authToken } = useAuth();//authToken
  
    if (!isAuth) {
      // user not logged in → show sign-in page
      return <Signin />;
    }

  return (
    <div>
      <Qsos/>
    </div>
  )
}

export default Sos
