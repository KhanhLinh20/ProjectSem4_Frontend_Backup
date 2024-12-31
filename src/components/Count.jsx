import React from 'react';
import CountUp from 'react-countup';

const Count = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <p className="text-muted mb-3">Building Careers Across Asia & America</p>
        <h5 className="fw-bold text-primary">Millions of Opportunities Await</h5>
      </div>

      <div className="row justify-content-center">
        {/* Counter Block */}
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 text-center mb-4">
            <div className="counter-card p-4 rounded shadow-lg">
              <CountUp start={0} end={75622.99} delay={0}>
                {({ countUpRef }) => (
                  <div className="fw-bold fs-2" style={{ color: '#e67e22' }}>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
              <p className="fw-bold text-dark mt-3">Best Brands</p>
              <p className="text-muted">Join the Leading Companies</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-center {
          text-align: center;
        }

        .text-primary {
          color: #3498db;
        }

        .fw-bold {
          font-weight: bold;
        }

        .fs-2 {
          font-size: 3rem;
        }

        .text-dark {
          color: #2c3e50;
        }

        .text-muted {
          color: #7f8c8d;
        }

        .counter-card {
          background-color: #ffffff;
          border: 1px solid #ecf0f1;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .counter-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .col-lg-3, .col-md-6, .col-sm-12 {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mb-4 {
          margin-bottom: 2rem;
        }

        .container {
          max-width: 1200px;
        }

        @media (max-width: 767px) {
          .fs-2 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Count;
