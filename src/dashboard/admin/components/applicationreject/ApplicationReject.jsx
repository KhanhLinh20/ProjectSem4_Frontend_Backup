import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import axiosclient from "../../../../api/Axios";
import moment from "moment/moment";
import { Pagination } from "react-bootstrap";

const ApplicationReject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [interview,setInterview]=useState([]);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0);

  // State for filters
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [searchApplicantName, setSearchApplicantName] = useState("");

  const currentLocation = useLocation(); // Đổi tên thành `currentLocation`
  const fetchdata=async()=>{
    try {
        const res=await axiosclient.get(`/shopee-career/list-application-fail`);
        console.log(res.data.data.content);
        setInterview(res.data.data.content)
        setTotalPages(res.data.data.totalPages);
    } catch (error) {
        console.error(error);
        
        
    }
   
  }


  useEffect(() => {
    setIsLoading(true);
    fetchdata();
  

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

  if (isLoading) {
    return <Loading />;
  }

  // Hàm thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage); // Cập nhật page và trigger useEffect để lấy lại dữ liệu
    }
  };

  const handleFilter = () => {
    let filteredApplication = interview;

    // Search Filter
    if (searchTermCategory) {
      filteredApplication = filteredApplication.filter((item) =>
        item.jobPostings?.jobCategory?.categoryName.toLowerCase().includes(searchTermCategory.toLowerCase())
      );
    }

    if (searchTermJobTitle) {
      filteredApplication = filteredApplication.filter((item) =>
        item.jobPostings?.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    if (searchApplicantName) {
      filteredApplication = filteredApplication.filter((item) =>
        item.firstName?.toLowerCase().includes(searchApplicantName.toLowerCase())
      );
    }

    // Status Filter
    // if (statusFilter !== "All") {
    //   filteredInterview = filteredInterview.filter((item) => item.status === statusFilter);
    // }
    return filteredApplication;
  };
  const filteredApplication = handleFilter();
  return (
    <div>
   <div className="admin-list">
          <h2 className="my-5">List Application Fail</h2>
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
          </div>
        </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Application Name</th>
                <th>Job Title</th>
                <th>Empployee Number</th>
                <th>Application Status</th>
                {/* <th>Aplication updateAt</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplication.length > 0 ? (
                filteredApplication.map((item) => (
                  <tr key={item.applicationID}>
                    <td>{item.firstName}</td>
                    <td>{item.jobPostings?.jobCategory?.categoryName}</td>
                    <td>{item.jobPostings.jobTitle}</td>
                    <td>{item.jobPostings.employers?.employerNumber}</td>
                    <td>{item.applicationStatus}</td>
                    {/* <td>{moment(item.updatedAt).format("DD/MM/YYYY")}</td> */}
                    <td>
                      <button className="action-btn status-btn">
                        <NavLink className="" to={`/admin/detail-application-reject/${item.applicationID}`}>
                          <i className="fa fa-file-alt" style={{ fontSize: "1.1rem" }}></i>
                        </NavLink>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No List Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
          {/* Pagination controls */}
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

export default ApplicationReject;
