import "../Admin/dashboard.rtl.css";
import TeamNavbar from "./TeamNavbar";
import { Link } from "react-router-dom";
// import AdminSideBar from "./AdminSidBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pages/Pagination";
function AllTeamNotifications() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [notifications, Setnotifications] = useState([]);
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const [currentPage, setCurrentPage] = useState(1);
  // should change to 10
  const [notificationPerPage] = useState(2);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/allteamnotify/${email}`
      );
      Setnotifications(response.notifications);
      // console.log(response);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const indexOfLasNotification = currentPage * notificationPerPage;
  // console.log('indexOfLasNotification',indexOfLasNotification)
  const indexOfFirstNotification = indexOfLasNotification - notificationPerPage;
  const currentNotification = notifications.slice(
    indexOfFirstNotification,
    indexOfLasNotification
  );
  // console.log('indexOfFirstNotification',indexOfFirstNotification)
  // console.log('currentNotification',currentNotification)
  const totalPagesNum = Math.ceil(notifications.length / notificationPerPage);
  const Notifications = currentNotification.map((notification, index) => {
    return (
      <tr key={notification.id}>
        <td>{indexOfFirstNotification + index+1}</td>
        <td>{notification.msg}</td>
        <td>{notification.date}</td>
        <td>{notification.time}</td>
      </tr>
    );
  });
  return (
    <div>
      <TeamNavbar />
      <div className="container-fluid">
        <div className="row">
        <nav
              id="sidebarMenu"
              className="col-md-4 col-lg-3 d-md-block bg-light sidebar collapse"
            >
              <div className="position-sticky">
                <ul
                  className="nav flex-column list-group"
                  style={{ background: "none" }}
                >
                  <Link  to="/teamdashboard"className="nav-item list-group-item">
                   <i className="fas fa-home"></i>
                   <span className="px-1">رجوع للصفحة الرئيسية</span>
                  </Link>
                  <Link   to="/teamprofile" className="nav-item list-group-item">
                   <i className="fas fa-user"></i>
                   <span className="px-1">الملف الشخصى للفريق</span>
                  </Link>
                  
                </ul>
              </div>
            </nav>
            <main className="col-md-8 ms-sm-auto col-lg-9">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">الإشعارات</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="far fa-bell fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* tables */}
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">تفاصيل الإشعار</th>
                    <th scope="col">تاريخ الإشعار</th>
                    <th scope="col">وقت الإشعار</th>
                  </tr>
                </thead>
                <tbody>{Notifications}</tbody>
              </table>
            </div>
            <Pagination
              pages={totalPagesNum}
              setCurrentPage={setCurrentPage}
              currentNotification={currentNotification}
              notifications={notifications}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
export default AllTeamNotifications;
