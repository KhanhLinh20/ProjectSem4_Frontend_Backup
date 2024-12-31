import React, { useEffect, useState } from "react";
import "../listapplication/ApplicationWithowInterview.css";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import axiosclient from "../../../../../api/Axios";
import Loading from "../../Loading/Loading";
import { Pagination } from "react-bootstrap";

const ApplicationWithowInterview = () => {
  const [isLoading, setIsloading] = useState(false);
  const [appli, setAppli] = useState([]);
  const currentLocation = useLocation();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // State for filters
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [searchApplicantName, setSearchApplicantName] = useState("");
  const dataapplication = async () => {
    try {
      // console.log('Fetching data for page:', page);
      const res = await axiosclient.get(
        `/shopee-career/get-listapplication-without-interview?page=${page}&size=10`
      );
      console.log(res.data.data.content);
      setAppli(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      console.log("total page " + res.data.data.totalPages);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Bật trạng thái loading khi đường dẫn thay đổi
    setIsloading(true);
    dataapplication();
    

    // Tắt loading sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      setIsloading(false);
    }, 500); // Thời gian chờ cho loading, có thể điều chỉnh

    // Clear timeout nếu người dùng điều hướng nhanh chóng
    return () => clearTimeout(timer);
  }, [currentLocation.pathname, page]);

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
    let filteredApplicantWaitingInterview = appli;

    // Search Filter
    if (searchTermCategory) {
      filteredApplicantWaitingInterview = filteredApplicantWaitingInterview.filter((item) =>
        item.jobPostings?.jobCategory?.categoryName.toLowerCase().includes(searchTermCategory.toLowerCase())
      );
    }

    if (searchTermJobTitle) {
      filteredApplicantWaitingInterview = filteredApplicantWaitingInterview.filter((item) =>
        item.jobPostings?.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    if (searchApplicantName) {
      filteredApplicantWaitingInterview = filteredApplicantWaitingInterview.filter((item) =>
        item.firstName?.toLowerCase().includes(searchApplicantName.toLowerCase())
      );
    }
    return filteredApplicantWaitingInterview;
  };
  const filteredApplicantWaitingInterview = handleFilter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5">Application Waiting Interview List</h2>
        {/* Filter Section */}
        <div className="filter-container mb-4">
          <div className="row">
            {/* Search Input */}
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search by category name..."
                className="form-control"
                value={searchTermCategory}
                onChange={(e) => setSearchTermCategory(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search by job title..."
                className="form-control"
                value={searchTermJobTitle}
                onChange={(e) => setSearchTermJobTitle(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search by applicant name..."
                className="form-control"
                value={searchApplicantName}
                onChange={(e) => setSearchApplicantName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Department</th>
              <th>Job Title</th>
              <th>Application Number</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicantWaitingInterview && filteredApplicantWaitingInterview.length > 0 ? (
              filteredApplicantWaitingInterview.filter(item => item.applicationStatus === "Pending").map((item) => (
                <tr key={item.applicationID}>
                  <td>{item.jobPostings?.jobCategory?.categoryName}</td>
                  <td>{item.jobPostings?.jobTitle}</td>
                  <td>{item.applicationNumber}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  {/* <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td> */}
                  <td>{item.applicationStatus}</td>
                  <td>
                    <button className="action-btn status-btn">
                      <NavLink
                        className=""
                        to={`/admin/detail-applications/${item.applicationID}`}
                      >
                        <i className="fa fa-file-alt" style={{ fontSize: "1.2rem" }}></i>
                      </NavLink>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No List Found
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

export default ApplicationWithowInterview;
