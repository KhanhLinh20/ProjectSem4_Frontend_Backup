import React from 'react'
import event from '../../img/g4.jpg'
import event1 from '../../img/g5.jpg'
import event2 from '../../img/g6.jpg'
import Slider from "react-slick";
const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                display: "block",
                fontSize: "100px",  // Kích thước lớn hơn
                background: "none", // Không có background
                color: "#ecf0f1",      // Màu sắc của nút
                zIndex: 1,           // Đảm bảo nút nằm trên slider
                cursor: "pointer"    // Thay đổi con trỏ khi hover

            }}
            onClick={onClick}
        >
            ‹
        </div>
    );
}

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                display: "block",
                fontSize: "100px",  // Kích thước lớn hơn
                background: "none", // Không có background
                color: "#ecf0f1",      // Màu sắc của nút
                zIndex: 1,           // Đảm bảo nút nằm trên slider
                cursor: "pointer"    // Thay đổi con trỏ khi hover
            }}
            onClick={onClick}
        >
            ›
        </div>
    );
}

const EventWhyShopee = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        prevArrow: <PrevArrow />,  // Sử dụng nút tùy chỉnh cho prev
        nextArrow: <NextArrow /> // Sử dụng nút tùy chỉnh cho prev

    };
    return (
        <div style={{marginBottom:"70px"}}>
            <div className='text-center my-5' style={{ width: "80%", margin: "auto" }}>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quidem.With supporting text below as a natural lead-in to additional content Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quidem..</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <div>
                <Slider {...settings} className='' >

                    <div>
                        <h5>
                            <img src={event} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={event1} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={event2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={event} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={event1} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={event2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>
                    </div>
                    <div>
                        <h5>
                            <img src={event1} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={event2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>


                </Slider>
            </div>


        </div>
    )
}

export default EventWhyShopee
