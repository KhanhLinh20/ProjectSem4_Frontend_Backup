import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@mui/material";
import Loading from "../../Loading/Loading";
import axiosclient from "../../../../../api/Axios";
import { Pagination } from "react-bootstrap";

const JobListClose = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation(); // Đổi tên thành `currentLocation`
  // Danh sách công việc
  const [applications, setApplications] = useState([]);
  const [applicationsaccept, setApplicationacept] = useState([]);
  const [listjob, setlistjob] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // State for filters
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");

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

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/list-jobposting?page=${page}&size=10&status=Close`);
      const data = res.data.data.content;
      setlistjob(data);
      console.log(res.data.data.content);
      setTotalPages(res.data?.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = () => {
    let filteredJobClose = listjob;

    // Search Filter
    if (searchTermCategory) {
      filteredJobClose = filteredJobClose.filter((item) =>
        item.jobCategory?.categoryName.toLowerCase().includes(searchTermCategory.toLowerCase())
      );
    }

    if (searchTermJobTitle) {
      filteredJobClose = filteredJobClose.filter((item) =>
        item.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }
    return filteredJobClose;
  };
  const filteredJobClose = handleFilter();

  useEffect(() => {
    fetchdata();
    fetchDataApplication();
  }, [page]);

  if (isLoading) {
    return <Loading />;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <div className="admin-list">
        <h2>List Job Close</h2>
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
            
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Department</th>
              <th>Job Title</th>
              <th>Employer Number</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobClose.length > 0 ? (
              filteredJobClose
                .map((item) => (
                  <tr key={item.jobID}>
                    <td>{item.jobCategory?.categoryName}</td>
                    <td>{item.jobTitle} </td>
                    <td>{item.employers?.employerNumber}</td>
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
                        {item.totalSuccessApplicant}
                      </button>
                    </td>
                    <td>
                      <NavLink
                        className="text-decoration-none"
                        to={`/admin/jobpostingdetail/${item.jobID}`}
                      >
                        <i
                          className="fa fa-file-alt text-primary"
                          style={{ fontSize: "1rem" }}
                        ></i>
                      </NavLink>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Job Close Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
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

export default JobListClose;
