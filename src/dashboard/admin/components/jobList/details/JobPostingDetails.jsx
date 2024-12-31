import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import "../details/JobPostingDetails.css";
import axiosclient from "../../../../../api/Axios";
import moment from "moment";
import Swal from "sweetalert2";

const JobPostingDetails = () => {
  const { id } = useParams();
  const [detailjobposting, setDetailjobposting] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const res = await axiosclient.get(`shopee-career/job/get-jobbyid/${id}`);
      setDetailjobposting(res.data.data);
      console.log(res.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  // const handleClick = async () => {
  //   try {
  //     const changestatus = await axiosclient.post(`/job/editjobstatus/${id}`);
  //     navigate("/admin/JobList");
  //   } catch (error) {
  //     setError("Failed to update status.");
  //   }
  // };
  const handlePublish = async () => {
    try {
      // Gửi request để thay đổi trạng thái công việc
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to publish this job?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Publish it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axiosclient.post(`shopee-career/job/change-status/${id}`);
        Swal.fire({
          title: "Success",
          text: "Job has been successfully published!",
          icon: "success",
        });
        navigate("/admin/joblistpublish");
      }
    } catch (error) {
      setError("Failed to update status.");
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <section className="vh-100 gradient-custom-2">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10" lg="10" xl="8">
              <MDBCard className="shadow-lg" style={{ borderRadius: "15px" }}>
                {/* Header */}
                <MDBCardHeader
                  className="p-4"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="fw-bold text-muted mb-2">
                        Job Number:{" "}
                        <span className=" text-body">
                          {detailjobposting.jobNumber}
                        </span>
                      </p>
                      <p className="fw-bold text-muted mb-0">
                        Create Date:{" "}
                        <span className="text-body">
                          {moment(detailjobposting.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </MDBCardHeader>

                {/* Body */}
                <MDBCardBody className="p-4">
                  <MDBTypography
                    tag="h5"
                    className="text-center text-primary fw-bold mb-4"
                  >
                    {detailjobposting.jobTitle}
                  </MDBTypography>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold text-muted">Department</h6>
                    <p className="text-dark">
                      {detailjobposting.jobCategory?.categoryName || "N/A"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-muted">Experienced Level</h6>
                    <p className="text-dark">
                      {detailjobposting.experiencedLevel || "N/A"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-muted">Location</h6>
                    <p className="text-dark">
                      {detailjobposting.location || "N/A"}
                    </p>
                  </div>

                  {/* Job Description - Hiển thị HTML */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-muted">Job Description</h6>
                    <div
                      className="border p-3 rounded bg-light"
                      dangerouslySetInnerHTML={{
                        __html: detailjobposting.jobDescription || "N/A",
                      }}
                    />
                  </div>

                  {/* Job Requirements - Hiển thị HTML */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-muted">Job Requirements</h6>
                    <div
                      className="border p-3 rounded bg-light"
                      dangerouslySetInnerHTML={{
                        __html: detailjobposting.requirements || "N/A",
                      }}
                    />
                  </div>
                </MDBCardBody>

                {/* Footer */}
                <MDBCardFooter className="p-4 d-flex justify-content-between bg-light">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      if (detailjobposting.status === "Draft") {
                        navigate("/admin/joblistdraft");
                      } else if (detailjobposting.status === "Publish") {
                        navigate("/admin/joblistpublish");
                      } else if (detailjobposting.status === "Close") {
                        navigate("/admin/job-list-close");
                      }
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handlePublish}
                    style={{ minWidth: "120px" }}
                  >
                    Publish
                  </button>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default JobPostingDetails;
