import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className="text-center text-lg-start text-white" style={{ background: 'linear-gradient(135deg, #ee4d2d, #e67e22)', borderTop: '2px solid #ddd' }}>
      {/* Phần kết nối mạng xã hội */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Connect with us:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset text-decoration-none">
            <MDBIcon fab icon="linkedin" style={{ color: "#fff" }} />
          </a>
          <a href="https://github.com/KhanhLinh20" target='_blank' className="me-4 text-reset text-decoration-none">
            <MDBIcon fab icon="github" style={{ color: "#fff" }} />
          </a>
        </div>
      </section>

      {/* Nội dung footer */}
      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Shopee Career
              </h6>
              <p>
                Providing innovative solutions to help your business grow. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Accusantium, esse.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Springboot</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">React</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Flutter</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">MySQL</a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">User Management</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Job Management</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Interview Management</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Others</a>
              </p>
            </MDBCol>

            {/* Cột Contact - Điều chỉnh layout để không bị nhảy */}
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  590 Cach Mang Thang Tam Street, District 3, Ho Chi Minh City
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  khanhlinhdh98@gmail.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> +84 964 947 974
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Bản quyền */}
      <div className="text-center p-4" style={{ backgroundColor: '#f8f9fa', color: "black" }}>
        © 2024 Copyright: {" "}
        <a className="text-reset fw-bold text-decoration-none" href="">
          By Group 1
        </a>
      </div>
    </MDBFooter>
  );
}
