import React, { useEffect, useState } from "react";

import { NavLink, useLocation } from "react-router-dom";

import Swal from "sweetalert2";
import moment from "moment";
import { Pagination } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../api/Axios";
import Loading from "../../../admin/components/Loading/Loading";

const UserApplicationAcceptEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation();
  const [app, setApp] = useState([]);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [originalJobs, setOriginalJobs] = useState([]);
  const token = localStorage.getItem("token");
  const jwt = token ? jwtDecode(token) : null;
  if (!jwt) {
    console.error("Invalid or missing token");
  }
  //   const [loading, setLoading] = useState(false);
  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(
        `/shopee-career/list-application-by-employer-interview-pass/${jwt.id}?page=${page}&size=5`
      );
      setApp(res.data?.data.content);
      console.log(res.data?.data.content);
      setTotalPages(res.data?.data.totalPages);
      setOriginalJobs(res.data.data.content);
    } catch (error) {
      await Swal.fire({
        title: "Success",
        text: "Not Record Application",
        icon: "Success",
      });
    }
  };
  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];

    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.firstName?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    setApp(filteredJobPublish);
  };
  useEffect(() => {
    fetchdata();
  }, [page]);
  useEffect(() => {
    handleFilter();
  }, [searchTermJobTitle]);

  useEffect(() => {
    setIsLoading(true);

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
  return (
    <div>
      <div className="admin-list">
        <h2 className="my-5"> List Applicant Pass</h2>
        <div className="col-md-4 my-5">
          <input
            type="text"
            placeholder="Search by Application Name..."
            className="form-control"
            value={searchTermJobTitle}
            onChange={(e) => setSearchTermJobTitle(e.target.value)}
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Empployee Number</th>
              <th>Applicant Name</th>
              <th>Job Title</th>
              <th>Application Date</th>
              {/* <th>Aplication updateAt</th> */}
              <th>Applicant Status</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {app.length > 0 ? (
              app.map((item) => (
                <tr key={item.applicationID}>
                  <td>{item.jobPostings.employers?.employerNumber}</td>
                  <td>{item.firstName}</td>
                  <td>{item.jobPostings.jobTitle}</td>

                  <td>
                    {moment(item.applicationDate).format("DD/MM/YYYY HH:mm ")}
                  </td>

                  <td>{item.applicationStatus}</td>
                  <td>
                    <button className="action-btn status-btn">
                      <NavLink
                        className=""
                        to={`/user/user-detail-application-accept-employee/${item.applicationID}`}
                      >
                        <i
                          class="fa fa-file-alt"
                          style={{ fontSize: "1.1rem" }}
                        ></i>
                      </NavLink>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Application found
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

export default UserApplicationAcceptEmployee;
