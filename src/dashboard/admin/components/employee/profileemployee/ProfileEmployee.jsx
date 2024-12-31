import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import "./ProfileEmployee.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { useUser } from "../../../../../context/UserContext";

const ProfileEmployee = () => {
  const { updateUser } = useUser();
  const [getemp,setemp]=useState({});
  const [empdetail, setEmpdetail] = useState({
      firstName: "", lastName: "", phoneNumber: "", jobTitle: "", role: ""
    });
  const [previewImage, setPreviewImage] = useState(null); // URL xem trước hình
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch employee data
  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(`/shopee-career/get-employer/${id}`);
      setEmpdetail(res.data.data);
      console.log(empdetail);
      setemp(empdetail);
    } catch (error) {
      console.log(error);
    }
  };

  // Update employee data
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
        await Swal.fire({
          title: "Success",
          text:  "Update Employee Success",
          icon: "Success",
        
        });
        navigate("/admin/list-employer");
      }
    } catch (error) {
   
      await Swal.fire({
        title: "Error",
        text:  error.response?.data?.message,
        icon: "warning",
       
      });
      console.error("Error updating employee:", error);
    }
  };

  const [errors, setErrors] = useState({});
  // const validate = (name, value) => {
  //   let error = "";
  //   switch (name) {
  //     case "firstName":
  //       if (!value.trim()) error = "First Name cannot be empty";
  //       else if (!/^[a-zA-Z]+$/.test(value)) error = "There cannot be numbers in the name";
  //       break;
  //     case "lastName":
  //       if (!value.trim()) error = "Last Name cannot be empty";
  //       else if (!/^[a-zA-Z]+$/.test(value)) error = "There cannot be numbers in the name";
  //       break;
  //     case "phoneNumber":
  //       if (!value.trim()) error = "Phone Number cannot be empty";
  //       else if (!/^\d+$/.test(value)) error = "Phone Number must be numeric";
  //       break;
  //     default:
  //       break;
  //   }
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: error,
  //   }));
  // };
  

  useEffect(() => {
    fetchdata();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpdetail((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });
    // validate(name, value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setEmpdetail((prevState) => ({
          ...prevState,
          image: file, // Lưu ảnh đã chọn vào state
        }));
  
        // Tạo URL để hiển thị ảnh xem trước
        const fileURL = URL.createObjectURL(file);
        setPreviewImage(fileURL);
      } else {
        setEmpdetail((prevState) => ({
          ...prevState,
          image: null, // Nếu không hợp lệ, xóa ảnh hiện tại
        }));
        setPreviewImage(null);
        Swal.fire({
          title: "Invalid File Type",
          text: "Only JPG and PNG files are allowed.",
          icon: "error",
        });
      }
    }
  };
  

  return (
    <MDBContainer className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="10" lg="8">
          <MDBCard>
            <MDBCardBody>
            <div className="text-center mb-4">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <MDBCardImage
                    src={previewImage || (empdetail.profilePicture ? `http://127.0.0.1:8080/uploads/employee/${empdetail.profilePicture}` : 'http://127.0.0.1:8080/uploads/employee/null-avatar.png')}
                    alt="avatar"
                    className="rounded-circle mb-2"
                    style={{ width: 150, height: 150, objectFit: "cover", cursor: "pointer" }}
                    onClick={() => document.getElementById("photo-upload").click()}
                  />
                  <input
                    type="file"
                    id="photo-upload"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
                </div>
                <h4 className="text-muted">{empdetail.jobTitle || "Job Title"}</h4>
              </div>


              <MDBRow className="mb-3">
                <MDBCol sm="4">
                  <MDBCardText>Employer Number</MDBCardText>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBInput
                    type="text"
                    name="employerNumber"
                    value={empdetail.employerNumber || getemp.employerNumber|| ""}
                    onChange={handleChange}
                    disabled
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol sm="4">
                  <MDBCardText>Role</MDBCardText>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBInput
                    type="text"
                    name="role"
                    value={empdetail.role || getemp.role|| ""}
                    onChange={handleChange}
                    disabled
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol sm="4">
                  <MDBCardText>Full Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBInput
                    type="text"
                    name="firstName"
                    value={empdetail.firstName || getemp.firstName|| ""}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol sm="4">
                  <MDBCardText>Phone Number</MDBCardText>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBInput
                    type="text"
                    name="phoneNumber"
                    value={empdetail.phoneNumber || getemp.phoneNumber|| ""}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol sm="4">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBInput
                    type="email"
                    name="email"
                    value={empdetail.email || getemp.email|| ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </MDBCol>
              </MDBRow>

              <div className="text-center">
                <button className="btn btn-secondary me-4" onClick={() => navigate(-1)}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={onsubmit}>
                  Update Profile
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProfileEmployee;
