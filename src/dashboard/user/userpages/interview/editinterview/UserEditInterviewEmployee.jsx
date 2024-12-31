import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import Swal from "sweetalert2";
import axiosclient from "../../../../../api/Axios";

const UserEditInterviewEmployee = () => {
  const [interview, setInterView] = useState({
    startDate: "",
    time: "",
    location: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInterView((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const formatDate = (date) => {
    if (!date) return ""; // Return empty string if date is null/undefined
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(d.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  const fetchdata = async () => {
    const res = await axiosclient.get(`/shopee-career/get-interviewbyid/${id}`);
    setInterView(res.data.data);
    console.log(res.data.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("startDate", interview.startDate);
      formdata.append("time", interview.time);
      formdata.append("location", interview.location);
      const res = await axiosclient.put(
        `/shopee-career/update-interview/${id}`,
        formdata
      );

      await Swal.fire({
        title: "Success",
        text: "Update For InterView Success",
        icon: "Success",
      });

      navigate("/user/list-user-interview-employee");
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.response.data?.message,
        icon: "warning",
      });
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <div className="add-interview-container">
        <h2 className="my-5">Update InterView </h2>

        <form className="add-interview-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Interview StartDate</label>
            <input
              type="date"
              name="startDate"
              value={interview.startDate}
              onChange={handlechange}
            />
          </div>

          <div className="form-group">
            <label>Interview Time</label>
            <input
              type="time"
              name="time"
              value={interview.time}
              onChange={handlechange}
            />
          </div>

          <div className="form-group">
            <label>Interview Location</label>
            <select
              name="location"
              value={interview.location}
              onChange={handlechange}
            >
              <option value="">Select Location</option>
              <option value="391A Nam Ky Khoi Nghia Street, Vo Thi Sau Ward, District 3, Ho Chi Minh City">
                391A Nam Ky Khoi Nghia Street, Vo Thi Sau Ward, District 3, Ho
                Chi Minh City
              </option>
              <option value="8 Ton That Thuyet Street, My Dinh Ward, Tu Liem District, Ha Noi City">
                8 Ton That Thuyet Street, My Dinh Ward, Tu Liem District, Ha Noi
                City
              </option>
              <option value="590 Cach Mang Thang Tam Street, Ward 11, District 3, Da Nang City">
                590 Cach Mang Thang Tam Street, Ward 11, District 3, Da Nang
                City
              </option>
            </select>
          </div>

          <div className="button-group">
            <button type="button" className="back-button">
              <NavLink
                className="text-white"
                to="/user/list-user-interview-employee"
                style={{ textDecoration: "none" }}
              >
                Back
              </NavLink>
            </button>
            <button type="submit" className="submit-button">
              Update InterView
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditInterviewEmployee;
