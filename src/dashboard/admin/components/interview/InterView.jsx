import React, { useEffect, useState } from "react";
import "../interview/InterView.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosclient from "../../../../api/Axios";
import Loading from "../Loading/Loading";
import moment from "moment/moment";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

const InterView = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const [interview, setInterView] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // State for filters
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [searchApplicantName, setSearchApplicantName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/list-interview?page=${page}&size=10`);
      setInterView(res.data.data.content);
      console.log(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const updatechangestatus = async (applicationID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this application as Pass?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    });
  
    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const res = await axiosclient.post(
          `/shopee-career/change-status-application-pass/${applicationID}`
        );
        setInterView((prevInterviews) =>
          prevInterviews.map((item) =>
            item.applications?.applicationID === applicationID
              ? { ...item, status: "Completed" }
              : item
          )
        );
        Swal.fire("Success", "The application has been marked as Pass.", "success");
        navigate("/admin/list-application-accept")
      } catch (error) {
        Swal.fire("Error", "Failed to update status.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    // setIsLoading(true);
    // try {
    //   const res = await axiosclient.post(
    //     `/shopee-career/change-status-application-pass/${applicationID}`
    //   );
    //   console.log(res.data.data);
    //   setInterView((prevInterviews) =>
    //     prevInterviews.map((item) =>
    //       item.applications?.applicationID === applicationID
    //         ? { ...item, status: "Complete" } 
    //         : item
    //     )
    //   );
    //   Swal.fire({
    //     title: "Success",
    //     text: "Accept InterVew For Application Success",
    //     icon: "Success",
    //   });
    // } catch (error) {
    //   await Swal.fire({
    //     title: "Error",
    //     text: "Accept Fails",
    //     icon: "warning",
    //   });
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  const updatechangestatusreject = async (applicationID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this application as Fail?",
      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });
  
    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const res = await axiosclient.post(
          `/shopee-career/change-status-application-fail/${applicationID}`
        );
        setInterView((prevInterviews) =>
          prevInterviews.map((item) =>
            item.applications?.applicationID === applicationID
              ? { ...item, status: "Completed" }
              : item
          )
        );
        Swal.fire("Success", "The application has been marked as Fail.", "success");
        navigate("/admin/list-application-reject")
      } catch (error) {
        Swal.fire("Error", "Failed to update status.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    // setIsLoading(true);
    // try {
    //   const res = await axiosclient.post(
    //     `/shopee-career/change-status-application-fail/${applicationID}`
    //   );
    //   setInterView((prevInterviews) =>
    //     prevInterviews.map((item) =>
    //       item.applications?.applicationID === applicationID
    //         ? { ...item, status: "Complete" }
    //         : item
    //     )
    //   );

    //   Swal.fire({
    //     title: "Success",
    //     text: "Fail InterVew For Application",
    //     icon: "Success",
    //   });
    // } catch (error) {
    //   await Swal.fire({
    //     title: "Error",
    //     text: "Fails",
    //     icon: "warning",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  

  const currentLocation = useLocation(); // Đổi tên thành `currentLocation`
  useEffect(() => {
    // Bật trạng thái loading khi đường dẫn thay đổi
    setIsLoading(true);
    fetchdata();


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

  const handleFilter = () => {
    let filteredInterview = interview;

    // Search Filter
    if (searchTermCategory) {
      filteredInterview = filteredInterview.filter((item) =>
        item.applications?.jobPostings?.jobCategory?.categoryName.toLowerCase().includes(searchTermCategory.toLowerCase())
      );
    }

    if (searchTermJobTitle) {
      filteredInterview = filteredInterview.filter((item) =>
        item.applications?.jobPostings?.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    if (searchApplicantName) {
      filteredInterview = filteredInterview.filter((item) =>
        item.applications?.firstName?.toLowerCase().includes(searchApplicantName.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter !== "All") {
      filteredInterview = filteredInterview.filter((item) => item.status === statusFilter);
    }
    return filteredInterview;
  };
  const filteredInterview = handleFilter();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="admin-list">
        <h2>List Interview</h2>
        {/* Filter Section */}
        <div className="filter-container mb-4">
          <div className="row">
            {/* Search Input */}
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search by category name..."
                className="form-control"
                value={searchTermCategory}
                onChange={(e) => setSearchTermCategory(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search by job title..."
                className="form-control"
                value={searchTermJobTitle}
                onChange={(e) => setSearchTermJobTitle(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search by applicant name..."
                className="form-control"
                value={searchApplicantName}
                onChange={(e) => setSearchApplicantName(e.target.value)}
              />
            </div>
            {/* Status Filter */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th>Interview Number</th> */}
              <th>Department</th>
              <th>Job Title</th>
              <th>Start Date</th>
              {/* <th>Time</th> */}
              {/* <th>Location</th> */}
              {/* <th>Application Number</th> */}
              <th>Application Name</th>
              <th>Employer Number</th>
              <th>Status</th>
              <th>Action</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterview && filteredInterview.length > 0 ? (
              filteredInterview.map((item) => (
                <tr key={item.interviewID}>
                  {/* <td>{item.interviewNumber}</td> */}
                  <td>{item.applications.jobPostings.jobCategory.categoryName}</td>
                  <td>{item.applications.jobPostings.jobTitle}</td>
                  <td>{moment(item.startDate).format("DD/MM/YYYY")}</td>
                  {/* <td>{item.time}</td>
                  <td>{item.location}</td> */}
                  {/* <td>{item.applications?.applicationNumber}</td> */}
                  <td>{item.applications?.firstName}</td>
                  <td>{item.employers?.employerNumber}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status !== "Completed" && (
                      <button className="action-btn edit-btn">
                        <NavLink
                          className="text-decoration-none"
                          to={`/admin/edit-interview/${item.interviewID}`}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </NavLink>
                      </button>
                    )}
                    <button className="action-btn status-btn">
                      <NavLink
                        className=""
                        to={`/admin/detail-interview/${item.interviewID}`}
                      >
                        <i className="fa fa-file-alt" style={{ fontSize: "1.1rem" }}></i>
                      </NavLink>
                    </button>
                  </td>
                  <td>
                    {item.applications?.applicationStatus === "Pass" || item.applications?.applicationStatus === "Fail" ? (
                      <span>
                        {item.applications?.applicationStatus === "Pass" ? (
                          <>
                            <i className="fa-solid fa-check" style={{ color: "green" }}></i> {/* Biểu tượng Pass */}
                            <span>Pass</span>
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-xmark" style={{ color: "red" }}></i> {/* Biểu tượng Fail */}
                            <span>Fail</span>
                          </>
                        )}
                      </span>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-pass"
                          style={{ width: "80px", margin: "1px" }}
                          onClick={() => updatechangestatus(item.applications?.applicationID)}
                        >
                          Pass
                        </button>
                        <button
                          className="btn btn-danger btn-fail"
                          style={{ width: "80px", margin: "1px" }}
                          onClick={() => updatechangestatusreject(item.applications?.applicationID)}
                        >
                          Fail
                        </button>
                      </>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Interview Found
                </td>
              </tr>
            )}
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

export default InterView;
