import React, { useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ForgetPassword() {
  const history = useHistory();
  const [showCodeModal, setshowCodeModal] = useState(false);
  const [passwordmsg, setpasswordmsg] = useState(false);
  const [showpasswordModal, setshowpasswordModal] = useState(false);
  const [email, setemail] = useState("");
  const [code, setcode] = useState("");
  const [emailError, setemailError] = useState(false);
  const [CheckUser, setCheckUser] = useState(false);
  const [UserID, setUserID] = useState();
  const [codeError, setcodeError] = useState(false);
  const [resendCode, setresendCode] = useState(false);
  const [codeExp, setcodeExp] = useState(false);
  const [codeNotIdentical, setcodeNotIdentical] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [passwordError, setpasswordError] = useState(false);
  const [confirmpasswordError, setconfirmpasswordError] = useState(false);
  const [passwordIdentical, setpasswordIdentical] = useState(false);
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const handleCodeModalClose = () => setshowCodeModal(false);
  const handleCodeModalShow = () => setshowCodeModal(true);
  const handlepasswordModalClose = () => setshowpasswordModal(false);
  const handlepasswordModalShow = () => setshowpasswordModal(true);

  // Redirect to login page
  const RedirecttoLogin = () => {
    history.push({
      pathname: "/login",
    });
  };
  //  form validation
  const validate = () => {
    if (email == "") {
      setemailError(true);
    } else {
      setemailError(false);
    }
    if (email == "") {
      return false;
    } else {
      return true;
    }
  };
  const validateResendCode = () => {
    if (code == "") {
      setcodeError(true);
    } else {
      setcodeError(false);
    }
    if (code == "") {
      return false;
    } else {
      return true;
    }
  };
  const validatePassword = () => {
    if (password == "") {
      setpasswordError(true);
    } else {
      setpasswordError(false);
    }
    if (confirmpassword == "") {
      setconfirmpasswordError(true);
    } else {
      setconfirmpasswordError(false);
    }
    if (password == "" || confirmpassword == "") {
      return false;
    } else {
      return true;
    }
  };
  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    // console.log("isValid", isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("email", email);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/checkemail/`, uploadData)
        .then((res) => {
          // console.log('checkemail',res);
          // console.log('checkemail',res.data);
          // check response from django BackEnd it check if email exit in database or not
          // to display message to user if email exit or success msg if not exit
          if (res.data.msg === "send2email") {
            setUserID(res.data.user);
            handleCodeModalShow();
            setCheckUser(false);
            setemailError(false);
          }
          if (res.data === "wrongEmail") {
            setCheckUser(true);
          }
        })
       
    }
  };
  // submit form
  const handleResendCode = () => {
    const uploadData = new FormData();
    // console.log("handleResendCode");
    uploadData.append("userid", UserID);
    uploadData.append("email", email);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/resendcode/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // check response from django BackEnd it check if email exit in database or not
        // to display message to user if email exit or success msg if not exit
        if (res.data === "send") {
          setcodeError(false);
          setresendCode(true);
        }
      })
      
  };
  const handleCode = (e) => {
    e.preventDefault();
    const isValid = validateResendCode();
    // console.log("isValid", isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("userid", UserID);
      uploadData.append("code", code);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/checkcode/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          // check response from django BackEnd it check if email exit in database or not
          // to display message to user if email exit or success msg if not exit
          if (res.data === "success") {
            handleCodeModalClose();
            handlepasswordModalShow();
          }
          if (res.data === "expired") {
            setcodeExp(true);
            setcodeNotIdentical(false);
          }
          if (res.data === "wrongCode") {
            setcodeNotIdentical(true);
            setcodeExp(false);
          }
        })
        
    }
  };
  const handlePassword = (e) => {
    e.preventDefault();
    const isValid = validatePassword();
    // console.log("isValid", isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("userid", UserID);
      uploadData.append("password", password);
      uploadData.append("confirmpassword", confirmpassword);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/resetpassword/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          // check response from django BackEnd it check if email exit in database or not
          // to display message to user if email exit or success msg if not exit
          if (res.data === "resetpassword") {
            setpasswordmsg(true);
            setpasswordError(false);
            setconfirmpasswordError(false);
            setpasswordIdentical(false);
            setTimeout(function () {
              handlepasswordModalClose();
              RedirecttoLogin();
            }, 2000);
          }
          if (res.data === "notIdentical") {
            setpasswordIdentical(true);
            setpasswordmsg(false);
            setpasswordError(false);
            setconfirmpasswordError(false);
          }
        })
       
    }
  };
  return (
    <div>
      <Header />
      <div className="loginpage">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="form-container">
                <div className="form-icon">
                  <img src="/image/logoWhite.png" alt="logo" />
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="form-horizontal"
                  style={{ padding: "90px 30px" }}
                >
                  <h5
                    className="blue-color"
                    style={{ letterSpacing: " 0.5px", margin: "0 0 30px 0" }}
                  >
                    إعادة تعيين كلمة المرور
                  </h5>
                  <div className="form-group">
                    <span className="input-icon">
                      <i className="fa fa-envelope blue-color"></i>
                    </span>
                    <input
                      onChange={(evt) => setemail(evt.target.value)}
                      className="form-control"
                      type="email"
                      placeholder="البريد الإلكترونى"
                    />
                  </div>
                  {/* show erroe msg */}
                  {emailError ? (
                    <p className="snackbar">حقل البريد الإلكترونى مطلوب</p>
                  ) : null}
                  {CheckUser ? (
                    <p className="snackbar">البريد الإلكترونى غير صحيح</p>
                  ) : null}

                  <button className="btn signin" type="submit">
                    إرسال<i className="far fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Code Modal */}
      <Modal show={showCodeModal} onHide={handleCodeModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>اكتب كود التفعيل</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCode}>
            <label>تم إرسال كود التفعيل إلى البريد الإلكترونى</label>
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-barcode"></i>
              </span>
              <input
                onChange={(evt) => setcode(evt.target.value)}
                type="text"
                className="form-control"
                placeholder="كود التفعيل"
              />
            </div>
            {codeError ? (
              <p className="snackbar">حقل كود التفعيل مطلوب</p>
            ) : null}
            {resendCode ? (
              <p className="snackbar">تم إرسال كود تفعيل جديد</p>
            ) : null}
            {codeNotIdentical ? (
              <p className="snackbar">كود التفعيل غير صحيح</p>
            ) : null}
            {codeExp ? (
              <p className="snackbar">كود التفعيل منتهى الصلاحية</p>
            ) : null}
            <Modal.Footer>
              <Button
                style={{
                  color: "#fff",
                  background: "#26306a",
                  border: "none",
                }}
                onClick={handleResendCode}
              >
                إعادة إرسال كود التفعيل
              </Button>
              <Button
                type="submit"
                style={{
                  color: "#fff",
                  background: "#26306a",
                  border: "none",
                }}
              >
                إرسال الكود
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      {/* password Modal */}
      <Modal show={showpasswordModal} onHide={handlepasswordModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>إعادة تعيين كلمة المرور</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePassword}>
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-unlock-alt"></i>
              </span>
              <input
                onChange={(evt) => setpassword(evt.target.value)}
                type="password"
                className="form-control"
                placeholder="كلمة المرور"
              />
            </div>
            {passwordError ? (
              <p className="snackbar">حقل كلمة السر مطلوب</p>
            ) : null}

            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-unlock-alt"></i>
              </span>
              <input
                onChange={(evt) => setconfirmpassword(evt.target.value)}
                type="password"
                className="form-control"
                placeholder="إعادة كلمة المرور"
              />
            </div>

            {confirmpasswordError ? (
              <p className="snackbar">حقل إعادة كلمة السر مطلوب</p>
            ) : null}

            {passwordmsg ? (
              <p className="snackbar">تم إعادة تعيين كلمة السر بنجاح</p>
            ) : null}

            {passwordIdentical ? (
              <p className="snackbar">كلمة السر غير متطابقة </p>
            ) : null}

            <Modal.Footer>
              <Button
                type="submit"
                style={{
                  color: "#fff",
                  background: "#26306a",
                  border: "none",
                }}
              >
                إعادة تعيين كلمة المرور
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default ForgetPassword;
