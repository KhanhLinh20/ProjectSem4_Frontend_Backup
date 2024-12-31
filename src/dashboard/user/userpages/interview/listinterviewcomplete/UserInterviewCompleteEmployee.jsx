import React, { useEffect, useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import moment from "moment/moment";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

import Loading from "../../../../admin/components/Loading/Loading";
import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../../api/Axios";

const UserInterviewCompleteEmployee = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const [interview, setInterView] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
    const [originalJobs, setOriginalJobs] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
  const token=localStorage.getItem("token");
  const jwt=jwtDecode(token);

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/user-get-interview-complete/${jwt.id}?page=${page}&size=5`);
      setInterView(res.data?.data.content);
      console.log(res.data?.data.content);
      setTotalPages(res.data.data.totalPages);
      setOriginalJobs(res.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];

    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.applications?.firstName
          .toLowerCase()
          .includes(searchTermJobTitle.toLowerCase())
      );
    }
    if (selectedDepartment) {
      filteredJobPublish = filteredJobPublish.filter(
        (item) =>
          item.applications?.jobPostings.jobCategory.categoryName &&
          item.applications?.jobPostings.jobCategory.categoryName ===
            selectedDepartment
      );
    }

    setInterView(filteredJobPublish);
  };

  const updatechangestatus = async (applicationID) => {
    setIsLoading(true);
    try {
      const res = await axiosclient.post(
        `/shopee-career/change-status-application-pass/${applicationID}`
      );
      console.log(res.data.data);
      setInterView((prevInterviews) =>
        prevInterviews.map((item) =>
          item.applications?.applicationID === applicationID
            ? { ...item, status: "Complete" } 
            : item
        )
      );
      Swal.fire({
        title: "Success",
        text: "Accept InterVew For Application Success",
        icon: "Success",
      });
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Accept Fails",
        icon: "warning",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const updatechangestatusreject = async (applicationID) => {
    setIsLoading(true);
    try {
      const res = await axiosclient.post(
        `/shopee-career/change-status-application-fail/${applicationID}`
      );
      setInterView((prevInterviews) =>
        prevInterviews.map((item) =>
          item.applications?.applicationID === applicationID
            ? { ...item, status: "Complete" }
            : item
        )
      );

      Swal.fire({
        title: "Success",
        text: "Fail InterVew For Application",
        icon: "Success",
      });
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Fails",
        icon: "warning",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchdata();
  },[page])
    useEffect(() => {
      handleFilter();
    }, [searchTermJobTitle, selectedDepartment]);

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
  }, [currentLocation.pathname, page]);
  // Khi đang loading, chỉ hiển thị Loading component, không render nội dung trang
  const toggleStatus = (InterviewID) => {
    console.log(`Toggling status for ${InterviewID}`);
    // Cập nhật trạng thái của nhân viên dựa trên employeeID nếu cần
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="admin-list">
        <h2>List Interview</h2>
        <div className="d-flex justify-content-lg-start">
          <div className="col-md-4 my-5">
            <input
              type="text"
              placeholder="Search by Application Name..."
              className="form-control"
              value={searchTermJobTitle}
              onChange={(e) => setSearchTermJobTitle(e.target.value)}
            />
          </div>
          <div className="col-md-4 my-5 ms-3">
            <select
              className="form-control"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="" className="text-muted">
                All Departments
              </option>
              {[
                ...new Set(
                  originalJobs.map(
                    (item) =>
                      item.applications.jobPostings.jobCategory.categoryName
                  )
                ),
              ].map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
      
        <table className="table">
          <thead>
            <tr>
              <th>Interview Number</th>
              <th>Department</th>
              <th>Job Title</th>
              <th>Start Date</th>
              <th>Application Name</th>
              <th>Employer Name</th>
              <th>Status</th>
              {/* <th>Action</th>
              <th>Result</th> */}
            </tr>
          </thead>
          <tbody>
            {interview?.map((item) => (
              <tr key={item.interviewID}>
                <td>{item.interviewNumber}</td>
                <td>{item.applications.jobPostings.jobCategory.categoryName}</td>
                <td>{item.applications.jobPostings.jobTitle}</td>
                <td>{moment(item.startDate).format("DD/MM/YYYY")}</td>
                <td>{item.applications?.firstName}</td>
                <td>{item.employers?.employerNumber}</td>
                <td>
                  <button className="btn btn-primary">
                  {item.status}
                  </button>
                 
                  </td>
                {/* <td>
                  <button className="action-btn edit-btn">
                    <NavLink
                      className="text-decoration-none"
                      to={`/user/user-edit-interview-employee/${item.interviewID}`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </NavLink>
                  </button>
                  <button
                    className="action-btn status-btn"
                  >
                    <NavLink className="" to={`/user/user-detail-interview-employee/${item.interviewID}`}>
                      <i class="fa fa-file-alt" style={{ fontSize: "1.1rem" }}></i>
                    </NavLink>
                  </button>
                 
                </td> */}
                {/* <td>
                  <button
                    className="btn btn-primary"
                    style={{ width: "80px", margin: "1px" }}
                    onClick={() =>
                      updatechangestatus(item.applications.applicationID)
                    }
                  >
                    Pass
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ width: "80px", margin: "1px" }}
                    onClick={() =>
                      updatechangestatusreject(item.applications.applicationID)
                    }
                  >
                    Fail
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination justify-content-end">
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

export default UserInterviewCompleteEmployee;
