import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
function AdminSideBar() {
  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/login");
  };
  let history = useHistory();
  const {REACT_APP_IP,REACT_APP_BACKEND_PORT,REACT_APP_BACKEND_HTTP} = process.env;
  const [CheckDjangoAdmin, setCheckDjangoAdmin] = useState("");
  const loginEmail = localStorage.getItem("email");
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/checkSadmin/${loginEmail}`
      );
      setCheckDjangoAdmin(response.CheckDjangoAdmin);
      // console.log("response.CheckDjangoAdmin", response.CheckDjangoAdmin);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul
          className="nav flex-column list-group"
          style={{ background: "none" }}
        >
          <li className="nav-item">
            <span className="nav-link active" aria-current="page">
              <span data-feather="home"></span>
              لوحة التحكم
            </span>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/admin" className="nav-link">
              <span data-feather="file"></span>
              الإحصائيات
            </Link>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/team" className="nav-link">
              <span data-feather="shopping-cart"></span>
              إدارة الفرق
            </Link>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/aprovedteam" className="nav-link">
              <span data-feather="shopping-cart"></span>
              الفرق المعتمدة
            </Link>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/adminprojects" className="nav-link">
              <span data-feather="users"></span>
              إدارة المشاريع
            </Link>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/Site" className="nav-link">
              <span data-feather="bar-chart-2"></span>
              إدارة محتوى الموقع
            </Link>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/content" className="nav-link">
              <span data-feather="layers"></span>
                إرسال رسالة
            </Link>
          </li>
          {
            CheckDjangoAdmin?
            <li className="nav-item list-group-item">
            <Link to="/privilege" className="nav-link">
              <span data-feather="layers"></span>
              إدارة الصلاحيات
            </Link>
          </li>
          : null
          }
         <li className="nav-item list-group-item logout-btn-collapse">
         <button
                    onClick={Logout}
                    className="nav-link px-3"
                    href="#"
                    style={{ background: "none", border: "none" }}
                  >
                    Log Out <i className="fas fa-sign-out-alt"></i>
          </button>
         </li>
          {/* <li className="nav-item list-group-item">
            <Link to="/competition" className="nav-link">
              <span data-feather="layers"></span>
              إدارة المسابقات
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default AdminSideBar;
