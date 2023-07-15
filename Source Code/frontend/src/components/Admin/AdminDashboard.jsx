import "../Admin/dashboard.rtl.css";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  let history = useHistory();
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  // console.log("retrievedValue: ", email);
  // console.log("retrievedValue: ", role);
  const [adminstatistics, setadminstatistics] = useState([]);
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/adminstatistics`
      );
      setadminstatistics(response);
      // console.log("setadminstatistics", response);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const dataadminstatistics = adminstatistics.map((stat, i) => {
    return (
      <>
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{stat.subjectname}</td>
          <td>{stat.teamName}</td>
          <td>{stat.likeCount}</td>
          <td>{stat.commentCount}</td>
        </tr>
      </>
    );
  });
  const RenderElment = () => {
    if (email && role == "admin") {
      return (
        <div>
          <AdminNav />
          <div className="container-fluid">
            <div className="row">
              <AdminSideBar />
              <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h4">الإحصائيات</h1>
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary remove_hover"
                      >
                        <i className="fas fa-home  fa-2x"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">رقم الموضوع</th>
                        <th scope="col">اسم الموضوع</th>
                        <th scope="col">اسم الفريق</th>
                        <th scope="col">عدد الاعجاب</th>
                        <th scope="col">عدد التعليقات</th>
                      </tr>
                    </thead>
                    <tbody>{dataadminstatistics}</tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    } else {
      history.push("/login");
    }
  };
  return <>{RenderElment()}</>;
}

export default AdminDashboard;
