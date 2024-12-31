import React, { useEffect, useState } from "react";
import "../joblistdraft/JobListDraft.css";
import Loading from "../../Loading/Loading";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";
import moment from "moment";

const JobListDraft = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation();
  const [selectjob, setselectjob] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  // Danh sách công việc
  const [applications, setApplications] = useState([]); // Danh sách ứng viên
  // State for filters
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");

  const navigate = useNavigate();


  const fetchDataApplication = async () => {
    try {
      const res = await axiosclient.get(`Applications/getlistapplications`);
      setApplications(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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

  // const countApplications = (jobID) => {
  //   return jobList.filter((app) => app.jobID === jobID).length;
  // };

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/list-jobposting?page=${page}&size=10&status=Draft`);
      console.log(res.data.data.content.filter((jobList) => jobList.status === "Draft"));
      setjoblist(res.data.data.content.filter((jobList) => jobList.status === "Draft"));
      setTotalPages(res.data?.data.totalPages);
    } catch (error) {
      console.log(error);
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
      text: "Do you really want to publish the selected jobs?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish it!",
      cancelButtonText: "Cancel",
    });
    if(result.isConfirmed) {
      try {
        for (const jobID of selectjob) {
          await axiosclient.post(`shopee-career/job/change-status/${jobID}`);
  
          Swal.fire({
            title: "Success",
            text: "Selected jobs have been published successfully!",
            icon: "success",
          });
          setselectjob([]);
          fetchdata();
          navigate('/admin/joblistpublish')
        }
      } catch (error) {
        await Swal.fire({
          title: "Error",
          text: error.response.data?.message,
          icon: "warning",
        });
      }
    }
  };

  const handleFilter = () => {
        let filteredJobDraft = jobListdata;
    
        // Search Filter
        if (searchTermCategory) {
          filteredJobDraft = filteredJobDraft.filter((item) =>
            item.jobCategory?.categoryName.toLowerCase().includes(searchTermCategory.toLowerCase())
          );
        }

        if (searchTermJobTitle) {
          filteredJobDraft = filteredJobDraft.filter((item) =>
            item.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
          );
        }
        return filteredJobDraft;
      };
  const filteredJobDraft = handleFilter();

  if (isLoading) {
    return <Loading />;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleCheckAll = () => {
    setIsAllChecked(!isAllChecked);
  
    if (!isAllChecked) {
      // Chọn tất cả jobID hiện có trong danh sách
      const allJobIDs = jobListdata.map((job) => job.jobID);
      setselectjob(allJobIDs);
    } else {
      // Bỏ chọn tất cả
      setselectjob([]);
    }
  };

  const toggleStatus = (jobID) => {
    console.log(`Toggling status for ${jobID}`);
    // Cập nhật trạng thái của nhân viên dựa trên employeeID nếu cần
  };
  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5">List Job Draft</h2>
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
                  onChange={handleCheckAll}
                  checked={isAllChecked}
                /> Check
              </th>
              <th>Department</th>
              {/* <th>Job Number</th> */}
              <th>Job Title</th>
              {/* <th>Quantity</th> */}
              <th>Status</th>
              <th>Employer Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobDraft.length > 0 ? (
              filteredJobDraft.map((jobList) => (
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
                  <td>{jobList.jobTitle}</td>
                  <td>{jobList.status}</td>
                  <td>{jobList.employers?.employerNumber}</td>
                  <td>
                    <NavLink
                      className="action-btn edit-btn text-decoration-none"
                      to={`/admin/edit-jobposting-draft/${jobList.jobID}`}
                    >
                      <FontAwesomeIcon icon={faEdit} style={{ fontSize: "1rem" }} />
                    </NavLink>
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
                <td colSpan="6" className="text-center">
                  No Job Draft Found
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
          <button className="btn btn-primary" onClick={handlechange}  disabled={selectjob.length === 0}>
            Pushlish
          </button>
        </div>
    </div>
  );
};

export default JobListDraft;
