import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { Button, Popover } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function ProjectDetails() {
  let history = useHistory();
  const { id } = useParams();
  const [show, setshow] = useState(false);
  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  const [getteamContact, SetgetteamContact] = useState([]);
  const [Project, SetProject] = useState([]);
  const [Team, SetTeam] = useState([]);
  const [Member, SetMember] = useState([]);
  const [Subject, SetSubject] = useState([]);
  const [open, setOpen] = useState(false);
  const [getComments, SetgetComments] = useState();
  const [ChallengeName, SetChallengeName] = useState([]);
  const [message, setmessage] = useState("");
  const [CollegeName, SetCollegeName] = useState([]);
  const [members, SetMembers] = useState(0);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  const successMsgAlert = () => {
    Swal.fire({
      text: "تم إرسال رسالتكم ",
      icon: "success",
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectDetails/${id}`
        );
        SetMembers(response.members);
        SetProject(response.ProjectInfo);
        SetTeam(response.getteam);
        SetMember(response.getmember);
        SetSubject(response.getSubjects);
        SetgetteamContact(response.getteamContact);
        SetgetComments(response.getComments);
        SetChallengeName(response.ChallengeName);
        SetCollegeName(response.CollegeName);
        // console.log(response);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    // console.log("members: " , members);
   }, [members]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{getteamContact}</Popover.Header>
    </Popover>
  );

  const contactTeam = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button className="login-btn contactt" >تواصل مع الفريق</Button>
    </OverlayTrigger>
  );

  const aboutTeam = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Link
                    to={`/teammember/${Project.ID}`}
                    className="login-btn contactt "
                  >
                    تعرف على الفريق
       </Link>
       {/* <Button className="login-btn contactt" onClick={ Project.ID ? history.push(`/teammember/${Project.ID}`) : // console.log("") }>تعرف مع الفريق</Button> */}
    </OverlayTrigger>
  );

  const dataMember = Member.map((m, i) => {

    return (
      <>
        <div className="col-md-2">
          <div className="minfo d-flex my-4">
            <div className="mimage">
              {m.MemberImage ? (
                <img
                  src={
                    "https://" + REACT_APP_IP + REACT_APP_IMGPATH + m.MemberImage
                  }
                  className="rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                  }}
                />
              ) : 
              <div>
        {m.MemberGender=="ذكر" ? 
        <img
        style={{
          width: "70px",
          height: "70px",
          objectFit: "cover",
        }}
        src="/image/avatar.png"
        className="img-fluid  rounded-circle"
        alt="pImage"
      /> 
        : 
          <img
            style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
              }}
            src="/image/avatar2.jpg"
            className="img-fluid  rounded-circle"
            alt="pImage"
           /> 
        }
      </div>
              }
            </div>
            <div className="mname mt-1 ms-2 border-start ps-2 py-1">
              <p className="my-0">{m.MemberName}</p>
              <p className="my-0">{m.MemberMajor}</p>
            </div>
          </div>
        </div>
      </>
    );
  });
  const dataSubject = Subject.map((s, i) => {
    if (email) {
      return (
        <>
          <div className="col-md-9">
            <Link
              to={`/subjectdetailsPage/${Project.ID}/${Team.ID}/${s.ID}`}
              className="card my-2"
              style={{ background: "rgba(0,0,0,.1)", boxShadow: "none" }}
            >
              <div class="card-body">
                <div className="row d-flex justify-content-center">
                  <div className="col">
                    <p class="card-title fw-bold">{s.SubjectName}</p>
                  </div>
                  <div className="col">
                    <p class="card-title fw-bold">{s.publishDate}</p>
                  </div>
                  <div className="col">
                    <span className="card-title fw-bold ps-2">
                      {s.countLikes}
                      <i
                        className="far fa-heart-square ms-1"
                        style={{ fontSize: "1.4rem" }}
                      ></i>
                    </span>
                    <span className="card-title fw-bold ps-2 ">
                      {s.countComments}
                      <i
                        className="far fa-comment-alt ms-1"
                        style={{ fontSize: "1.4rem" }}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </>
      );
    } else {
      if (s.SubjectStatus == 0) {
        return (
          <>
            <div className="col-md-9">
              <Link
                to={`/subjectdetailsPage/${Project.ID}/${Team.ID}/${s.ID}`}
                className="card my-2"
                style={{ background: "rgba(0,0,0,.1)", boxShadow: "none" }}
              >
                <div class="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="col">
                      <p class="card-title fw-bold">{s.SubjectName}</p>
                    </div>
                    <div className="col">
                      <p class="card-title fw-bold">{s.publishDate}</p>
                    </div>
                    <div className="col">
                      <span className="card-title fw-bold ps-2">
                        {s.countLikes}
                        <i
                          className="far fa-heart-square ms-1"
                          style={{ fontSize: "1.4rem" }}
                        ></i>
                      </span>
                      <span className="card-title fw-bold ps-2 ">
                        {s.countComments}
                        <i
                          className="far fa-comment-alt ms-1"
                          style={{ fontSize: "1.4rem" }}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        );
      }
    }
  });
  const isAdmin = () => {
    if (email && role == "admin") {
      return (
        <>
        <div className="team">
                  <span className="pe-3" dir="rtl">
                    {Team.PhoneNum}
                  </span>
                  <span dir="rtl">{getteamContact}</span>
                </div>

          <Button
            type="button"
            className="login-btn"
            style={{ border: "none" }}
            onClick={() => {
              handleShow();

              // handleUpdate(notification.ID);
            }}
          >
            إبلاغ الفريق
          </Button>
        </>
      );
    }
  };
  const SendMsg = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("message", message);
    // console.log("project id",id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/sendnotifications/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "send") {
          successMsgAlert();
        }
      })
    
  };


  return (
    <div>
      <Header />
      <div className="projectInfo py-4">
        <div className="container">
          <div className="row justify-content-center d-flex">
            <div className="col-md-12">
              <div className="card py-5 px-5">
                <div className="projectNameLogo">
                  {Project.projectLogo ? (
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={
                        "https://" +
                        REACT_APP_IP +
                        REACT_APP_IMGPATH +
                        Project.projectLogo
                      }
                      className="img-fluid  rounded-circle"
                      alt="pImage"
                    />
                  ) : (
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={`/image/DefaultProject.jpg`}
                      className="img-fluid  rounded-circle"
                      alt="pImage"
                    />
                  )}
                  <h2 className="heading text-center">{Project.ProjectName}</h2>
                </div>
                <div className="team">
                  <span className="pe-3" dir="rtl">
                    فريق {Team.TeamName}
                  </span>
                  <span dir="rtl">{CollegeName=="أخرى"?" ":CollegeName}</span>
                </div>
                {/* check if admin */}
                <div className="row justify-content-center d-flex">
                  <div className=""> {isAdmin()}</div>
                </div>

                <div className="members">
                  <div className="row justify-content-center d-flex">
                    {dataMember}
                  </div>
                </div>
                <div className="projectDesc text-start">
                  <div className="dateClacify">
                    <span dir="rtl" className="pe-3">
                      {ChallengeName}
                    </span>
                    <span dir="rtl" className="border-start ps-2 py-1">
                      {Project.publishDate}
                    </span>
                  </div>
                  <div className="des">
                    <p>{Project.ProjectDescription}</p>
                  </div>
                </div>
                <div className="subjects mb-5">
                  <div className="row">{dataSubject}</div>
                </div>
                <div className="meetteam">
                  {/* <Link
                    to={`/teammember/${Project.ID}`}
                    className="login-btn contactt "
                    style={{ borderRadius: "0.25rem" }}
                  >
                    تعرف على الفريق
                  </Link> */}
                 {members>0 ?  <span className="ps-2">{aboutTeam()}</span> : <></>}
                 
                  {/* <span className="ps-2">{contactTeam()}</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>رسالة إلى الفريق</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={SendMsg}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                <textarea
                  onChange={(evt) => setmessage(evt.target.value)}
                  className="form-control"
                  placeholder="تفاصيل الرسالة"
                ></textarea>
              </div>
              <Modal.Footer>
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#26306a",
                    border: "none",
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  إرسال الرسالة
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}
export default ProjectDetails;
