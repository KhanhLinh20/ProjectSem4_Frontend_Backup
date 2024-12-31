import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../css/admintemplate.css';
import Header from '../dashboard/admin/components/header/Header'
import Sidebar from '../dashboard/admin/components/sidebar/Sidebar'
import { jwtDecode } from 'jwt-decode';


const AdminTemplates = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
      try {
        const decodeToken=jwtDecode(token);
        const currentTime=Date.now()/1000;
        if (decodeToken.exp < currentTime) {
          localStorage.removeItem('token');
          navigate("/login");

          
        }else{
            // Đặt timeout để tự động logout khi token hết hạn
          const timeout=(decodeToken.exp-currentTime)*1000;// Thời gian còn lại
          setTimeout(()=>{
            localStorage.removeItem("token");//xoa token
            navigate("/login"); // Chuyển hướng tới trang login
          },timeout)

        }
        
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
        navigate("/login");
        
      }
    }

  }, [navigate,token]);


  return (

    <div>
     
      <div className="App">
        {/* Header ở trên cùng */}
        <Header />

        <div className="app-container">
          {/* Sidebar bên trái */}
          <Sidebar />

          {/* Nội dung chính */}
          <div className="content">
           
            <Outlet />
          </div>
        </div>
      </div>

    </div>

  );
}

export default AdminTemplates;
