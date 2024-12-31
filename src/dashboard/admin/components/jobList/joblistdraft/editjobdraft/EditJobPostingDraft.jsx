import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jwtDecode } from "jwt-decode";
import { Prev } from "react-bootstrap/esm/PageItem";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import Loading from "../../../Loading/Loading";
import axiosclient from "../../../../../../api/Axios";

const EditJobPostingDraft = () => {
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  console.log(id);

  const [jobid, setJobid] = useState({
    jobTitle:"",
    location:"",
    employmentType:"",
    experiencedLevel:"",
    jobDescription:"",
    requirements:"",
    status:"",

  });
  const navigate = useNavigate();


  const fetchdata = async () => {
    const res = await axiosclient.get(`/shopee-career/job/get-jobbyid/${id}`);
    setJobid(res.data.data);
    console.log("data job",res.data.data);
    
  };

  const onsubmit = async (e) => {
    e.preventDefault();
 
   
    try {
      const formdata = new FormData();
      formdata.append("jobTitle",jobid.jobTitle)
      formdata.append("location", jobid.location);
    //   formdata.append("employmentType", jobid.employmentType);
      formdata.append("experiencedLevel", jobid.experiencedLevel);
      formdata.append("requirements", jobid.requirements);
      formdata.append("jobDescription", jobid.jobDescription);
      formdata.append("status", jobid.status);
      const res = await axiosclient.put(
        `/shopee-career/job/update-job-posting/${id}`,
        formdata
      );
      navigate("/admin/joblistdraft");
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.response.data?.message,
        icon: "warning",
      });
      console.error("Error update Job Posting:", error);
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
    setJobid((prev) => ({
      ...prev,
      requirements: e,
    }));
  };
  useEffect(() => {
    fetchdata();

  }, []);
  useEffect(() => {
   
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="add-employee-container">
        <h2>Edit Job Draft</h2>
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
                    <option value="Experienced (Individual Contributor)">Experienced (Individual Contributor)</option>
                    <option value="Experienced (Team Lead)">Experienced (Team Lead)</option>
                  </select>
                </div>
                {/* <div className="form-group">
                  <label>Experienced Level</label>

                  <select
                    name="experiencedLevel"
                    value={jobid.experiencedLevel}
                    onChange={handleChange}
                  >
                    <option value="">Select Experienced Level </option>
                    <option value="Intern">Intern</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div> */}
                {/* <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={jobid.status}
                    onChange={handleChange}
                    aria-readonly
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
                    to="/admin/joblistdraft"
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

export default EditJobPostingDraft;
