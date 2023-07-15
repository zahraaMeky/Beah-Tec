import TeamNavbar from "./TeamNavbar";
import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TeamProfile() {
  const MAX_LENGTH = 100;
  const { REACT_APP_IP, REACT_APP_IMGPATH ,REACT_APP_BACKEND_PORT} = process.env;
  const [teams, setteams] = useState([]);
  const [Members, setMembers] = useState([]);
  const [phone, setphone] = useState("");
  const [TID, setTID] = useState("");
  const [MemberNumber, setMemberNumber] = useState("");
  const [memberName, setmemberName] = useState("");
  const [memberMajor, setmemberMajor] = useState("");
  const [membeDescription, setmembeDescription] = useState("");
  const [memberImage, setmemberImage] = useState();
  const [Plogo, setPlogo] = useState("");
  const [updateMember, setupdateMember] = useState("");
  const [CurrentCount, setCurrentCount] = useState("");
  const [gender, setgender] = useState("");
  const [year, setyear] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [showEditmem, setshowEditmem] = useState(false);
  const [showEditphone, setshowEditphone] = useState(false);
  const [collage, setCollege] = useState("");


  let history = useHistory();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/login");
  };

  const emptyCache = () => {
    if('caches' in window){
    caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });

        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload(true);
    }
}
  
  useEffect(()=>{
    if (email==="supermind92@gmail.com") {

    } else {
      Logout();
    }
    
  },[email]);

  const alert = () => {

    toast.warn('قم بالضغط على زر الصواب لتحديث ما تم تعديله!', {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

      console.log("alert");
  }

  useEffect(() => {

    if (showEditphone) {
      const delayDebounceFn = setTimeout(() => {
        alert();
      }, 1000);

      return () => clearTimeout(delayDebounceFn)
    }
  }, [showEditphone]);

  useEffect(() => {

    if (showEditmem) {
      const delayDebounceFn = setTimeout(() => {
        alert();
      }, 1000);

      return () => clearTimeout(delayDebounceFn)
    }
  }, [showEditmem]);

  useEffect(() => {
    if (!email) {
      history.push("/login");
    }
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/team/${email}`
        );
        setteams(response.team);
        setMembers(response.members);
        setPlogo(response.pLogo);
        setCurrentCount(response.getmemberCount);
        setTID(response.team.TeamID);
        setMemberNumber(response.team.MemberNum);
        setCollege(response.college);
        // console.log("response", response);
        // console.log("teams", teams);
        // console.log("setCurrentCount", CurrentCount);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e, changeWhat) => {
    let value = e.target.value;
    if (changeWhat == "phone") {
      setphone(value);
      setshowEditphone(true);
      // console.log("phone", phone);
    }
    if (changeWhat == "memNum") {
      setupdateMember(value);
      setshowEditmem(true);
      // console.log("memNum", updateMember);
    }
  };
  
  const TeamMsgAlert = () => {
    // Swal.fire({
    //   icon: "error",
    //   title: "خطأ...",
    //   text: "فريقك مكون من " + MemberNumber + " أعضاء ",
    // });
  };

  const LimitNUmMsgAlert = () => {
    Swal.fire({
      icon: "error",
      title: "خطأ...",
      text: "عدد الفريق يجيب أن يكون ما بين 3 و 5",
    });
  };

  const CountMember = () => {
    // let c = CurrentCount + " من إجمالي " + MemberNumber;
    let c = CurrentCount;
    return c;
  };

  const refresh = () => {
    // it re-renders the component
    window.location.reload();
  };
  const handleDeleteMember = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deletemember/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          refresh();
        }
      })
     
  };

  let years = [
    "السنة الأولى",
    "السنة الثانية",
    "السنة الثالثة",
    "السنة الرابعة",
    "السنة الخامس فأكثر",
  ];
  const studyYears = years.map((year, i) => {
    return (
      <>
        <option key={i} value={year}>
          {year}
        </option>
      </>
    );
  });

  const defaultImg = (M) => {
    return (
      <div>
        {M.MemberGender=="ذكر" ? 
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
            src="/image/avatar2.png"
            className="img-fluid  rounded-circle"
            alt="pImage"
           /> 
        }
      </div>
    );
  }

  const dataMember = Members.map((Member, i) => {
    return (
      <>
        <div className="row  d-flex justify-content-center">
          <div className="col-md-9 align-items-center">
            <div
              className="card my-2"
              style={{ background: "rgba(0,0,0,.1)", boxShadow: "none" }}
            >
              <div class="card-body">
                <div className="row d-flex justify-content-start">
                  <div className="col">
                    <div className="d-flex">
                      <div>
                        {Member.MemberImage ? (
                          <img
                            src={
                              "https://" +
                              REACT_APP_IP +
                              REACT_APP_IMGPATH +
                              Member.MemberImage
                            }
                            className="rounded-circle  me-2"
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                          />
                        ) : 

                        <div>
                          {Member.MemberGender=="ذكر" ? 
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
                        
                      //   <img
                      //   style={{
                      //     width: "70px",
                      //     height: "70px",
                      //     objectFit: "cover",
                      //   }}
                      //   src="/image/avatar.png"
                      //   className="img-fluid  rounded-circle"
                      //   alt="pImage"
                      // /> 
                        
                        }
                      </div>

                      <div
                        class="card-title fw-bold"
                        style={{ marginTop: "0.7rem" }}
                      >
                        <p className="my-0">{Member.MemberName}</p>
                        <p className="my-0">{Member.MemberMajor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div class="card-title" style={{ marginTop: "0.7rem" }}>
                      <p className="my-0">{Member.MemberGender}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div class="card-title" style={{ marginTop: "0.7rem" }}>
                      <p className="my-0">{Member.MemberStudyYear}</p>
                    </div>
                  </div>
                  <div className="col">
                    {Member.MemberDescription.length > MAX_LENGTH ? (
                      <p
                        className="card-title"
                        style={{ textAlign: "justify", marginTop: "0.7rem" }}
                      >
                        {`${Member.MemberDescription.substring(
                          0,
                          MAX_LENGTH
                        )}...`}
                      </p>
                    ) : (
                      <p
                        className="card-title"
                        style={{ textAlign: "justify", marginTop: "0.7rem" }}
                      >
                        {Member.MemberDescription}
                      </p>
                    )}
                  </div>
                  <div className="col">
                    <div
                      className="editUpdate py-2"
                      style={{ background: "#26306a" }}
                    >
                      <Link
                        key={Member.ID}
                        to={`/Member/${Member.ID}/${TID}`}
                        className="px-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="تحديث الموضوع"
                        style={{
                          color: "#fff",
                          background: "none",
                          border: "none",
                        }}
                      >
                        <i className="far fa-edit fa-lg"></i>
                      </Link>
                      <button
                        onClick={() => handleDeleteMember(Member.ID)}
                        type="button"
                        className="px-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="حذف الموضوع"
                        style={{
                          color: "#fff",
                          background: "none",
                          border: "none",
                        }}
                      >
                        <i class="far fa-trash-alt fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  const handleupdate = (id) => {
    // console.log("id", id, "phone", phone);
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("phone", phone);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/phone/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "update") {
          // console.log("update phone!");
          setshowEditphone(false);
          refresh();
        }
      })

  };
  const handleMemberNum = (id) => {
    // console.log("id", id, "updateMember", updateMember);
    const uploadData = new FormData();

    if (updateMember > 2 && updateMember < 6) {
      uploadData.append("ID", id);
      uploadData.append("updateMember", updateMember);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/member/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "update") {
            // console.log("update Member!");
            setshowEditmem(false);
            refresh();
          }
        })
    
    } else {
      LimitNUmMsgAlert();
      setshowEditmem(false);
      setupdateMember("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("TID", TID);
    const uploadData = new FormData();
    uploadData.append("TID", TID);
    uploadData.append("memberName", memberName);
    uploadData.append("memberMajor", memberMajor);
    uploadData.append("membeDescription", membeDescription);
    uploadData.append("MemberNumber", MemberNumber);
    uploadData.append("gender", gender);
    uploadData.append("year", year);
    if (memberImage)
      uploadData.append("memberImage", memberImage, memberImage.name);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addMember/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "Madded") {
          // console.log("Added Member Success!");
          refresh();
        }
        if (res.data === "NotAdded") {
          TeamMsgAlert();
        }
      })
      
  };

  console.log(teams);

  return (
    <div>
      <ToastContainer />
      <TeamNavbar />
      <div className="container-fluid">
        <nav
          id="sidebarMenu"
          className="col-md-4 col-lg-3 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky">
            <ul
              className="nav flex-column list-group"
              style={{ background: "none" }}
            >
              {Plogo ? (
                <li className="list-group-item changepadding">
                  <span className="nav-link active">
                    <span>
                      <img
                        src={
                          "https://" +
                          REACT_APP_IP +
                          REACT_APP_IMGPATH +
                          "/" +
                          Plogo
                        }
                        className="rounded-circle"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                  </span>
                </li>
              ) : null}
              <Link className="nav-item list-group-item " to="/newteamdashboard">
                    <label className="form-label">إلى بيانات المشروع</label>
                    <div className="btn-group ps-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary remove_hover">
                          <i style={{ color: "#26306A" }} class="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                    
              </Link>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  اسم الفريق
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="Input1"
                    className="form-control"
                    value={teams.TeamName}
                  />
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  البريد الالكترونى
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="Input1"
                    className="form-control"
                    value={email}
                  />
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                 رقم التواصل
                </label>
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => handleChange(e, "phone")}
                    type="text"
                    className="form-control"
                    defaultValue={teams.PhoneNum}
                  />
                  {showEditphone ? (
                    <button
                      onClick={() => handleupdate(teams.ID)}
                      type="button"
                      style={{ background: "none", border: "none" }}
                    >
                      <i className="fas fa-check card-title fa-lg ms-1"></i>
                    </button>
                  ) : null}
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  اسم الكلية
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="Input1"
                    className="form-control"
                    value={collage}
                  />
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  عدد الأعضاء
                </label>
                <div className="input-group mb-3">
                  { (CountMember() <3) ? 
                  <input
                  value={CountMember()}
                  // onChange={(e) => handleChange(e, "memNum")}
                  type="text"
                  id="Input1"
                  style={{ color: "red" }}
                  className="form-control"
                  // placeholder={CountMember()}
                />
               :
               <input
                    value={CountMember()}
                    // onChange={(e) => handleChange(e, "memNum")}
                    type="text"
                    id="Input1"
                    // style={{ color: "red" }}
                    className="form-control"
                    // placeholder={CountMember()}
                  />
              }
                  {/* <input
                    value={CountMember()}
                    // onChange={(e) => handleChange(e, "memNum")}
                    type="text"
                    id="Input1"
                    style={{ color: "red" }}
                    className="form-control"
                    // placeholder={CountMember()}
                  /> */}
                  {showEditmem ? (
                    <button
                      onClick={() => handleMemberNum(teams.ID)}
                      type="button"
                      style={{ background: "none", border: "none" }}
                    >
                      <i className="fas fa-check card-title fa-lg ms-1"></i>
                    </button>
                  ) : null}
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-8 ms-sm-auto col-lg-9">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              {/* <h1 className="h5">
                  الرجوع للصفحة الرئيسية
                </h1> */}
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary remove_hover"
                    >
                    <Link to="/teamdashboard"
                    style={{ color: "#69696a" }}className="fad fa-arrow-alt-to-left fa-lg"></Link>
                    </button> */}
                  </div>
                </div>
              </div>
         

          {/* Add Model */}
          <div className="displaySubject  py-3">{dataMember}</div>
          { (CurrentCount < 5) ? 
          <div className="addSubject border py-3">
          <div className="row">
            <div className="col">
              <h6>إضافة أعضاء الفريق</h6>
            </div>
            <div className="col">
              <Button
                variant="primary"
                style={{
                  background: "#26306a",
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleShow}
              >
                <i class="fas fa-plus-circle fa-lg"></i>
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h6>إضافة عضو</h6>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                  >
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-signature"></i>
                      </span>
                      <input
                        onChange={(evt) => setmemberName(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="اسم العضو"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fad fa-mars"></i>
                      </span>
                      <select
                        value={gender}
                        onChange={(evt) => setgender(evt.target.value)}
                        className="form-select"
                        name="gender"
                      >
                        <option selected>اختر النوع </option>
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="far fa-graduation-cap"></i>
                      </span>
                      <select
                        value={year}
                        onChange={(evt) => setyear(evt.target.value)}
                        className="form-select"
                        name="year"
                      >
                        <option selected>اختر السنة الدراسية </option>
                        {studyYears}
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-signature"></i>
                      </span>
                      <input
                        onChange={(evt) => setmemberMajor(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="تخصص العضو"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-info"></i>
                      </span>
                      <textarea
                        onChange={(evt) =>
                          setmembeDescription(evt.target.value)
                        }
                        className="form-control"
                        placeholder="نبذة عن العضو"
                      ></textarea>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-image"></i>
                      </span>
                      <input
                        onChange={(evt) =>
                          setmemberImage(evt.target.files[0])
                        }
                        type="file"
                        className="form-control"
                        id="img"
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                      />
                      <label
                        className="form-control text-start uploadFile"
                        htmlFor="img"
                      >
                        تحميل صورة
                      </label>
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
                        حفظ
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
          : <></>}
          
        </main>
      </div>
    </div>
  );
}
export default TeamProfile;
