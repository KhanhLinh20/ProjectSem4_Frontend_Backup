import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../../api/Axios";
import Loading from "../../../../admin/components/Loading/Loading";

const ListApplicationWithowInterviewByEmployee = () => {
  const [isLoading, setIsloading] = useState(false);
  const [appli, setAppli] = useState([]);
  const currentLocation = useLocation();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [originalJobs, setOriginalJobs] = useState([]);
  const token = localStorage.getItem("token");
  const jwt = jwtDecode(token);

  const dataapplication = async () => {
    try {
      // console.log('Fetching data for page:', page);
      const res = await axiosclient.get(
        `/shopee-career/list-application-by-employer-withow-interview/${jwt.id}?page=${page}&size=5`
      );
      console.log(res.data?.data.content);
      setAppli(res.data?.data.content);
      setTotalPages(res.data.data.totalPages);
      setOriginalJobs(res.data.data.content);
      console.log("total page " + res.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];

    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.jobPostings.jobTitle
          ?.toLowerCase()
          .includes(searchTermJobTitle.toLowerCase())
      );
    }

    setAppli(filteredJobPublish);
  };
  useEffect(() => {
    dataapplication();
  }, [page]);
  useEffect(() => {
    handleFilter();
  }, [searchTermJobTitle]);

  useEffect(() => {
    // Bật trạng thái loading khi đường dẫn thay đổi
    setIsloading(true);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5">Application Waiting Interview List</h2>
        <div className="col-md-4 my-5">
          <input
            type="text"
            placeholder="Search by JobTitle..."
            className="form-control"
            value={searchTermJobTitle}
            onChange={(e) => setSearchTermJobTitle(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Application Number</th>
              <th>Department</th>
              <th>Job Title</th>

              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appli?.map((item) => (
              <tr key={item.applicationID}>
                <td>{item.applicationNumber}</td>
                <td>{item.jobPostings?.jobCategory?.categoryName}</td>
                <td>{item.jobPostings?.jobTitle}</td>

                <td>{item.firstName}</td>
                <td>{item.email}</td>
                {/* <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td> */}
                <td>{item.applicationStatus}</td>
                <td>
                  <button className="action-btn status-btn">
                    <NavLink
                      className=""
                      to={`/user/user-detail-application-employee-withow-interview/${item.applicationID}`}
                    >
                      <i
                        class="fa fa-file-alt"
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    </NavLink>
                  </button>
                </td>
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

export default ListApplicationWithowInterviewByEmployee;
