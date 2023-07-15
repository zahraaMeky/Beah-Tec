import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSidBar";
import AdminNav from "./AdminNavBar";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function ControlPrivilege() {
  const {REACT_APP_IP,REACT_APP_BACKEND_PORT} = process.env;
  const [show, setshow] = useState(false);
  const [User, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const [AdminData, setAdminData] = useState([]);
  const [CheckAdminPrivilege,setCheckAdminPrivilege] = useState("");
  const loginEmail = localStorage.getItem("email");

  const succeserrorAlert = () => {
    Swal.fire({
      text: "ليس لديك الصلاحية ",
      icon: "success",
    });
  };

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/displayAdmin/${loginEmail}`
      );
      setAdminData(response.admin);
      setCheckAdminPrivilege(response.CheckAdminPrivilege);
      // console.log("response", response);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
 // console.log('CheckAdminPrivilege',CheckAdminPrivilege)
  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("loginEmail", loginEmail);
    uploadData.append("email", User);
    uploadData.append("password", Password);

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/useradmin/`, uploadData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === "admin") {
          fetchData();
        }
        if (res.data === "privilege") {
          succeserrorAlert();
        }
      })
    
  };
  const handleDelete = (id) => {
    const uploadData = new FormData();
    uploadData.append("loginEmail", loginEmail);
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteadmin/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          fetchData();
        }
        if (res.data === "privilege") {
          succeserrorAlert();
        }
      })
      
  };
  const dataAdmin = AdminData.map((admin, i) => {
    return (
      <>
          <div
                  className="card col-md-3 linkCard mb-3"
                  style={{ minHeight: "8.5rem" }}
                >
                  {
                    CheckAdminPrivilege == 1?
                    <div className="row border-bottom pb-1">
                    <div className="col-6">
                      <button
                        onClick={() => handleDelete(admin.ID)}
                        type="button"
                        className="my-0"
                        style={{ border: "none", background: "none" }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="حذف المستخدم"
                      >
                        <i class="fas fa-backspace fa-lg"></i>
                      </button>
                    </div>
                    <div className="col-6">
                      <Link
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="تحديث المستخدم"
                        key={admin.ID}
                        style={{ color: "#000" }}
                        to={`/adminedite/${admin.ID}`}
                      >
                        <i className="far fa-edit fa-lg"></i>
                      </Link>
                    </div>
                    </div>
                  :
                  <div className="row border-bottom pb-1">
                    <p>user</p>
                  </div>
                  }
                 
                  <div className="pt-1"></div>
                  <div className="row">
                    <p className="my-2">{admin.UserEmail}</p>
                  </div>
          </div>
      </>
    );
  });
  return (
    <div>
      <AdminNav />
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">إدارة الصلاحيات</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="fas fa-hands-helping  fa-2x"></i>
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
                title="إضافة أدمن"
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
            <div className="row my-2">{dataAdmin}</div>
          </main>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>إضافة مستخدم مسؤول</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  onChange={(evt) => setUser(evt.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="بريد المستخدم"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  onChange={(evt) => setPassword(evt.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="كلمة المرور"
                />
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
                  حفظ المستخدم
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ControlPrivilege;
