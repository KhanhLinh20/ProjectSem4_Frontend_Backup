import React, { useEffect, useState } from "react";
import "../editemployee/EditEmployee.css";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import Swal from "sweetalert2";
import { useUser } from "../../../../../context/UserContext";

const EditEmployee = () => {
  const { updateUser } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [empdetail, setEmpdetail] = useState({
    firstName: "", lastName: "", phoneNumber: "", jobTitle: ""
  });
  const [getemp,setemp]=useState({});
  const [fileError, setFileError] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // URL xem trước hình
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/get-employer/${id}`);
      setEmpdetail(res.data.data);
      console.log(empdetail);
      setemp(empdetail);
    } catch (error) {
      if(error.getErrorCode == 'NeedResetPasseword') {
        console.log("User need reset password");
      }
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setEmpdetail((prevState) => ({
          ...prevState,
          image: file, // Lưu file hình
        }));
        setFileError(""); // Xóa lỗi nếu hợp lệ

        // Tạo URL xem trước hình
        const fileURL = URL.createObjectURL(file);
        setPreviewImage(fileURL);
      } else {
        setFileError("Only JPG and PNG files are allowed");
        setEmpdetail((prevState) => ({
          ...prevState,
          image: null, // Xóa file không hợp lệ
        }));
        setPreviewImage(null);
      }
    }
  };
  const [errors, setErrors] = useState({});
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value) error = "Cannot be empty";
        else if(! /^[^0-9]+$/.test(value)) error="There cannot be numbers in the name";
        break;
      case "lastName":
        if (!value) error = "Cannot be empty";
        else if(! /^[^0-9]+$/.test(value)) error="There cannot be numbers in the name";
        break;
      case "phoneNumber":
        if (!value) error = "Cannot be empty";
        else if (!/^\d+$/.test(value)) error = "Phone Number must be numeric";
        break;
      case "jobTitle":
        if (!value) error = "Job Title is required";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };


  useEffect(() => {
    fetchdata();
  }, [])

  const handleChange = (e) => {

    const { name, value } = e.target;
    setEmpdetail((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });
    validate(name, value);
  };
  const onsubmit = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      await Swal.fire({
        title: "Error",
        text: "Please fix the errors before submitting.",
        icon: "warning",
      });
      return;
    }
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("firstName", empdetail.firstName.trim());
      formData.append("phoneNumber", empdetail.phoneNumber.trim());
      formData.append("email", empdetail.email.trim());
      formData.append("jobTitle", empdetail.jobTitle.trim());
      formData.append("role", empdetail.role.trim());
      if (empdetail.image) {
        formData.append("photo", empdetail.image); // Gửi file hình
      }

      const response = await axiosclient.put(`/shopee-career/update-employer/${id}`, formData, { headers: "Content-Type: multipart/form-data" });
      if (response.data.status === 201) {
        updateUser({
          firstName: empdetail.firstName.trim(),
          jobTitle: empdetail.jobTitle.trim(),
          profilePicture: response.data.data.profilePicture, // Profile picture mới
        });
        setIsUpdating(false);
        navigate("/admin/list-employer");
      }else{
        await Swal.fire({
          title: "Error",
          text:  response.data.message,
          icon: "warning",
        
        });
      }
    } catch (error) {
      setIsUpdating(false);
      await Swal.fire({
        title: "Error",
        text:  error.response?.data?.message,
        icon: "warning",
       
      });
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Update Employee</h2>

      <form className="add-employee-form" onSubmit={onsubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <select
            value={empdetail.jobTitle || getemp.jobTitle||""}
            onChange={handleChange}
            name="jobTitle"
          >
            <option value="">Select Job Title</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Senior HR Specialist">Senior HR Specialist</option>
            <option value="HR Executive">HR Executive</option>
            <option value="HR Intern">HR Intern</option>
          </select>
          {errors.jobTitle && <span style={{ color: "red" }}>{errors.jobTitle}</span>}
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            value={empdetail.role || getemp.role||""}
            onChange={handleChange}
            name="role"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          {errors.role && <span style={{ color: "red" }}>{errors.role}</span>}
        </div>
      
        <div className="button-group">
          <NavLink
            className="btn btn-secondary d-flex align-items-center justify-content-center"
            type=""
            to="/admin/list-employer"
          >
            Back
          </NavLink>
          <button
            className="submit-button btn btn-primary"
            type="submit"
            disabled={isUpdating} // Disable button khi đang update
          >
            {isUpdating ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
