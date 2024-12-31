import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import moment from "moment";
import Swal from "sweetalert2";

const DetailApplications = () => {
  const [detailapplication, setDetailapplication] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchdata = async () => {
    const res = await axiosclient.get(`/shopee-career/get-applicationbyid/${id}`);
    setDetailapplication(res.data.data);
  };

  const updatechangestatusreject = async (applicationID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this application as Fail?",
      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });
  
    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const res = await axiosclient.post(
          `/shopee-career/change-status-application-detail-fail/${applicationID}`
        );
        Swal.fire("Success", "The application has been marked as Fail.", "success").then(() => {
          navigate("/admin/list-application-reject"); // Điều hướng đến trang danh sách từ chối
        });
      } catch (error) {
        Swal.fire("Error", "Failed to update status.", "error");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" className="mb-4 mb-lg-1">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol md="12">
                    <MDBCardBody className="p-4">
                      <div className="d-flex justify-content-between mb-4">
                        <NavLink to="/admin/applicationwithowinterview" className="btn btn-secondary text-white text-decoration-none">
                          Back
                        </NavLink>
                      </div>
                      <MDBRow className="pt-1">
                        <div className="d-flex justify-content-between">
                          <MDBTypography tag="h4">Application Information</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.applicationStatus}
                          </MDBCardText>
                        </div>
                      </MDBRow>
                      

                      <hr className="mt-0 mb-4" />

                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Application Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.applicationNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Full Name</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.firstName}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.phoneNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Application Date</MDBTypography>
                          <MDBCardText className="text-muted">
                            {moment(detailapplication.createdAt).format("DD/MM/YYYY")}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">File CV</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.resumefile ? (
                              <a
                                href={`http://127.0.0.1:8080/uploads/filecv/${detailapplication.resumefile}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {detailapplication.resumefile}
                              </a>
                            ) : (
                              <span>No Resume Available</span>
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h4">Job Information</MDBTypography>
                      <hr className="mt-0 mb-4" />

                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Job Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.jobNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Department</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.jobCategory?.categoryName}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Job Title</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.jobTitle}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Location</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.location}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Level</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.experiencedLevel}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Job Description</MDBTypography>
                          <MDBCardText className="text-muted">
                            <div
                              className="border p-3 rounded bg-light"
                              dangerouslySetInnerHTML={{
                                __html: detailapplication.jobPostings?.jobDescription
                                  ?.split("")
                                  .slice(0, 5000)
                                  .join(""),
                              }}
                            />
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Requirements</MDBTypography>
                          <MDBCardText className="border p-3 rounded bg-light">
                            <div
                              className="card-text"
                              dangerouslySetInnerHTML={{
                                __html: detailapplication.jobPostings?.requirements
                                  ?.split("")
                                  .slice(0, 5000)
                                  .join(""),
                              }}
                            />
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      
                      <div className="d-flex justify-content-center my-5">
                        <button className="btn btn-danger text-white text-decoration-none me-3" onClick={() => updatechangestatusreject(detailapplication.applicationID)}>
                          Fail 
                        </button>
                        <NavLink
                          className="btn btn-primary text-white text-decoration-none "
                          to={`/admin/addinterview/${detailapplication.applicationID}`}
                        >
                          Set up an Interview
                        </NavLink>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default DetailApplications;
