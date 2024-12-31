import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { NavLink, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import moment from "moment/moment";

const DetailInterview = () => {
  const { id } = useParams();
  console.log(id);
  const [detailinterview, setDetailinterview] = useState([]);

  const fetchdata = async () => {
    const res = await axiosclient.get(`/shopee-career/get-interviewbyid/${id}`);
    setDetailinterview(res.data.data);
    console.log(res.data.data);
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
                      <div className="d-flex justify-content-between">
                        <MDBTypography tag="h6">
                          Interview Information
                        </MDBTypography>
                        <MDBCardText className="text-muted">
                          {detailinterview.status}
                        </MDBCardText>
                      </div>

                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Interview Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailinterview.interviewNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Start Date</MDBTypography>
                          <MDBCardText className="text-muted">
                            {moment(detailinterview.startDate).format("DD/MM/YYYY")}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Time</MDBTypography>
                          <MDBCardText className="text-muted">
                            {moment(detailinterview.time).format("HH:mm A")}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      
                      <MDBTypography tag="h6">Job Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Job Number
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailinterview.applications?.jobPostings.jobNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Department
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailinterview.applications?.jobPostings.jobCategory.categoryName}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Job Title
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailinterview.applications?.jobPostings.jobTitle}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Experience Level</MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailinterview.applications?.jobPostings.experiencedLevel}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Location</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailinterview.location}
                          </MDBCardText>
                        </MDBCol>                        
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Job Description</MDBTypography>
                          <MDBCardText className="text-muted">
                          <div className="border p-3 rounded bg-light" dangerouslySetInnerHTML={{ __html: detailinterview.applications?.jobPostings.jobDescription.split("").slice(0,10000).join("") }}></div>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Job Requirements</MDBTypography>
                          <MDBCardText className="text-muted">
                          <div className="border p-3 rounded bg-light" dangerouslySetInnerHTML={{ __html: detailinterview.applications?.jobPostings.requirements.split("").slice(0,10000).join("") }}></div>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-between">
                        <MDBTypography tag="h6">
                          Applicant Information
                        </MDBTypography>
                        <MDBCardText className="text-muted">
                          {detailinterview.applications?.applicationStatus}
                        </MDBCardText>
                      </div>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Applicant Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailinterview.applications?.applicationNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Applicant Name</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailinterview.applications?.firstName}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailinterview.applications?.phoneNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailinterview.applications?.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Applcation Date</MDBTypography>
                          <MDBCardText className="text-muted">
                            {moment(detailinterview?.applications?.startDate).format("DD/MM/YYYY")}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">File CV</MDBTypography>
                          <MDBCardText className="text-muted">
                            {/* {detailinterview.applications?.location} */}
                            {detailinterview.applications?.resumefile ? (
                                <a
                                  href={`http://127.0.0.1:8080/uploads/filecv/${detailinterview.applications.resumefile}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {detailinterview.applications?.resumefile}
                                </a>
                              ) : (
                                <span>No Resume Available</span>
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <NavLink
                        className="btn btn-secondary my-5 text-center text-white text-decoration-none"
                        to="/admin/interview"
                      >
                        Back
                      </NavLink>
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

export default DetailInterview;
