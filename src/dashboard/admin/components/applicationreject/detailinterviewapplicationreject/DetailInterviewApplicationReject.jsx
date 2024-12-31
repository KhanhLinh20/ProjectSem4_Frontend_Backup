import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";


const DetailInterviewApplicationReject = () => {
  const  [detailapplication,setDetailapplication]=useState([]);
  const navigate=useNavigate();
  const {id}=useParams();
  console.log(id);
  
  const fetchdata=async ()=>{
    const res=await axiosclient.get(`/shopee-career/get-applicationbyid/${id}`)
    setDetailapplication(res.data.data);
    console.log(res.data.data);
    

  }
  useEffect(()=>{
    fetchdata();

  },[])

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" className="mb-4 mb-lg-1">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0" >
                  <MDBCol md="12">
                    <MDBCardBody className="p-4">
                        <div className="d-flex justify-content-between">
                        <MDBTypography tag="h6">Application Information</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.applicationStatus}
                          </MDBCardText>

                        </div>
                      
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Full Name</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.firstName}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.phoneNumber}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailapplication.email}
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
                      <MDBTypography tag="h6">Job Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Job Number</MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailapplication?.jobPostings?.jobNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Department</MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailapplication?.jobPostings?.jobCategory?.categoryName}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Job Title</MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailapplication?.jobPostings?.jobTitle}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Level</MDBTypography>
                          <MDBCardText className="text-muted">
                          {detailapplication?.jobPostings?.experiencedLevel}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Job Description</MDBTypography>
                          <MDBCardText className="text-muted">
                            <div className="card-text" dangerouslySetInnerHTML={{ __html: detailapplication?.jobPostings?.jobDescription?.split("").slice(0,5000).join("") }} />
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6">Job Requirements</MDBTypography>
                          <MDBCardText className="text-muted">
                            <div className="card-text" dangerouslySetInnerHTML={{ __html: detailapplication?.jobPostings?.requirements.split("").slice(0,5000).join("") }} />
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6">Employer Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Employer Number</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.employers?.employerNumber}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Employer Name</MDBTypography>
                          <MDBCardText className="text-muted">
                            {detailapplication.jobPostings?.employers?.firstName}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                        <NavLink className="btn btn-secondary my-5 text-center text-white text-decoration-none" to="/admin/list-application-reject">Back</NavLink>
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

export default DetailInterviewApplicationReject;
