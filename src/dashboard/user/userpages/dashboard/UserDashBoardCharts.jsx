import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "../dashboard/UserDashBoardCharts.css";
import axiosclient from "../../../../api/Axios";
import { jwtDecode } from "jwt-decode";

const UserDashBoardCharts = () => {
  const [job, setjob] = useState("");
  const [app, setApp] = useState("");
  const [inter, setInter] = useState("");
  const [applipass, setApplipass] = useState("");
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const token = localStorage.getItem("token");
  const jwt = jwtDecode(token);
  // const lineChartData = {
  //   labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   datasets: [
  //     {
  //       label: "Sales Value",
  //       data: [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000],
  //       borderColor: "#4c84ff",
  //       backgroundColor: "rgba(76, 132, 255, 0.2)",
  //       fill: true,
  //       tension: 0.4,
  //     },
  //   ],
  // };

  // const barChartData = {
  //   labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   datasets: [
  //     {
  //       label: "Total Orders",
  //       data: [25, 20, 30, 15, 10, 18],
  //       backgroundColor: "#ff6b6b",
  //     },
  //   ],
  // };
  const fetchjob = async () => {
    try {
      const res = await axiosclient.get(
        `/shopee-career/job/count-jobposting-by-employee/${jwt.id}`
      );
      setjob(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchapp = async () => {
    const res = await axiosclient.get(
      `/shopee-career/count-application-by-job-employer/${jwt.id}`
    );
    setApp(res.data);
    console.log(res.data);
  };
  const fetchinter = async () => {
    const res = await axiosclient.get(
      `/shopee-career/get-count-interview-by-jobposting-employee/${jwt.id}`
    );
    setInter(res.data);
    console.log(res.data);
  };
  const fetchapplicationpass = async () => {
    const res = await axiosclient.get(
      `/shopee-career/count-application-pass-by-job-employer/${jwt.id}`
    );
    setApplipass(res.data);
    console.log(res.data);
  };
  const fetchbymonth = async () => {
    try {
    const res=await axiosclient.get(`/shopee-career/count-application-job-by-month-employer/${jwt.id}`)
      const data = res.data;
      const labels = data.map((item) => `Month ${item.month}`);
      const totals = data.map((item) => item.total);
      setLineChartData({
        labels: labels,
        datasets: [
          {
            label: "Applications by Month",
            data: totals,
            borderColor: "#4c84ff",
            backgroundColor: "rgba(76, 132, 255, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching monthly data", error);
    }
  };
  const fetchbystatus=async()=>{
    try {
      const res=await axiosclient.get(`http://127.0.0.1:8080/shopee-career/count-application-job-by-status-employer/${jwt.id}`)
   
      const data = res.data;
  
      const labels = data.map((item) => item.status);
      const totals = data.map((item) => item.total);
  
      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Applications by Status",
            data: totals,
            backgroundColor: "#ff6b6b",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching status data", error);
    }
  }

  useEffect(() => {
    fetchjob();
    fetchapp();
    fetchinter();
    fetchapplicationpass();
    fetchbymonth();
    fetchbystatus();
  });

  return (
    <div className="dashboard">
      {/* Info Cards */}
      <div className="info-cards">
        <div className="card cards" style={{ "--icon-bg": "#ff6b6b" }}>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Job</h3>
              <p>{job}</p>
              <span>+12% Since last month</span>
            </div>
            <div className="">
              <i class="fas fa-briefcase" style={{ color: "#ff6b6b" }}></i>
            </div>
          </div>
        </div>
        <div className="card cards " style={{ "--icon-bg": "#ffa62b" }}>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Application</h3>
              <p>{app}</p>
              <span>+12% Since last month</span>
            </div>
            <div>
              <i className="fas fa-users" style={{ color: "#ffa62b" }}></i>
            </div>
          </div>
        </div>
        <div className="card cards " style={{ "--icon-bg": "#4caf50" }}>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Interview</h3>
              <p>{inter}</p>
              <span>+12% Since last month</span>
            </div>
            <i className="fas fa-users" style={{ color: "#ffa62b" }}></i>
          </div>
        </div>
        <div className="card cards" style={{ "icon-bg": "#36d1dc" }}>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Applicant</h3>
              <p>{applipass}</p>
              <span>+12% Since last month</span>
            </div>
            <i
              class="fa-solid fa-graduation-cap"
              style={{ color: "#36d1dc" }}
            ></i>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts charts__item">
        <div className="chart-line">
          <h2>Applications</h2>
          <Line data={lineChartData} />
        </div>
        <div className="chart-bar">
          <h2>Complete</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoardCharts;
