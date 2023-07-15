import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSideBar from "./AdminSidBar";
import AdminNav from "./AdminNavBar";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function AdminProjectDetails() {
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const { id } = useParams();
  const [Project, SetProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectDetails/${id}`
        );
        SetProject(response.Project);
        // console.log(response);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {<AdminNav />}
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">{Project.ProjectName}</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="fas fa-cogs fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminProjectDetails;
