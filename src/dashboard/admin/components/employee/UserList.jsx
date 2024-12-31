import React, { useEffect, useState } from "react";
import "../employee/UserList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import axiosclient from "../../../../api/Axios";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";
import moment from "moment";

const UserList = () => {
  // Trạng thái để quản lý loading
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccessMessage] = useState("");
  const currentLocation = useLocation();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [loading, setLoading] = useState(false);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  
  // Fetch nhân viên khi page thay đổi
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axiosclient.get(`shopee-career/employers?page=${page}&size=10`);
        setEmployees(response.data.content); // Cập nhật dữ liệu nhân viên
        setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page]); // Chạy lại khi `page` thay đổi

  // Khi component render lần đầu, lấy thông báo thành công từ location.state
  useEffect(() => {
    if (currentLocation.state && currentLocation.state.successMessage) {
      setSuccessMessage(currentLocation.state.successMessage);

      // Xóa message sau 5 giây để tránh hiển thị liên tục khi refresh
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentLocation.state]);

  // Khi đang loading, chỉ hiển thị Loading component, không render nội dung trang
  if (isLoading) {
    return <Loading />;
  }

  // Hàm xử lý trạng thái kích hoạt/tạm dừng
  const toggleStatus = async (employerID) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Do you really want to change the status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, keep it",
    });
  
    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await axiosclient.put(
        `/shopee-career/change-status/${employerID}`
      );
      const updatedEmployee = res.data.data;

      setEmployees(prevEmployees =>
        prevEmployees.map(employee =>
          employee.employerID === employerID ? { ...updatedEmployee } : employee
        )
      );
    } catch (error) {
      console.error("Error while toggling status:", error);
    }
  };

  // Hàm thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage); // Cập nhật page và trigger useEffect để lấy lại dữ liệu
    }
  };

  const handleFilter = () => {
      let filteredEmployee = employees;
  
      // Search Filter
      if (searchTerm) {
        filteredEmployee = filteredEmployee.filter((item) =>
          item.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      // Status Filter
      if (statusFilter !== "All") {
        filteredEmployee = filteredEmployee.filter((item) => item.accountStatus === statusFilter);
      }
  
      // Date Filter
      if (dateFilter) {
        filteredEmployee = filteredEmployee.filter(
          (item) =>
            moment(item.createdAt).format("YYYY-MM-DD") === moment(dateFilter).format("YYYY-MM-DD")
        );
      }
  
      return filteredEmployee;
    };
    const filteredEmployee = handleFilter();

  return (
    <div className="admin-list">
      <h2>List Employee</h2>
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <button className="add-employee-button">
        <NavLink
          className=" text-decoration-none text-white"
          to="/admin/add-employer"
        >
          <i className="fas fa-plus"></i>
          {" "}Add New Employee
        </NavLink>
      </button>
      {/* Filter Section */}
      <div className="filter-container mb-4">
        <div className="row">
          {/* Search Input */}
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search by category name..."
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
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
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
            <th>Fullname</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Avatar Profile</th>
            <th>Account Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredEmployee.length > 0 ? (
          filteredEmployee.map((employee) => (
            <tr key={employee.employerID}>
              <td>{employee.employerNumber}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.email}</td>
              <td>
                <img
                  src={"http://localhost:8080/uploads/employee/" + employee.profilePicture}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  alt=""
                />
              </td>
              <td>
                <button
                  className={`status-btn ${employee.accountStatus === "Active" ? "active" : "inactive"}`}
                  onClick={() => toggleStatus(employee.employerID)}
                >
                  {employee.accountStatus === "Active" ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                  <span>{employee.accountStatus}</span>
                </button>
              </td>
              <td>
                <button className="action-btn edit-btn">
                  <NavLink
                    className="text-decoration-none"
                    to={`/admin/edit-employer/${employee.employerID}`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </NavLink>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No employer found
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
  );
};

export default UserList;
