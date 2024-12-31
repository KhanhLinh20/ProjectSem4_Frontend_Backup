import React, { useState } from "react";
import "../addemployer/AddEmployee.css";
import axiosclient from "../../../../../api/Axios";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

const AddEmployee = () => {
  const [firstName, setFirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors(""); // Clear error trước khi gửi request
    setLoading(true); // Set trạng thái loading là true
  try {  
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("jobTitle", jobTitle);
      formData.append("role", role);
      
      if (profilePicture) {
        formData.append("photo", profilePicture); // File object
      }

      const response=await axiosclient.post(
        "/shopee-career/create-employer",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if(response.status===201){
        // alert(response?.data?.message);
        navigate("/admin/list-employer", {
          state: { successMessage: response?.data?.message || "Employee added successfully!" }
        });
      }else if(response?.data?.status===400){
        alert(response?.data?.message);
      }
   
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <Loading />; // Show Loading component if in loading state
    }
  };

  

  return (
    <div className="add-employee-container">
      <h2>Add New Employer</h2>
      
      {loading && <Loading />} 
      <form className="add-employee-form" onSubmit={onSubmit}>
        {errors && typeof errors === "string" && (
          <div className="alert alert-danger">{errors}</div>
        )}
        <div className="form-group">
          <label>First Name<span style={{color: "red"}}>*</span></label>
          <input
            type="text"
            name="FirstName"
            value={firstName}
            onChange={(ev) => setFirstname(ev.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone Number<span style={{color: "red"}}>*</span></label>
          <input
            type="text"
            name="Phone"
            value={phoneNumber}
            onChange={(ev) => setPhoneNumber(ev.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email<span style={{color: "red"}}>*</span></label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Job Title<span style={{color: "red"}}>*</span></label>
          <select
            value={jobTitle}
            onChange={(job) => setJobTitle(job.target.value)}
            name="JobTitle"
          >
            <option value="">Select Job Title</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Senior HR Specialist">Senior HR Specialist</option>
            <option value="HR Executive">HR Executive</option>
            <option value="HR Intern">HR Intern</option>
          </select>
        </div>

        <div className="form-group">
          <label>Role<span style={{color: "red"}}>*</span></label>
          <select
            value={role}
            onChange={(role) => setRole(role.target.value)}
            name="Role"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Avatar</label>
          <input
          className="form-control"
            type="file"
            name="ProfilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          
        </div>
        
        <div className="button-group">
          <button type="button" className="back-button">
            <NavLink
              className="text-white"
              to="/admin/list-employer"
              style={{ textDecoration: "none" }}
            >
              Back
            </NavLink>
          </button>
          {/* Đảm bảo rằng nút này có type="submit" */}
          <button type="submit" className="submit-button" disabled={loading}>
            {/* {loading ? "Adding..." : "Add New Employee"} */}
            Add New Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
