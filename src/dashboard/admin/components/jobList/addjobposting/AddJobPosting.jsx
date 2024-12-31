import React, { useEffect, useState } from "react";
import "../addjobposting/AddJobPosting.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import { jwtDecode } from "jwt-decode";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

const AddJobPosting = () => {
  const [jobtitle, setJobTitle] = useState("");
  const [requiredments, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [experiencedlevel, setExperiencedLevel] = useState("");
  const [jobdescription, setJobDescription] = useState("");
  // const [categoryid, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const { id: categoryid } = useParams();
  console.log("Category ID:", categoryid);
  

  const onsubmit = async (eve) => {
    eve.preventDefault();
    try {
      let isOk = true;
      const isEmptyContent = (content) => {
        const text = content.replace(/<[^>]*>/g, '').trim(); // Loại bỏ tất cả các thẻ HTML và trim khoảng trắng
        return text === ''; // Nếu nội dung sau khi loại bỏ thẻ HTML và khoảng trắng là rỗng, trả về true
      };
      if (isEmptyContent(requiredments)) {
        await Swal.fire({
          title: "Error",
          text: "Requirements cannot be empty",
          icon: "warning",
        });
        isOk = false;
      }
      if (isEmptyContent(jobdescription)) {
        await Swal.fire({
          title: "Error",
          text: "Job Description cannot be empty",
          icon: "warning",
        });
        isOk = false;
      }
      // if (!categoryid) {
      //   setErrors((prev) => {
      //     return { ...prev, category: "* Category must be selected" };
      //   });
      //   isOk = false;
      // } else {
      //   setErrors((prev) => {
      //     return { ...prev, category: null };
      //   });
      // }

      if (isOk) {
        const formdata = new FormData();
        formdata.append("jobTitle", jobtitle);
        formdata.append("requirements", requiredments);
        formdata.append("location", location);
        formdata.append("experiencedLevel", experiencedlevel);
        formdata.append("jobDescription", jobdescription);
        formdata.append("employerID", decode.id);
        formdata.append("categoryID", categoryid);

        const res = await axiosclient.post(
          "/shopee-career/job/create-job-posting",
          formdata
        );
        console.log(res.data);
        await Swal.fire({
          title: "Success",
          text: "Create Job Posting Success",
          icon: "success",
        });

        navigate("/admin/joblistdraft");
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.response.data?.message,
        icon: "warning",
      });
    }
  };

  const fetchdatacategory = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/job/job-category`);
      setCategory(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdatacategory();
    console.log(decode.id);
    // console.log(categoryid);
  }, []);

  return (
    <div>
      <div className="add-jobposting-container">
        <h2 className="my-5">Create New Job Posting</h2>
        <form className="add-jobposting-form" onSubmit={onsubmit}>
          <div className="container d-flex justify-content-between ">
            <div className="" style={{ width: "100%" }}>
              <div className="">
                <div className="form-group">
                  <label>Job Title<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    name="JobTitle"
                    value={jobtitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Location<span style={{color: "red"}}>*</span></label>
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
                  <label>Experienced Level<span style={{color: "red"}}>*</span></label>
                  <select
                    name="experiencedlevel"
                    value={experiencedlevel}
                    onChange={(e) => setExperiencedLevel(e.target.value)}
                  >
                    <option value="">Select Experienced Level</option>
                    <option value="Internship">Internship</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Experienced (Individual Contributor)">Experienced (Individual Contributor)</option>
                    <option value="Experienced (Team Lead)">Experienced (Team Lead)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Job Description<span style={{color: "red"}}>*</span></label>
                  <ReactQuill
                    // style={{ height: "150px", marginBottom: "20px" }}
                    value={jobdescription}
                    onChange={setJobDescription}
                    theme="snow"
                  />
                </div>

                <div className="form-group">
                  <label>Requirements<span style={{color: "red"}}>*</span></label>
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

export default AddJobPosting;
