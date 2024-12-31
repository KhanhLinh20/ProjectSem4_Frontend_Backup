import React, { useEffect, useRef, useState } from "react";
import "./Header.css"; // Để thêm các CSS tùy chỉnh nếu cần
import shopeeLogo from "../../../../assets/shopee-logo.png"; // Đường dẫn tới file logo
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../api/Axios";
import { Client, over } from "stompjs";
import SockJS from "sockjs-client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(""); // State lưu avatarUrl
  const [notifications, setNotifications] = useState([]);
  const stompClient = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [countNotification, setCountNotification] = useState(0);
  const [receiveMessage, setReceiveMessage] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Lấy thông tin người dùng và ảnh đại diện khi người dùng đăng nhập
  useEffect(() => {
    if (token) {
      const jwtdecode = jwtDecode(token);
      setUser({
        name: jwtdecode.lastName,
        role: jwtdecode.role,
        id: jwtdecode.id,
      });

      // Fetch ảnh đại diện từ API khi người dùng đăng nhập
      const fetchAvatar = async () => {
        try {
          const response = await axiosclient.get(`shopee-career/get-employer/${user.id}`); // API lấy thông tin người dùng (có ảnh đại diện)
          setAvatarUrl(response.data.data.profilePicture ? `http://localhost:8080/uploads/employee/${response.data.data.profilePicture}` : 'https://via.placeholder.com/40');
          console.log("Photo", response.data.data.profilePicture);
          
        } catch (error) {
          console.error("Error fetching user avatar:", error);
          setAvatarUrl('https://via.placeholder.com/40'); // Nếu lỗi, dùng ảnh mặc định
        }
      };

      fetchAvatar();  // Fetch ảnh đại diện
    }
  }, [token]);

  // Fetch thông báo cho người dùng khi người dùng đăng nhập
  const fetchDataNotification = async () => {
    try {
      const response = await axiosclient.get(`shopee-career/notifications/${user.id}`);
      const countnoti= await axiosclient.get(`shopee-career/count-notifications/${user.id}`);
      const messages = response.data?.map(notification => notification.message);
      setReceiveMessage(messages);
      // setCountNotification(messages.length);
      setCountNotification(countnoti.data);
      console.log("jhadkhakshd"+countnoti.data);
      
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDataNotification();  // Fetch notifications when user logs in
    }
  }, [user]);

  const connect = () => {
    const onConnected = () => {
      console.log("Connected to WebSocket");

      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.subscribe(`/user/${user.id}/private-notification`, (payload) => {
          console.log("Received payload:", payload);

          try {
            // Thêm thông báo mới vào đầu danh sách
            setReceiveMessage(prevMessages => [payload.body, ...prevMessages]);
            setCountNotification(prevCount => prevCount + 1); // Tăng số lượng thông báo
          } catch (error) {
            console.error("Error processing received data:", error);
          }
        });
        setIsConnected(true);
      } else {
        console.error("WebSocket is not connected yet.");
      }
    };

    const onError = (error) => {
      console.error("WebSocket connection error:", error);
      setIsConnected(false);
    };

    try {
      const Sock = new SockJS("http://localhost:8080/ws"); // Thay đổi URL nếu cần
      stompClient.current = over(Sock);

      stompClient.current.connect({}, onConnected, onError);
    } catch (ex) {
      console.error("WebSocket connection failed:", ex);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (user && !isConnected) {
      connect();  // Kết nối WebSocket khi người dùng đã đăng nhập
    }

    return () => {
      if (stompClient.current && isConnected) {
        stompClient.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
          setIsConnected(false);
        });
      }
    };
  }, [user, isConnected]);

  const handleLogout = async () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleNotifications = async () => {

    // Khi mở danh sách thông báo, set lại countNotification về 0
    await axiosclient.put(`shopee-career/IsReadNotification/${user.id}`)
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setCountNotification(0); // Đặt lại số lượng thông báo khi mở danh sách
    }
  };

  return (
    <header className="admin-header navbar navbar-dark px-3">
      <div className="navbar-brand d-flex align-items-center" style={{ height: "70px" }}>
        <a href="/admin" className="d-flex align-items-center">
          <img src={shopeeLogo} alt="Shopee Career" className="logo-img" style={{ height: "70px" }} />
        </a>
      </div>

      <div className="d-flex align-items-center">
        <div
          className="notification-icon position-relative me-3"
          onClick={toggleNotifications}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-bell"></i>
          <span className="notification-count">{countNotification}</span>
          {isNotificationOpen && (
            <div className="notification-menu position-absolute end-0 mt-2 p-2">
              <ul className="list-unstyled m-0">
                {receiveMessage.map((message, index) => (
                  <li className="notification-item" key={index}>
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          className="user-section d-flex align-items-center position-relative"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        >
          {/* Hiển thị ảnh đại diện từ API */}
          {/* <img
            src={avatarUrl} // Sử dụng avatarUrl từ state
            alt="User Avatar"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          /> */}
          <span className="username text-white">{user?.role}</span>

          {isMenuOpen && (
            <div
              className="dropdown-menu show position-absolute end-0 mt-2 p-2"
              style={{ right: 0, minWidth: "150px" }}
            >
              <NavLink to={`/admin/profileemployee/${user?.id}`} className="dropdown-item">
                View Profile
              </NavLink>
              <Link to="/admin/change-password" className="dropdown-item">
                Change Password
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
