import React, { useState, useEffect ,Fragment} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { Button, Modal } from "react-bootstrap";
import parse from 'html-react-parser';
import Swal from "sweetalert2";
function SubjectDetailsPage() {
  // #Open and close model
  const parse = require('html-react-parser');
  const handleEmailClose = () => setshowEmailmodal(false);
  const handleEmailShow = () => setshowEmailmodal(true);
  let history = useHistory();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const { PID } = useParams();
  const { TID } = useParams();
  const { SID } = useParams();
  const [Subject, SetSubject] = useState([]);
  const [showEmailmodal, setshowEmailmodal] = useState(false);
  const [EmailExit, setEmailExit] = useState(false);
  const [Project, SetProject] = useState([]);
  const [regemail, setregemail] = useState([]);
  const [Team, SetTeam] = useState([]);
  const [Simages, SetSimages] = useState([]);
  const [comment, setcomment] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [loginpass, setloginpass] = useState("");
  const [Comments, SetComments] = useState([]);
  const [CommentsCount, SetCommentsCount] = useState(0);
  const [CountLikes, SetCountLikes] = useState(0);
  const [privilege, setprivilege] = useState(false);
  const [MakeLike, setMakeLike] = useState(false);
  const [regemailError, setregemailError] = useState(false);
  const [regpasswordError, setregpasswordError] = useState(false);
  const [regconfpassword, setregconfpassword] = useState(false);
  const [regconfpasswordError, setregconfpasswordError] = useState(false);
  const [regpassword, setregpassword] = useState(false);
  const [similarpass, setsimilarpass] = useState(false);
  const [code, setcode] = useState("");
  const [codeError, setcodeError] = useState(false);
  const [checkcodeError, setcheckcodeError] = useState(false);
  const [shouldHide, setshouldHide] = useState(false);
  const [codemsg, setcodemsg] = useState(false);
  const [codeExpire, setcodeExpire] = useState(false);
  const [CheckUser, setCheckUser] = useState(false);
  const [CheckPassword, setCheckPassword] = useState(false);
  const [loginemailError, setloginemailError] = useState(false);
  const [loginpassError, setloginpassError] = useState(false);
  const [Checkstatus, setCheckstatus] = useState(false);
  const [Colleage, SetColleage] = useState("");
  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/subjectPage/${PID}/${TID}/${SID}`
      );
      SetProject(response.project);
      SetTeam(response.team);
      SetSubject(response.subject);
      SetSimages(response.SubImages);
      SetColleage(response.CollegeName);
      SetComments(response.Comments);
      SetCommentsCount(response.CommentsCount);
      SetCountLikes(response.CountLikes);
      // setMakeLike(response.MakeLike);
      // console.log(response);
      if (response) {
        handlePrivilege();
        CheckLike();
      }
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const successMsgAlert = () => {
    Swal.fire({
      title: "تم تفعيل حسابكم ",
      text: "قم بتسجيل  الدخول",
      icon: "success",
    });
  };
  const refresh = () => {
    // it re-renders the component
    window.location.reload();
  };
  const handleLike = () => {
    if (email) {
      const uploadData = new FormData();
      uploadData.append("SID", SID);
      uploadData.append("email", email);
      uploadData.append("role", role);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/Like/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          // if (res.data === "delete") {
          //   localStorage.removeItem("like");
          // }
          // if (res.data === "add") {
          //   localStorage.setItem("like", true);
          // }
          refresh();
        })
  
    } else {
      handleEmailShow();
    }
  };

  const handleDeleteComment = (id) => {
    // console.log("commentId", id);
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteComment/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          refresh();
        }
      })
      
  };
  // console.log("typeof", CommentsCount, typeof CommentsCount);
  // console.log("CountLikes", CountLikes);
  // console.log("MakeLike", MakeLike);
  const dataSubjectImages = Simages.map((img, i) => {
    // console.log(img);
    // console.log(
    //   "https://" +
    //     REACT_APP_IP +
    //     
    //     "/media/" +
    //     img.SubjectImage
    // );

    // var img = REACT_APP_IMGPATH;

    return (
      <>
        <div key={i} className="col-md-3">
          <img
            className="img-thumbnail"
            style={{
              width: "300px",
              height: "150px",
              objectFit: "cover",
            }}
            src={
              "https://" +
              REACT_APP_IP +
              REACT_APP_IMGPATH +
              "/" +
              img.SubjectImage
            }
          />
        </div>
      </>
    );
  });

  // console.log("Comments: ", Comments);

  const dataComments = Comments.map((comment, i) => {
    return (
      <>
        <div className="mb-3  text-start pb-3 Commentbox">
          <p className="my-0 card-title">
            <img src={`/image/comment.png`} />
            <span className="ms-2">{comment.email}</span>
          </p>
          <p className="my-0">{comment.date}</p>
          <p className="my-0">{comment.Comment}</p>
          {comment.privilege == "1" ? (
            <button
              onClick={() => handleDeleteComment(comment.CommentID)}
              className="commenttrash"
            >
              <i className="fas fa-trash-alt "></i>
            </button>
          ) : null}
        </div>
      </>
    );
  });

  const handlePrivilege = () => {
    if (email) {
      const uploadData = new FormData();
      uploadData.append("SID ", SID);
      uploadData.append("email", email);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/privilege/`, uploadData)
        .then((res) => {
          SetComments(res.data);
          // console.log("handlePrivilege comments", res.data);
          // console.log(res.data);
        })

    }
  };
  const CheckLike = () => {
    if (email) {
      const uploadData = new FormData();
      uploadData.append("SID ", SID);
      uploadData.append("email", email);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/checkLike/`, uploadData)
        .then((res) => {
          // console.log("CheckLike ", res);
          if (res.data.checkLike=== '1') {
            setMakeLike(true);
          } else {
            setMakeLike(false);
          }
        })
        
    }
  };
  const handleComment = (e) => {
    e.preventDefault();
    if (email) {
      const uploadData = new FormData();
      uploadData.append("comment", comment);
      uploadData.append("subjectID", SID);
      uploadData.append("email", email);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addcomments/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "add") {
            // setcomment("");
            // console.log("Add Comments");
            refresh();
          }
        })
    
    } else {
      handleEmailShow();
    }
  };
  const Regvalidate = () => {
    if (regemail == "") {
      setregemailError(true);
    } else {
      setregemailError(false);
    }
    if (regpassword == "") {
      setregpasswordError(true);
    } else {
      setregpasswordError(false);
    }
    if (regconfpassword == "") {
      setregconfpasswordError(true);
    } else {
      setregconfpasswordError(false);
    }
    if (regemail == "" || regpassword == "" || regconfpassword == "") {
      return false;
    } else {
      return true;
    }
  };
  const codevalidate = () => {
    if (code == "") {
      setcodeError(true);
    } else {
      setcodeError(false);
    }
    if (code == "") {
      return false;
    } else {
      return true;
    }
  };
  const loginvalidate = () => {
    if (loginemail == "") {
      setloginemailError(true);
    } else {
      setloginemailError(false);
    }
    if (loginpass == "") {
      setloginpassError(true);
    } else {
      setloginpassError(false);
    }
    if (loginemail == "" || loginpass == "") {
      return false;
    } else {
      return true;
    }
  };
  const RedirectVisitor = () => {
    localStorage.setItem("email", regemail);
    localStorage.setItem("role", "visitor");
    handleEmailClose();
    window.location.reload();
  };
  const RedirectVisitorFromLogin = () => {
    localStorage.setItem("email", loginemail);
    localStorage.setItem("role", "visitor");
    handleEmailClose();
    window.location.reload();
   
  };

  //Redirect to admin page
  const RedirectAdmin = (EMAIL) => {
    localStorage.setItem("email", EMAIL);
    localStorage.setItem("role", "admin");
    handleEmailClose();
    window.location.reload();

  };

  const RedirectATeam = () => {
    localStorage.setItem("email", loginemail);
    localStorage.setItem("role", "team");
    handleEmailClose();
    window.location.reload();
  };

  const clearState = () => {
    setloginemail("");
    setloginpass("");
  };
  // #Submit register form
  const handlereglSubmit = (e) => {
    e.preventDefault();
    const isValid = Regvalidate();
    // console.log("isValid", isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("regemail", regemail);
      uploadData.append("regpassword", regpassword);
      uploadData.append("regconfpassword", regconfpassword);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/regEmail/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "exit") {
            setEmailExit(true);
          }
          if (res.data === "password") {
            setsimilarpass(true);
          }
          if (res.data === "visitor") {
            setEmailExit(true);
            setshouldHide(true);
          }
          if (res.data === "updated") {
            setshouldHide(true);
           
          }
        })
        
    }
  };
  // #Submit send code
  const handelSendCode = (e) => {
    e.preventDefault();
    const isValid = codevalidate();
    // console.log("isValid", isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("regemail", regemail);
      uploadData.append("code", code);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/checkVisitorCode/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "wrongCode") {
            setcheckcodeError(true);
          }
          if (res.data === "expired") {
            setcodeExpire(true);
          }
          if (res.data === "success") {
            successMsgAlert();
            setTimeout(function () {
              handleEmailClose();
              RedirectVisitor();
            }, 2000);
          }
        })
       
    }
  };
  // #Submit renew code
  const handlecoderenew = () => {
    // const isValid = codevalidate();
    const uploadData = new FormData();
    uploadData.append("regemail", regemail);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/renewCode/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "send") {
          setcodemsg(true);
        }
      })

  };
  // submit form
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isValid = loginvalidate();
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("email", loginemail);
      uploadData.append("password", loginpass);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/login/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          // check response from django BackEnd it check if email exit in database or not
          // to display message to user if email exit or success msg if not exit
          if (res.data === "user") {
            setCheckUser(true);
          } else {
            setCheckUser(false);
          }
          if (res.data === "password") {
            setCheckPassword(true);
          } else {
            setCheckPassword(false);
          }
         if (res.data === "admin") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectAdmin(loginemail)
          }
          if (res.data.includes('django')) {
            //Reset Form after submit
            let text=res.data
            let Djangoemail= text.slice(6)
            // console.log('adminDjango',Djangoemail)
            e.target.reset();
            clearState();
            RedirectAdmin(Djangoemail)
          }
          if (res.data === "team") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectATeam();
          }
          if (res.data === "visitor") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectVisitorFromLogin();
          }
          if (res.data === "NotApproved") {
            setCheckstatus(true);
          } else {
            setCheckstatus(false);
          }
        })
      
    }
  };

  var img = REACT_APP_IMGPATH;

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
                        img +
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
                      alt="dpImage"
                    />
                  )}
                  <h2 className="heading text-center">{Project.ProjectName}</h2>
                </div>
                <div className="team">
                  <span dir="rtl"className="pe-3">فريق {Team.TeamName}</span>
                  <span>{Colleage}</span>
                </div>

                <div className="projectDesc text-start">
                  <div className="dateClacify">
                    <span className="pe-3">{Project.ProjectProblem}</span>
                    <span className="border-start ps-2 py-1">
                      {Project.publishDate}
                    </span>
                  </div>
                </div>
             

                <div className="subjects my-3">
                  <div className="subtitle text-start">
                    <h5 className="card-title mb-2">{Subject.SubjectName}</h5>
                    <p className="lead"> </p>
                  </div>
                  <div className="subjectMedia">
                    <div className="row justify-content-center d-flex">
                      {/* to Display HTML string variable displaying as HTML  */}
                     <section className="content" dangerouslySetInnerHTML={{ __html:  Subject.SubjectDescription }}></section>
                    </div>
                  </div>
                </div>
                <div className="like  my-3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="checkboxcontainer border-bottom pb-2 text-start">
                        {CountLikes >= 1 ? (
                          <p
                            className="text-start lead fw-bold card-title"
                            style={{ display: "inline" }}
                          >
                            <span className="me-2">{CountLikes}</span>
                          </p>
                        ) : (
                          <p
                            className="text-start lead fw-bold card-title"
                            style={{ display: "inline" }}
                          >
                            لا يوجد
                          </p>
                        )}
                        {MakeLike ? (
                          <button
                            onClick={handleLike}
                            style={{
                              display: "inline",
                              border: "none",
                              background: "none",
                            }}
                          >
                            <i className="fas fa-thumbs-up card-title fa-lg"></i>
                          </button>
                        ) : (
                          <button
                            onClick={handleLike}
                            style={{
                              display: "inline",
                              border: "none",
                              background: "none",
                            }}
                          >
                            <i className="far fa-thumbs-up card-title fa-lg"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="comments">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="commentscount">
                        {CommentsCount >= 1 ? (
                          <p className="text-start lead fw-bold card-title">
                            <span className="me-2">{CommentsCount}</span>
                            <span>تعليق</span>
                          </p>
                        ) : (
                          <p className="text-start lead fw-bold card-title">
                            لا يوجد تعليق
                          </p>
                        )}
                      </div>
                      <form onSubmit={handleComment}>
                        <div className="mb-2">
                          <textarea
                            value={comment}
                            onChange={(evt) => setcomment(evt.target.value)}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            placeholder="اكتب تعليق"
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="mb-3 float-end">
                          <button
                            className="login-btn"
                            style={{ border: "none", padding: "0.4rem 5rem" }}
                            type="submit"
                          >
                            إرسال
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="commentsdetails">{dataComments}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
          <Modal show={showEmailmodal} onHide={handleEmailClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <nav className="fromlike">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-login-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-login"
                      type="button"
                      role="tab"
                      aria-controls="nav-login"
                      aria-selected="true"
                    >
                      تسجيل دخول
                    </button>
                    <button
                      className="nav-link"
                      id="nav-reg-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-reg"
                      type="button"
                      role="tab"
                      aria-controls="nav-reg"
                      aria-selected="true"
                    >
                      مستخدم جديد
                    </button>
                  </div>
                </nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-login"
                  role="tabpanel"
                  aria-labelledby="nav-login-tab"
                >
                  <form onSubmit={handleLoginSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fal fa-envelope"></i>
                      </span>
                      <input
                        onChange={(evt) => setloginemail(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="البريد الالكترونى"
                      />
                    </div>
                    {loginemailError ? (
                      <p className="error-msg">حقل البريد الإلكترونى مطلوب</p>
                    ) : null}
                    {CheckUser ? (
                      <p className="error-msg">البريد الإلكترونى غير صحيح</p>
                    ) : null}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-lock-alt"></i>
                      </span>
                      <input
                        onChange={(evt) => setloginpass(evt.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="كلمة المرور"
                      />
                    </div>
                    {/* show erroe msg */}
                    {loginpassError ? (
                      <p className="error-msg">حقل كلمة المرور مطلوب</p>
                    ) : null}
                    {CheckPassword ? (
                      <p className="error-msg">كلمة المرور غير صحيحة</p>
                    ) : null}
                    {Checkstatus ? (
                      <p className="error-msg">فضلاً إنتظر لحين إعتماد طلبك</p>
                    ) : null}
                    <Modal.Footer>
                      <Link
                        to={`/forgetpassword/`}
                        className="card-title"
                        style={{ borderBottom: "1px solid #252f6a" }}
                      >
                        فقدت كلمة المرور
                      </Link>
                      <Button
                        type="submit"
                        style={{
                          color: "#fff",
                          background: "#26306a",
                          border: "none",
                        }}
                      >
                        تسجيل دخول
                      </Button>
                    </Modal.Footer>
                  </form>
                </div>
                <div
                  className="tab-pane fade show"
                  id="nav-reg"
                  role="tabpanel"
                  aria-labelledby="nav-reg-tab"
                >
                  <form
                    className={shouldHide ? "hidden" : "showen"}
                    onSubmit={handlereglSubmit}
                  >
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fal fa-envelope"></i>
                      </span>
                      <input
                        onChange={(evt) => setregemail(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="البريد الالكترونى"
                      />
                    </div>
                    {regemailError ? (
                      <p className="snackbar">حقل البريد الإلكترونى مطلوب</p>
                    ) : null}
                    {EmailExit ? (
                      <p className="snackbar"> البريد الإلكترونى موجود</p>
                    ) : null}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-lock-alt"></i>
                      </span>
                      <input
                        onChange={(evt) => setregpassword(evt.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="كلمة المرور"
                      />
                    </div>
                    {regpasswordError ? (
                      <p className="snackbar">حقل كلمة المرور مطلوبة</p>
                    ) : null}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-lock-alt"></i>
                      </span>
                      <input
                        onChange={(evt) => setregconfpassword(evt.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="إعادة كلمة المرور"
                      />
                    </div>
                    {regconfpasswordError ? (
                      <p className="snackbar">حقل كلمة المرور مطلوبة</p>
                    ) : null}
                    {similarpass ? (
                      <p className="snackbar"> كلمة المرور غير متطابقة</p>
                    ) : null}

                    <Modal.Footer>
                      <Button
                        type="submit"
                        style={{
                          color: "#fff",
                          background: "#26306a",
                          border: "none",
                        }}
                      >
                        تسجيل مستخدم
                      </Button>
                    </Modal.Footer>
                  </form>
                  <form
                    onSubmit={handelSendCode}
                    className={shouldHide ? "showen" : "hidden"}
                  >
                    <label htmlFor="Input1" className="form-label">
                      ادخل رقم التفعيل المرسل إلى بريدك
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-signature"></i>
                      </span>

                      <input
                        onChange={(evt) => setcode(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="رقم التفعيل"
                      />
                    </div>
                    {codeError ? (
                      <p className="snackbar">حقل رقم التفعيل مطلوب</p>
                    ) : null}
                    {checkcodeError ? (
                      <p className="snackbar">حقل رقم التفعيل غير صحيح</p>
                    ) : null}
                    {codemsg ? (
                      <p className="snackbar">
                        تم إرسال رقم التفعيل جديد إلى بريدك
                      </p>
                    ) : null}
                    {codeExpire ? (
                      <p className="snackbar">كود التفعيل منتهى الصلاحية</p>
                    ) : null}

                    <Modal.Footer>
                      <Button
                        type="submit"
                        style={{
                          color: "#fff",
                          background: "#26306a",
                          border: "none",
                        }}
                      >
                        إرسال كود التفعيل
                      </Button>
                      <Button
                        type="button"
                        onClick={handlecoderenew}
                        style={{
                          color: "#fff",
                          background: "#26306a",
                          border: "none",
                        }}
                      >
                        كود تفعيل جديد
                      </Button>
                    </Modal.Footer>
                  </form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default SubjectDetailsPage;
