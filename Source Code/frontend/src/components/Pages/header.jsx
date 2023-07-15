import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Buttons from './Buttons';
function Header() {
  const { REACT_APP_IP } = process.env;
  let history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/login");
  };
  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
    // console.log(isActive)
  }
  const CheckUserRoles = () => {
    if (email) {
      if (role == "admin") {
        return (
          <>
            <span className="linkspan">
              <Link className="login-btn" to="/admin">
                <i className="fas fa-user-cog"></i>
                لوحة التحكم
              </Link>
            </span>
            <span className="linkspan" onClick={Logout}>
              <Link className="login-btn">
                Log Out <i className="fas fa-sign-out-alt"></i>
              </Link>
            </span>
          </>
        );
      }
      if (role == "team") {
        return (
          <>
            <span className="linkspan">
              <Link className="login-btn" to="/teamdashboard">
                لوحة التحكم<i className="fas fa-user-cog"></i>
              </Link>
            </span>
            <span className="linkspan" onClick={Logout}>
              <Link className="login-btn">
                Log Out <i className="fas fa-sign-out-alt"></i>
              </Link>
            </span>
          </>
        );
      }
      if (role == "visitor") {
        return (
          <>
           <span className="linkspan">
              <Link className="login-btn" to="/teamdashboard">
                {email}<i className="fas fa-user"></i>
              </Link>
            </span>
            <span className="linkspan" onClick={Logout}>
              <Link className="login-btn">
                Log Out <i className="fas fa-sign-out-alt"></i>
              </Link>
            </span>
          </>
        );
      }
    } else {
      return (
        <Buttons/>
        // <div>
        //   <span style={{marginLeft:'5px'}}>
        //     <Link to="/login">
              
        //     <img 
        //         src={`image/login.png`}
        //         // style={{ width: "120px", height: "46px", objectFit: "contain" }}
        //       />
        //     </Link>
        //   </span>
        //   <span>
        //     <Link to="/join">
        //       <img 
        //         src={`image/register.png`}
        //         // style={{ width: "120px", height: "46px", objectFit: "contain" }}
        //       />
        //     </Link>
        //   </span>
        // </div>
      );
    }
  };
  
  return (
    <>
     <header className="topheader d-none d-lg-block d-md-block d-xl-block d-xxl-block d-sm-block">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-3  col-lg-2 col-md-3">
            <div>
              <Link to="/">
                <img
                  src={`image/logoSmall.png`}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          {/*col 1*/}
          <div className="col-xl-6  col-lg-10 col-md-9">
            <div className="topNav text-center">
              <Link className="top-heading px-2 topNav" to="/about" dir="rtl">
                بيئة تك ؟
              </Link>
              <Link
                className="top-heading px-2 topNav"
                to="/allprojects"
                dir="rtl"
              >
                المشاريع
              </Link>
              <Link
                className="top-heading px-2 topNav"
                to="/allarticles"
                dir="rtl"
              >
                المقالات
              </Link>
              <Link
                className="top-heading px-2 topNav"
                to="/fqa"
                dir="rtl"
              >
                الأسئلة الشائعة
              </Link>
              <Link className="top-heading px-2 topNav" to="/contact" dir="rtl">
                تواصل معنا
              </Link>
            </div>
          </div>
          {/*col 2*/}
          <div className="col-xl-3 col-lg-12 col-md-12 mb-3">
            <div style={{ marginTop: "18px" }}>{CheckUserRoles()}</div>
          </div>
          {/*col 3*/}
        </div>
      </div>
    </header>

    {/* appear small and extra small screen  */}
    <header className="topheader d-block d-lg-none d-md-none d-xl-none d-xxl-bone d-sm-none">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-5">
            <div>
              <Link to="/">
                <img
                  src={`/image/logoSmall.png`}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="col-5">
          <button onClick={handleClick} className='responsiveIcon'>
              <i className="fas fa-bars"></i>
              </button>
          </div>
        </div>
          {/*col 1*/}
            <ul className={isActive ? 'row topmobileNav text-center controlDisplay list-group' : 'row topmobileNav text-center controlHideen list-group'}>
              <li className="list-group-item">
              <Link className="top-heading px-2 topNav" to="/about" dir="rtl">
                بيئة تك ؟
              </Link>
              </li>
            
              <li className="list-group-item">
              <Link
                className="top-heading px-2 topNav"
                to="/allprojects"
                dir="rtl"
              >
                المشاريع
              </Link>
              </li>
            <li className="list-group-item">
            <Link
                className="top-heading px-2 topNav"
                to="/allarticles"
                dir="rtl"
              >
                المقالات
              </Link>
            </li>
            <li className="list-group-item">
            <Link
                className="top-heading px-2 topNav"
                to="/fqa"
                dir="rtl"
              >
                الأسئلة الشائعة
              </Link>
            </li>
            <li className="list-group-item">
            <Link className="top-heading px-2 topNav" to="/contact" dir="rtl">
                تواصل معنا
              </Link>
            </li>
          
            </ul>
       
          {/*col 2*/}
          <div className="row mb-3">
            <div style={{ marginTop: "18px" }}>{CheckUserRoles()}</div>
          </div>
          {/*col 3*/}
       
      </div>
    </header>
    
    </>
   
  );
}

export default Header;
