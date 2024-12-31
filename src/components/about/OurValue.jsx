import React from 'react'
import ourvalue from '../../img/team.jpg'
import ouroffice1 from '../../img/ouroffice1.png'
import ouroffice2 from '../../img/ouroffice2.png'
import ouroffice3 from '../../img/ouroffice3.png'
import ouroffice4 from '../../img/ouroffice4.png'
import ouroffice5 from '../../img/ouroffice5.png'

const OurValue = () => {
    return (
        <div>
            <style>{`
                /* Làm đẹp các thẻ hình ảnh */
                .card-img-top {
                    object-fit: cover;
                    height: 250px; /* Đảm bảo hình ảnh không bị kéo dãn */
                }

                /* Làm đẹp các thẻ văn bản và icon */
                .card-body {
                    padding: 20px;
                    background-color: #f8f9fa;
                }

                /* Thêm hiệu ứng hover cho thẻ */
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                /* Cải thiện kiểu chữ cho tiêu đề và mô tả */
                .card-title {
                    font-size: 1.2rem;
                    color: #2c3e50;
                    font-weight: bold;
                }

                /* Tối ưu bố cục cho các thẻ */
                .row-cols-md-4 .col {
                    padding: 15px;
                }

                /* Các cải tiến cho phần 'Our Value' */
                .ourvalue__title .card-img-top {
                    height: 500px;
                    object-fit: cover;
                }

                /* Tạo hiệu ứng cho các icon */
                .card i {
                    color: #ee4d2d;
                    font-size: 60px;
                }

                .card-body {
                    text-align: center;
                }
            `}</style>



            {/* Our Offices Section */}
            <div className="container py-5">
            <h3 className="text-center">Our Offices</h3>
            <div className="row justify-content-center">
                {/* Office 1 */}
                <div className="col-md-3 mb-4">
                    <div className="office-box">
                        <img src={ouroffice1} alt="Office 1" className="office-img" />
                        <div className="office-info">
                            <h5 className="office-title">Global Presence</h5>
                            <p className="office-description">Explore our offices worldwide.</p>
                        </div>
                    </div>
                </div>
                {/* Office 2 */}
                <div className="col-md-3 mb-4">
                    <div className="office-box">
                        <img src={ouroffice2} alt="Office 2" className="office-img" />
                        <div className="office-info">
                            <h5 className="office-title">Office 2</h5>
                            <p className="office-description">Our headquarters for innovation.</p>
                        </div>
                    </div>
                </div>
                {/* Office 3 */}
                <div className="col-md-3 mb-4">
                    <div className="office-box">
                        <img src={ouroffice3} alt="Office 3" className="office-img" />
                        <div className="office-info">
                            <h5 className="office-title">City Office</h5>
                            <p className="office-description">In the heart of the city.</p>
                        </div>
                    </div>
                </div>
                {/* Office 4 */}
                <div className="col-md-3 mb-4">
                    <div className="office-box">
                        <img src={ouroffice4} alt="Office 4" className="office-img" />
                        <div className="office-info">
                            <h5 className="office-title">Office 4</h5>
                            <p className="office-description">A vibrant working space.</p>
                        </div>
                    </div>
                </div>
                {/* Office 5 */}
                {/* <div className="col-md-3 mb-4">
                    <div className="office-box">
                        <img src={ouroffice5} alt="Office 5" className="office-img" />
                        <div className="office-info">
                            <h5 className="office-title">Our Location</h5>
                            <p className="office-description">Find us at a prime location.</p>
                        </div>
                    </div>
                </div> */}
            </div>
            <style>{`
                .office-box {
                    position: relative;
                    overflow: hidden;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    padding: 10px; /* Add some padding */
                }

                .office-box:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }

                .office-img {
                    width: 100%;
                    height: 200px; /* Reduced height */
                    object-fit: cover;
                    transition: transform 0.3s ease;
                    border-radius: 10px;
                }

                .office-info {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                    padding: 15px;
                    background: rgba(0, 0, 0, 0.5);
                    color: #fff;
                    border-radius: 10px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }

                .office-box:hover .office-img {
                    transform: scale(1.1);
                }

                .office-box:hover .office-info {
                    opacity: 1;
                    transform: translateY(0);
                }

                .office-title {
                    font-size: 1.2rem; /* Slightly smaller title */
                    font-weight: bold;
                }

                .office-description {
                    font-size: 1rem;
                    margin-top: 10px;
                }

                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .col-md-3 {
                    flex: 1 1 23%; /* Make each card smaller */
                    margin: 10px;
                }

                @media (max-width: 768px) {
                    .col-md-3 {
                        flex: 1 1 48%; /* On smaller screens, make them larger */
                    }
                }

                @media (max-width: 576px) {
                    .col-md-3 {
                        flex: 1 1 100%; /* Stack cards on very small screens */
                    }
                }
            `}</style>
        </div>
        </div>
    )
}

export default OurValue
