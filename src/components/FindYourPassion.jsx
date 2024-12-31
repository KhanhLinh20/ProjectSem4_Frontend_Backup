import React, { useEffect, useState } from 'react';
import '../css/findpassion.css';
import axiosclient from '../api/Axios';

// const jobCategories = [
//   { title: "Software Engineer", description: "Building cutting-edge technology", openJobs: 40 },
//   { title: "Product Manager", description: "Leading product development", openJobs: 35 },
//   { title: "Marketing Specialist", description: "Creating engaging campaigns", openJobs: 25 },
//   { title: "Data Analyst", description: "Analyzing business data", openJobs: 50 },
//   { title: "HR Specialist", description: "Managing recruitment and talent", openJobs: 20 },
//   { title: "Sales Executive", description: "Driving sales and business growth", openJobs: 30 },
//   { title: "UI/UX Designer", description: "Designing seamless user experiences", openJobs: 15 },
//   { title: "Customer Support", description: "Providing excellent customer service", openJobs: 10 },
//   { title: "Operations Manager", description: "Ensuring smooth operations", openJobs: 5 }
// ];

const FindYourPassion = () => {
    const [jobPostingData, setJobPostingData] = useState([]);
    const [jobData, setJobData] = useState([]);
    
    const fetchdata = async () => {
        try {
          const response = await axiosclient.get('shopee-career/job/list-all-job-posting');
          //   setJobPostingData(response.data.data);
          console.log(response.data.data);
          const uniqueCategories = [];
          response.data.data.forEach((job) => {
            const categoryName = job?.jobCategory?.categoryName;
            if (!uniqueCategories.includes(categoryName)) {
              uniqueCategories.push(categoryName);
            }
          });
          setJobPostingData(uniqueCategories);
          setJobData(response.data.data)
          console.log(uniqueCategories);
          console.log(response.data.data);
          
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
        fetchdata();
      }, []);
  return (
    <div className='my-5'>
      <div className='' style={{ width: "80%", margin: "auto" }}>
        <div className='my-5 text-center'>
          <h1 className='fw-bold' style={{color: "#ee4d2d"}}>Find Your Passion</h1>
          <h5 className='text-muted'>Explore exciting job opportunities that match your passion.</h5>
        </div>
        <div className="row">
          {jobPostingData.slice(0, 9).map((category, index) => (
            <div key={index} className="col-md-4 my-2">
              <div className="card item__find shadow-sm">
                <div className="card-body">
                  <a href="http://localhost:3000/opportunity" style={{ textDecoration: "none", color: "#e67e22" }}>
                    <h5 className="card-title">{category}</h5>
                  </a>
                  {/* <p className="card-text">{category.description}</p> */}
                  <p className='text-muted'>{jobData.filter(job => job.jobCategory?.categoryName === category && job.status === "Publish").length} Open</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .container {
          max-width: 1200px;
        }

        .fw-bold {
          font-weight: bold;
        }

        .text-primary {
          color: #3498db;
        }

        .item__find {
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .item__find:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .card-body {
          padding: 2rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .card-text {
          font-size: 1rem;
          color: #7f8c8d;
        }

        .text-muted {
          color: #95a5a6;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .col-md-4 {
          display: flex;
          justify-content: center;
          flex: 0 0 33.33%; /* 3 columns */
        }

        .my-5 {
          margin: 3rem 0;
        }

        @media (max-width: 767px) {
          .col-md-4 {
            flex: 0 0 100%;
          }

          .card-body {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default FindYourPassion;
