import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@mui/material";
import axiosclient from "../../../../../api/Axios";
import Loading from "../../../../admin/components/Loading/Loading";
import { jwtDecode } from "jwt-decode";
import { Pagination } from "react-bootstrap";

const UserJobListClose = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation(); // Đổi tên thành `currentLocation`
  // Danh sách công việc
  const [applications, setApplications] = useState([]);
  const [applicationsaccept, setApplicationacept] = useState([]);
  const [listjob, setlistjob] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
   const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
    const [originalJobs, setOriginalJobs] = useState([]);
  const token = localStorage.getItem("token");
  const jwt = jwtDecode(token);
  console.log(jwt);

  const fetchapplicationaceept = async () => {
    const res = await axiosclient.get(`/shopee-career/list-interview-accept`);
    setApplicationacept(res.data);
    console.log(res.data);
  };

  // Danh sách ứng viên
  const fetchDataApplication = async () => {
    try {
      const res = await axiosclient.get(`shopee-career/list-application`);
      setApplications(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  // const countApplications = (jobID) => {
  //   return jobList.filter((app) => app.jobID === jobID).length;
  // };

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(
        `/shopee-career/job/list-job-by-employee-close/${jwt.id}?page=${page}&size=3`
      );
     
      setlistjob(res.data?.data.content);
      setTotalPages(res.data?.data.totalPages);
      console.log(res.data.data.content);
      setOriginalJobs(res.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];


    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    setlistjob(filteredJobPublish);
  };

  useEffect(() => {
    fetchdata();
    fetchDataApplication();
    // fetchapplicationaceept();
  }, [page]);
    useEffect(() => {
      handleFilter();
    }, [searchTermJobTitle]);

  if (isLoading) {
    return <Loading />;
  }

  // Mẫu dữ liệu danh sách nhân viên

  // Hàm xử lý trạng thái kích hoạt/tạm dừng
  const toggleStatus = (jobID) => {
    console.log(`Toggling status for ${jobID}`);
    // Cập nhật trạng thái của nhân viên dựa trên employeeID nếu cần
  };

  return (
    <div>
      <div className="admin-list">
        <h2>Job List Close</h2>
        <div className="col-md-4 my-5">
              <input
                type="text"
                placeholder="Search by job title..."
                className="form-control"
                value={searchTermJobTitle}
                onChange={(e) => setSearchTermJobTitle(e.target.value)}
              />
            </div>
        <table className="table">
          <thead>
            <tr>
              <th>Job Number</th>
              <th>Employer Number</th>
              <th>Job Title</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listjob?.map((item) => (
              <tr key={item.jobID}>
                <td>{item.jobNumber}</td>
                <td>{item.employers?.employerNumber}</td>
                <td>{item.jobTitle} </td>
                <td>
                  <NavLink to="">
                    {
                      applications.filter(
                        (app) => app.jobPostings.jobID === item.jobID
                      ).length
                    }
                  </NavLink>
                </td>

                <td>{item.status}</td>
                <td>
                  <button className="btn btn-primary" style={{ width: "50px" }}>
                    {item.totalPassApplication}
                  </button>
                </td>

                <td>
                  {/* <button className="action-btn edit-btn">
                      <NavLink
                        className="text-decoration-none"
                        to={`/admin/edit-jobposting/${item.jobID}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </NavLink>
                    </button> */}
                  {/* <button
                    className="action-btn status-btn"
                    onClick={() => toggleStatus(jobList.jobID)}
                  >
                    <FontAwesomeIcon
                      icon={jobList.status === "open" ? faEye : faEyeSlash}
                    />
                  </button> */}
                  <NavLink
                    className="text-decoration-none"
                    to={`/user/user-detail-jobposting-close/${item.jobID}`}
                  >
                    <i className="fa-solid fa-pencil text-primary"></i>
                  </NavLink>
                </td>
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

export default UserJobListClose;
