import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import Header from "./header";


function AllIdeas() {
  const MAX_LENGTH = 100;
  const [allProjects, setallProjects] = useState([]);
  const [challenges, setchallenges] = useState([]);
  const [all_challenge, setall_challenge] = useState([]);
  const [challengesNum, setchallengesNum] = useState();
  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  let history = useHistory();
  let ch = [];
  const email = localStorage.getItem("email");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/ideas/`
        );
        // console.log("all_challenge: ", response.all_challenge);
        setallProjects(response.projects);
        setchallenges(response.challenges);
        setchallengesNum(response.challenge_num);
        setall_challenge(response.all_challenge);
        // console.log("response", response);

        // console.log("response subjects", response.subjects);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const dataallProjects = allProjects.map((Proj, i) => {
    return (
      <>
        <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch mb-3">
          <Link
            key={Proj.ID}
            to={`/idea/${Proj.ID}`}
            className="card"
            style={{ width: "20rem" }}
          >
            {Proj.projectLogo ? (
              <img
                src={
                  "https://" +
                  REACT_APP_IP +
                  
                  Proj.projectLogo
                }
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
            ) : (
              <img
                src="/image/DefaultProject.jpg"
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

  const navs = challenges.map((challenge, i) => {
    return (
      <>
        <button
          className="nav-link"
          id={"nav-" + i + "-tab"}
          data-bs-toggle="tab"
          data-bs-target={"#nav-" + i}
          type="button"
          role="tab"
          aria-controls={"nav-" + i}
          aria-selected="false"
        >
          {challenge.Title}
        </button>
      </>
    );
  });

  // console.log("all_challenge", all_challenge);
  const AllchallengesData = all_challenge.map((cha, i) => {
    // console.log("cha", cha, i);
    return cha ? (
      <div
        className="tab-pane fade"
        id={"nav-" + i}
        role="tabpanel"
        aria-labelledby={"nav-" + i + "-tab"}
      >
        <div className="row">
          {cha.map((ch, i) => {
            // console.log("ch", ch, i);

            var img = REACT_APP_IMGPATH;

            return (
              <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch  mb-3">
                <Link
                  key={ch.ID}
                  to={`/idea/${ch.ID}`}
                  className="card"
                  style={{ width: "20rem" }}
                >
                  {ch.projectLogo ? (
                    <img
                      src={
                        "https://" +
                        REACT_APP_IP +
                        img +
                        ch.projectLogo
                      }
                      className="img-fluid card-img-top"
                      alt="ProjectImage"
                    />
                  ) : (
                    <img
                      src="/image/DefaultProject.jpg"
                      className="img-fluid card-img-top"
                      alt="ProjectImage"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{ch.ProjectName}</h5>
                    {ch.ProjectDescription.length > MAX_LENGTH ? (
                      <p className="card-text" style={{ color: "#69696a" }}>
                        {`${ch.ProjectDescription.substring(0, MAX_LENGTH)}...`}
                      </p>
                    ) : (
                      <p className="card-text">{ch.ProjectDescription}</p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div
        className="tab-pane fade"
        id={"nav-" + i}
        role="tabpanel"
        aria-labelledby={"nav-" + i + "-tab"}
      ></div>
    );
  });
  return (
    <div>
      <Header />
      <div className="contactheader">
          <div className="image-container">
            <img   src={`/image/projectimg.png`}/>
        </div>
      </div>
   
      <div
        className="projects py-5 all-projects"
        style={{ backgroundColor: "rgba(237, 237, 237,0.5)", minHeight: "100vh" }}
      >
        <div className="container">
        <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>بعض الأفكار التي تم تسليمها</span>
        </h2>
          <div className="row">
            <div className="col">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-all-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-all"
                    type="button"
                    role="tab"
                    aria-controls="nav-all"
                    aria-selected="true"
                  >
                    الأفكار
                  </button>
                  {navs}
                </div>
              </nav>
            </div>
          </div>
          <div className="my-5"></div>
          <div className="row">
            <div className="col">
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-all"
                  role="tabpanel"
                  aria-labelledby="nav-all-tab"
                >
                  <div className="row">{dataallProjects}</div>
                </div>
                {AllchallengesData}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllIdeas;
