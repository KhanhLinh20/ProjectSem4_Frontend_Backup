import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Pagination } from "react-bootstrap";
import axiosclient from "../../../../api/Axios";
import moment from "moment/moment";
import Swal from "sweetalert2";

const CategoryJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [jobPosting, setJobPosting] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const fetchdata = async () => {
    try {
      const response = await axiosclient.get(`shopee-career/job/job-category?page=${page}&size=10`);
      setCategory(response.data.data.content);
      console.log(response.data.data.content);
      
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataJobPostings = async () => {
    try {
      const response = await axiosclient.get("shopee-career/job/list-all-job-posting");
      setJobPosting(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchDataJobPostings();
  }, [page]);

  const toggleActiveStatus = async (categoryID) => {
    // Hiển thị hộp thoại xác nhận
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Do you really want to change the status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, keep it",
    });
  
    if (!result.isConfirmed) {
      return; // Nếu người dùng hủy, không làm gì
    }
  
    try {
      // Gửi yêu cầu PUT để thay đổi trạng thái danh mục công việc
      const res = await axiosclient.put(
        `/shopee-career/job/change-status-category/${categoryID}`
      );
  
      // Cập nhật trạng thái của danh mục trong state
      const updatedCategory = res.data.data;
  
      setCategory((prevCategory) =>
        prevCategory.map((category) =>
          category.categoryID === categoryID ? { ...category, isActive: updatedCategory.isActive } : category
        )
      );
  
      // Hiển thị thông báo thành công
      Swal.fire("Success", "Status has been updated.", "success");
    } catch (error) {
      // Hiển thị lỗi nếu có
      console.error("Error while toggling status:", error);
      Swal.fire("Error", "There was an issue updating the status.", "error");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleFilter = () => {
    let filteredCategory = category;

    // Search Filter
    if (searchTerm) {
      filteredCategory = filteredCategory.filter((item) =>
        item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter !== "All") {
      filteredCategory = filteredCategory.filter((item) => item.isActive === statusFilter);
    }

    // Date Filter
    if (dateFilter) {
      filteredCategory = filteredCategory.filter(
        (item) =>
          moment(item.createAt).format("YYYY-MM-DD") === moment(dateFilter).format("YYYY-MM-DD")
      );
    }

    return filteredCategory;
  };

  const renderPaginationItems = () => {
    const pageNumbers = [];
    const totalPageNumbers = totalPages;

    // Hiển thị tối đa 5 trang xung quanh trang hiện tại
    const maxVisiblePages = 5;
    let startPage = Math.max(0, page - 2);
    let endPage = Math.min(totalPageNumbers - 1, page + 2);

    if (startPage > 0) {
      pageNumbers.push(0); 
      if (startPage > 1) pageNumbers.push("..."); 
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPageNumbers - 1) {
      pageNumbers.push("..."); 
      pageNumbers.push(totalPageNumbers - 1); 
    }

    return pageNumbers.map((pageNumber, index) => (
      <Pagination.Item
        key={index}
        active={pageNumber === page}
        onClick={() => {
          if (pageNumber !== "...") handlePageChange(pageNumber);
        }}
      >
        {pageNumber === "..." ? "..." : pageNumber + 1}
      </Pagination.Item>
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  const filteredCategory = handleFilter();

  return (
    <div>
      <div className="admin-list">
        <h2>List Category Job</h2>
        <button className="add-employee-button">
          <NavLink className="text-decoration-none text-white" to="/admin/add-category-job">
            <FontAwesomeIcon icon={faPlus} />{" "}
            Add New Category Job
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
              <th>Category Name</th>
              <th>Job Quantity</th>
              <th>Create Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategory.length > 0 ? (
              filteredCategory.map((category) => (
                <tr key={category.categoryID}>
                  <td>{category.categoryNumber}</td>
                  <td>{category.categoryName}</td>
                  <td>
                    <NavLink
                      to={`/admin/list-job/${category.categoryID}`}
                      state={{ categoryName: category.categoryName }}
                      className="job-count-link text-center"
                    >
                      {jobPosting.filter((job) => job.jobCategory.categoryID === category.categoryID).length}
                    </NavLink>
                  </td>
                  <td>{moment(category.createdAt).format("DD/MM/YYYY")}</td>
                  <td>
                    <button
                      className={`status-btn ${category.isActive === "Active" ? "active" : "inactive"}`}
                      onClick={() => toggleActiveStatus(category.categoryID)}
                    >
                      {category.isActive === "Active" ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                      <span>{category.isActive}</span>
                    </button>
                  </td>
                  <td>
                    <button className="action-btn edit-btn">
                      <NavLink
                        className="text-decoration-none"
                        to={`/admin/update-category-job/${category.categoryID}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </NavLink>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Job Category Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination justify-content-end">
          <Pagination>
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
            {renderPaginationItems()}
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

export default CategoryJob;
