import "../Admin/dashboard.rtl.css";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactInfoControl() {
  const {REACT_APP_IP,REACT_APP_BACKEND_PORT} = process.env;
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [fromTime, setfromTime] = useState("");
  const [toTime, settoTime] = useState("");
  const [Contact, setContact] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/displaycontact`
        );
        setContact(response.contact);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);
  const RedirectToContact = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("phone", phone);
    uploadData.append("address", address);
    uploadData.append("fromTime", fromTime);
    uploadData.append("toTime", toTime);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/contactupdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "partener") {
          RedirectToContact();
        }
      })
   
  };
  const dataContact = Contact.map((contact, i) => {
    return (
      <>
        <form onSubmit={handleSubmit} className="card p-4 text-start">
          <div className="row  d-flex justify-content-center">
            <div className="col-md-12">
              <label className="form-label text-start">رقم الهاتف</label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-phone"></i>
                </span>
                <input
                  defaultValue={contact.PhoneNum}
                  type="text"
                  className="form-control"
                  placeholder="اكتب رقم الهاتف  ..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(evt) => setphone(evt.target.value)}
                />
              </div>
              <label className="form-label text-start">العنوان</label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <input
                  defaultValue={contact.Address}
                  type="text"
                  className="form-control"
                  placeholder="اكتب العنوان   ..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(evt) => setaddress(evt.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <label className="form-label text-start">أوقات العمل</label>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  من
                </span>
                <input
                  defaultValue={contact.startTime}
                  type="time"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(evt) => setfromTime(evt.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  إلى
                </span>
                <input
                  defaultValue={contact.EndTime}
                  type="time"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(evt) => settoTime(evt.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col">
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
        </form>
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
              <h1 className="h4">وسائل التواصل</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="fas fa-address-book fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            {Contact.length > 0 ? (
              dataContact
            ) : (
              <>
                <form onSubmit={handleSubmit} className="card p-4 text-start">
                  <div className="row  d-flex justify-content-center">
                    <div className="col-md-12">
                      <label className="form-label text-start">
                        رقم الهاتف
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="اكتب رقم الهاتف  ..."
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(evt) => setphone(evt.target.value)}
                        />
                      </div>
                      <label className="form-label text-start">العنوان</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fas fa-map-marker-alt"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="اكتب العنوان   ..."
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(evt) => setaddress(evt.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <label className="form-label text-start">أوقات العمل</label>
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          من
                        </span>
                        <input
                          type="time"
                          className="form-control"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(evt) => setfromTime(evt.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          إلى
                        </span>
                        <input
                          type="time"
                          className="form-control"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(evt) => settoTime(evt.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col">
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
                </form>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
export default ContactInfoControl;
