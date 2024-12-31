import React, { useEffect, useState } from "react";
import "../joblishpublish/JobListPubLish";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";


import { useLocation } from "react-router-dom";

import Loading from "../../Loading/Loading";
import moment from "moment/moment";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import axiosclient from "../../../../../api/Axios";

const JobListPubLish = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const [selectjob, setselectjob] = useState("")
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const currentLocation = useLocation(); // Đổi tên thành `currentLocation`
  const navigate = useNavigate()
  // Danh sách công việc
  const [applications, setApplications] = useState([]); // Danh sách ứng viên
  // State for filters
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const fetchDataApplication = async () => {
    try {
      const res = await axiosclient.get(`shopee-career/list-application`);
      setApplications(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange = async () => {
    if (selectjob.length === 0) {
      Swal.fire({
        title: "Warning",
        text: "Please select at least one job to publish.",
        icon: "warning",
      });
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to close the selected jobs?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, close it!",
    });
  
    if (result.isConfirmed) {
      try {
        for (const jobID of selectjob) {
          await axiosclient.post(
            `/shopee-career/job/change-jobposting-close/${jobID}`
          );
          setjoblist((prev) =>
            prev.filter((job) => !selectjob.includes(job.jobID))
          );
        }
        Swal.fire({
          title: "Success",
          text: "Selected jobs have been closed successfully.",
          icon: "success",
        });
        setselectjob([]);
        fetchdata();
        navigate('/admin/job-list-close')
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data?.message || "Something went wrong.",
          icon: "warning",
        });
      }
    }
  };
  const handlecheckbox = (jobID) => {
    setselectjob((pre) => {
      if (pre.includes(jobID)) {
        return pre.filter((id) => id !== jobID);
      } else {
        return [...pre, jobID];
      }
    });
  };
  const handleCheckAll = () => {
    if (selectjob.length === jobListdata.length) {
      // If all are checked, uncheck all
      setselectjob([]);
    } else {
      // If not all are checked, select all
      setselectjob(jobListdata.map((job) => job.jobID));
    }
  };
  useEffect(() => {
    fetchdata();
    fetchDataApplication();
  }, [page]);

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

  const [jobListdata, setjoblist] = useState([]);


  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/list-jobposting?page=${page}&size=10&status=Publish`);
      console.log(res.data.data.content);
      setjoblist(res.data.data.content.filter((jobList) => jobList.status === "Publish"));
      setTotalPages(res.data?.data.totalPages);
      
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleFilter = () => {
    let filteredJobPublish = jobListdata;

    // Search Filter
    if (searchTermCategory) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.jobCategory?.categoryName.toLowerCase().includes(searchTermCategory.toLowerCase())
      );
    }

    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }
    return filteredJobPublish;
  };
  const filteredJobPublish = handleFilter();

  if (isLoading) {
    return <Loading />;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // Mẫu dữ liệu danh sách nhân viên

  // Hàm xử lý trạng thái kích hoạt/tạm dừng
  const toggleStatus = (jobID) => {
    console.log(`Toggling status for ${jobID}`);
    // Cập nhật trạng thái của nhân viên dựa trên employeeID nếu cần
  };

  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5">List Job Publish</h2>
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
              <th>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectjob.length === jobListdata.length}
                  onChange={handleCheckAll}
                /> Check
              </th>
              <th>Department</th>
              {/* <th>Job Number</th> */}
              <th>Job Title</th>
              <th>Applicant Quantity</th>
              <th>Status</th>
              <th>Employer Number</th>
              {/* <th>UpdateAt</th> */}
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobPublish.length > 0 ? (
              filteredJobPublish.map((jobList) => (
                <tr key={jobList.jobID}>
                  <td>
                    <input
                      type="checkbox"
                      value=""
                      name="checkbox"
                      className="form-check-input"
                      onChange={() => handlecheckbox(jobList.jobID)}
                      checked={selectjob.includes(jobList.jobID)}
                    />
                  </td>
                  <td>{jobList.jobCategory?.categoryName}</td>
                  {/* <td>{jobList.jobNumber}</td> */}
                  <td>{jobList.jobTitle} </td>
                  <td>
                    <NavLink to="">
                      {
                        applications.filter(
                          (app) => app.jobPostings?.jobID === jobList.jobID
                        ).length
                      }
                    </NavLink>
                  </td>

                  <td>{jobList.status}</td>

                  <td>{jobList.employers?.employerNumber}</td>
                  {/* <td>{moment(jobList.updatedAt).format("DD/MM/YYYY")}</td> */}
                  <td>
                    <NavLink
                      className="btn btn-primary"
                      style={{ width: "50px" }}
                      to={`/admin/${jobList.jobID}/success-applicants`}
                    >
                      {jobList.totalSuccessApplicant}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      className="text-decoration-none"
                      to={`/admin/jobpostingdetail/${jobList.jobID}`}
                    >
                      <i className="fa fa-file-alt text-primary" style={{ fontSize: "1rem" }}></i>
                    </NavLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Job Publish Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
        <button
          className="btn btn-primary"
          onClick={handlechange}
          disabled={selectjob.length === 0}
        >
          Close Job
        </button>
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

export default JobListPubLish;
