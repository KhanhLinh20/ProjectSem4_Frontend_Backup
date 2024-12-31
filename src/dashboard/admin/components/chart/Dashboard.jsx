import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "../chart/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLocation } from "react-router-dom";
import axiosclient from "../../../../api/Axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const location = useLocation();
  const [success, setSuccessMessage] = useState("");
  const [vacancyCount, setVacancyCount] = useState(0); // Tổng số đơn ứng tuyển năm nay
  const [newVacancyCount, setNewVacancyCount] = useState(0); // Đơn ứng tuyển mới trong tháng
  const [vacancyPercentageChange, setVacancyPercentageChange] = useState(0); // Tỷ lệ thay đổi năm nay so với năm ngoái
  const [newVacancyPercentageChange, setNewVacancyPercentageChange] = useState(0); // Tỷ lệ thay đổi tháng này so với tháng trước
  const [monthlyApplications, setMonthlyApplications] = useState([]);
  const [countCategoryApplcation, setCountCategoryApplication] = useState([]);
  const [countApplication, setCountApplication] = useState([]);
  const [newJobCount, setNewJobCount] = useState(0); // New job postings this month
  const [newJobPercentageChange, setNewJobPercentageChange] = useState(0); // Percentage change in new job postings


  useEffect(() => {
    // Lấy thông báo thành công
    if (location.state?.successMessage) {
      setSuccessMessage(location.state?.successMessage);
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Fetch dữ liệu ứng tuyển
  useEffect(() => {
    const fetchCountApplicationData = async () => {
      try {
        const response = await axiosclient.get("/shopee-career/list-application");
        setCountApplication(response.data.data);
        console.log("Application: ", response.data.data);
      } catch (error) {
        console.error("Error fetching count application in category:", error);
      }
    }
    const fetchCountCategoryData = async () => {
      try {
        const response = await axiosclient.get("/shopee-career/job/list-jobposting");
        setCountCategoryApplication(response.data.data.content);
        console.log("Category Application: ", response.data.data.content);
      } catch (error) {
        console.error("Error fetching count application in category:", error);
      }
    }
    const fetchApplicationsByMonth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/shopee-career/list-application"
        );
        const applications = response.data.data;

        // Nhóm ứng tuyển theo tháng
        const groupedApplications = Array(12).fill(0); // Mảng với 12 tháng
        applications.forEach((application) => {
          const applicationDate = new Date(application.applicationDate);
          const month = applicationDate.getMonth(); // Lấy chỉ số tháng (0-11)
          groupedApplications[month]++;
        });

        setMonthlyApplications(groupedApplications); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching applications by month:", error);
      }
    };

    const fetchVacancyData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/shopee-career/list-application");
        const applications = response.data.data;

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Lọc đơn ứng tuyển năm hiện tại
        const currentYearApplications = applications.filter((application) => {
          const applicationDate = new Date(application.applicationDate);
          return applicationDate.getFullYear() === currentYear;
        });

        setVacancyCount(currentYearApplications.length); // Tổng số đơn ứng tuyển năm nay

        // Lọc đơn ứng tuyển năm ngoái
        const previousYearApplications = applications.filter((application) => {
          const applicationDate = new Date(application.applicationDate);
          return applicationDate.getFullYear() === currentYear - 1;
        });

        const previousYearCount = previousYearApplications.length;

        // Tính phần trăm thay đổi số lượng đơn ứng tuyển năm nay so với năm ngoái
        const vacancyChange =
          previousYearCount === 0
            ? currentYearApplications.length * 100 // Nếu không có dữ liệu năm ngoái
            : ((currentYearApplications.length - previousYearCount) /
                previousYearCount) *
              100;

        setVacancyPercentageChange(vacancyChange.toFixed(2));

        // Lọc đơn ứng tuyển tháng này
        const currentMonthApplications = applications.filter((application) => {
          const applicationDate = new Date(application.applicationDate);
          return (
            applicationDate.getMonth() === currentMonth &&
            applicationDate.getFullYear() === currentYear
          );
        });

        setNewVacancyCount(currentMonthApplications.length); // Số lượng đơn ứng tuyển mới tháng này

        // Lọc đơn ứng tuyển tháng trước
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Nếu là tháng 1, tháng trước là tháng 12
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const previousMonthApplications = applications.filter((application) => {
          const applicationDate = new Date(application.applicationDate);
          return (
            applicationDate.getMonth() === previousMonth &&
            applicationDate.getFullYear() === previousYear
          );
        });

        const previousMonthCount = previousMonthApplications.length;

        // Tính phần trăm thay đổi số lượng đơn ứng tuyển tháng này so với tháng trước
        const newVacancyChange =
          previousMonthCount === 0
            ? currentMonthApplications.length * 100 // Nếu không có dữ liệu tháng trước
            : ((currentMonthApplications.length - previousMonthCount) /
                previousMonthCount) *
              100;

        setNewVacancyPercentageChange(newVacancyChange.toFixed(2));
        const fetchNewJobData = async () => {
          try {
            const jobPostingsResponse = await axios.get("http://localhost:8080/shopee-career/job/list-all-job-posting");
            const jobPostings = jobPostingsResponse.data.data;
            

            const currentMonthJobPostings = jobPostings.filter((job) => {
              const jobDate = new Date(job.createdAt); // Assuming creationDate is the field
              const isStatusValid = job.status === "Publish" || job.status === "Close";
              const isCurrentMonth = jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
              return isStatusValid && isCurrentMonth;
            });
            

            setNewJobCount(currentMonthJobPostings.length); // Number of new jobs this month

            const previousMonthJobPostings = jobPostings.filter((job) => {
              const jobDate = new Date(job.createdAt);
              const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
              const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
              const isPreviousMonth = jobDate.getMonth() === previousMonth && jobDate.getFullYear() === previousYear;
              const isStatusValid = job.status === "Publish" || job.status === "Close";
              return isPreviousMonth && isStatusValid;

              // return jobDate.getMonth() === previousMonth && jobDate.getFullYear() === previousYear;
            });

            const previousMonthJobCount = previousMonthJobPostings.length;

            const newJobChange = previousMonthJobCount === 0
              ? currentMonthJobPostings.length * 100 // If no jobs from last month
              : ((currentMonthJobPostings.length - previousMonthJobCount) / previousMonthJobCount) * 100;

            setNewJobPercentageChange(newJobChange.toFixed(2)); // Percentage change in new job postings
          } catch (error) {
            console.error("Error fetching job posting data:", error);
          }
        };

        fetchNewJobData();
      } catch (error) {
        console.error("Error fetching vacancy data:", error);
      }
    };
    fetchCountApplicationData();
    fetchCountCategoryData();
    fetchApplicationsByMonth();
    fetchVacancyData();
    
  }, []);

  // Dữ liệu cho biểu đồ Recap hàng tháng
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Recap",
        data: monthlyApplications, // Thay bằng dữ liệu thật nếu có
        fill: true,
        borderColor: "#4F81BD",
        backgroundColor: "rgba(79, 129, 189, 0.2)",
        tension: 0.3,
        pointBackgroundColor: "#4F81BD",
      },
    ],
  };

  // Gộp thông tin totalSuccessApplicant theo categoryID
  const categoryData = [...countCategoryApplcation.reduce((map, jobPosting) => {
    const categoryID = jobPosting.jobCategory?.categoryID;
    if (!map.has(categoryID)) {
      map.set(categoryID, {
        categoryID: categoryID,
        categoryName: jobPosting.jobCategory?.categoryName,
        totalSuccessApplicant: 0,
        totalApplicants: 0,
      });
    }
    const category = map.get(categoryID);

    // Lấy số lượng từ jobPosting
    category.totalSuccessApplicant += jobPosting.totalSuccessApplicant || 0;

    // Tính tổng số ứng viên
    category.totalApplicants = countApplication.filter(
      application => application.jobPostings.jobCategory?.categoryID === categoryID
    ).length;

    return map;
  }, new Map()).values()];
  return (
    
    <div className="dashboard">
      
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      {/* Các thẻ thông tin */}
      <div className="info-cards">
        <div className="info-card">
          <div className="info-text">
            <h5>NUMBER OF VACANCY</h5>
            <h2>{vacancyCount}</h2> {/* Tổng số ứng tuyển năm nay */}
            <p>
              <span
                className={
                  vacancyPercentageChange >= 0 ? "text-success" : "text-danger"
                }
              >
                {vacancyPercentageChange >= 0
                  ? `↑ ${vacancyPercentageChange}%`
                  : `↓ ${-vacancyPercentageChange}%`}
              </span>{" "}
              Since last year
            </p>
          </div>
          <div className="info-icon">
            <i className="fas fa-box"></i>
          </div>
        </div>

        <div className="info-card">
          <div className="info-text">
            <h5>NEW VACANCY</h5>
            <h2>{newVacancyCount}</h2> {/* Tổng số ứng tuyển mới tháng này */}
            <p>
              <span
                className={
                  newVacancyPercentageChange >= 0
                    ? "text-success"
                    : "text-danger"
                }
              >
                {newVacancyPercentageChange >= 0
                  ? `↑ ${newVacancyPercentageChange}%`
                  : `↓ ${-newVacancyPercentageChange}%`}
              </span>{" "}
              Since last month
            </p>
          </div>
          <div className="info-icon">
            <i className="fas fa-search-plus"></i>
          </div>
        </div>

        <div className="info-card">
          <div className="info-text">
            <h5>NEW JOB</h5>
            <h2>{newJobCount}</h2> {/* Tổng số ứng tuyển mới tháng này */}
            <p>
              <span
                className={
                  newJobPercentageChange >= 0
                    ? "text-success"
                    : "text-danger"
                }
              >
                {newJobPercentageChange >= 0 ? `↑ ${newJobPercentageChange}%` : `↓ ${-newJobPercentageChange}%`}
              </span>{" "}
              Since last month
            </p>
          </div>
          <div className="info-icon">
            <i class="fa-solid fa-briefcase"></i>
          </div>
        </div>
      </div>

      

      {/* Biểu đồ Recap hàng tháng */}
      <div className="chart-container">
        <h5>Monthly Recap Report</h5>
        <Line data={lineData} options={{ responsive: true }} />
      </div>

      {/* Biểu đồ tiến trình ứng viên đã chọn */}
      <div className="applicants">
        <h5>Selected Applicants</h5>
        {categoryData.map((category, index) => (
          <div key={category.categoryID} className="applicant">
            <span>{category.categoryName}</span>
            <progress
              value={category.totalSuccessApplicant} // Số lượng ứng viên đã chọn
              max={category.totalApplicants} // Tổng số ứng viên
              className={`progress-bar progress-bar-${index}`}
            ></progress>
            <span>
              {category.totalSuccessApplicant} of {category.totalApplicants} Applicants
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
