import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ProjectsNew() {
    const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT,REACT_APP_BACKEND_HTTP } = process.env;
    const MAX_LENGTH = 200;
    const [Projects_4, setProjects_4] = useState([]);
    const [Projects_8, setProjects_8] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(
              `${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/project4/`
            );
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
      const dataProjects_8 = Projects_8.map((Project, i) => {
        return (
          <>
            <div className="col-lg-4  col-md-12 col-sm-12 d-flex align-items-stretch mb-4 justify-content-center">
              <Link style={{marginBottom:'60px'}}  className="flip-card" tabIndex="0" key={Project.ID}
                to={`/project/${Project.ID}`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <div class="card" style={{width:'300px',height:'300px'}}>
                    {Project.projectLogo ? (
                  <img
                style={{width:'300px',height:'300px',objectFit:'cover'}}
                    src={
                      REACT_APP_BACKEND_HTTP+"://" +
                      REACT_APP_IP +
                      REACT_APP_IMGPATH +
                      Project.projectLogo
                    }
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                ) : (
                  <img
                  style={{width:'300px',height:'200px',objectFit:'cover'}}
                    src={`image/DefaultProject.png`}
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                )}
                  <div class="card-body" style={{background:'#EEC41A'}}>
                  <h5 className="card-title">{Project.ProjectName}</h5>
                  </div>
                </div>
                </div>
                    <div className="flip-card-back">
                    <div className="card-body">
                  <h5 className="card-title">{Project.ProjectName}</h5>
                  {Project.ProjectDescription.length > MAX_LENGTH ? (
                    <p className="card-text" style={{ color: "#69696a" }}>
                      {`${Project.ProjectDescription.substring(0, MAX_LENGTH)}...`}
                    </p>
                  ) : (
                    <p className="card-text" style={{ color: "#69696a" }}>{Project.ProjectDescription}</p>
                  )}
                    </div>
                    </div>
                  </div>
              </Link>
            {/* <Link  key={Project.ID}
                to={`/project/${Project.ID}`} className="card cardSpecial mb-3" style={{width:'500px'}}>
                <div className="row g-0">
                    <div className="col-md-5">
                    {Project.projectLogo ? (
                  <img
                    src={
                      "https://" +
                      REACT_APP_IP +
                      
                      Project.projectLogo
                    }
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                ) : (
                  <img
                    src={`image/DefaultProject.jpg`}
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                )}
                    </div>
                    <div className="col-md-7">
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
                    </div>
                </div>
            </Link> */}
            </div>
          </>
        );
      });
      const dataProjects_4 = Projects_4.map((Project, i) => {

        // var img = "";
        //     if (Project.projectLogo.includes("media/")) {
        //       img = ":80/";
        //     } else {
        //       img = REACT_APP_IMGPATH;
        //     }

        return (
          <>
            <div className="col-lg-4  col-md-12 col-sm-12   d-flex align-items-stretch mb-4 justify-content-center">
              <Link style={{marginBottom:'60px'}}className="flip-card" tabIndex="0" key={Project.ID}
                to={`/project/${Project.ID}`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <div class="card" style={{width:'300px',height:'300px'}}>
                    {Project.projectLogo ? (
                  <img style={{width:'300px',height:'300px',objectFit:'cover'}}
                    src={
                      REACT_APP_BACKEND_HTTP+"://" +
                      REACT_APP_IP +
                      REACT_APP_IMGPATH +
                      Project.projectLogo
                    }
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                ) : (
                  <img 
                  style={{width:'300px',height:'200px',objectFit:'cover'}}
                    src={`image/DefaultProject.png`}
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                )}
                  <div class="card-body" style={{background:'#EEC41A'}}>
                  <h5 className="card-title">{Project.ProjectName}</h5>
                  </div>
                </div>
                </div>
                    <div className="flip-card-back">
                    <div className="card-body">
                  <h5 className="card-title">{Project.ProjectName}</h5>
                  {Project.ProjectDescription.length > MAX_LENGTH ? (
                    <p className="card-text" style={{ color: "#69696a" }}>
                      {`${Project.ProjectDescription.substring(0, MAX_LENGTH)}...`}
                    </p>
                  ) : (
                    <p className="card-text" style={{ color: "#69696a" }}>{Project.ProjectDescription}</p>
                  )}
                    </div>
                    </div>
                  </div>
              </Link>
            {/* <Link  key={Project.ID}
                to={`/project/${Project.ID}`} className="card cardSpecial mb-3" style={{width:'500px'}}>
                <div className="row g-0">
                    <div className="col-md-5">
                    {Project.projectLogo ? (
                  <img
                    src={
                      "https://" +
                      REACT_APP_IP +
                      
                      Project.projectLogo
                    }
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                ) : (
                  <img
                    src={`image/DefaultProject.jpg`}
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                )}
                    </div>
                    <div className="col-md-7">
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
                    </div>
                </div>
            </Link> */}
            </div>
          </>
        );
      });
    return (
        <div 
          id="carouselProjects"
          className="carousel slide projectsNew py-5"
          data-bs-ride="carousel"
          data-interval="1000"
        >
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>المشاريع المشاركة</span>
          </h2>
          <div className="container">
            <div className="carousel-inner" style={{background:'#e7e7e7',paddingTop:'70px',paddingLeft:'40px',paddingRight:'40px'}}>
              <div className="carousel-item active">
                <div className="row justify-content-center">
                  {dataProjects_4}
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center">
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
              <div ontouchstart="">
                <div className="mybutton">
                <Link to="/allprojects" className="mybtn arcbtn">
                  المزيد من المشاريع
                  <img style={{marginLeft:'5px'}}src={`image/more.png`}/>
                </Link>
                </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      );

}
export default ProjectsNew