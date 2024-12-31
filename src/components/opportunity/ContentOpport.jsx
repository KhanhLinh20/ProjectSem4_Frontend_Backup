import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosclient from "../../api/Axios";
import moment from "moment";
// import { Pagination } from "antd";
import { Pagination } from "react-bootstrap";

const ContentOpport = ({filters}) => {
  const [jobposting, setJobposting] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/list-jobposting?page=${page}&size=10&status=Publish`);
      setJobposting(res.data?.data.content.filter(item => item.status === "Publish"));
      setTotalPages(res.data?.data.totalPages);
      console.log(res.data?.data.content);
      
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [page]);

  const filteredJobs = jobposting.filter((job) => {
    // Filter jobs based on selected filters
    const matchDepartment = filters.department.length === 0 || filters.department.includes(job.jobCategory.categoryName);
    const matchLevel = filters.level.length === 0 || filters.level.includes(job.experiencedLevel);
    const matchLocation = filters.location.length === 0 || filters.location.includes(job.location);

    return matchDepartment && matchLevel && matchLocation && job.status === "Publish";
  });
  if (filteredJobs.length === 0) {
    return (
      <div className="container md-9 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          {/* Display the No Data Image */}
          <img 
            src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527124.jpg?t=st=1735131820~exp=1735135420~hmac=c805230b149be329aad213306078e8520054fdd43007f45bbaf223eeaeb0fd47&w=740" 
            alt="No Jobs Found" 
            style={{ maxWidth: "80%", height: "auto", marginBottom: "20px" }} 
          />
          <h3>No Jobs Found</h3>
          <p className="text-muted mt-2">Your search did not match any job postings. Please adjust your filters or try again later.</p>
          <div>
            <button className="btn mt-3" style={{backgroundColor: "#ee4d2d", color: "#fff"}} onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  
  return (
    <div className="container md-9">
      {filteredJobs.map((joblist) => (
        <div
          key={joblist.jobID}
          className="border-bottom py-3 d-flex justify-content-between align-items-start"
        >
          {/* Left Content */}
          <div>
            <h5>
              <NavLink
                to={`/detail-jobposting-application/${joblist.jobID}`}
                className="text-decoration-none text-dark fw-bold"
              >
                {joblist.jobTitle}
              </NavLink>
            </h5>
            <div className="text-muted d-flex flex-wrap align-items-center mt-2">
              <span className="me-4 d-flex align-items-center">
                <i className="bi bi-briefcase me-2"></i>
                {joblist.jobCategory.categoryName || "N/A"}
              </span>
              <span className="me-4 d-flex align-items-center">
                <i className="bi bi-bar-chart me-2"></i>
                {joblist.experiencedLevel || "N/A"}
              </span>
              <span className="d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                {joblist.location || "N/A"}
              </span>
            </div>
          </div>
        </div>
      ))}
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
  );
};

export default ContentOpport;
