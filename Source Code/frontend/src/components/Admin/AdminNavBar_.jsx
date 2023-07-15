import React, { useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import AdminNotifications from "./AdminNotifications";
function AdminNav() {
  let history = useHistory();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  // console.log("retrievedValue: ", email);
  // console.log("retrievedValue: ", role);

  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/login");
  };
  const Notify = () => {
    if (email && role == "admin"){
      return (<AdminNotifications/>)
  }
  };
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        بيئة تك ؟ للمشاريع
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link
            to="/"
            className="pe-2"
            style={{ color: "rgba(255,255,255,.55)" }}
            // target="_blank"
          >
            تصفح بيئة تك
          </Link>
         
          {Notify()}
  
          <button
            onClick={Logout}
            className="nav-link px-3"
            href="#"
            style={{ background: "none", border: "none" }}
          >
            Log Out <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminNav;
