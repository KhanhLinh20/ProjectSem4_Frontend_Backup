import React, { useEffect, useState } from "react";
import "../addcategoryjpb/AddCategoryJob.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import Loading from "../../Loading/Loading";

const AddCategoryJob = () => {
  const [categoryNumber, setCategoryNumber] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState("");
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const onsubmit = async (ev) => {
    ev.preventDefault();
    setErrors("");
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("categoryName", categoryName);
      formdata.append("isActive", isActive);
      
      const res = await axiosclient.post(`shopee-career/job/create-job-category`, formdata);
      console.log(res.data);
      if(res.status===201) {
        navigate("/admin/job-category", {
          state: { successMessage: res?.data?.message || "Category added successfully!" }
        });
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      if (currentLocation.state && currentLocation.state.successMessage) {
        setSuccessMessage(currentLocation.state.successMessage);
  
        // Xóa message sau 5 giây để tránh hiển thị liên tục khi refresh
        const timer = setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [currentLocation.state]);
  if (loading) {
    return <Loading />; // Show Loading component if in loading state
  }

  return (
    <div>
      <div className="add-category-container">
        <h2>Add New Job Category </h2>
        <form className="add-category-form" onSubmit={onsubmit}>
          {errors && (
            <div className="alert alert-danger">{errors}</div>
          )}
          <div className="form-group">
            <label>Category Name<span style={{color: "red"}}>*</span></label>
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="button" className="back-button">
              <NavLink
                className="text-white"
                to="/admin/job-category"
                style={{ textDecoration: "none" }}
              >
                Back
              </NavLink>
            </button>
            <button type="submit" className="submit-button">
              Add Job Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryJob;
