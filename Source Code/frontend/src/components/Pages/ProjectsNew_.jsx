import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function ProjectsNew() {
    const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
    const MAX_LENGTH = 100;
    const [Projects_4, setProjects_4] = useState([]);
    const [Projects_8, setProjects_8] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(
              `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/project4/`
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
      const dataProjects_8__ = Projects_8.map((Proj, i) => {
        return (
          <>
            <div className="col-md-6 d-flex align-items-stretch mb-4 justify-content-center">
            <Link key={Proj.ID}
                to={`/project/${Proj.ID}`} className="card cardSpecial mb-3" style={{width:'500px'}}>
                <div className="row g-0">
                    <div className="col-md-5">
                    {Proj.projectLogo ? (
                  <img
                    src={
                      "https://" +
                      REACT_APP_IP +
                      REACT_APP_IMGPATH +
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
                    </div>
                    <div className="col-md-7">
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
                    </div>
                </div>
            </Link>
            </div>
          </>
        );
      });

      const dataProjects_8 = Projects_8.map((Project, i) => {

        var img = REACT_APP_IMGPATH;

        return (
          <>
            <div className="col-md-6 d-flex align-items-stretch mb-4 justify-content-center">
              <Link className="flip-card" tabIndex="0" key={Project.ID}
                to={`/project/${Project.ID}`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>{Project.ProjectName.substring(0, 20)}</h3>
                      {Project.projectLogo ? (
                  <img
                    src={
                      "https://" +
                      REACT_APP_IP +
                      img +
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
                    </div>
                    <div className="flip-card-back">
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
                    src={`/image/DefaultProject.jpg`}
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

        var img = REACT_APP_IMGPATH;

        return (
          <>
            <div className="col-md-6 d-flex align-items-stretch mb-4 justify-content-center">
              <Link className="flip-card" tabIndex="0" key={Project.ID}
                to={`/project/${Project.ID}`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>{Project.ProjectName}</h3>
                      {Project.projectLogo ? (
                  <img
                    src={
                      "https://" +
                      REACT_APP_IP +
                      img +
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
                    </div>
                    <div className="flip-card-back">
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
                    src={`/image/DefaultProject.jpg`}
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
      
      const wait_dataProjects =

         (
          <>
            <div className="col-md-6 d-flex align-items-stretch mb-4 justify-content-center">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">

                      <h3><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></h3>
                      <img
                          src={`/image/DefaultProject.jpg`}
                          className="img-fluid card-img-top"
                          alt="ProjectImage"
                       />
                    </div>
                    <div className="flip-card-back">
                      <div className="card-body">
                        <h5 className="card-title"><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></h5>
                        <p className="card-text"><Skeleton variant="rectangular" width={210} height={60} /></p>
                      </div>
                    </div>
                  </div>
            </div>
          </>
        );


    return (
        <div 
          id="carouselProjects"
          className="carousel slide projectsNew py-5"
          data-bs-ride="carousel"
          data-interval="1000"
        >
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>المشاريع المشاركة</span>
          </h2>
          <div className="container">
            <div className="carousel-inner" style={{background:'#26306A',padding:'30px'}}>
              <div className="carousel-item active">
                <div className="row ">
                  { Projects_4.length>0 ? dataProjects_4 : <div></div>
                  // <div>
                  // <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  // <Skeleton variant="circular" width={40} height={40} />
                  // <Skeleton variant="rectangular" width={210} height={60} />
                  // <Skeleton variant="rounded" width={210} height={60} />
                  // </div>
                  
                  }
                </div>
              </div>
              <div className="carousel-item">
                <div className="row ">
                  {Projects_8.length>0 ? dataProjects_8 : <div></div>}
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
                  <img style={{marginLeft:'5px'}}src={`/image/more.png`}/>
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