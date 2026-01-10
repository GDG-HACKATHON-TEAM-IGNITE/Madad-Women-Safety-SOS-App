import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Settings from '../components/Settings'
// import { useAuth } from "../context/Auth-context";
// import { useLocation } from "react-router-dom";

// import { useNavigate } from 'react-router-dom'

const Setting = () => {
//   const location = useLocation();
//   const { isAuth, authToken } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//   if (!isAuth && location.pathname !== "/setting") {
//     navigate("/setting", { replace: true });
//   }
// }, [isAuth, navigate, location.pathname]);

//   if (!isAuth) return null;

  return (
    <div>
      <Navbar />
      <Settings />
    </div>
  )
}

export default Setting
