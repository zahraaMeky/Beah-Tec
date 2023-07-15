import "../Admin/dashboard.rtl.css";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function FooterControl() {
  const [Footer, setFooter] = useState([]);
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [instagram, setinstagram] = useState("");
  const [conditions, setconditions] = useState("");
  const [privacy, setprivacy] = useState("");
  const [showfacebookEdit, setshowfacebookEdit] = useState(false);
  const [showprivacyEdit, setshowprivacyEdit] = useState(false);
  const [showtwitterEdit, setshowtwitterEdit] = useState(false);
  const [showlinkedinEdit, setshowlinkedinEdit] = useState(false);
  const [showinstagraminEdit, setshowinstagraminEdit] = useState(false);
  const [showConditionsEdit, setshowConditionsEdit] = useState(false);
  const [msgSuccess, setmsgSuccess] = useState(false);
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/footer`
      );
      setFooter(response.footer);
      // console.log("response", response);
    } catch (error) {
      // console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const successMsgAlert = () => {
    Swal.fire({
      text: "تم التعديل بنجاح",
      icon: "success",
    });
  };
  // console.log("setFooter", Footer);
  const handleChange = (e, changeWhat) => {
    let value = e.target.value;
    if (changeWhat == "facebook") {
      setfacebook(value);
      setshowfacebookEdit(true);
      // console.log("facebook", facebook);
    }
    if (changeWhat == "twitter") {
      settwitter(value);
      setshowtwitterEdit(true);
      // console.log("twitter", twitter);
    }
    if (changeWhat == "linkedin") {
      setlinkedin(value);
      setshowlinkedinEdit(true);
      // console.log("linkedin", linkedin);
    }
    if (changeWhat == "instagram") {
      setinstagram(value);
      setshowinstagraminEdit(true);
      // console.log("instagram", instagram);
    }
    if (changeWhat == "conditions") {
      setconditions(value);
      setshowConditionsEdit(true);
      // console.log("conditions", conditions);
    }
    if (changeWhat == "privacy") {
      setprivacy(value);
      setshowprivacyEdit(true);
      // console.log("conditions", conditions);
    }
  };
  const handleupdate = () => {
    const uploadData = new FormData();
    uploadData.append("facebook", facebook);
    uploadData.append("twitter", twitter);
    uploadData.append("linkedin", linkedin);
    uploadData.append("instagram", instagram);
    uploadData.append("conditions", conditions);
    uploadData.append("privacy", privacy);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/footerupdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "update") {
          setmsgSuccess(true);
          // console.log("update!");
          setshowfacebookEdit(false);
          setshowinstagraminEdit(false);
          setshowtwitterEdit(false);
          setshowlinkedinEdit(false);
          setshowConditionsEdit(false);
          setshowprivacyEdit(false);
          fetchData();
        }
      })
     
  };
  const dataFooter = Footer.map((footer, i) => {
    return (
      <>
        <div className="row my-2 d-flex justify-content-center border-bottom">
          <div className="col-md-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">
                <i className="fab fa-facebook-f"></i>
              </span>
              <input
                type="text"
                defaultValue={footer.facebookLink}
                className="form-control"
                aria-label="facebook"
                aria-describedby="basic-addon3"
                onChange={(e) => handleChange(e, "facebook")}
              />
              {showfacebookEdit ? (
                <button
                  onClick={handleupdate}
                  type="button"
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fas fa-check card-title fa-lg ms-1"></i>
                </button>
              ) : null}
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon4">
                <i className="fab fa-twitter"></i>
              </span>
              <input
                type="text"
                defaultValue={footer.TwiterLink}
                className="form-control"
                aria-label="twitter"
                aria-describedby="basic-addon4"
                onChange={(e) => handleChange(e, "twitter")}
              />
              {showtwitterEdit ? (
                <button
                  onClick={handleupdate}
                  type="button"
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fas fa-check card-title fa-lg ms-1"></i>
                </button>
              ) : null}
            </div>
          </div>
          <div className="col-md-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fab fa-linkedin-in"></i>
              </span>
              <input
                type="text"
                defaultValue={footer.LinkedinLink}
                className="form-control"
                placeholder=""
                aria-label="linkedin"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChange(e, "linkedin")}
              />
              {showlinkedinEdit ? (
                <button
                  onClick={handleupdate}
                  type="button"
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fas fa-check card-title fa-lg ms-1"></i>
                </button>
              ) : null}
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                <i className="fab fa-instagram"></i>
              </span>
              <input
                type="text"
                defaultValue={footer.InstagramLink}
                className="form-control"
                placeholder=""
                aria-label="instagram"
                aria-describedby="basic-addon2"
                onChange={(e) => handleChange(e, "instagram")}
              />
              {showinstagraminEdit ? (
                <button
                  onClick={handleupdate}
                  type="button"
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fas fa-check card-title fa-lg ms-1"></i>
                </button>
              ) : null}
            </div>
            {msgSuccess ? (
                  successMsgAlert()
                ) : null}
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <nav>
              <div className="nav nav-pills" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-condition-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-condition"
                  type="button"
                  role="tab"
                  aria-controls="nav-condition"
                  aria-selected="true"
                >
                  الشروط والاحكام
                </button>
                <button
                  className="nav-link"
                  id="nav-privacy-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-privacy"
                  type="button"
                  role="tab"
                  aria-controls="nav-privacy"
                  aria-selected="false"
                >
                  سياسة الخصوصية
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-condition"
                role="tabpanel"
                aria-labelledby="nav-condition-tab"
              >
                <div className="mb-3">
                  <textarea
                    defaultValue={footer.Conditions}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={(e) => handleChange(e, "conditions")}
                  ></textarea>
                  {showConditionsEdit ? (
                    <button
                      className="mt-3"
                      onClick={handleupdate}
                      type="button"
                      style={{
                        background: "#26306a",
                        border: "none",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "4px 15px",
                      }}
                    >
                      <i className="fas fa-check  fa-lg ms-1"></i>
                    </button>
                  ) : null}
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-privacy"
                role="tabpanel"
                aria-labelledby="nav-privacy-tab"
              >
                <div className="mb-3">
                  <textarea
                    defaultValue={footer.Privacy}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={(e) => handleChange(e, "privacy")}
                  ></textarea>
                  {showprivacyEdit ? (
                    <button
                      className="mt-3"
                      onClick={handleupdate}
                      type="button"
                      style={{
                        background: "#26306a",
                        border: "none",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "4px 15px",
                      }}
                    >
                      <i className="fas fa-check  fa-lg ms-1"></i>
                    </button>
                  ) : null}
                </div>
              </div>
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
              <h1 className="h4">محتوى الشريط السفلي (footer)</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="fas fa-cog fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            {Footer.length > 0 ? (
              dataFooter
            ) : (
              <>
                <div className="row my-2 d-flex justify-content-center border-bottom">
                  <div className="col-md-5">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon3">
                        <i className="fab fa-facebook-f"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="facebook"
                        aria-describedby="basic-addon3"
                        onChange={(e) => handleChange(e, "facebook")}
                      />
                      {showfacebookEdit ? (
                        <button
                          onClick={handleupdate}
                          type="button"
                          style={{ background: "none", border: "none" }}
                        >
                          <i className="fas fa-check card-title fa-lg ms-1"></i>
                        </button>
                      ) : null}
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon4">
                        <i className="fab fa-twitter"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="twitter"
                        aria-describedby="basic-addon4"
                        onChange={(e) => handleChange(e, "twitter")}
                      />
                      {showtwitterEdit ? (
                        <button
                          onClick={handleupdate}
                          type="button"
                          style={{ background: "none", border: "none" }}
                        >
                          <i className="fas fa-check card-title fa-lg ms-1"></i>
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fab fa-linkedin-in"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="linkedin"
                        aria-describedby="basic-addon1"
                        onChange={(e) => handleChange(e, "linkedin")}
                      />
                      {showlinkedinEdit ? (
                        <button
                          onClick={handleupdate}
                          type="button"
                          style={{ background: "none", border: "none" }}
                        >
                          <i className="fas fa-check card-title fa-lg ms-1"></i>
                        </button>
                      ) : null}
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon2">
                        <i className="fab fa-instagram"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="instagram"
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleChange(e, "instagram")}
                      />
                      {showinstagraminEdit ? (
                        <button
                          onClick={handleupdate}
                          type="button"
                          style={{ background: "none", border: "none" }}
                        >
                          <i className="fas fa-check card-title fa-lg ms-1"></i>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-4">
                    <nav>
                      <div
                        className="nav nav-pills"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className="nav-link active"
                          id="nav-condition-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-condition"
                          type="button"
                          role="tab"
                          aria-controls="nav-condition"
                          aria-selected="true"
                        >
                          الشروط والاحكام
                        </button>
                        <button
                          className="nav-link"
                          id="nav-privacy-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-privacy"
                          type="button"
                          role="tab"
                          aria-controls="nav-privacy"
                          aria-selected="false"
                        >
                          سياسة الخصوصية
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-10">
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-condition"
                        role="tabpanel"
                        aria-labelledby="nav-condition-tab"
                      >
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            onChange={(e) => handleChange(e, "conditions")}
                          ></textarea>
                          {showConditionsEdit ? (
                            <button
                              className="mt-3"
                              onClick={handleupdate}
                              type="button"
                              style={{
                                background: "#26306a",
                                border: "none",
                                color: "#fff",
                                borderRadius: "5px",
                                padding: "4px 15px",
                              }}
                            >
                              <i className="fas fa-check  fa-lg ms-1"></i>
                            </button>
                          ) : null}
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="nav-privacy"
                        role="tabpanel"
                        aria-labelledby="nav-privacy-tab"
                      >
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            onChange={(e) => handleChange(e, "privacy")}
                          ></textarea>
                          {showprivacyEdit ? (
                            <button
                              className="mt-3"
                              onClick={handleupdate}
                              type="button"
                              style={{
                                background: "#26306a",
                                border: "none",
                                color: "#fff",
                                borderRadius: "5px",
                                padding: "4px 15px",
                              }}
                            >
                              <i className="fas fa-check  fa-lg ms-1"></i>
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {msgSuccess ? (
                  successMsgAlert()
                ) : null}
                  </div>
                
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
export default FooterControl;
