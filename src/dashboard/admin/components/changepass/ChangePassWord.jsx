import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosclient from "../../../../api/Axios";
import "../changepass/ChangePassWord.css";
import Loading from "../Loading/Loading";
const ChangePassWord = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[success,setSuccess]=useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const handleValidate = () => {
    const tempError = {};
    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleChange = async (eve) => {
    eve.preventDefault();
    if (!handleValidate()) return;
    setLoading(true); // Khi bắt đầu gửi request

    try {
      const data = {
        "email": decode.email,
        "oldPassword": oldPassword,
        "newPassword": newPassword,
        "confirmPassword": confirmPassword
      }
      const res = await axiosclient.put(`/shopee-career/change-password`, data);
      console.log(res.data);

      // setSuccess('Password changed successfully!')
      navigate("/admin",{state:{successMessage:"Password changed successfully!"}});
    } catch (error) {
      setLoading(false); // Dừng loading khi có lỗi

      if (error.response && error.response.data && error.response.data.message) {
        const serverError = error.response.data.message;
        setError((prev) => ({ ...prev, oldPassword: serverError }));
      } else {
        console.error("Error:", error);
        setError((prev) => ({
          ...prev,
          oldPassword: "An unexpected error occurred",
        }));
      }
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <Loading />; // Show Loading component if in loading state
    }
  };

  return (
    <div>
      <MDBContainer fluid className="p-3 my-4 h-custom">
        <MDBRow>
          <MDBCol col="8" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="8" md="4" className="ps-5">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h2 className="lead fw-normal mb-0 me-3">Change Password</h2>
            </div>
            {/* Hiển thị thông báo lỗi từ backend dưới tiêu đề */}
            {Object.keys(error).length > 0 && (
              <div className="alert alert-danger mt-3 mb-3">
                {Object.keys(error).map((key, index) => (
                  <span key={index}>{error[key]}</span>
                ))}
              </div>
            )}
            {loading && <Loading />}
            <div className="divider d-flex align-items-center my-4">
           
            </div>
            <form className="" onSubmit={handleChange}>
              <label htmlFor="" className="">
                Current Password
              </label>
              <div className="item__pass">
                <input
                  label="Old Password"
                  className="form-control"
                  type={showOldPassword ? "password" : "text"}
                  size="lg"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <i
                  className={`fa-regular ${
                    showOldPassword ? "fa-eye-slash" : "fa-eye"
                  } pass`}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                ></i>              
              </div>

              <label htmlFor="" className="mt-2">
                New Password
              </label>
              <div className="item__pass">
                <input
                  className="form-control"
                  type={showNewPassword ? "password" : "text"}
                  size="lg"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i
                  className={`fa-regular ${
                    showNewPassword ? "fa-eye-slash" : "fa-eye"
                  } pass`}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                ></i>
              </div>

              <label htmlFor="" className="mt-2">
                Confirm Password
              </label>
              <div className="item__pass">
                <input
                  label="Old Password"
                  className="form-control"
                  type={showConfirmPassword ? "password" : "text"}
                  size="lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i
                  className={`fa-regular ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  } pass`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <button
                  className="btn btn  mb-0 px-5"
                  size="lg"
                  style={{ backgroundColor: "#2C3E50", color: "white" }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#changepass"
                >
                  Change
                </button>
                
              </div>
              <div>
                <div
                  className="modal fade"
                  id="changepass"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Change Password Confirmation
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <p className="" style={{ color: "red" }}>
                          Do you want to change password?
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn"
                          data-bs-dismiss="modal"
                          style={{ backgroundColor: "#e67e22", color: "white" }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ChangePassWord;
