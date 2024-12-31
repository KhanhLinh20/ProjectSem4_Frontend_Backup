import React from 'react'
import Slider from "react-slick";
import lifegood from '../img/g1.jpg'
import lifegood2 from '../img/g2.jpg'
import '../css/lifegood.css'


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

const LifeGood = () => {
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
        <div className='mb-5 container'>
            <h3 className='text-center pb-5  '>Life At Company</h3>
            <Slider {...settings} className='mx-1' >

                <div>
                    <h5>
                        <img src={lifegood} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>
                <div>
                    <h5>
                        <img src={lifegood2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>
                <div>
                    <h5>
                        <img src={lifegood} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>
                <div>
                    <h5>
                        <img src={lifegood2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>
                <div>
                    <h5>
                        <img src={lifegood} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>
                <div>
                    <h5>
                        <img src={lifegood2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>
                </div>
                <div>
                    <h5>
                        <img src={lifegood} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>
                <div>
                    <h5>
                        <img src={lifegood2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                        <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                    </h5>

                </div>


            </Slider>

        </div>
    )
}

export default LifeGood
