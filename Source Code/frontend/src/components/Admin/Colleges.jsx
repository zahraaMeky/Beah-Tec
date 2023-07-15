import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSidBar";
import AdminNav from "./AdminNavBar";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Colleges() {
  const { REACT_APP_IP ,REACT_APP_BACKEND_PORT} = process.env;
  const [CollegeName, setCollegeName] = useState("");
  const [Collegs, setCollegs] = useState([]);
  const [show, setshow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/displaycolleges`
        );
        setCollegs(response);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);
  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  const RedirectTocollege = () => {
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("CollegeName", CollegeName);

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/addcollege/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "college") {
          RedirectTocollege();
        }
      })
     
  };


  const handleDelete = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deletecollege/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          RedirectTocollege();
        }
      })
     
  };

  const AreYouSure = (id, name) => {
    
    Swal.fire({
      title: `؟ ${name} هل أنت متأكد من حذف`,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire(`بنجاح ${name} تم حذف`, '', 'success')
      } 
      // else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }
    })

  }


  const dataColleges = Collegs.map((colleg, i) => {
    return (
      <>
        <div
          className="card col-md-3 linkCard mb-3"
          style={{ minHeight: "8.5rem" }}
        >
          <div className="row border-bottom pb-1">
            <div className="col-6">
              <button
                onClick={() => AreYouSure(colleg.ID, colleg.CollegeName)}
                type="button"
                className="my-0"
                style={{ border: "none", background: "none" }}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="حذف الكلية"
              >
                <i class="fas fa-backspace fa-lg"></i>
              </button>
            </div>
            <div className="col-6">
              <Link
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="تحديث الكلية"
                key={colleg.ID}
                style={{ color: "#000" }}
                to={`/college/${colleg.ID}`}
              >
                <i className="far fa-edit fa-lg"></i>
              </Link>
            </div>
          </div>
          <div className="pt-1"></div>
          <div className="row">
            <p className="my-2">{colleg.CollegeName}</p>
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
              <h1 className="h4">إدارة الكليات</h1>
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
                title="إضافة كلية"
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
            <div className="row my-2">{dataColleges}</div>
          </main>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>إضافة كلية</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-university"></i>
                </span>
                <input
                  onChange={(evt) => setCollegeName(evt.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="اسم الكلية"
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
                  حفظ الكلية
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
export default Colleges;
