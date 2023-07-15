import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Ideas() {
  const MAX_LENGTH = 100;
  const [Projects_4, setProjects_4] = useState([]);
  const [Projects_8, setProjects_8] = useState([]);

  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/ideas/`
        );
        // console.log(response);
        setProjects_4(response.projects4);
        setProjects_8(response.projects8);
        // console.log("response", response);

        // console.log("response subjects", response.subjects);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const dataProjects_8 = Projects_8.map((Proj, i) => {

    var img = REACT_APP_IMGPATH;
          

    return (
      <>
        <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch mb-4 justify-content-center">
          <Link
            key={Proj.ID}
            to={`/project/${Proj.ID}`}
            className="card"
            style={{ width: "20rem" }}
          >
            {Proj.projectLogo ? (
              <img
                src={
                  "https://" +
                  REACT_APP_IP +
                  img +
                  Proj.projectLogo
                }
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
            ) : (
              <img
                src={`/image/DefaultProject.jpg`}
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{Proj.ProjectName}</h5>
              {Proj.ProjectDescription.length > MAX_LENGTH ? (
                <p className="card-text" style={{ color: "#69696a" }}>
                  {`${Proj.ProjectDescription.substring(0, MAX_LENGTH)}...`}
                </p>
              ) : (
                <p className="card-text">{Proj.ProjectDescription}</p>
              )}
            </div>
          </Link>
        </div>
      </>
    );
  });
  const dataProjects_4 = Projects_4.map((Project, i) => {
    return (
      <>
        <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch mb-4 justify-content-center">
          <Link
            key={Project.ID}
            to={`/idea/${Project.ID}`}
            className="card"
            style={{ width: "20rem" }}
          >
            {Project.projectLogo ? (
              <img
                src={
                  "https://" +
                  REACT_APP_IP +
                  REACT_APP_IMGPATH +
                  Project.projectLogo
                }
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
            ) : (
              <img
                src={`/image/DefaultProject.jpg`}
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{Project.ProjectName}</h5>
              {Project.ProjectDescription.length > MAX_LENGTH ? (
                <p className="card-text" style={{ color: "#69696a" }}>
                  {`${Project.ProjectDescription.substring(0, MAX_LENGTH)}...`}
                </p>
              ) : (
                <p className="card-text">{Project.ProjectDescription}</p>
              )}
            </div>
          </Link>
        </div>
      </>
    );
  });
  return (
    <div
      id="carouselProjects"
      className="carousel slide projects py-5"
      data-bs-ride="carousel"
      data-interval="1000"
    >
      <h2 className="heading text-center">بعض الأفكار التي تم تسليمها</h2>
      <div className="container">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row ">
              {dataProjects_4}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row ">
              {dataProjects_8}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselProjects"
          data-bs-slide="prev"
        >
          <i
            className="fas fa-chevron-circle-right blue-color carousel-control-prev-icon fa-2x"
            aria-hidden="true"
          ></i>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselProjects"
          data-bs-slide="next"
        >
          <i
            className="fas fa-chevron-circle-left blue-color carousel-control-next-icon fa-2x"
            aria-hidden="true"
          ></i>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="py-3"></div>
        <div className="row">
          <div className="col-md">
            <Link to="/allideas" className="login-btn">
              المزيد من الأفكار
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ideas;
