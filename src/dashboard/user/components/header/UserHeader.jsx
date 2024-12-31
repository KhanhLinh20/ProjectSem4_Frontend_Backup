import React, { useEffect, useState } from 'react'
import '../header/UserHeader.css'
import shopeeLogo from "../../../../assets/shopee-logo.png"; // Đường dẫn tới file logo
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const UserHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [user, setUser] = useState(false);
  
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (token) {
        const jwtdecode = jwtDecode(token);
        setUser({
          name: jwtdecode.lastName,
          role: jwtdecode.role,
          id: jwtdecode.id,
        });
        console.log(user);
      }
    }, [token]);
  
    
    const handlelogout = async () => {
      if (token) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
  
    // Dữ liệu thông báo mẫu
    const notifications = [
      "Nguyen Van A has applied for the Marketing position",
      "Tran Thi B has applied for the Sales position",
      "Le Van C has applied for the Designer position",
      "Nguyen Van D has applied for the HR position",
      "Le Thi E has applied for the Finance position",
      "Tran Van F has applied for the Developer position",
      "Nguyen Thi G has applied for the Customer Support position",
      "Le Van H has applied for the Product Manager position",
      "Tran Van I has applied for the Business Analyst position",
      "Nguyen Van J has applied for the UX/UI Designer position",
    ];
  
    // Hàm để toggle mở/đóng menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    // Hàm để đóng menu khi nhấn vào bên ngoài (tùy chọn)
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
  
    // Hàm để toggle mở/đóng danh sách thông báo
    const toggleNotifications = () => {
      setIsNotificationOpen(!isNotificationOpen);
    };
  return (
    <div>
         <header className="admin-header navbar navbar-dark px-3">
      <div
        className="navbar-brand d-flex align-items-center"
        style={{ height: "70px" }}
      >
        {/* Logo Shopee Career */}
        <a href="/" className="d-flex align-items-center">
          <img
            src={shopeeLogo}
            alt="Shopee Career"
            className="logo-img"
            style={{ height: "70px" }} // Điều chỉnh chiều cao logo nếu cần
          />
        </a>
      </div>

      <div className="d-flex align-items-center">
        {/* Thanh tìm kiếm */}
        <input
          type="text"
          placeholder="Search..."
          className="form-control form-control-dark search-bar"
        />

        {/* Icon chuông thông báo */}
        <div
          className="notification-icon position-relative me-3"
          onClick={toggleNotifications}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-bell"></i>
          <span className="notification-count">3</span>{" "}
          {/* Ví dụ số lượng thông báo */}
          {/* Danh sách thông báo */}
          {isNotificationOpen && (
            <div className="notification-menu position-absolute end-0 mt-2 p-2">
              <ul className="list-unstyled m-0">
                {notifications.map((notification, index) => (
                  <li key={index} className="notification-item">
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Phần người dùng */}
        <div
          className="user-section d-flex align-items-center position-relative"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="username text-white">{user.role}</span>

          {/* Menu thả xuống */}
          {isMenuOpen && (
            <div
              className="dropdown-menu show position-absolute end-0 mt-2 p-2"
              style={{ right: 0, minWidth: "150px" }}
            >
              <NavLink
                to={`/user/user-profile-employee/${user.id}`}
                className="dropdown-item"
              >
                View Profile
              </NavLink>
              <Link to="/user/user-change-password-employee" className="dropdown-item">
                Change Password
              </Link>
              <button className="dropdown-item" onClick={handlelogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
      
    </div>
  )
}

export default UserHeader
