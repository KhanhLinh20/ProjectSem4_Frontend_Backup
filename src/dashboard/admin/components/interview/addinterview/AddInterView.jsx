import React, { useEffect, useState } from "react";
import "../addinterview/AddInterView.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const AddInterView = () => {
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

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tăng thêm 1 ngày
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
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

        navigate("/admin/interview");
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
              // min={getCurrentDate()}
              min={getMinDate()}
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
                to="/admin/applicationwithowinterview"
                style={{ textDecoration: "none" }}
              >
                Back
              </NavLink>
            </button>
            <button type="submit" className="submit-button" disabled={loading} style={{
                backgroundColor: loading ? "gray" : "#007bff",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}>
              {loading ? "Adding..." : "Add New Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInterView;
