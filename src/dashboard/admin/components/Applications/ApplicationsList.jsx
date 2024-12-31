import React, { useEffect, useState } from "react";
import "../Applications/ApplicationsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router-dom";
import axiosclient from "../../../../api/Axios";
import moment from "moment/moment";

const ApplicationsList = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation(); // Đổi tên thành `currentLocation`

  useEffect(() => {
    // Bật trạng thái loading khi đường dẫn thay đổi
    setIsLoading(true);

    // Tắt loading sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Thời gian chờ cho loading, có thể điều chỉnh

    // Clear timeout nếu người dùng điều hướng nhanh chóng
    return () => clearTimeout(timer);
  }, [currentLocation.pathname]);
  // Khi đang loading, chỉ hiển thị Loading component, không render nội dung trang


  const[Applications,setIsApplicantions]=useState([]);
  const fetchdata=async ()=>{
    try {
        const res=await axiosclient.get(`shopee-career/list-application`);
        setIsApplicantions(res.data.data);

        
    } catch (error) {
        console.log(error);
    }

  }
  useEffect(()=>{
    fetchdata();
  },[]);


   if (isLoading) {
    return <Loading />;
  }
 
  // Hàm xử lý trạng thái kích hoạt/tạm dừng
  const toggleStatus = (Applications) => {
    console.log(`Toggling status for ${Applications}`);
    // Cập nhật trạng thái của nhân viên dựa trên employeeID nếu cần
  };
  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5">Applications List</h2>
     
        <table className="table">
          <thead>
            <tr>

              <th>application Number</th>
              <th>last Name</th>
              <th>Email</th>
              <th>date Of Birth</th>
              <th>phone Number</th>
              <th>Location</th>
              <th>Status</th>
              <th>resumefile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Applications.map((item) => (
              <tr key={item.applicationID}>
         
                <td>{item.applicationNumber}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{moment(item.dateOfBirth).format("DD/MM/YYYY") }</td>
                <td>{item.phoneNumber}</td>
                <td>{item.location}</td>
                <td>{item.applicationStatus}</td>
                <td>
                  {item.resumefile ? (
                    <a
                      href={`http://127.0.0.1:8080/uploads/filecv/${item.resumefile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Resume
                    </a>
                  ) : (
                    <span>No Resume Available</span>
                  )}
                </td>
              
           
                <td>
                  <button className="action-btn edit-btn">
                    <NavLink
                      className="text-decoration-none"
                      to="/admin/editemployee"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </NavLink>
                  </button>
                  <button
                    className="action-btn status-btn"
                    onClick={() => toggleStatus(Applications)}
                  >
                    <FontAwesomeIcon
                      icon={Applications.status === "Active" ? faEye : faEyeSlash}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsList;
