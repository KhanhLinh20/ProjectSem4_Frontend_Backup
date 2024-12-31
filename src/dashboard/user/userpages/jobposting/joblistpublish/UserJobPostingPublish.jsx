import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import axiosclient from "../../../../../api/Axios";
import Loading from "../../../../admin/components/Loading/Loading";
import { jwtDecode } from "jwt-decode";

const UserJobPostingPublish = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const [selectjob, setselectjob] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [originalJobs, setOriginalJobs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const currentLocation = useLocation();
  const token = localStorage.getItem("token");
  const jwt = jwtDecode(token);
  console.log(jwt);

  const [applications, setApplications] = useState([]); // Danh sách ứng viên
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
    try {
      for (const jobID of selectjob) {
        await axiosclient.post(
          `/shopee-career/job/change-jobposting-close/${jobID}`
        );
        setjoblist((prev) =>
          prev.filter((job) => !selectjob.includes(job.jobID))
        );
        Swal.fire({
          title: "Success",
          text: "Selected jobs have been Close successfully",
          icon: "success",
        });
        setselectjob([]);
        fetchdata();
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.response.data?.message,
        icon: "warning",
      });
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
      const res = await axiosclient.get(
        `/shopee-career/job/list-job-by-employee-publish/${jwt.id}?page=${page}&size=5`
      );
      setjoblist(res.data?.data.content);
      setTotalPages(res.data?.data.totalPages);
      setOriginalJobs(res.data.data.content);
      console.log(res.data?.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
    fetchDataApplication();
  }, [page]);
  useEffect(() => {
    handleFilter();
  }, [searchTermJobTitle,selectedDepartment]);

  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];

    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }
    if (selectedDepartment) {
      filteredJobPublish = filteredJobPublish.filter(
        (item) =>
          item.jobCategory?.categoryName &&
          item.jobCategory.categoryName === selectedDepartment
      );
    }

    setjoblist(filteredJobPublish);
  };

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
        <h2 className="my-5">List Job PubLish</h2>
        <div className="d-flex justify-content-lg-start">
          <div className="col-md-4 my-5">
            <input
              type="text"
              placeholder="Search by job title..."
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
              <option value="" className="text-muted">All Departments</option>
              {[
                ...new Set(
                  originalJobs.map((job) => job.jobCategory?.categoryName)
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
              <th>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectjob.length === jobListdata.length}
                  onChange={handleCheckAll}
                />
                Check
              </th>
              <th>Job Number</th>
              <th>Department</th>

              <th>Job Title</th>
              <th>Number of Applicants</th>
              <th>Status</th>
              {/* <th>Employer Number</th> */}
              <th>UpdateAt</th>
              {/* <th>Result</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobListdata.map((jobList) => (
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
                <td>{jobList.jobNumber}</td>
                <td>{jobList.jobCategory?.categoryName}</td>

                <td>{jobList.jobTitle} </td>
                <td>
                  <button className="btn btn-primary" style={{ width: "50px" }}>
                    <NavLink to="" className="text-white text-decoration-none">
                      {
                        applications.filter(
                          (app) => app.jobPostings?.jobID === jobList.jobID
                        ).length
                      }
                    </NavLink>
                  </button>
                </td>

                <td>{jobList.status}</td>

                {/* <td>{jobList.employers?.employerNumber}</td> */}
                <td>{moment(jobList.updatedAt).format("DD/MM/YYYY")}</td>
                {/* <td>
                  <button className="btn btn-primary" style={{ width: "50px" }}>
                    {jobList.totalPassApplication}
                  </button>
                </td> */}
                <td>
                  <NavLink
                    className="text-decoration-none"
                    to={`/user/user-detail-jobposting-publish/${jobList.jobID}`}
                  >
                    <i className="fa-solid fa-pencil text-primary"></i>
                  </NavLink>
                </td>
              </tr>
            ))}
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

export default UserJobPostingPublish;
