import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axiosclient from "../../../../api/Axios";
import { jwtDecode } from "jwt-decode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserChartsJobPostingByEmployee = () => {
  const [chartsdata, setChartsdata] = useState({
    labels: [], // Tháng
    datasets: [
      {
        label: "Quantity Application",
        data: [], // Số lượng ứng dụng
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Màu nền
        borderColor: "rgba(54, 162, 235, 1)", // Màu viền
        borderWidth: 1,
      },
    ],
  });
  const token = localStorage.getItem("token");
  const jwt = jwtDecode(token);
  console.log(jwt);

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Quantity Application",
  //       data: [30, 10, 60, 70, 70, 70, 40], // Dữ liệu tương ứng với từng tháng
  //       backgroundColor: "rgba(54, 162, 235, 0.7)", // Màu nền
  //       borderColor: "rgba(54, 162, 235, 1)", // Màu viền
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Vị trí của chú thích (legend)
      },
      title: {
        display: true,
        text: "Job Chart", // Tiêu đề biểu đồ
      },
    },
  };

  const fetchdata = async () => {
    try {
      const res = await axiosclient.get(
        `/shopee-career/get-list-application-statis/${jwt.id}`
      );
      const data = res.data; // Kết quả từ API
      const labels = Object.keys(data); // Lấy các tháng từ key của object
      const values = Object.values(data);
      setChartsdata({
        labels: labels,
        datasets: [
          {
            label: "Quantity Application",
            data: values,
            backgroundColor: "rgba(54, 162, 235, 0.7)", // Màu nền
            borderColor: "rgba(54, 162, 235, 1)", // Màu viền
            borderWidth: 1,
          },
        ],
      }) // Lấy số lượng ứng dụng từ value của object
      
    } catch (error) {

      console.error(error);
      
    }
   
  };
  useEffect(()=>{
    fetchdata();


  },[])

  return (
    <div>
      <Bar data={chartsdata} options={options} />
    </div>
  );
};

export default UserChartsJobPostingByEmployee;
