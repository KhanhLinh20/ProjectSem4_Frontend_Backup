import React, { useEffect, useState } from "react";
import "../editjobposting/EditJobPosting.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";
import { Prev } from "react-bootstrap/esm/PageItem";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import { red } from "@mui/material/colors";

const EditJobPosting = () => {
  
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [jobid, setJobid] = useState({
    jobID: "",
    jobTitle: "",
    location: "",
    employmentType: "",
    experiencedLevel: "",
    jobDescription: "",
    // minEducationLevel: "",
    // minLanguageSkill: "",
    // minExperienceYears: "",
    // minCertificate: "",
    requirements: "",
    status: ""
  });
  const navigate = useNavigate();
  const { jobID } = useParams();
  console.log("jobID:", jobID);
  const location = useLocation();
  const id = location.state.categoryID;
  console.log("Category Id:", location.state.categoryID);
  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/get-jobbyid/${jobID}`);
      setJobid(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getjobdetail = async () => {
    try {
      const res = await axiosclient.put(`/shopee-career/job/update-job-posting/${jobID}`);
      
      console.log(res.data.data);
      setJobid(res.data.data);
      setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const sanitizeContent = (content) => {
    // Loại bỏ thẻ HTML và kiểm tra nếu nó trống
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    return textContent;
  };
  
  
  const onsubmit = async (e) => {
    e.preventDefault();
    const sanitizedJobDescription = sanitizeContent(jobid.jobDescription);
    if (sanitizedJobDescription === "") {
      await Swal.fire({
        title: "Error",
        text: "Job Description cannot be empty",
        icon: "warning",
      });
      return;
    }
    const sanitizedRequirements = sanitizeContent(jobid.requirements);
    if (sanitizedRequirements === "") {
      await Swal.fire({
        title: "Error",
        text: "Requirements cannot be empty",
        icon: "warning",
      });
      return;
    }
    try {
      const formdata = new FormData();
      formdata.append("jobID", jobID);
      formdata.append("jobTitle", jobid.jobTitle);
      formdata.append("location", jobid.location);
      formdata.append("employmentType", jobid.employmentType);
      formdata.append("experiencedLevel", jobid.experiencedLevel);
      // formdata.append("minEducationLevel", jobid.minEducationLevel);
      // formdata.append("minLanguageSkill", jobid.minLanguageSkill);
      // formdata.append("minExperienceYears", jobid.minExperienceYears);
      // formdata.append("minCertificate", jobid.minCertificate);
      formdata.append("requirements", jobid.requirements);
      formdata.append("jobDescription", jobid.jobDescription);
      formdata.append("status", jobid.status);
      const res = await axiosclient.put(
        `/shopee-career/job/update-job-posting/${jobID}`,
        formdata
      );
      if (res.data.status === 201) {
        navigate(`/admin/list-job/${id}`);
      }
    } catch (error) {
      await Swal.fire({
        title:"Error",
        text:error.response.data?.message,
        icon:"warning",
      })
      console.error("Error update Job Posting:",error);
      // setErrors(error.response.data?.message || "Job Title cannot empty");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobid((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const changeQuillDescription = (e) => {
    // const updatedJobDescription = e.trim();
    // const sanitizedDescription = sanitizeContent(updatedJobDescription);
    // if (sanitizedDescription === "") {
    //   setErrors("Job Description cannot be empty");
    // } else {
    //   setErrors("");
    // }
    // setJobid(e);
    setJobid((prev) => ({
      ...prev,
      jobDescription: e,
    }));
  };
  const changeQuillRequirement = (e) => {
    // const updatedRequirements = e.trim();
    // const sanitizedRequirements = sanitizeContent(updatedRequirements);
    // if (sanitizedRequirements === "") {
    //   setErrors("Requirements cannot be empty");
    // } else {
    //   setErrors("");
    // }
    // setJobid(e);
    setJobid((prev) => ({
      ...prev,
      requirements: e,
    }));
  };
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    console.log(jobid.jobTitle);
  }, [jobid]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="add-employee-container">
        <h2>Edit Job Posting</h2>
        <form className="add-jobposting-form" onSubmit={onsubmit}>
          <div className="container d-flex justify-content-between ">
            <div className="" style={{ width: "50%" }}>
              <div className="" style={{ width: "90%" }}>
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={jobid.jobTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <select
                    name="location"
                    value={jobid.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                    <option value="Da Nang">Da Nang</option>
                  </select>
                </div>

                
                <div className="form-group">
                  <label>Experienced Level</label>

                  <select
                    name="experiencedLevel"
                    value={jobid.experiencedLevel}
                    onChange={handleChange}
                  >
                    <option value="">Select Experienced Level </option>
                    <option value="Internship">Internship</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Experienced (Individual Contributor)">Experienced (Individual Contributor)</option>
                    <option value="Experienced (Team Lead)">Experienced (Team Lead)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={jobid.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status </option>
                    <option value="Publish">Publish</option>
                    <option value="Draft">Draft</option>
                    <option value="Close">Close</option>
                  </select>
                </div>
                
              </div>
            </div>

            <div className="" style={{ width: "50%" }}>
              <div className="" style={{ width: "90%" }}>
                
                <div className="form-group">
                  <label>Requirements</label>
                  <ReactQuill
                    type="text"
                    name="requirements"
                    value={jobid.requirements}
                    onChange={changeQuillRequirement}
                  />
                </div>
                
                <div className="form-group">
                  <label>Job Description</label>
                  <ReactQuill
                    name="jobDescription"
                    value={jobid.jobDescription}
                    onChange={changeQuillDescription}
                    required
                    theme="snow"
                  />
                </div>
                <div className="button-group">
                  <NavLink
                    className="text-decoration-none text-white btn btn-secondary d-flex align-items-center justify-content-center"
                    to={`/admin/list-job/${id}`}
                  >
                    Back
                  </NavLink>
                  <button type="submit" className="submit-button">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPosting;
