import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosclient from "../../../../api/Axios";

const SuccessApplicants = () => {
  const { jobID } = useParams(); // Lấy jobID từ URL
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axiosclient.get(`/shopee-career/list-application`);
        // Lọc các ứng viên có trạng thái "Pass" và `jobID` khớp
        const filteredApplicants = res.data.data.filter(
          (app) => app.jobPostings.jobID === parseInt(jobID) && app.applicationStatus === "Pass"
        );
        
        
        setApplicants(filteredApplicants);
        console.log("list applicant", applicants[0].jobPostings.jobTitle);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="admin-list">
            <h2>List Applicants Pass {applicants[0]?.jobPostings?.jobTitle}</h2>
            {applicants.length > 0 ? (
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th>Application Number</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Resume</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant) => (
                    <tr key={applicant.applicationID}>
                        <td>{applicant.applicationNumber}</td>
                        <td>{applicant.firstName}</td>
                        <td>{applicant.phoneNumber}</td>
                        <td>{applicant.email}</td>
                        <td>
                            <a
                                href={`http://127.0.0.1:8080/uploads/filecv/${applicant.resumefile}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Resume
                            </a>
                        </td>
                        <td>
                        <button className="action-btn status-btn">
                            <NavLink
                            className=""
                            to={`/admin/detail-application-accept/${applicant.applicationID}`}
                            >
                            <i className="fa fa-file-alt" style={{ fontSize: "1.1rem" }}></i>
                            </NavLink>
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p>No Applicants Pass found for this job.</p>
            )}
        </div>
      
    </div>
  );
};

export default SuccessApplicants;
