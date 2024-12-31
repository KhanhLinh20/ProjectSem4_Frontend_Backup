import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../api/Axios";


const UserSideBar = () => {
  // State để quản lý mở/đóng danh sách thư mục con của Dashboard, Projects và Users
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isApplicant, setIsApplicantOpen] = useState(false);
  const [isInterview, setIsInterview] = useState(false);
  const [isapplicantinterview, setisApplicantinterview] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(""); // State lưu avatarUrl
  const [employerNumber, setEmployerNumber] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const jwt = jwtDecode(token);
      setUser({
        firstname: jwt.firstName,
        lastname: jwt.lastName,
        role: jwt.role,
        id: jwt.id,  // Lưu ID người dùng để lấy ảnh đại diện
      });

      // Fetch avatar từ API
      const fetchAvatar = async () => {
        try {
          const response = await axiosclient.get(`shopee-career/get-employer/${jwt.id}`);
          setAvatarUrl(response.data.data.profilePicture 
            ? `http://localhost:8080/uploads/employee/${response.data.data.profilePicture}` 
            : 'https://via.placeholder.com/80');
          setEmployerNumber(response.data.data.employerNumber)
        } catch (error) {
          console.error("Error fetching avatar:", error);
          setAvatarUrl('https://via.placeholder.com/80'); // Nếu có lỗi, dùng ảnh mặc định
        }
      };

      fetchAvatar();
    }
  }, [token]);

  // Hàm để toggle mở/đóng các thư mục con
  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);
  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);
  const toggleUsers = () => setIsUsersOpen(!isUsersOpen);
  const toggleApplicant = () => setIsApplicantOpen(!isApplicant);
  const toggleInterview = () => setIsInterview(!isInterview);
  const toggleApplicantIntervew = () => setisApplicantinterview(!isapplicantinterview);

  return (
    <aside className="sidebar">
      {/* Phần avatar và tên người dùng - phần cố định */}
      <div className="sidebar-profile text-white text-center p-3">
        <img
          src={avatarUrl} // Sử dụng avatarUrl từ state
          alt="Admin Avatar"
          className="rounded-circle mb-2"
          style={{ width: "80px", height: "80px" }}
        />
        <h5 className="m-0">
          {user ? employerNumber : "User"} {/* Hiển thị tên người dùng */}
        </h5>
      </div>

      {/* Phần menu có thể cuộn */}
      <div className="sidebar-menu">
        <nav className="sidebar-nav">
          <ul className="list-unstyled">
            {/* Mục Dashboard với thư mục con */}
            <li>
              <Link
                to="/user"
                className="d-flex align-items-center sidebar-item"
              >
                <i className="bi bi-speedometer2 me-2"></i>
                <span>Dashboard</span>
              </Link>
            </li>
       
            <li>
              <div
                className="d-flex align-items-center sidebar-item"
                onClick={toggleProjects}
              >
                <i class="fas fa-briefcase"></i>
                <span>Job</span>
                <i
                  className={`bi ms-auto ${isProjectsOpen ? "bi-chevron-down" : "bi-chevron-right"}`}
                ></i>
              </div>
              {/* Thư mục con của Projects */}
              <ul className={`submenu list-unstyled ${isProjectsOpen ? "show" : ""}`}>
           
                <li>
                  <NavLink
                    to="/user/list-jobposting-by-employer"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    List Job 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user/list-jobposting-draft" className={({ isActive }) =>
                    isActive ? "custom-active-link" : "default-link"
                  }>
                    List Job Draft
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user/list-jobposting-publish" className={({ isActive }) =>
                    isActive ? "custom-active-link" : "default-link"
                  }>
                    List Job Publish
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user/list-jobposting-close" className={({ isActive }) =>
                    isActive ? "custom-active-link" : "default-link"
                  }>
                    List Job Close
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="d-flex align-items-center sidebar-item"
                onClick={toggleApplicant}
              >
                <i class="fas fa-users"></i>
                <span>Applications</span>
                <i
                  className={`bi ms-auto ${isApplicant ? "bi-chevron-down" : "bi-chevron-right"}`}
                ></i>
              </div>
              {/* Thư mục con của Interview */}
              <ul className={`submenu list-unstyled ${isApplicant ? "show" : ""}`}>
              <li>
                  <NavLink
                    to="/user/list-user-application-employee"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    List Application
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/list-user-application-employee-withow-interview"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    List Applicant Waiting Interview
                  </NavLink>
                </li>
              
              </ul>
            </li>
            
            <li>
              <div
                className="d-flex align-items-center sidebar-item"
                onClick={toggleInterview}
              >
                <i class="fas fa-users"></i>
                <span>Interview</span>
                <i
                  className={`bi ms-auto ${isInterview ? "bi-chevron-down" : "bi-chevron-right"}`}
                ></i>
              </div>
              {/* Thư mục con của Interview */}
              <ul className={`submenu list-unstyled ${isInterview ? "show" : ""}`}>
             
                <li>
                  <NavLink
                    to="/user/list-user-interview-employee"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    Interview In Proccess
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/list-user-interview-complete-employee"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    Interview Complete
                  </NavLink>
                </li>
              </ul>
            </li>
            <div
                className="d-flex align-items-center sidebar-item"
                onClick={toggleApplicantIntervew}
              >
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Applicant</span>
                <i
                  className={`bi ms-auto ${
                    isapplicantinterview
                      ? "bi-chevron-down"
                      : "bi-chevron-right"
                  }`}
                ></i>
              </div>

              <ul
                className={`submenu list-unstyled ${
                  isapplicantinterview ? "show" : ""
                }`}
              >
                <li>
                  <NavLink
                    to="/user/list-user-application-accept-employee"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    List Applicant Pass
                  </NavLink>
                </li>
              </ul>
              <ul
                className={`submenu list-unstyled ${
                  isapplicantinterview ? "show" : ""
                }`}
              >
                <li>
                  <NavLink
                    to="/user/list-user-application-reject-employee"
                    className={({ isActive }) =>
                      isActive ? "custom-active-link" : "default-link"
                    }
                  >
                    List Applicant Fail
                  </NavLink>
                </li>
              </ul>
            
            {/* Các mục khác */}
            {/* <li className="sidebar-item">
              <i className="bi bi-chat-left-text me-2"></i> Comments
            </li>
            <li className="sidebar-item">
              <i className="bi bi-graph-up me-2"></i> Stats
            </li> */}
            
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default UserSideBar;