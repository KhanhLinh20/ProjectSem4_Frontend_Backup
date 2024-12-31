import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axiosclient from "../../../../../api/Axios";
const UserCreateInterview = () => {
  const [startdate, setStartDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  // console.log(id);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  // console.log(decode);

  const navigate = useNavigate();

  

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const onsubmit = async (event) => {
    event.preventDefault();

    // Ask for confirmation using SweetAlert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this interview?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const formdata = new FormData();
        formdata.append("startDate", startdate);
        formdata.append("time", time);
        formdata.append("location", location);
        formdata.append("applicationID", id);
        formdata.append("employerID", decode.id);

        const res = await axiosclient.post(
          "/shopee-career/create-interview",
          formdata
        );
        console.log(res.data.data);

        await Swal.fire({
          title: "Success",
          text: "Create Interview",
          icon: "success",
        });

        navigate("/user/list-user-interview-employee");
      } catch (error) {
        await Swal.fire({
          title: "Error",
          text: error.response.data?.message,
          icon: "warning",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="add-interview-container">
        <h2>Set Up Interview </h2>

        <form className="add-interview-form" onSubmit={onsubmit}>
          <div className="form-group">
            <label>Interview Start Date</label>
            <input
              type="date"
              name="startDate"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              min={getCurrentDate()}
            />
          </div>

          <div className="form-group">
            <label>Interview Time</label>
            <input
              type="time"
              name="time"         
              value={time}
              onChange={(e) => setTime(e.target.value + ":00")}
            />
          </div>

          <div className="form-group">
            <label>Interview Location</label>
            <select
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="391A Nam Ky Khoi Nghia Street, Vo Thi Sau Ward, District 3, Ho Chi Minh City">391A Nam Ky Khoi Nghia Street, Vo Thi Sau Ward, District 3, Ho Chi Minh City</option>
              <option value="8 Ton That Thuyet Street, My Dinh Ward, Tu Liem District, Ha Noi City">8 Ton That Thuyet Street, My Dinh Ward, Tu Liem District, Ha Noi City</option>
              <option value="590 Cach Mang Thang Tam Street, Ward 11, District 3, Da Nang City">590 Cach Mang Thang Tam Street, Ward 11, District 3, Da Nang City</option>
            </select>
          </div>

          <div className="button-group">
            <button type="button" className="back-button">
              <NavLink
                className="text-white"
                to="/user/list-user-application-employee-withow-interview"
                style={{ textDecoration: "none" }}
              >
                Back
              </NavLink>
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Adding..." : "Add New Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateInterview;
