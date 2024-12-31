import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../../api/Axios";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";

const UserAddJobPosting = () => {
  const [jobtitle, setJobTitle] = useState("");
  const [requiredments, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [experiencedlevel, setExperiencedLevel] = useState("");
  const [jobdescription, setJobDescription] = useState("");
  const [categoryid, setCategoryID] = useState("");
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const onsubmit = async (eve) => {
    eve.preventDefault();
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to create this JobPosting?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, create it!",
          cancelButtonText: "No, cancel",
        });

    try {
      const formdata = new FormData();

      formdata.append("JobTitle", jobtitle);
      formdata.append("Requirements", requiredments);
      formdata.append("Location", location);
      formdata.append("ExperiencedLevel", experiencedlevel);
      formdata.append("JobDescription", jobdescription);
      formdata.append("EmployerID", decode.id);
      formdata.append("CategoryID", categoryid);

      const res = await axiosclient.post(
        "/shopee-career/job/create-job-posting",
        formdata
      );
      await Swal.fire({
        title: "Success",
        text: "Create Job Posting Success",
        icon: "Success",
      });
      console.log(res.data);
      navigate("/user/list-jobposting-by-employer");
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text:error.response.data.message,
        icon: "error",
      });
    }
  };

  const fetchdatacategory = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/job-category`);
      setCategory(res.data.data.content); 
      console.log(res.data.data.content);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdatacategory();
    console.log(decode.id);

    console.log(categoryid);
  }, []);

  return (
    <div>
      <div className="add-employee-container">
        <h2>Add New Job</h2>
        <form className="add-jobposting-form" onSubmit={onsubmit}>
          <div className="container d-flex justify-content-between ">
            <div className="" style={{ width: "100%" }}>
              <div className="">
                <div className="form-group">
                  <label>
                    Job Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="JobTitle"
                    value={jobtitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Location<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select Location</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                    <option value="Da Nang">Da Nang</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Experienced Level<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="experiencedlevel"
                    value={experiencedlevel}
                    onChange={(e) => setExperiencedLevel(e.target.value)}
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
                <div className="form-group">
                  <label>Category Name</label>
                  <select
                    name="CategoryID"
                    defaultValue={categoryid}
                    onChange={(e) => setCategoryID(e.target.value)}
                  >
                    {category?.map((cate) => (
                      <option key={cate.categoryID} value={cate.categoryID}>
                        {cate.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Job Description<span style={{ color: "red" }}>*</span>
                  </label>
                  <ReactQuill
                    // style={{ height: "150px", marginBottom: "20px" }}
                    value={jobdescription}
                    onChange={setJobDescription}
                    theme="snow"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Requirements<span style={{ color: "red" }}>*</span>
                  </label>
                  <ReactQuill
                    // style={{ height: "150px", marginBottom: "20px" }}
                    name="Requirements"
                    value={requiredments}
                    onChange={setRequirements}
                  />
                </div>
                {errors.status && (
                  <p style={{ color: "red" }}>{errors.status}</p>
                )}
                <div className="button-group">
                  <button type="button" className="back-button">
                    <NavLink
                      className="text-decoration-none text-white"
                      to="/admin/job-category"
                    >
                      Back
                    </NavLink>
                  </button>
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

export default UserAddJobPosting;
