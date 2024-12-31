import React, { useEffect, useRef, useState } from "react";
import "../application/ApplicationApplyJob.css";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../api/Axios";
import Swal from "sweetalert2";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import emailjs from 'emailjs-com';
// import emailjs from 'emailjs-com';

const ApplicationApplyJob = () => {
  const [firstname, serFirstname] = useState("");
  const [phonenumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [resumfile, setresumefile] = useState("");
  const [fileerror, setFileError] = useState("");
  const [OTP, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [OTPInput, setOTPInput] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const { id, position } = useParams(); // Lấy id và vị trí công việc từ URL
  const navigate = useNavigate();
  const location = useLocation();
  const stompClient = useRef(null);
  const[isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTitle = location.state?.jobTitle || "Apply for Job";
  const [dataEmployer, setDataEmployer] = useState();

  const connect = () => {
  
      try {
        const Sock = new SockJS("http://localhost:8080/ws");
        stompClient.current = over(Sock);
  
        stompClient.current.connect({}, () => {}, () => {});
      } catch (ex) {
        console.log("Connection failed:", ex);
        setIsConnected(false); // Connection failed, update the status
      }
    }
  
    useEffect(() => {
      if (!isConnected) {
        connect();
      }
  
      return () => {
        if (stompClient.current && isConnected) {
          stompClient.current.disconnect(() => {
            console.log("Disconnected from WebSocket");
            setIsConnected(false); // Reset connection status on disconnect
          });
        }
      };
  }, []);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000); // Tạo OTP ngẫu nhiên 6 chữ số
  };
  

  const handlefile = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        if (file.size <= 5 * 1024 * 1024) {
          setresumefile(file);
          setFileError("");
        } else {
          setresumefile(null);
          setFileError("* File size must be less than 5MB");
        }
        
      } else {
        setresumefile(null);
        setFileError("* Only PDF files are allowed");
      }
    }
  };

  

  const sendOtp = async () => {
    setIsSendingOtp(true);
    const generatedOtp = generateOtp(); // Tạo OTP ngẫu nhiên
    try {
      const response = await emailjs.send(
        'service_1mys8f5', // Service ID của bạn
        'template_ccgaapf', // Template ID của bạn
        { email: email, otp: generatedOtp }, // Gửi thông tin email và OTP
        'Jxag781JWI51uG0DF' // User ID của bạn
      );
  
      if (response.status === 200) {
        setOtp(generatedOtp); // Lưu OTP để so sánh khi người dùng nhập vào
        setIsOtpSent(true); // Đánh dấu OTP đã được gửi
        alert("OTP has been sent to your email.");
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error("Error sending OTP", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false); // Đặt lại trạng thái gửi OTP sau khi hoàn thành
    }
  };

  useEffect(() => {
    console.log("OTP value updated:", OTP);
  }, [OTP]);

  const onSubmit = async (eve) => {
    eve.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log("Entered OTP:", OTPInput);
    console.log("Generated OTP:", OTP);

    if (!OTPInput.trim()) {
      await Swal.fire({
        title: "Error",
        text: "OTP cannot be empty.",
        icon: "error",
      });
      setIsSubmitting(false); // Đảm bảo việc submit không được tiếp tục
      return;
    }

    // Kiểm tra OTP trước khi gửi form
    if (String(OTP) !== String(OTPInput)) {
      await Swal.fire({
        title: "Error",
        text: "Wrong OTP. Please try again.",
        icon: "error",
      });
      setIsSubmitting(false); // Đảm bảo việc submit không được tiếp tục
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("firstName", firstname);
      formdata.append("phoneNumber", phonenumber);
      formdata.append("email", email);
      // formdata.append("")

      if (resumfile) {
        formdata.append("file", resumfile);
      }
      formdata.append("jobID", id);

      const postdata = await axiosclient.post(
        `/shopee-career/create-application`,
        formdata,
        { Headers: "Content-Type: multipart/form-data" }
      );
      const sendMessage = () => {
        stompClient.current.send("/app/send-notification", {}, JSON.stringify({
          message: `Candidate ${firstname} has applied for ${jobTitle}`,
          employerID: postdata.data.data.jobPostings.employers.employerID,
          applicationID: postdata.data.data.applicationID
        }));
      }
      
      if (postdata && postdata.data) {
        await Swal.fire({
          title: "Success",
          text: "Application submitted successfully!",
          icon: "success",
        });
        navigate("/opportunity");
      }
      sendMessage();
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol md="8">
              <MDBCard className="my-5 p-4">
                <MDBCardBody>
                  {/* Tiêu đề công việc */}
                  <h1 className="text-center mb-4 fw-bold">
                    {jobTitle}
                  </h1>

                  <MDBRow>
                    <MDBCol md="12">
                      <label>Full Name<span style={{color: "red"}}>*</span></label>
                      <MDBInput
                        wrapperClass="mb-4"
                        type="text"
                        value={firstname}
                        onChange={(e) => serFirstname(e.target.value)}
                      />
                    </MDBCol>
                  <MDBRow>
                    
                  </MDBRow>
                    <MDBCol md="12">
                      <label>Phone Number<span style={{color: "red"}}>*</span></label>
                      <MDBInput
                        wrapperClass="mb-4"
                        type="text"
                        value={phonenumber}
                        onChange={(e) => setphoneNumber(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="d-flex align-items-center justify-content-center">
                    <MDBCol md="10">
                      <label>Email<span style={{color: "red"}}>*</span></label>
                      <MDBInput
                        wrapperClass="mb-4"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                      
                    </MDBCol>
                    <MDBCol md="2">
                      <button
                        className="btn mt-2"
                        style={{color: "#fff", backgroundColor: "#ee4d2d"}}
                        type="button"
                        onClick={sendOtp}
                        disabled={!email || isOtpSent || isSendingOtp}
                      >
                        {isSendingOtp ? "Sending..." : "Send OTP"}
                      </button>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12">
                      <label>OTP Code<span style={{color: "red"}}>*</span></label>
                      <MDBInput
                        wrapperClass="mb-4"
                        type="text"
                        value={OTPInput}
                        onChange={(e) => setOTPInput(e.target.value)}
                        disabled={!isOtpSent}
                      />
                    </MDBCol>
                  </MDBRow>

                  <label>Upload your CV (PDF format only)<span style={{color: "red"}}>*</span></label>
                  <input
                    className="form-control mb-4"
                    type="file"
                    onChange={handlefile}
                  />
                  {fileerror && <span style={{ color: "red" }}>{fileerror}</span>}

                  <div className="text-end mt-3">
                    <button className="btn btn-secondary me-2" type="reset">
                      Reset All
                    </button>
                    <button
                      className="btn"
                      style={{color: "#fff", backgroundColor: "#ee4d2d"}}
                      type="submit"
                      // onClick={sendMessage}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </div>
  );
};

export default ApplicationApplyJob;
