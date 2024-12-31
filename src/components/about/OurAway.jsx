import React from 'react';
import ouraway from '../../img/g3.jpg';
import ouraway1 from '../../img/g4.jpg';

const OurAway = () => {
    return (
        <div style={{ margin: "80px 0" }}>
            {/* Tiêu đề chính */}
            <div
                className="text-center p-4"
                style={{
                    width: "80%",
                    margin: "auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    backgroundColor: "#f8f9fa",
                }}
            >
                <h3 style={{ fontWeight: "bold", fontSize: "1.8rem", color: "#2c3e50" }}>
                    Our Journey
                </h3>
                <p style={{ fontSize: "1rem", color: "#7f8c8d", margin: "15px 0" }}>
                    Discover the story behind our success and explore the values that guide us every step of the way.
                </p>
                <a
                    href="#"
                    className="btn"
                    style={{
                        backgroundColor: "#ee4d2d",
                        color: "white",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    Learn More
                </a>
            </div>

            {/* Các thẻ hình ảnh */}
            <div
                className="row row-cols-1 row-cols-md-3 g-4 mt-5"
                style={{ width: "80%", margin: "auto" }}
            >
                {/* Card 1 */}
                <div className="col">
                    <div
                        className="card h-100"
                        style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <img src={ouraway1} className="card-img-top" alt="Our Story 1" style={{ objectFit: "cover", height: "200px", width: "100%" }} />
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontWeight: "bold", color: "#2c3e50" }}>
                                Innovative Beginnings
                            </h5>
                            <p
                                className="card-text"
                                style={{ fontSize: "0.9rem", color: "#7f8c8d", lineHeight: "1.5" }}
                            >
                                Starting with a vision to innovate, we laid the foundation for our future growth by focusing on delivering value.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="col">
                    <div
                        className="card h-100"
                        style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <img src={ouraway1} className="card-img-top" alt="Our Story 2" style={{ objectFit: "cover", height: "200px", width: "100%" }} />
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontWeight: "bold", color: "#2c3e50" }}>
                                Milestones Achieved
                            </h5>
                            <p
                                className="card-text"
                                style={{ fontSize: "0.9rem", color: "#7f8c8d", lineHeight: "1.5" }}
                            >
                                Overcoming challenges and achieving milestones, we continue to grow and expand our impact globally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="col">
                    <div
                        className="card h-100"
                        style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <img src={ouraway} className="card-img-top" alt="Our Story 3" style={{ objectFit: "cover", height: "200px", width: "100%" }} />
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontWeight: "bold", color: "#2c3e50" }}>
                                Future Aspirations
                            </h5>
                            <p
                                className="card-text"
                                style={{ fontSize: "0.9rem", color: "#7f8c8d", lineHeight: "1.5" }}
                            >
                                With an eye on the future, we strive to innovate and inspire, shaping a better tomorrow for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurAway;
