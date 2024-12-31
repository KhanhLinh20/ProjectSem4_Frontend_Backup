import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axiosclient from "../../../../../api/Axios";
import { NavLink, useLocation } from "react-router-dom";
import Loading from "../../../../admin/components/Loading/Loading";
import { Pagination } from "react-bootstrap";
import UserChartsJobPostingByEmployee from "../../charts/UserChartsJobPostingByEmployee";

const ListJobPostingByEmployer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useLocation();
  const [job, setJob] = useState([]);
  const [app, setApp] = useState([]);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0);
  const [searchTermJobTitle, setSearchTermJobTitle] = useState("");
  const [originalJobs, setOriginalJobs] = useState([]);
  const token = localStorage.getItem("token");
  const jwt = jwtDecode(token);
  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(
        `/shopee-career/job/list-job-by-employee/${jwt.id}?page=${page}&size=10`
      );
      setJob(res.data.data.content);
      console.log(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setOriginalJobs(res.data.data.content);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchapp = async () => {
    try {
      const response = await axiosclient.get(`/shopee-career/list-application`);
      setApp(response.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchapp();
  }, [page]);
  useEffect(() => {
    handleFilter();
  }, [searchTermJobTitle]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentLocation.pathname]);
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage); // Cập nhật trang và trigger lại fetching
    }
  };
  const handleFilter = () => {
    let filteredJobPublish = [...originalJobs];


    if (searchTermJobTitle) {
      filteredJobPublish = filteredJobPublish.filter((item) =>
        item.jobTitle?.toLowerCase().includes(searchTermJobTitle.toLowerCase())
      );
    }

    setJob(filteredJobPublish);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="admin-list">
        <h2>List Jobosting </h2>
        <button className="add-employee-button">
          <NavLink
            className=" text-decoration-none text-white"
            to="/user/user-create-jobposting"
          >
            Add New JobPosting
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
                value={searchTermJobTitle}
                onChange={(e) => setSearchTermJobTitle(e.target.value)}
              />
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Job Number</th>
              <th>employer Number</th>
              <th>Job Title</th>
              <th>Quantity Application</th>
              <th> Status</th>
              <th> Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {job.map((item) => (
              <tr key={item.jobID}>
                <td>{item.jobNumber}</td>
                <td>{item.employers?.employerNumber}</td>
                <td>{item.jobTitle} </td>
                <td>
                  <button className="btn btn-primary" style={{width:"100px"}}>
                  <NavLink to={`/user/list-user-application-by-jobposting-employee/${item.jobID}`} className="text-white text-decoration-none">
                    {
                      app.filter(
                        (appli) => appli.jobPostings.jobID === item.jobID
                      ).length
                    }
                  </NavLink>

                  </button>
                 
                </td>

                <td>{item.status}</td>
                <td>
                  <button className="btn btn-primary" style={{ width: "50px" }}>
                    <NavLink
                      className="text-white text-decoration-none"
                      to={`/user/list-user-application-pass-by-jobposting-employee/${item.jobID}`}
                    >
                      {item.totalPassApplication}
                    </NavLink>
                  </button>
                </td>

                <td>
                  
                  <NavLink
                    className="text-decoration-none"
                    to={`/user/user-detail-jobposting/${item.jobID}`}
                  >
                    <i className="fa-solid fa-pencil text-primary"></i>
                  </NavLink>
                </td>
              </tr>
            ))}
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
        <UserChartsJobPostingByEmployee/>
      </div>
   
    </div>
  );
};

export default ListJobPostingByEmployer;
