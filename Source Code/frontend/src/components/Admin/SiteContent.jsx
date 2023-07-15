import "../Admin/dashboard.rtl.css";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import { Link } from "react-router-dom";
import React from "react";

function SiteContent() {
  return (
    <div>
      <AdminNav />
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">إدارة محتوى الموقع</h1>
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

            <div className="row my-2">
              <Link
                to="/promotional"
                className="card col-md-3 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                الصور الترويجية
              </Link>
              <Link
                to="/beahtecsection"
                className="card col-md-3 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                بيئة تك
              </Link>
              <Link
                to="/footercontrol"
                className="card col-md-3 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                الشريط السفلي
              </Link>
              <Link
                to="/partenercontrol"
                className="card col-md-3 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                الرعاة
              </Link>
            </div>
            <div className="row my-4">
              <Link
                to="/contactControl"
                className="card col-md-2 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                وسائل التواصل
              </Link>
              <Link
                to="/Colleges"
                className="card col-md-2 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                الكليات
              </Link>
              <Link
                to="/articles"
                className="card col-md-2 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                المقالات
              </Link>
              <Link
                to="/challenges"
                className="card col-md-2 linkCard mb-2"
                style={{ paddingTop: "2rem" }}
              >
                التحديات
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SiteContent;
