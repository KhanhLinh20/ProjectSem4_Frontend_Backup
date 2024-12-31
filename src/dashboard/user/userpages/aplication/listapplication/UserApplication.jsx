import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import Loading from "../../../../admin/components/Loading/Loading";
import moment from "moment/moment";
import { Pagination } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";


const UserApplication = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [originalJobs, setOriginalJobs] = useState([]);
  const token = localStorage.getItem("token");
  const jwt = token ? jwtDecode(token) : null;
  if (!jwt) {
    console.error("Invalid or missing token");
  }

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

  const [Applications, setIsApplicantions] = useState([]);
  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(
        `/shopee-career/list-application-by-employer/${jwt.id}?page=${page}&size=3`
      );
      setIsApplicantions(res.data?.data.content);
      setTotalPages(res.data?.data.totalPages);
      setOriginalJobs(res.data.data.content);
      console.log(res.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];


    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.email?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    setIsApplicantions(filteredJobPublish);
  };
  useEffect(() => {
    fetchdata();
  }, [page]);
   useEffect(() => {
      handleFilter();
    }, [searchTermJobTitle]);
  

  if (isLoading) {
    return <Loading />;
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // Hàm xử lý trạng thái kích hoạt/tạm dừng
  const toggleStatus = (Applications) => {
    console.log(`Toggling status for ${Applications}`);
    // Cập nhật trạng thái của nhân viên dựa trên employeeID nếu cần
  };
  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5">Applications List</h2>

        <div className="col-md-4 my-5">
          <input
            type="text"
            placeholder="Search by email..."
            className="form-control"
            value={searchTermJobTitle}
            onChange={(e) => setSearchTermJobTitle(e.target.value)}
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>application Number</th>
              <th>last Name</th>
              <th>Email</th>
              <th>date Of Birth</th>
              <th>phone Number</th>

              <th>Status</th>
              <th>resumefile</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {Applications.map((item) => (
              <tr key={item.applicationID}>
                <td>{item.applicationNumber}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{moment(item.dateOfBirth).format("DD/MM/YYYY")}</td>
                <td>{item.phoneNumber}</td>

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

                {/* <td>
                  <button className="action-btn edit-btn">
                    <NavLink
                      className="text-decoration-none"
                      to="/user/"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </NavLink>
                  </button>
                  <button
                    className="action-btn status-btn"
                    onClick={() => toggleStatus(Applications)}
                  >
                    <FontAwesomeIcon
                      icon={
                        Applications.status === "Active" ? faEye : faEyeSlash
                      }
                    />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination justify-content-end mt-5">
          <Pagination>
            {/* Previous Button */}
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            />

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index === page}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            {/* Next Button */}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default UserApplication;
