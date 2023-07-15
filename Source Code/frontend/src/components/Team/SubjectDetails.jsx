import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import TeamNavbar from "./TeamNavbar";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
function SubjectDetails() {
  const { quill, quillRef } = useQuill();
  const [valueTextEditor,setvalueTextEditor]=useState();
  const { SID } = useParams();
  const { PID } = useParams();
  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  const [projects, setProjects] = useState([]);
  const [showEditName, setshowEditName] = useState(false);
  const [showEdiDescription, setshowEdiDescription] = useState(false);
  const [showFile, setshowFile] = useState(false);
  const [proposal, setproposal] = useState();
  const [projectName, setprojectName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [images, setImages] = useState([]);
  const [SubjectName, setSubjectName] = useState("");
  const [SubjectDesc, setSubjectDesc] = useState("");
  const [SubjectImage, setSubjectImage] = useState("");
  const [status, setstatus] = useState("");
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/SubjectDetails/${SID}/${PID}`
        );
        setProjects(response.projects);
        setSubjects(response.subjects);
        setImages(response.Images);
        quillRef.current.firstChild.innerHTML = response.SDescription
        // console.log("response.projects", response.projects);
        // console.log("response subjects", response.subjects);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setvalueTextEditor(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);
  const refresh = () => {
    // it re-renders the component
    window.location.reload();
  };
  const handleUpload = (e) => {
    let value = e.target.files[0];
    setproposal(value);
    setshowFile(true);
    // console.log("proposal", proposal);
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
  console.log('valueTextEditor:',valueTextEditor);
  const handleupdate = (id) => {
    // console.log("id", id, "projectName", projectName);
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("projectName", projectName);
    uploadData.append("projectDescription", projectDescription);
    if (proposal) uploadData.append("proposal", proposal, proposal.name);
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
  const RedirectToSubject = () => {
    history.push("/newteamdashboard");
  };
  const handleImageDelete = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteImage/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          refresh();
        }
      })
  
  };
  // #Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("SID", SID);
    uploadData.append("SubjectName", SubjectName);
    uploadData.append("SubjectDesc", valueTextEditor);
    uploadData.append("Subjectstatus", status);
    // uploadData.append("count", SubjectImage.length);
    // for (let i = 0; i < SubjectImage.length; i++) {
    //   uploadData.append(`images[${i}]`, SubjectImage[i], SubjectImage[i].name);
    // }

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/subjectupdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "update") {
          RedirectToSubject();
        }
      })
    
  };
  const dataImages = images.map((image, i) => {
    return (
      <>
        <span className="input-group-text">
          <button
            onClick={() => handleImageDelete(image.ID)}
            type="button"
            className="my-0"
            style={{ color: "#26306a", border: "none", background: "none" }}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="حذف الصورة"
          >
            <i class="fas fa-backspace fa-lg" style={{ color: "#26306a" }}></i>
          </button>
          <img
            src={
              "https://" +
              REACT_APP_IP +
              REACT_APP_IMGPATH +
              "/" +
              image.IMG
            }
            width="70"
            height="70"
            alt="upload image"
          />
        </span>
      </>
    );
  });
  const dataProjects = projects.map((project, i) => {
    return (
      <>
        <ul
          className="nav flex-column list-group"
          style={{ background: "none" }}
        ></ul>
        <li key={i} className="nav-item">
          <span className="nav-link active" aria-current="page">
            <span data-feather="home"></span>
            لوحة تحكم الفريق
          </span>
        </li>
        <li key={i} className="nav-item list-group-item">
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
        <li key={i} className="nav-item list-group-item">
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
        <li key={i} className="nav-item list-group-item">
          <label htmlFor="Input1" className="form-label">
            الملف المرفوع حالياً
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              defaultValue={project.PProposalName}
            />
          </div>
        </li>
        <li key={i} className="nav-item list-group-item">
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
      </>
    );
  });

  const dataSubject = subjects.map((subject, i) => {

    return (
      <>
        <div className="row my-2">
          <div
            className="card col-md-10"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              padding: "1rem",
            }}
          >
            <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <label
                  className="form-label text-start me-1 mt-1"
                  style={{ display: "block" }}
                >
                  حالة الموضوع
                </label>
                <select
                  onChange={(evt) => setstatus(evt.target.value)}
                  className="form-select"
                >
                  {subject.Sstatus === 0 ? (
                    <>
                      <option value="0" selected>
                        عام
                      </option>
                      <option value="1">خاص</option>
                    </>
                  ) : (
                    <>
                      <option value="1" selected>
                        خاص
                      </option>
                      <option value="0">عام</option>
                    </>
                  )}
                </select>
            </div>
              <div className="input-group mb-3">
                <label
                  className="form-label text-start me-1 mt-1"
                  style={{ display: "block" }}
                >
                  عنوان المشروع
                </label>
                <input
                  onChange={(evt) => setSubjectName(evt.target.value)}
                  defaultValue={subject.SName}
                  type="text"
                  className="form-control"
                  aria-describedby="button-addon2"
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="form-label text-start me-1 mt-1"
                  style={{ display: "block" }}
                >
                  وصف المشروع
                </label>
                <div>
            <div style={{ width: 700, height: 200 }}>
                <div ref={quillRef} />
            </div>
           </div>
                {/* <textarea
                  onChange={(evt) => setSubjectDesc(evt.target.value)}
                  className="form-control"
                  defaultValue={subject.SDescription}
                  rows="3"
                ></textarea> */}
              </div>
              {/* <div className="input-group mb-3">
                <label
                  className="form-label text-start me-1 mt-1"
                  htmlFor="img"
                >
                  صور المشروع
                </label>
                <input type="text" className="form-control" />
                {dataImages}
              </div> */}
              {/* <div className="input-group mb-3">
                <label className="form-label text-start me-1 mt-1">
                  إضافة صور
                </label>
                <input
                  accept="image/*"
                  multiple
                  onChange={(evt) => setSubjectImage(evt.target.files)}
                  type="file"
                  className="form-control"
                  id="simg"
                  style={{ display: "none" }}
                />
                <label
                  className="form-control text-start uploadFile"
                  htmlFor="simg"
                >
                  تحميل صورة
                </label>
              </div> */}
             
              <div className="input-group" style={{zIndex:'99999',marginTop:'85px'}}>
                <button className="py-2 updatearticle" type="submit">
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  });

  return (
    <div>
      <TeamNavbar />
      <div className="container-fluid">
        <nav
          id="sidebarMenu"
          className="col-md-4 col-lg-3 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul
              className="nav flex-column list-group"
              style={{ background: "none" }}
            >
              {dataProjects}
            </ul>
          </div>
        </nav>
        <main className="col-md-8 ms-sm-auto col-lg-9">
          <div className="d-flex justify-content-between flex-wrap  pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h4">تحديث الموضوع</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary remove_hover"
                >
                  <i className="fas fa-project-diagram"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Add Model */}
          <div className="displaySubject  py-3">{dataSubject}</div>
        </main>
      </div>
    </div>
  );
}
export default SubjectDetails;
