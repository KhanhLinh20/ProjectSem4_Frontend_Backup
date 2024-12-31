import React, { useEffect, useState } from 'react';
import axiosclient from '../api/Axios';

const Track = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axiosclient.get(`shopee-career/list-application`);
      setApplications(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    setError(null); // Xóa lỗi trước đó
    setSelectedApplication(null); // Xóa kết quả trước đó

    // Tìm ứng dụng dựa trên mã ứng tuyển và email
    const app = applications.find(
      (app) =>
        app.applicationNumber === trackingCode && app.email === email
    );

    if (app) {
      setSelectedApplication(app);
    } else {
      setError('Application not found or email mismatch.');
    }
  };

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Application Tracker</h3>

      <div className="row justify-content-center">
        <div className="col-md-12">
          <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input your email..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="trackingCode" className="form-label">Application Code</label>
              <input
                type="text"
                id="trackingCode"
                className="form-control"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Input application code..."
              />
            </div>
            <button type="submit" className="btn w-100" style={{ backgroundColor: "#ee4d2d", color: "#fff" }}>
              Check status
            </button>
          </form>

          {/* Hiển thị thông báo lỗi hoặc kết quả */}
          {error && <div className="alert alert-danger mt-4">{error}</div>}
          {selectedApplication && (
            <div className="alert alert-success mt-4">
              <h5>Application Details:</h5>
              <p><strong>Status:</strong> {selectedApplication.applicationStatus}</p>
              <p><strong>Job Title:</strong> {selectedApplication.jobPostings?.jobTitle}</p>
              <p><strong>Description:</strong>
                <div dangerouslySetInnerHTML={{ __html: selectedApplication.jobPostings?.jobDescription }} />
              </p>
              <p><strong>Requirements:</strong>
                <div dangerouslySetInnerHTML={{ __html: selectedApplication.jobPostings?.requirements }} />
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .container {
          max-width: 600px;
          margin-top: 50px;
        }

        .form-label {
          font-weight: bold;
        }

        .btn {
          font-size: 1.1rem;
          padding: 12px;
        }

        .alert {
          font-size: 1.1rem;
          font-weight: bold;
        }

        .card {
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .row {
          display: flex;
          justify-content: center;
        }

        .col-md-6 {
          width: 100%;
          max-width: 500px;
        }

        .w-100 {
          width: 100%;
        }

        h5 {
          font-size: 1.2rem;
          font-weight: bold;
        }

        p {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Track;
