import React, { useEffect, useState } from "react";
import "../../components/jobdetail/JobDetail.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../api/Axios";
import moment from "moment";

const JobDetail = () => {
  const { id } = useParams();
  const [detailjob, setDetailjob] = useState([]);
  const navigate = useNavigate();

  const details = async () => {
    try {
      const resdata = await axiosclient.get(`shopee-career/job/get-jobbyid/${id}`);
      setDetailjob(resdata.data.data);
      console.log("Detail" + resdata.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  const handleApplyClick = () => {
    navigate(`/application-apply-job/${detailjob.jobID}`, {
      state: { jobTitle: detailjob.jobTitle }, // Truyền state
    });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm" style={{ border: "none" }}>
        <div className="card-body">
          {/* Job Title */}
          <div className="d-flex justify-content-between align-items-center mb-3"> 
            <h1 className="card-title">{detailjob.jobTitle}</h1>
            <button className="btn" style={{color: "#fff", backgroundColor: "#ee4d2d"}} onClick={handleApplyClick} target="_blank" rel="noopener noreferrer">
              Apply Now
            </button> 
          </div>
          <div className="d-flex flex-wrap align-items-center">
              <span className="me-4 d-flex align-items-center">
                <i className="bi bi-briefcase me-2"></i>
                Department: {detailjob.jobCategory?.categoryName || "N/A"}
              </span>
              <span className="me-4 d-flex align-items-center">
                <i className="bi bi-bar-chart me-2"></i>
                Level: {detailjob.experiencedLevel || "N/A"}
              </span>
              <span className="me-4 d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                Location: {detailjob.location}
              </span>
          </div> 
          <h3>Job Description</h3>
          <div className="mt-3" dangerouslySetInnerHTML={{ __html: detailjob.jobDescription?.split("").slice(0,10000).join("") }}></div>
          <h3>Requirements</h3>
          <div className="mt-3" dangerouslySetInnerHTML={{ __html: detailjob.requirements?.split("").slice(0,10000).join("") }}></div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
