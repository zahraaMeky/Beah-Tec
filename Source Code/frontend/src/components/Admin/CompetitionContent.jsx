import "../Admin/dashboard.rtl.css";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import readXlsxFile from 'read-excel-file';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
function CompetitionContent() {
  const { quill, quillRef } = useQuill();
  const [valueTextEditor,setvalueTextEditor]=useState("");
  const [subject, setsubject] = useState("");
  const [msg, setmsg] = useState("");
  const [subjectError, setsubjectError] = useState("");
  const [msgError, setmsgError] = useState("");
  const [successMsg, setsuccessMsg] = useState(false);
  const [successMsg2, setsuccessMsg2] = useState(false);
  const { REACT_APP_IP ,REACT_APP_BACKEND_PORT} = process.env;
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const [xlsfileError , setxlsfileError] = useState(null);
  const [showFile, setshowFile] = useState(false);
  const [xlsfile, setxlsfile] = useState(null);
  const [xlsfilename, setxlsfilename] = useState("تحميل الملف");
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setvalueTextEditor(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);
  const handleUpload = (e) => {
    let value = e.target.files[0];
    // setxlsfile(value);
    setshowFile(true);
    setxlsfilename(value.name);
    setxlsfileError(false);

    let i = 0; 
    let data = {};
    readXlsxFile(value).then((rows) => {
      // setxlsfile(rows);
      // console.log(rows);
      rows.map((row) => {
          console.log(row);
          data[i] = row;

          i = i+1;
      }); 
      setxlsfile(data);
    })
    // alert();
  };

  const successMsgAlert = () => {
    Swal.fire({
      title: "إرسال رسالة للمشتركين",
      text: " تمت بنجاح",
      icon: "success",
    });
  };

  const successMsgAlert2 = () => {
    Swal.fire({
      title: "إرسال حساب للمشتركين",
      text: " تمت بنجاح",
      icon: "success",
    });
  };

  const validate = () => {
    if (subject == "") {
      setsubjectError(true);
    } else {
      setsubjectError(false);
    }
    if (valueTextEditor == "") {
      setmsgError(true);
    } else {
      setmsgError(false);
    }
    if (subject == "" || valueTextEditor == "") {
      return false;
    } else {
      return true;
    }
  };
  const clearState = () => {
    setsubject("");
    setvalueTextEditor();
    setsubjectError(false);
    setmsgError(false);
    setsuccessMsg(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("subject", subject);
      uploadData.append("msg", valueTextEditor);
      console.log('subject',subject,valueTextEditor)
      console.log('uploadData',uploadData)
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/msgAll/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "success") {
            setsuccessMsg(true);
            clearState();
          }
        })
       
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (xlsfile==null) setxlsfileError(true);
    else setxlsfileError(false);

    if (xlsfile && email && (role == "admin") ) {
      const uploadData = new FormData();

      const acc = JSON.stringify(xlsfile);

      uploadData.append("email", email);
      uploadData.append("role", role);
      uploadData.append("accounts", acc);

      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/accountAll/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "success") {
            setsuccessMsg2(true);
            clearState();
          }
        })
       
    }
  };
  return (
    <div>
      <AdminNav />
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">رسالة لجميع المشتركين </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="far fa-paper-plane fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card p-4">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label text-start"
                    >
                      موضوع الرسالة
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-file-signature"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="اكتب نص  ..."
                        aria-describedby="basic-addon1"
                        onChange={(evt) => setsubject(evt.target.value)}
                      />
                    </div>
                    {/* show error msg */}
                    {subjectError ? (
                      <p className="error-msg">حقل موضوع الرسالة مطلوب</p>
                    ) : null}
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label text-start"
                    >
                      محتوى الرسالة
                    </label>
               
                    <div>
                        
                     <div style={{ width:'100%', height: 150 }}>
                                <div ref={quillRef} />
                            </div>
                    </div>
                    {/* show error msg */}
                    {msgError ? (
                      <p className="error-msg"  style={{marginTop:'60px'}}>حقل محتوى الرسالة مطلوب</p>
                    ) : null}
                    <div class="text-center" style={{marginTop:'50px',zIndex:'9999'}}>
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
                    {successMsg ? successMsgAlert() : null}
                  </div>
                </div>
              </div>
            </form>
          </main>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">رسالة الحساب للمشتركين</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">

                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit2} className="form">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card p-4">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label text-start"
                    >
                      ملف المشتركين (ملف أكسل يحتوي على عمود واحد فيه إيميلات المشتركين)
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-file-alt"></i>
                      </span>
                      <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => handleUpload(e)}
                        className="form-control"
                        id="file"
                        style={{ display: "none" }}
                      />
                      <label
                        className="form-control text-start uploadFile"
                        htmlFor="file"
                      >
                       {xlsfilename}
                      </label>
                    </div>
                    {/* show error msg */}
                    {xlsfileError ? (
                      <p className="error-msg">حقل ملف المشتركين مطلوب</p>
                    ) : null}

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

                    {successMsg2 ? successMsgAlert2() : null}
                  </div>
                </div>
              </div>
            </form>
          </main>
          
          
        </div>
      </div>
    </div>
  );
}

export default CompetitionContent;
