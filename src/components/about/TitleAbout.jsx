import React from 'react';

const TitleAbout = () => {
  return (
    <div>
      {/* Phần tiêu đề chính */}
      <div
        className="my-5 text-center"
        style={{ maxWidth: "60%", margin: "auto" }}
      >
        <div className="card" style={{ border: "none", background: "none" }}>
          <div className="card-body">
            <h4 className="card-title pb-3" style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
              Empowering Businesses with Excellence in E-commerce
            </h4>
            <p className="card-text text-muted pb-4" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              At our platform, we strive to redefine the standards of online shopping, providing seamless solutions 
              for businesses and customers alike. With a commitment to innovation, reliability, and customer-centric 
              values, we empower businesses to reach new heights in the digital marketplace.
            </p>
            <a
              href="#"
              className="btn"
              style={{
                backgroundColor: "#ee4d2d",
                textDecoration: "none",
                borderRadius: "10px",
                color: "white",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Discover More
            </a>
          </div>
        </div>
      </div>

      {/* Phần các thẻ thông tin */}
      <div
        className="mb-5"
        style={{ maxWidth: "80%", margin: "auto" }}
      >
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-6">
            <div
              className="card h-100"
              style={{
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  Customer-Centric Approach
                </h5>
                <p className="card-text text-muted" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  We prioritize the needs of our customers by delivering tailored solutions that drive satisfaction 
                  and success. Our dedicated team ensures every detail is managed with precision and care.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            <div
              className="card h-100"
              style={{
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  Innovation at the Core
                </h5>
                <p className="card-text text-muted" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  Harnessing the power of cutting-edge technologies, we create innovative e-commerce solutions that 
                  enable businesses to stay ahead in an ever-changing digital landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleAbout;
