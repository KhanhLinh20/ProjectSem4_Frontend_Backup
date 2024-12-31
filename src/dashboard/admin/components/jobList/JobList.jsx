import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import axiosclient from "../../../../api/Axios";
import { Pagination } from "react-bootstrap";
import "../jobList/JobList.css";
import moment from "moment";

const JobList = () => {
  const { id } = useParams();
  const location = useLocation();
  const { categoryName } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]); // Danh sách ứng viên
  const [page, setPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [jobListdata, setjoblist] = useState([]); // Danh sách công việc

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const fetchDataApplication = async () => {
    try {
      const res = await axiosclient.get(`shopee-career/list-application`);
      setApplications(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdata = async (id) => {
    try {
      const res = await axiosclient.get(
        `shopee-career/job/list-job-by-category/${id}?page=${page}&size=10`
      );
      if (res.data.data.length === 0) {
        setjoblist([]); // Nếu không có công việc nào
      } else {
        setjoblist(res.data.data.content);
        console.log(res.data.data.content);
        // console.log(jobListdata[0].jobCategory.categoryName);
        
        
        // console.log(res.data.data.content) // Lấy danh sách công việc
        setTotalPages(res.data.data.totalPages); // Lấy tổng số trang
      }
    } catch (error) {
      console.log(error.response?.data?.message || error);
      setjoblist([]); // Xử lý lỗi
    }
  };

  useEffect(() => {
    fetchdata(id);
    fetchDataApplication();
  }, [id, page]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage); // Cập nhật trang và trigger lại fetching
    }
  };

  const handleFilter = () => {
        let filteredJob = jobListdata;
    
        // Search Filter
        if (searchTerm) {
          filteredJob = filteredJob.filter((item) =>
            item.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        // Status Filter
        if (statusFilter !== "All") {
          filteredJob = filteredJob.filter((item) => item.status === statusFilter);
        }
    
        // Date Filter
        if (dateFilter) {
          filteredJob = filteredJob.filter(
            (item) =>
              moment(item.createdAt).format("YYYY-MM-DD") === moment(dateFilter).format("YYYY-MM-DD")
          );
        }
    
        return filteredJob;
      };
      const filteredJob = handleFilter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="admin-list">
        <h2>List Job {jobListdata[0]?.jobCategory?.categoryName}</h2>
        <button className="add-employee-button">
          <NavLink className=" text-decoration-none text-white" to={`/admin/addjobposting/${id}`}>
            <i className="fas fa-plus"></i>{" "}
            Add New Job
          </NavLink>
        </button>
        <div className="filter-container mb-4">
        <div className="row">
          {/* Search Input */}
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search by job title..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <option value="Publish">Publish</option>
              <option value="Draft">Draft</option>
              <option value="Close">Close</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Job Title</th>
              <th>Application Quantity</th>
              <th>Status</th>
              <th>Employer Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJob.length > 0 ? (
              filteredJob.map((jobList) => (
                <tr key={jobList.jobID}>
                  <td>{jobList.jobNumber}</td>
                  <td>{jobList.jobTitle}</td>
                  <td>
                    <NavLink to="">
                      {
                        applications.filter(
                          (app) => app.jobPostings.jobID === jobList.jobID
                        ).length
                      }
                    </NavLink>
                  </td>
                  <td>{jobList.status}</td>
                  <td>{jobList.employers?.employerNumber}</td>
                  <td>
                    {jobList.status !== "Close" && (
                      <button className="action-btn edit-btn">
                        <NavLink
                          className="text-decoration-none"
                          to={`/admin/update-job-posting/${jobList.jobID}`}
                          state={{ categoryID: id }} // Truyền categoryID khi điều hướng
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </NavLink>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No job posting found for category name:{" "}
                  <strong>{categoryName || "this category"}</strong>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination justify-content-end">
          <Pagination className="justify-content-end">
            {/* Previous Button */}
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0} // Vô hiệu hóa nếu ở trang đầu tiên
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
              disabled={page === totalPages - 1} // Vô hiệu hóa nếu ở trang cuối cùng
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default JobList;
