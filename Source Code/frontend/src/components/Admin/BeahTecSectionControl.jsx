import "../Admin/dashboard.rtl.css";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

function BeahTecSectionControl() {
  const [image, setimage] = useState();
  const [desc, setdesc] = useState("");
  const [joinCondition, setjoinCondition] = useState("");
  const [updateCondition, setupdateCondition] = useState("");
  const [BeahTec, setBeahTec] = useState([]);
  const [joinConditions, setjoinConditions] = useState([]);
  const { REACT_APP_IP,REACT_APP_IMGPATH ,REACT_APP_BACKEND_PORT} = process.env;
  const [show, setshow] = useState(false);
  const [checkCondition, setcheckCondition] = useState(0);
  const [updateConditionEdit, setupdateConditionEdit] = useState(false);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/beahTecdisplay`
      );
      setBeahTec(response.BeahTec);
      setjoinConditions(response.JoinConditions);
      // console.log("response", response);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  const handleChange = (e, changeWhat) => {
    let value = e.target.value;
    if (changeWhat) {
      setupdateCondition(value);
      setcheckCondition(changeWhat);
      setupdateConditionEdit(true);
      // console.log("changeWhat: ", changeWhat, typeof changeWhat);
      // console.log("checkCondition: ", checkCondition, typeof changeWhat);
      // console.log("updateCondition", updateCondition);
    }
  };
  const handleupdate = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    if (image) uploadData.append("image", image, image.name);
    uploadData.append("desc", desc);

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/beahtecupdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "update") {
          // console.log("update!");
          fetchData();
        }
      })
      
  };
  const dataBeahTec = BeahTec.map((beah, i) => {
    return (
      <>
        <form className="form" onSubmit={handleupdate}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card p-4">
                <label
                  for="exampleFormControlInput1"
                  className="form-label text-start"
                >
                  صورة بيئة تك
                </label>

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
                  {beah.Image ? (
                    <span className="input-group-text">
                      <img
                        src={"https://" + REACT_APP_IP + REACT_APP_IMGPATH + beah.Image}
                        width="70"
                        height="70"
                        alt="upload image"
                      />
                    </span>
                  ) : null}
                </div>

                <label
                  for="exampleFormControlTextarea1"
                  className="form-label text-start"
                >
                  وصف بيئة تك
                </label>
                <div className="input-group  mb-3">
                  <span className="input-group-text">
                    <i className="far fa-comment-alt-dots"></i>
                  </span>
                  <textarea
                    defaultValue={beah.Description}
                    className="form-control"
                    aria-label="With textarea"
                    onChange={(evt) => setdesc(evt.target.value)}
                  ></textarea>
                </div>
                <div class="text-center">
                  <button
                    class="btn btn-outline-secondary"
                    type="submit"
                    style={{
                      color: "rgb(255, 255, 255)",
                      background: "rgb(38, 48, 106)",
                      border: "none",
                      padding: "0.375rem 4.75rem",
                    }}
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  });
  const CheckBeahTec = () => {
    if (BeahTec.length > 0) {
      return dataBeahTec;
    } else {
      return (
        <>
          <form className="form" onSubmit={handleupdate}>
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <div className="card p-4">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label text-start"
                  >
                    صورة بيئة تك
                  </label>

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

                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label text-start"
                  >
                    وصف بيئة تك
                  </label>
                  <div className="input-group  mb-3">
                    <span className="input-group-text">
                      <i className="far fa-comment-alt-dots"></i>
                    </span>
                    <textarea
                      className="form-control"
                      placeholder="اكتب وصف  ..."
                      aria-label="With textarea"
                      onChange={(evt) => setdesc(evt.target.value)}
                    ></textarea>
                  </div>
                  <div class="text-center">
                    <button
                      class="btn btn-outline-secondary"
                      type="submit"
                      style={{
                        color: "rgb(255, 255, 255)",
                        background: "rgb(38, 48, 106)",
                        border: "none",
                        padding: "0.375rem 4.75rem",
                      }}
                    >
                      إرسال
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      );
    }
  };
  const handleDeleteCondition = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/deleteconditions/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "deleted") {
          fetchData();
        }
      })
      
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("condition", joinCondition);

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/joinconditions/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "condition") {
          fetchData();
        }
      })
      
  };
  const handleupdateCondition = (id) => {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("updateCondition", updateCondition);

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/updateconditions/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "Updated") {
          // console.log("update!");
          setcheckCondition(0);
          setupdateConditionEdit(false);
          fetchData();
        }
      })

  };
  // console.log("setcheckCondition", setcheckCondition);
  const dataJoinConditions = joinConditions.map((condition, i) => {
    return (
      <>
        <div className="col-md-10">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-book-reader"></i>
            </span>
            <input
              id={condition.ID}
              defaultValue={condition.condition}
              type="text"
              onChange={(e) => handleChange(e, condition.ID)}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-2 justify-content-end">
          <div className="icons">
            {(() => {
              if (checkCondition == condition.ID && updateConditionEdit) {
                return (
                  <div
                    className="conditionDelete float-start me-1"
                    onClick={() => handleupdateCondition(condition.ID)}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                );
              }

              return null;
            })()}

            <div
              className="conditionDelete float-start"
              onClick={() => handleDeleteCondition(condition.ID)}
            >
              <i class="fas fa-trash"></i>
            </div>
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
              <h1 className="h4">بيئة تك</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="far fa-seedling fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* tabs */}
            <div className="tabsButton my-3">
              <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                  <nav>
                    <div className="nav nav-pills" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-Beahtec-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-Beahtec"
                        type="button"
                        role="tab"
                        aria-controls="nav-Beahtec"
                        aria-selected="true"
                      >
                        بيئة تك
                      </button>
                      <button
                        className="nav-link"
                        id="nav-conditions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-conditions"
                        type="button"
                        role="tab"
                        aria-controls="nav-conditions"
                        aria-selected="false"
                      >
                        شروط الأنضمام
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="tabsContents">
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-Beahtec"
                      role="tabpanel"
                      aria-labelledby="nav-Beahtec-tab"
                    >
                      <div className="mb-3">{CheckBeahTec()}</div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-conditions"
                      role="tabpanel"
                      aria-labelledby="nav-conditions-tab"
                    >
                      <div className="mb-3">
                        <div className="row d-flex">
                          <div className="col-md-12">
                            <div className="card p-4">
                              <div className=" my-2 d-flex justify-content-end ">
                                <Button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="إضافة شرط"
                                  style={{
                                    color: "#fff",
                                    background: "#26306a",
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    handleShow();
                                  }}
                                >
                                  <p className="my-0">
                                    <i className="fas fa-plus-circle"></i>
                                  </p>
                                </Button>
                              </div>
                              <div className="conditionContent">
                                <label
                                  for="exampleFormControlInput1"
                                  className="form-label text-start"
                                >
                                  شروط الإنضمام للمسابقة
                                </label>
                                <div className="row">{dataJoinConditions}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h6>إضافة شروط الإنضمام</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                  <input
                    onChange={(evt) => setjoinCondition(evt.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="إضافة شرط"
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
                    حفظ الشرط
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default BeahTecSectionControl;
