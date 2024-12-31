import React, { useEffect, useState } from "react";
import "../adminlogin/AdminLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import illustration from "../../assets/login-illustration/login-illustration1.png";
import axiosclient from "../../api/Axios";
import { jwtDecode } from "jwt-decode";
import Cookies  from "js-cookie"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { colors } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { MDBRow } from "mdb-react-ui-kit";



const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot Password Modal state
  const [showModal, setShowModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  
  const navigate = useNavigate();

  // Kiểm tra nếu có email và password trong localStorage khi tải lại trang
  useEffect(() => {
    // const savedEmail = localStorage.getItem("email");
    // const savedPassword = localStorage.getItem("password");
    const savedEmail = Cookies.get("rememberMeEmail");
    const savedPassword = Cookies.get("rememberMePassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Chọn Remember me mặc định nếu có thông tin trong localStorage
    }
  }, []);

  // const verifyCaptcha = async (token) => {
  //   const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: new URLSearchParams({
  //       secret: '6LfJiKQqAAAAAKkP12FfSyyGUQfg7hBJbF0Tz_N2',
  //       response: token,
  //     }),
  //   });
  //   const data = await response.json();
  //   return data.success;
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setError(""); // Clear error trước khi gửi request
    setLoading(true); // Set trạng thái loading là true
  
    const data = {
      "email": email,
      "password": password,
    };
  
    try {
      const response = await axiosclient.post("shopee-career/login", data);
      console.log(response.data);
      const tokenData = jwtDecode(response.data.token);
      console.log("token parse", tokenData);
      

      if (tokenData.isFirstLogin && !tokenData.isPasswordChanged) {
        // Nếu là lần đăng nhập đầu tiên và mật khẩu chưa thay đổi
        setShowChangePasswordModal(true); // Hiển thị modal thay đổi mật khẩu
      } 
  
      // Kiểm tra nếu status là 200 (đăng nhập thành công)
      else if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        const gettoken = localStorage.getItem("token");
        const decodetoken = jwtDecode(gettoken);
        
        console.log("decode:", response.data.token);
  
        const userRole = decodetoken.role;
        const accountStatus = decodetoken.status;
        // setIsFirstLogin(decodetoken.isFirstLogin);
        // setIsPasswordChanged(decodetoken.isPasswordChanged);
        // const isPasswordChanged = decodetoken.isPasswordChanged;
        
        if (accountStatus === "Active") {
          
          // Nếu chọn "Remember me", lưu email và mật khẩu vào localStorage
          if (rememberMe) {
            // localStorage.setItem("email", email);
            Cookies.set("rememberMeEmail", email, { expires: 7 }); // Lưu trong 7 ngày
            Cookies.set("rememberMePassword", password, { expires: 7 });
            // localStorage.setItem("password", password); // Lưu password nếu "Remember me" được chọn
          } else {
            // Nếu không chọn "Remember me", xóa thông tin trong localStorage
            // localStorage.removeItem("email");
            // localStorage.removeItem("password");
            Cookies.remove("rememberMeEmail");
            Cookies.remove("rememberMePassword");
          }
          setShowChangePasswordModal(false);
          userRole === "Admin" ? navigate("/admin") : navigate("/user");
        } else {
          // Tài khoản chưa được kích hoạt
          setError(response.data.message);
        }
      } else {
        // Nếu có lỗi trả về từ backend, xử lý theo thông báo lỗi của backend (các status khác ngoài status 200)
        setError(response.data.message); // Ví dụ: "Invalid email or password" hoặc "Account is deactivated"
      }
    } catch (error) {
      // Xử lý lỗi trong trường hợp khác
      console.error("Login error:", error);
      if (error.response) {
        // Lỗi trả về từ backend (status khác 200)
        setError(error.response.data.message); // Lấy message từ backend
      } else {
        // Lỗi không liên quan đến backend (ví dụ: mạng)
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  

  // Handle changing password logic
  const handleChangePassword = async () => {
  if (!newPassword) {
    setError("Please enter a new password.");
    return;
  }
  if (newPassword.length < 8) { // Kiểm tra mật khẩu phải có ít nhất 8 ký tự (có thể thay đổi điều kiện này)
    setError("Password must be at least 8 characters long.");
    return;
  }
  if (!/[A-Z]/.test(newPassword)) {
    setError("Password must contain at least one uppercase letter.");
    return;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
    setError("Password must contain at least one special character.");
    return;
  }
  if (newPassword !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
  

  setLoading(true);

  const data = {
    "email": email,
    "newPassword": newPassword,
    // "oldPassword": oldPassword,
    "confirmPassword": confirmPassword
  };

  try {
    const response = await axiosclient.put("shopee-career/change-password-login", data);
    if (response.data.status === 200) {
      // Sau khi thay đổi mật khẩu thành công, cập nhật lại trạng thái isFirstLogin và isPasswordChanged
      setIsFirstLogin(false); // Đánh dấu đã không phải lần đầu đăng nhập
      setIsPasswordChanged(true);
      setShowChangePasswordModal(false); // Đóng modal
      setError(""); // Reset any errors
      // alert("Password changed successfully!");
      navigate("/admin"); // Redirect to admin dashboard
    } 
  } catch (error) {
    setError("An error occurred while changing the password.");
  } finally {
    setLoading(false);
  }
};

  const handleForgotPassword = async () => {
    setForgotError(""); // Xóa lỗi trước đó
    setForgotSuccess(false); // Reset trạng thái thành công
    setLoading(true); // Bật trạng thái loading
  
    if (!forgotEmail) {
      setForgotError("Please enter your email."); // Thông báo email rỗng
      setLoading(false); // Tắt loading nếu không nhập email
      return;
    }
  
    try {
      const response = await axiosclient.post(
        "shopee-career/reset-password",
        null,
        { params: { email: forgotEmail } }
      );
  
      // Kiểm tra status trả về
      if (response.status === 201) {
        setForgotSuccess(response.data);
      } else {
        setForgotError(response.data);
      }
    } catch (error) {
      // Xử lý lỗi từ backend hoặc lỗi kết nối
      setForgotError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false); // Tắt loading trong mọi trường hợp
    }
  };

  return (
    <div className="login-page">
      {/* Phần hình minh họa bên trái */}
      <div className="login-illustration">
        <img src={illustration} alt="Login Illustration" />
      </div>

      {/* Form đăng nhập bên phải */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )} {/* Hiển thị thông báo lỗi */}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="" style={{textAlign: "left"}}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label style={{ marginLeft: "8px" }}>Remember me</label>
          </div>
          {/* reCAPTCHA Component */}
          <div className="form-group" style={{ marginTop: "15px" }}>
            {/* <ReCAPTCHA
              sitekey="6LfJiKQqAAAAALmCs8Z9-cpDoAl4ia_emGJfx8gr" // Thay bằng site key của bạn
              onChange={(token) => setCaptchaResponse(token)}
              console.log("CAPTCHA token:", token);
            /> */}
            {/* <ReCAPTCHA
              sitekey="6LfJiKQqAAAAALmCs8Z9-cpDoAl4ia_emGJfx8gr"
              onChange={(token) => {
                console.log("CAPTCHA token:", token);
                setCaptchaResponse(token);
              }}
            /> */}
          </div>
          {/* Link mở Forgot Password */}
          <p className="forgot-password-link" style={{ marginTop: "10px" }}>
            <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setShowModal(true)}>
              Forgot Password?
            </span>
          </p>
          {/* <button type="submit" className="login-button" disabled={loading} onClick={() => setShowChangePasswordModal(true)}>
            {loading ? "Logging in..." : "Login"}
          </button> */}

          <button 
            type="submit" 
            className="login-button" 
            disabled={loading} 
            onClick={handleLogin}
            // onClick={() => {
            //   console.log("isFirstLogin:", isFirstLogin, "isPasswordChanged:", isPasswordChanged);
            //   if (isFirstLogin && !isPasswordChanged) {
            //     setShowChangePasswordModal(true);
            //     console.log("Modal should show");
            //   } else {
            //     setShowChangePasswordModal(false);
            //     console.log("Modal should not show");
            //   }
            // }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Modal đổi mật khẩu */}
      <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body> */}
        <Modal.Body>
          <MDBRow>
            {error && <div className="alert alert-danger">{error}</div>}
          </MDBRow>
          <div className="form-group">
            <label>New Password<span style={{color: "red"}}>*</span></label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password<span style={{color: "red"}}>*</span></label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* {error && <div className="alert alert-danger">{error}</div>} */}
        </Modal.Body>
        {/* <Modal.Body>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword} disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal Forgot Password */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your email address and we'll send you a new password.</p>
          {forgotError && <div className="alert alert-danger">{forgotError}</div>}
          {forgotSuccess && <div className="alert alert-success">{forgotSuccess}</div>}

          <div className="form-group">
            <label>Email Address <span style={{color: "red"}}>*</span></label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword} disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default AdminLogin;
