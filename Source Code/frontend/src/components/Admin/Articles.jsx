import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSideBar from "./AdminSidBar";
import AdminNav from "./AdminNavBar";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function Articles() {
  // #store state from input
  const [show, setshow] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [image, setimage] = useState();
  const [data, setData] = useState([]);
  const login = localStorage.getItem("email");
  const { REACT_APP_IP ,REACT_APP_BACKEND_PORT} = process.env;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/articles`
        );
        setData(response);
        // console.log(data);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);

  //function to generate select box for problems
  let articlestatus = ["عام", "خاص"];
  const selectStatus = articlestatus.map((Astatus, i) => {
    return (
      <>
        <option key={i} value={i}>
          {Astatus}
        </option>
      </>
    );
  });
  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  const RedirectToArticles = () => {
    window.location.reload();
  };
  // #Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("user", login);
    uploadData.append("image", image, image.name);
    uploadData.append("status", status);

    console.log(uploadData);
    
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addArticles/`, uploadData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === "created") {
          RedirectToArticles();
        }
      })
    
  };
  const handleDelete = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/delete/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          RedirectToArticles();
        }
      })

  };
  return (
    <div>
      {<AdminNav />}
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">إدارة المقالات</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="far fa-newspaper fa-2x"></i>
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
                title="إضافة مقال"
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
            <div className="row my-2">
              {data.map((item) => (
                <div
                  className="card col-md-3 linkCard mb-3"
                  style={{ minHeight: "8.5rem" }}
                >
                  <div className="row border-bottom pb-1">
                    <div className="col-6">
                      <button
                        onClick={() => handleDelete(item.ID)}
                        type="button"
                        className="my-0"
                        style={{ border: "none", background: "none" }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="حذف المقال"
                      >
                        <i class="fas fa-backspace fa-lg"></i>
                      </button>
                    </div>
                    <div className="col-6">
                      <Link
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="تحديث المقال"
                        key={item.ID}
                        to={`/articles/${item.ID}`}
                        style={{ color: "#000" }}
                      >
                        <i className="far fa-edit fa-lg"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="pt-1"></div>
                  <div className="row">
                    <p className="my-0">{item.ArticleTitle}</p>
                    <p className="my-0">
                      {item.ArticleStatus === 0 ? (
                        <span>عام</span>
                      ) : (
                        <span>خاص</span>
                      )}
                      <span className="px-1">&#166;</span>
                      <span>{item.CreatedDate}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>إضافة مقال</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-signature"></i>
                </span>
                <input
                  value={title}
                  onChange={(evt) => settitle(evt.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="عنوان المقال"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-info"></i>
                </span>
                <input
                  value={description}
                  onChange={(evt) => setdescription(evt.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="وصف المقال"
                />
              </div>
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
                <span className="input-group-text">
                  <i className="fa-solid fa-file-lock"></i>
                </span>
                <select
                  value={status}
                  onChange={(evt) => setstatus(evt.target.value)}
                  className="form-select"
                  name="problem"
                >
                  <option selected>اختر حالة المقال </option>
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
                  حفظ المقال
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Articles;
