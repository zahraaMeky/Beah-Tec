import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSidBar";
import AdminNav from "./AdminNavBar";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
function ChallengeControl() {
  const [image, setimage] = useState();
  const [show, setshow] = useState(false);
  const { REACT_APP_IP ,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [description, setdescription] = useState("");
  const [subdescription, setsubdescription] = useState("");
  const [problem, setproblem] = useState("");
  const [solution, setsolution] = useState("");
  const [problemRepeat, setproblemRepeat] = useState("");
  const [problemPlace, setproblemPlace] = useState("");
  const [negative, setnegative] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/displaychallenges`
        );
        setChallenges(response);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);
  const RedirectToChallenge = () => {
    window.location.reload();
  };
  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("image", image, image.name);
    uploadData.append("description", description);
    uploadData.append("problem", problem);
    uploadData.append("solution", solution);
    uploadData.append("problemRepeat", problemRepeat);
    uploadData.append("problemPlace", problemPlace);
    uploadData.append("negative", negative);
    if (subtitle.length !== 0) {
      uploadData.append("subtitle", subtitle);
    }
    if (subdescription.length !== 0) {
      uploadData.append("subdescription", subdescription);
    }
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addChallenge/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "partener") {
          RedirectToChallenge();
        }
      })
     
  };
  const handleDelete = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteChallenge/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          RedirectToChallenge();
        }
      })
      
  };
  const datachallenges = challenges.map((challenge, i) => {
    return (
      <>
        <div
          className="card col-md-3 linkCard mb-3"
          style={{ minHeight: "8.5rem" }}
        >
          <div className="row border-bottom pb-1">
            <div className="col-6">
              <button
                onClick={() => handleDelete(challenge.ID)}
                type="button"
                className="my-0"
                style={{ border: "none", background: "none" }}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="حذف التحديات"
              >
                <i class="fas fa-backspace fa-lg"></i>
              </button>
            </div>
            <div className="col-6">
              <Link
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="تحديث التحديات"
                key={challenge.ID}
                style={{ color: "#000" }}
                to={`/challenge/${challenge.ID}`}
              >
                <i className="far fa-edit fa-lg"></i>
              </Link>
            </div>
          </div>
          <div className="pt-1"></div>
          <div className="row">
            <img
              src={"https://" + REACT_APP_IP + REACT_APP_IMGPATH + challenge.Image}
              style={{ width: "200px", height: "100px", objectFit: "contain" }}
            />
            <p className="my-0">{challenge.Title}</p>
          </div>
        </div>
      </>
    );
  });
  return (
    <div>
      {<AdminNav />}
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">إدارة التحديات</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="far fa-lightbulb-on  fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className=" my-2 d-flex justify-content-end ">
              <Button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="إضافة الرعاة"
                style={{ color: "#fff", background: "#26306a", border: "none" }}
                onClick={() => {
                  handleShow();
                }}
              >
                <p className="my-0">
                  <i className="fas fa-plus-circle"></i>
                </p>
              </Button>
            </div>
            <div className="row my-2">{datachallenges}</div>
          </main>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>إضافة التحديات</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <input
                      onChange={(evt) => settitle(evt.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="عنوان التحدى"
                    />
                  </div>
              
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setdescription(evt.target.value)}
                      className="form-control"
                      placeholder="وصف التحدى"
                    ></textarea>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <input
                      onChange={(evt) => setsubtitle(evt.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="عنوان فرعي"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setsubdescription(evt.target.value)}
                      className="form-control"
                      placeholder="وصف فرعي"
                    ></textarea>
                  </div>
             
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setproblem(evt.target.value)}
                      className="form-control"
                      placeholder="المشكلة"
                    ></textarea>
                  </div>
                </div>
                <div className="col-6">
                <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-image"></i>
                    </span>
                    <input
                      type="file"
                      onChange={(evt) => setimage(evt.target.files[0])}
                      className="form-control"
                      id="img"
                      style={{ display: "none" }}
                    />
                    <label
                      className="form-control text-start uploadFile"
                      htmlFor="img"
                    >
                      تحميل صورة
                    </label>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setnegative(evt.target.value)}
                      className="form-control"
                      placeholder="الأثر السلبي على القطاع"
                    ></textarea>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setsolution(evt.target.value)}
                      className="form-control"
                      placeholder="الحلول المتوقعة"
                    ></textarea>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setproblemRepeat(evt.target.value)}
                      className="form-control"
                      placeholder="معدل تكرار المشكلة"
                    ></textarea>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <textarea
                      onChange={(evt) => setproblemPlace(evt.target.value)}
                      className="form-control"
                      placeholder="اماكن الحدوث"
                    ></textarea>
                  </div>
                </div>
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
                  حفظ التحدى
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
export default ChallengeControl;
