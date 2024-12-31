import React from 'react';
import banner4 from '../img/shopee_cover_banner.jpg';
import banner2 from '../img/shopee_cover_banner1.jpg';
import banner3 from '../img/shopee_cover_banner2.jpg';
import banner5 from '../img/shopee_cover_banner3.jpg';

const Banner = () => {
  return (
    <div>
      <style>
        {`
          .carousel-inner img {
            max-height: 400px; /* Điều chỉnh chiều cao tối đa */
            object-fit: cover; /* Đảm bảo hình ảnh không bị méo */
          }
        `}
      </style>
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" />
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={3} aria-label="Slide 4" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval={10000}>
            <img src={banner4} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5 className="text-white">First slide label</h5>
              <p className="text-white">Some representative placeholder content for the first slide.</p> */}
            </div>
          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img src={banner2} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5 className="text-white">Second slide label</h5>
              <p className="text-white">Some representative placeholder content for the second slide.</p> */}
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5 className="text-white">Third slide label</h5>
              <p className="text-white">Some representative placeholder content for the third slide.</p> */}
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner5} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5 className="text-white">Fourth slide label</h5>
              <p className="text-white">Some representative placeholder content for the fourth slide.</p> */}
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
