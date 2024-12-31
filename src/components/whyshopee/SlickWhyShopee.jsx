import React from 'react'
import Slider from "react-slick";
import slickwhy1 from '../../img/g1.jpg'
import slickwhy2 from '../../img/g2.jpg'
import slickwhy3 from '../../img/g3.jpg'

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

const SlickWhyShopee = () => {

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
        <div>
            <div className='mb-5 container'>
                <Slider {...settings} className='' >

                    <div>
                        <h5>
                            <img src={slickwhy1} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy3} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy1} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy3} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>
                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy1} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>
                    <div>
                        <h5>
                            <img src={slickwhy2} alt="Life" style={{ height: "260px ", width: "250px" }} />
                            <p style={{ background: "#7f8c8d", textAlign: "center", width: "250px", color: "white", fontWeight: "lighter" }}>life ours</p>
                        </h5>

                    </div>


                </Slider>

            </div>

        </div>
    )
}

export default SlickWhyShopee
