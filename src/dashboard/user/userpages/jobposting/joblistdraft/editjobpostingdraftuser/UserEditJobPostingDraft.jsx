import React, { useEffect, useState } from "react";

import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";
import { Prev } from "react-bootstrap/esm/PageItem";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import axiosclient from "../../../../../../api/Axios";
import Loading from "../../../../../admin/components/Loading/Loading";

const UserEditJobPostingDraft = () => {
  
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [jobid, setJobid] = useState({
 
    jobTitle: "",
    location: "",
    experiencedLevel: "",
    jobDescription: "",
    requirements: "",
    status: ""

  });
  const navigate = useNavigate();
const {id}=useParams();
console.log(id);



  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/get-jobbyid/${id}`);
      setJobid(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
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
 
      formdata.append("jobTitle", jobid.jobTitle);
      formdata.append("location", jobid.location);
      formdata.append("experiencedLevel", jobid.experiencedLevel);  
      formdata.append("requirements", jobid.requirements);
      formdata.append("jobDescription", jobid.jobDescription);
      formdata.append("status", jobid.status);
      formdata.append("employerID",jobid.employers.employerID);
      formdata.append("categoryID",jobid.jobCategory.categoryID);

      const res = await axiosclient.put(
        `/shopee-career/job/user-update-jobposting-draft/${id}`,
        formdata
      );
      if (res.data.status === 201) {
        navigate(`/user/list-jobposting-draft`);
      }
    } catch (error) {
      await Swal.fire({
        title:"Error",
        text:error.response.data?.message,
        icon:"warning",
      })
      console.error("Error update Job Posting:",error);
  
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

    setJobid((prev) => ({
      ...prev,
      jobDescription: e,
    }));
  };
  const changeQuillRequirement = (e) => {
 ;
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
                   <option value="">Select Experienced Level</option>
                    <option value="Internship">Internship</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Experienced (Individual Contributor)">
                      Experienced (Individual Contributor)
                    </option>
                    <option value="Experienced (Team Lead)">
                      Experienced (Team Lead)
                    </option>
                  </select>
                </div>
                {/* <div className="form-group">
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
                </div> */}
                
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
                    to={`/user/list-jobposting-draft`}
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

export default UserEditJobPostingDraft;
