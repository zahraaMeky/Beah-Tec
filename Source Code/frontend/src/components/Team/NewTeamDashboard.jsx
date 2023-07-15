import TeamNavbar from "./TeamNavbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
// import FontAwesome from 'react-fontawesome';
// import faStyles from 'font-awesome/css/font-awesome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";


function NewTeamDashboard() {
  const [projects, setProjects] = useState([]);
  const [PID, setPID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [projectName, setprojectName] = useState("");
  const [membersCount, setmembersCount] = useState(0);
  const [projectDescription, setprojectDescription] = useState("");
  const [showEditName, setshowEditName] = useState(false);
  const [showEdiDescription, setshowEdiDescription] = useState(false);
  const [showImgFile, setshowImgFile] = useState(false);
  const [proposal, setproposal] = useState();
  const [Logo, setLogo] = useState();
  const [showFile, setshowFile] = useState(false);
  const [show, setShow] = useState(true);
  const [subtitle, setsubtitle] = useState("");
  const [subdescription, setsubdescription] = useState("");
  const [subimage, setsubimage] = useState();
  const [status, setstatus] = useState("");
  const { REACT_APP_IP ,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT,REACT_APP_BACKEND_HTTP } = process.env;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const started = localStorage.getItem("start");

  console.log("started: ", started);

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

  // console.log("retrievedValue: ", role);
  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/login");
  };

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

  // useEffect(()=>{
  //   emptyCache();
  // },[]);

  useEffect(()=>{
    Logout();
  },[email]);

  useEffect(()=>{

    if (started) {
      setShow(false);
    } else {
      localStorage.setItem("start" , "1");
    }
  }, []);

  useEffect(() => {

    if (showEdiDescription) {
      const delayDebounceFn = setTimeout(() => {
        alert();
      }, 1000);

      return () => clearTimeout(delayDebounceFn)
    }
  }, [showEdiDescription]);

  useEffect(() => {

    if (showEditName) {
      const delayDebounceFn = setTimeout(() => {
        alert();
      }, 1000);

      return () => clearTimeout(delayDebounceFn)
    }
  }, [showEditName]);

  useEffect(()=>{
    console.log("membersCount: " + membersCount);
  }, [membersCount]);

  const LimitNUmMsgAlert = () => {
    Swal.fire({
      icon: "error",
      title: "خطأ...",
      text: "لتسليم ملف المشروع يجب أن يكون عدد الفريق ما بين 3 و 5",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/project/${email}`
        );
        setProjects(response.projects);
        setSubjects(response.subjects);
        setPID(response.ProjectID);

        response.projects.map((project)=> {
          setmembersCount(project.memberCount);
        });
        // console.log("response", response);
        // console.log("ProjectID", response.ProjectID);

        // console.log("response subjects", response.subjects);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const refresh = () => {
    // it re-renders the component
    window.location.reload();
  };
    //function to generate select box for problems
    let subjectstatus = ["عام", "خاص"];
    const selectStatus = subjectstatus.map((Astatus, i) => {
      return (
        <>
          <option key={i} value={i}>
            {Astatus}
          </option>
        </>
      );
    });
  const handleDeleteSubject = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteSubject/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          refresh();
        }
      })
     
  };
  const dataProjects = projects.map((project, i) => {
    return (
      <>
        <li className="nav-item list-group-item">
          <label htmlFor="Input1" className="form-label">
            اسم المشروع
          </label>
          <div className="input-group mb-3">
            <input
              onChange={(e) => handleChange(e, "Name")}
              type="text"
              id="Input1"
              className="form-control"
              defaultValue={project.PName}
            />
            {showEditName ? (
              <button
                onClick={() => handleupdate_name(project.PID)}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                <i className="fas fa-check card-title fa-lg ms-1"></i>
              </button>
            ) : null}
          </div>
        </li>
        <li className="nav-item list-group-item ">
          <label htmlFor="Input1" className="form-label">
            وصف المشروع
          </label>
          <div className="input-group mb-3">
            <textarea
              onChange={(e) => handleChange(e, "description")}
              type="text"
              id="Input1"
              className="form-control"
              defaultValue={project.PDescription}
            ></textarea>
            {showEdiDescription ? (
              <button
                onClick={() => handleupdate_desc(project.PID)}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                <i className="fas fa-check card-title fa-lg ms-1"></i>
              </button>
            ) : null}
          </div>
        </li>
        {project.PProposalName ? (
          <li className="nav-item list-group-item ">
            <label htmlFor="Input1" className="form-label">
              الملف المرفوع حالياً
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                defaultValue={project.PProposalName}
              />
              <a
                href={
                  REACT_APP_BACKEND_HTTP+"://" +
                  REACT_APP_IP +
                  REACT_APP_IMGPATH +
                  "/" +
                  project.PProposalPath
                }
                className="btn btn-outline-secondary"
                target="_blank"
                type="application/octet-stream"
                download={project.PProposalName}
                id="button-addon2"
              >
                تحميل
              </a>
            </div>
          </li>
        ) : null}

        <li className="nav-item list-group-item ">
          <label className="form-label">تسليم ملف المشروع</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-file-alt"></i>
            </span>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleUpload(e)}
              className="form-control"
              id="file"
              style={{ display: "none" }}
            />
            <label
              className="form-control text-start uploadFile"
              htmlFor="file"
            >
                رفع الملف بصيغة (PDF) يجب أن يكون اسم الملف باللغة الإنجليزية
            </label>
            {showFile ? (
              <button
                onClick={() => handleupdate_file(project.PID)}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                <i className="fas fa-check card-title fa-lg ms-1"></i>
              </button>
            ) : null}
          </div>
        </li>
      </>
    );
  });

  const logo = projects.map((project, i) => {
    return (
      <>
        {project.PlogoPath ? (
          <li className="nav-item ">
            <span className="nav-link active" aria-current="page">
              <span data-feather="home"></span>
              <img
                src={
                  REACT_APP_BACKEND_HTTP+ "://" + REACT_APP_IP + REACT_APP_IMGPATH + "/" + project.PlogoPath
                }
                className="rounded-circle"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
            </span>
          </li>
        ) : null}
      </>
    );
  });

  const datalogoProjects = projects.map((project, i) => {
    return (
      <>
        {/* {project.PlogoPath ? (
          <li className="nav-item ">
            <span className="nav-link active" aria-current="page">
              <span data-feather="home"></span>
              <img
                src={
                  REACT_APP_BACKEND_HTTP+ "://" + REACT_APP_IP + REACT_APP_IMGPATH + "/" + project.PlogoPath
                }
                className="rounded-circle"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
            </span>
          </li>
        ) : null} */}
        <li className="nav-item list-group-item ">
          <label className="form-label">تحميل شعار الفريق</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-file-alt"></i>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImgUpload(e)}
              className="form-control"
              id="logo"
              style={{ display: "none" }}
            />
            <label
              className="form-control text-start uploadFile"
              htmlFor="logo"
            >
              تحميل صورة
            </label>
            {showImgFile ? (
              <button
                onClick={() => handleupdate_logo(project.PID)}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                <i className="fas fa-check card-title fa-lg ms-1"></i>
              </button>
            ) : null}
          </div>
        </li>
      </>
    );
  });

  const dataSubject = subjects.map((subject, i) => {
    return (
      <>
        <div className="row  d-flex justify-content-center">
          <div className="col-md-9 align-items-center">
            <div
              className="card my-2"
              style={{ background: "rgba(0,0,0,.1)", boxShadow: "none" }}
            >
              <div className="card-body">
                <div className="row d-flex justify-content-center">
                  <div className="col">
                    <p className="card-title fw-bold">{subject.SName}</p>
                  </div>
                  <div className="col">
                    <span className="card-title fw-bold ps-2">
                      {subject.countLike}
                      <i
                        className="far fa-heart-square mx-1"
                        style={{ fontSize: "1.4rem" }}
                      ></i>
                    </span>
                    <span className="card-title fw-bold ps-2">
                      {subject.count}
                      <i
                        className="far fa-comment-alt mx-1"
                        style={{ fontSize: "1.4rem" }}
                      ></i>
                    </span>
                  </div>
                  <div className="col">
                    <div
                      className="editUpdate py-2"
                      style={{ background: "#26306a" }}
                    >
                      <Link
                        key={subject.SID}
                        to={`/Subject/${subject.SID}/${PID}`}
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
                        onClick={() => handleDeleteSubject(subject.SID)}
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
                        <i className="far fa-trash-alt fa-lg"></i>
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

  const handleUpload = (e) => {

    // check members count
    if (membersCount>=3) {
      let value = e.target.files[0];
      setproposal(value);
      setshowFile(true);
      alert();
    } else {
      LimitNUmMsgAlert();
    }
  };
  const handleImgUpload = (e) => {
    let value = e.target.files[0];
    setLogo(value);
    setshowImgFile(true);
    alert();
    // console.log("Logo", Logo);
  };
  const handleChange = (e, changeWhat) => {
    let value = e.target.value;
    if (changeWhat == "Name") {
      setprojectName(value);
      setshowEditName(true);
      // console.log("projectName", projectName);
    }
    if (changeWhat == "description") {
      setprojectDescription(value);
      setshowEdiDescription(true);
      // console.log("projectDescription", projectDescription);
    }
  };

  const handleupdate = (id) => {
    // console.log("id", id, "projectName", projectName);
    const uploadData = new FormData();
    uploadData.append("ID", id);
    if(showEditName) uploadData.append("projectName", projectName);
    if(showEdiDescription) uploadData.append("projectDescription", projectDescription);
    if (proposal) uploadData.append("proposal", proposal, proposal.name);
    if (Logo) uploadData.append("Logo", Logo, Logo.name);
    axios
      .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectUpdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "UpdatedProject") {
          // console.log("UpdatedProject!");
          setshowEditName(false);
          setshowEdiDescription(false);
          setshowFile(false);
          refresh();
        }
      })
  
  };

  const handleupdate_name = (id) => {
    
    if (showEditName) {
      const uploadData = new FormData();
      uploadData.append("ID", id);
      uploadData.append("projectName", projectName);
      axios
        .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectUpdate/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "UpdatedProject") {
            // console.log("UpdatedProject!");
            setshowEditName(false);
            // setshowEdiDescription(false);
            // setshowFile(false);
            refresh();
          }
        })
    }
    
  
  };

  const handleupdate_desc = (id) => {
    
    if(showEdiDescription) {
      const uploadData = new FormData();
      uploadData.append("ID", id);
      uploadData.append("projectDescription", projectDescription);

      axios
        .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectUpdate/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "UpdatedProject") {
            // console.log("UpdatedProject!");
            // setshowEditName(false);
            setshowEdiDescription(false);
            // setshowFile(false);
            refresh();
          }
        })
    }
    
  
  };

  const handleupdate_logo = (id) => {
    
    if (Logo) {
      const uploadData = new FormData();
      uploadData.append("ID", id);
      uploadData.append("Logo", Logo, Logo.name);
      axios
        .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectUpdate/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "UpdatedProject") {
            // console.log("UpdatedProject!");
            setshowImgFile(false);
            refresh();
          }
        })
    }
    
  };

  const handleupdate_file = (id) => {
    // console.log("id", id, "projectName", projectName);
    
    if (proposal) {
      const uploadData = new FormData();
      uploadData.append("ID", id);
      uploadData.append("proposal", proposal, proposal.name);
      axios
      .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectUpdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "UpdatedProject") {
          // console.log("UpdatedProject!");
          setshowFile(false);
          refresh();
        }
      })
    }
  
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    // console.log("id", id);
    const uploadData = new FormData();
    const images = new FormData();
    uploadData.append("ID", id);
    uploadData.append("subtitle", subtitle);
    uploadData.append("subdescription", subdescription);
    uploadData.append("status", status);
    uploadData.append("count", subimage.length);
    for (let i = 0; i < subimage.length; i++) {
      uploadData.append(`images[${i}]`, subimage[i], subimage[i].name);
    }
    // console.log("images", images);
    axios
      .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addSubject/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "added") {
          // console.log("Added Subject Success!");
          refresh();
        }
      })
     
  };
  const RenderElment = () => {
    if (email && role == "team") {
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
                    {logo}

                  <Link className="nav-item list-group-item " to="/teamprofile">
                    <label className="form-label">إلى بيانات الفريق</label>
                    <div className="btn-group ps-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary remove_hover">
                          <i style={{ color: "#26306A" }} class="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                    
                  </Link>

                  <a className="nav-item list-group-item" 
                      style={{ display: "block", color: "#212529" }}
                      href={
                        REACT_APP_BACKEND_HTTP+"://" +
                        REACT_APP_IP +
                        `:${REACT_APP_BACKEND_PORT}/static/Files/beahtec-project.pdf`
                      }
                      target="_blank"
                      type="application/octet-stream"
                      download="beahdemand.pdf"
                      id="button-addon2"
                  >
                    <label className="form-label">نموذج ملف المشروع</label>
                    <div className="btn-group ps-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary remove_hover">
                          <i style={{ color: "#26306A" }} class="fa-solid fa-cloud-arrow-down"></i>
                      </button>
                    </div>
                    
                  </a>

                  <a className="nav-item list-group-item" 
                      style={{ display: "block", color: "#212529" }}
                      href={
                        REACT_APP_BACKEND_HTTP+"://" +
                        REACT_APP_IP +
                        `:${REACT_APP_BACKEND_PORT}/static/Files/beahtec-project_evaluation.pdf`
                      }
                      target="_blank"
                      type="application/octet-stream"
                      download="beahdemand.pdf"
                      id="button-addon2"
                  >
                    <label className="form-label">معايير تقييم أداء المشروع</label>
                    <div className="btn-group ps-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary remove_hover">
                          <i style={{ color: "#26306A" }} class="fa-solid fa-cloud-arrow-down"></i>
                      </button>
                    </div>
                    
                  </a>

                  {/* <li className="nav-item list-group-item">
                    <label className="form-label">نموذج لمقترح المشروع</label>
                    <div className="btn-group ps-3">
                    <button style={{border:'none'}}
                      type="button"
                      className="btn btn-sm btn-outline-secondary remove_hover"
                    >
                     <a
                      className="card-title"
                      style={{ display: "block", color: "#212529" }}
                      href={
                        REACT_APP_BACKEND_HTTP+"://" +
                        REACT_APP_IP +
                        `:${REACT_APP_BACKEND_PORT}/static/Files/beahdemand.pdf`
                      }
                      target="_blank"
                      type="application/octet-stream"
                      download="beahdemand.pdf"
                      id="button-addon2"
                    >
                       <i style={{ color: "#26306A" }}  className="far fa-cloud-download-alt card-title btn btn-sm btn-outline-secondary remove_hover"></i>
                    </a>
                    </button>
                  </div>
                  </li> */}

                  {/* <li className="nav-item list-group-item ">
                    <label className="form-label">ملف التقييم</label>
                    <div className="btn-group ps-3">
                    <button style={{border:'none'}}
                      type="button"
                      className="btn btn-sm btn-outline-secondary remove_hover"
                    >
                         <a
                      className="card-title"
                      style={{ display: "block", color: "#212529" }}
                      href={
                        REACT_APP_BACKEND_HTTP+"://" +
                        REACT_APP_IP +
                        `:${REACT_APP_BACKEND_PORT}/static/Files/beahdemand.pdf`
                      }
                      target="_blank"
                      type="application/octet-stream"
                      download="beahdemand.pdf"
                      id="button-addon2"
                    >
                       <i style={{ color: "#26306A" }}  className="far fa-cloud-download-alt card-title btn btn-sm btn-outline-secondary remove_hover"></i>
                    </a>
                    </button>
                  </div>
                  </li> */}

                  {datalogoProjects}
                  <li className="nav-item list-group-item ">
                   
                   <Button className="ins-btn"  onClick={handleShow}>
                   التعليمات        
                   </Button>
                
                   </li>
              ` <li className="nav-item list-group-item logout-btn-collapse">
                <button
                    onClick={Logout}
                    className="nav-link px-3"
                    href="#"
                    style={{ background: "none", border: "none" }}
                  >
                    Log Out <i className="fas fa-sign-out-alt"></i>
                  </button>
                  </li>

                </ul>
              </div>
            </nav>
            <main className="col-md-8 ms-sm-auto col-lg-9">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                    <div className="my-5">{dataProjects}</div>
                    </div>
                </div>
                   {/* Add Model for Instructions */}
                   <div className="row">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>التعليمات</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div id="ins" class="carousel slide"  data-bs-interval="false" data-bs-ride="carousel">
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <div class="d-none d-md-block pt-2 pb-4">
                                  <p>مرحبا بأصدقاء بيئة تك 💫</p>
                                  <p>
                                  المرحلة الحالية هي مرحلة تنفيذ المشاريع، 
                                  حيث يطلب من جميع الفرق المتأهلة البدء في تنفيذ أفكارهم ومشاريعهم بشكل 
                                  واقعي وتفصيلي أكثر لمرحلة التقييم القادمة وبإمكانكم 
                                  الرجوع إلى نموذج ملف المشروع وملف معايير التقييم الموجودان في لوحة التحكم
                                  </p>
                                  <p>طاب يومكم 🌿</p>
                                </div>
                              </div>
                              <div class="carousel-item">
                                <img src='/image/ins1.png' class=" d-block w-100" />
                                <p style={{"margin-bottom": "2rem"}}>
                                   يمكنك في هذه الصفحة تحديث اسم ووصف المشروع وكذلك تجد في هذه الصفحة نموذج ملف المشروع على يمين الصفحة الذي من خلاله يتم إرفاق كل معلومات وبيانات أفكاركم٬ويتم إرفاق ملف المشروع في خانة تسليم ملف المشروع
                                  </p>
                              </div>
                              <div class="carousel-item">
                                <img src="/image/ins2.png" class=" d-block w-100" />
                                <p style={{"margin-bottom": "2rem"}}>
                                  يمكنكم إضافة أعضاء الفريق عبر هذه الصفحة ٬لابد من إضافة عدد من 3 إلى 5 أعضاء                                  
                                </p>
                              </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#ins" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true">
                              السابق
                              </span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#ins" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true">
                                التالي
                              </span>
                              <span class="visually-hidden">Next</span>
                            </button>
                      </div>
                  </Modal.Body>
                </Modal>
                </div>
            </main>
          </div>
        </div>
      );
    } else {
      history.push("/login");
    }
  };
  return <>{RenderElment()}</>;
}
export default NewTeamDashboard;
