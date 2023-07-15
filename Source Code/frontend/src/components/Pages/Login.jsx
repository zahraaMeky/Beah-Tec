import React, { useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [CheckUser, setCheckUser] = useState(false);
  const [CheckPassword, setCheckPassword] = useState(false);
  const [Checkstatus, setCheckstatus] = useState(false);
  const [Checkstatus2, setCheckstatus2] = useState(false);
  const [CompleteRegister, setCompleteRegister] = useState(false);
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT,REACT_APP_REALIP } = process.env;

  //Redirect to admin page
  const RedirectAdmin = (EMAIL) => {
    // console.log('RedirectAdmin',EMAIL)
    localStorage.setItem("email", EMAIL);
    localStorage.setItem("role", "admin");
    history.push("/admin");
  };

  const RedirectATeam = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("role", "team");
    history.push("/teamdashboard");
  };

  const RedirectA12Team = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("role", "team");
    history.push("/newteamdashboard");
  };

  const RedirectVisitor = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("role", "visitor");
    history.push("/");
  };
  const clearState = () => {
    setemail("");
    setpassword("");
  };

  //  form validation
  const validate = () => {
    if (email == "") {
      setemailError(true);
    } else {
      setemailError(false);
    }
    if (password == "") {
      setpasswordError(true);
    } else {
      setpasswordError(false);
    }
    if (email == "" || password == "") {
      return false;
    } else {
      return true;
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("email", email);
      uploadData.append("password", password);
      axios
        .post(`${REACT_APP_REALIP}/login/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          // check response from django BackEnd it check if email exit in database or not
          // to display message to user if email exit or success msg if not exit
          if (res.data === "user") {
            setCheckUser(true);
          } else {
            setCheckUser(false);
          }
          if (res.data === "password") {
            setCheckPassword(true);
          } else {
            setCheckPassword(false);
          }
          if (res.data === "admin") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectAdmin(email)
          }
          if (res.data.includes('django')) {
            //Reset Form after submit
            let text=res.data
            let Djangoemail= text.slice(6)
            setemail(Djangoemail)
            // console.log('adminDjango',Djangoemail)
            // console.log('email',email)
            e.target.reset();
            clearState();
            RedirectAdmin(Djangoemail)
          }
          if (res.data === "team") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectATeam();
          }
          if (res.data === "team12") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectA12Team();
          }
          if (res.data === "visitor") {
            //Reset Form after submit
            e.target.reset();
            clearState();
            RedirectVisitor();
          }
          if (res.data === "notComplete") {
            //Reset Form after submit
            setCompleteRegister(true);
          }
          
          if (res.data === "NotApproved") {
            setCheckstatus(true);
          } else {
            setCheckstatus(false);
          }

          if (res.data === "waiting") {
            setCheckstatus2(true);
          } else {
            setCheckstatus2(false);
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
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <h3 className="title blue-color">تسجيل دخول</h3>
                  <div className="form-group">
                    <span className="input-icon">
                      <i className="fa fa-envelope blue-color"></i>
                    </span>
                    <input
                      onChange={(evt) => setemail(evt.target.value)}
                      className="form-control"
                      type="text"
                      placeholder="البريد الإلكترونى"
                    />
                  </div>
                  {/* show erroe msg */}
                  {emailError ? (
                    <p className="error-msg">حقل البريد الإلكترونى مطلوب</p>
                  ) : null}
                  {CheckUser ? (
                    <p className="error-msg">البريد الإلكترونى غير صحيح</p>
                  ) : null}
                  <div className="form-group">
                    <span className="input-icon">
                      <i className="fa fa-lock blue-color"></i>
                    </span>
                    <input
                      onChange={(evt) => setpassword(evt.target.value)}
                      className="form-control"
                      type="password"
                      placeholder="كلمة المرور"
                    />
                  </div>

                  {/* show erroe msg */}
                  {passwordError ? (
                    <p className="error-msg">حقل كلمة المرور مطلوب</p>
                  ) : null}
                  {CheckPassword ? (
                    <p className="error-msg">كلمة المرور غير صحيحة</p>
                  ) : null}
                   {CompleteRegister ? (
                    <p className="error-msg">عملية التسجيل لم تكتمل بنجاح</p>
                  ) : null}
                  <button className="btn signin">
                    دخول<i className="fas fa-sign-out-alt"></i>
                  </button>
                  <Link
                    to={`/forgetpassword/`}
                    className="card-title"
                    style={{ borderBottom: "1px solid #252f6a" }}
                  >
                    فقدت كلمة المرور
                  </Link>
                  {/* show erroe msg */}
                  {Checkstatus ? (
                    <p className="error-msg">لا يمكنك الدخول للمنصة بسبب عدم تأهل فريقك للمرحلة الحالية ٬إن كنت من المتأهلين تواصل معنا</p>
                  ) : null}
                  {Checkstatus2 ? (
                    <p className="error-msg">لقد انتهت فترة تسليم مقترح المشروع ٬ترقبوا إعلان النتائج قريبا</p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
