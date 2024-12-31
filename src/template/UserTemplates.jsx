import React, { useEffect } from "react";
import UserHeader from '../dashboard/user/components/header/UserHeader'
import UserSideBar from "../dashboard/user/components/sidebar/UserSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const UserTemplates = () => {
  const token =localStorage.getItem("token");
  const navigate=useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate('/login')
      
    }else{
      try {
        const decodetoken=jwtDecode(token);
        const currentTime=Date.now()/1000;
        if (decodetoken.exp<currentTime) {
          localStorage.removeItem('token');
          navigate('');
          
        }else{
          const timeout=(decodetoken.exp - currentTime)*1000;
          setTimeout(()=>{
            localStorage.removeItem('token');
            navigate('');
          },timeout)
          
        }
        
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
        navigate("/login");
        
      }
    }
  },[navigate,token]);
  return (
    <div>
      <div className="App">
        {/* Header ở trên cùng */}
        <UserHeader />

        <div className="app-container">
          {/* Sidebar bên trái */}
          <UserSideBar />

          {/* Nội dung chính */}
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTemplates;
