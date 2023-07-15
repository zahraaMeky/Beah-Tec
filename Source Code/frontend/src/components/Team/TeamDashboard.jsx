import TeamNavbar from "./TeamNavbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TeamDashboard() {
  const [projects, setProjects] = useState([]);
  const [PID, setPID] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [projectName, setprojectName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  const [showEditName, setshowEditName] = useState(false);
  const [showEdiDescription, setshowEdiDescription] = useState(false);
  const [showImgFile, setshowImgFile] = useState(false);
  const [proposal, setproposal] = useState();
  const [Logo, setLogo] = useState();
  const [showFile, setshowFile] = useState(false);
  const [show, setShow] = useState(false);
  const [subtitle, setsubtitle] = useState("");
  const [subdescription, setsubdescription] = useState("");
  const [subimage, setsubimage] = useState(null);
  const [status, setstatus] = useState("");
  const { REACT_APP_IP ,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");


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
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/project/${email}`
        );
        setProjects(response.projects);
        setSubjects(response.subjects);
        setPID(response.ProjectID);
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
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteSubject/`, uploadData)
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
        {project.PlogoPath ? (
          <li className="nav-item changepadding">
            <span className="nav-link active" aria-current="page">
              <span data-feather="home"></span>
              <img
                src={
                  "https://" + REACT_APP_IP + REACT_APP_IMGPATH + "/" + project.PlogoPath
                }
                className="rounded-circle"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
            </span>
          </li>
        ) : null}
        <li className="nav-item list-group-item changepadding">
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
                onClick={() => handleupdate(project.PID)}
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
                onClick={() => handleupdate(project.PID)}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                <i className="fas fa-check card-title fa-lg ms-1"></i>
              </button>
            ) : null}
          </div>
        </li>
        {project.PProposalName ? (
          <li className="nav-item list-group-item changepadding">
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
                  "https://" +
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

        <li className="nav-item list-group-item changepadding">
          <label className="form-label">تحميل مقترح المشروع</label>
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
              تحميل الملف
            </label>
            {showFile ? (
              <button
                onClick={() => handleupdate(project.PID)}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                <i className="fas fa-check card-title fa-lg ms-1"></i>
              </button>
            ) : null}
          </div>
        </li>
        <li className="nav-item list-group-item changepadding">
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
                onClick={() => handleupdate(project.PID)}
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
    let value = e.target.files[0];
    setproposal(value);
    setshowFile(true);
    alert();
    // console.log("proposal", proposal);
  };
  const handleImgUpload = (e) => {
    let value = e.target.files[0];
    setLogo(value);
    setshowImgFile(true);
    alert();
    // console.log("Logo", Logo);
  };

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


  const handleChange = (e, changeWhat) => {
    let value = e.target.value;
    if (changeWhat == "Name") {
      setprojectName(value);
      setshowEditName(true);
      // alert();
      // console.log("projectName", projectName);
    }
    if (changeWhat == "description") {
      setprojectDescription(value);
      setshowEdiDescription(true);
      // alert();
      // console.log("projectDescription", projectDescription);
    }
  };
  const handleupdate = (id) => {
    // console.log("id", id, "projectName", projectName);
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("projectName", projectName);
    uploadData.append("projectDescription", projectDescription);
    if (proposal) uploadData.append("proposal", proposal, proposal.name);
    if (Logo) uploadData.append("Logo", Logo, Logo.name);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectUpdate/`, uploadData)
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
  const handleSubmit = (e, id) => {
    e.preventDefault();
    // console.log("id", id);
    const uploadData = new FormData();
    const images = new FormData();
    uploadData.append("ID", id);
    uploadData.append("subtitle", subtitle);
    uploadData.append("subdescription", subdescription);
    uploadData.append("status", status);
    if (subimage!=null) {
      uploadData.append("count", subimage.length);
      for (let i = 0; i < subimage.length; i++) {
        uploadData.append(`images[${i}]`, subimage[i], subimage[i].name);
      }
    }
    // console.log("images", images);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addSubject/`, uploadData)
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
                  <li className="nav-item list-group-item changepadding">
                    <label className="form-label">نموذج لمقترح المشروع</label>
                    <a
                      className="card-title"
                      style={{ display: "block", color: "#212529" }}
                      href={
                        "https://" +
                        REACT_APP_IP +
                        `:${REACT_APP_BACKEND_PORT}/static/Files/beahdemand.pdf`
                      }
                      target="_blank"
                      type="application/octet-stream"
                      download="beahdemand.pdf"
                      id="button-addon2"
                    >
                      تحميل <i className="fas fa-file-export card-title"></i>
                    </a>
                  </li>
                  {dataProjects}
                </ul>
              </div>
            </nav>
            <main className="col-md-8 ms-sm-auto col-lg-9">
              <div className="d-flex justify-content-between flex-wrap  pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h5">الرجوع للملف الشخصي للفريق</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary remove_hover"
                    >
                       <Link to="/teamprofile"
                    style={{ color: "#69696a" }} className="fas fa-id-card fa-lg"></Link>
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Model */}
              <div className="displaySubject  py-3">
                {subjects.length>0?(
                  <>
                   <h5 className="card-title">مواضيع المشروع</h5>
                  {dataSubject}
                  </>
               
                ):null}
              
                </div>
              <div className="addSubject border py-3">
                {/* Add subject */}
                <div className="row">
                  <div className="col">
                    <h6 className="card-title">إضافة موضوع</h6>
                  </div>
                  <div className="col">
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      style={{
                        background: "#26306a",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <i className="fas fa-plus-circle fa-lg"></i>
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <h6>إضافة موضوع</h6>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form
                          onSubmit={(e) => handleSubmit(e, PID)}
                          encType="multipart/form-data"
                        >
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fas fa-signature"></i>
                            </span>
                            <input
                              onChange={(evt) => setsubtitle(evt.target.value)}
                              type="text"
                              className="form-control"
                              placeholder="عنوان الموضوع"
                            />
                          </div>
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fas fa-info"></i>
                            </span>
                            <textarea
                              onChange={(evt) =>
                                setsubdescription(evt.target.value)
                              }
                              className="form-control"
                              placeholder="وصف الموضوع"
                            ></textarea>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="fas fa-image"></i>
                            </span>
                            <input
                              type="file"
                              onChange={(evt) => setsubimage(evt.target.files)}
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
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="fal fa-battery-bolt"></i>
                            </span>
                            <select
                              value={status}
                              onChange={(evt) => setstatus(evt.target.value)}
                              className="form-select"
                              name="problem"
                            >
                              <option selected>اختر حالة الموضوع </option>
                              {selectStatus}
                            </select>
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
                              حفظ الموضوع
                            </Button>
                          </Modal.Footer>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
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
export default TeamDashboard;
