import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import React, { useState, useEffect } from "react";

function TeamMembers() {
  const { id } = useParams();
  const { REACT_APP_IP ,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
  const [getteamContact, SetgetteamContact] = useState([]);
  const [Project, SetProject] = useState([]);
  const [Team, SetTeam] = useState([]);
  const [Member, SetMember] = useState([]);
  const [Subject, SetSubject] = useState([]);
  const [ChallengeName, SetChallengeName] = useState([]);
  const [CollegeName, SetCollegeName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectDetails/${id}`
        );
        SetProject(response.ProjectInfo);
        SetTeam(response.getteam);
        SetMember(response.getmember);
        SetSubject(response.getSubjects);
        SetgetteamContact(response.getteamContact);
        SetChallengeName(response.ChallengeName);
        SetCollegeName(response.CollegeName);
        // console.log(response);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const dataMember = Member.map((m, i) => {

    var img = REACT_APP_IMGPATH;
            

    return (
      <>
        <div className="col-md-9">
          {!(i % 2) ? (
            <div
              key={i}
              className="card my-2 py-2"
              style={{ background: "rgba(0,0,0,.1)" }}
            >
              <div className="row d-flex justify-content-center">
                <div className="col-md-2">
                  {m.MemberImage ? (
                    <img
                      src={"https://" + REACT_APP_IP + img + m.MemberImage}
                      className="rounded-circle img-thumbnail"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  ) :
                  <div>
                    {m.MemberGender=="ذكر" ? 
                    <img
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    src="/image/avatar.png"
                    className="img-fluid  rounded-circle"
                    alt="pImage"
                  /> 
                    : 
                      <img
                        style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                          }}
                        src="/image/avatar2.jpg"
                        className="img-fluid  rounded-circle"
                        alt="pImage"
                      /> 
                    }
                  </div>
                  
                  }
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md">
                      <div
                        className="info ms-2  ps-2 py-1 text-start"
                        style={{
                          marginTop: "1rem",
                          borderRight: "1px solid #26306a",
                        }}
                      >
                        <p className="my-0 card-title fw-bold">
                          {m.MemberName}
                        </p>
                        <p className="my-0 card-title  fw-bold">
                          {m.MemberMajor}
                        </p>
                        <p className="my-0 card-title">{m.MemberDescription}</p>
                      </div>
                    </div>
                    <div className="col-md">
                      <p
                        className="py-1 card-title"
                        style={{
                          marginTop: "1rem",
                        }}
                      >
                        {m.MemberGender}
                      </p>
                    </div>
                    <div className="col-md">
                      <p
                        className="py-1 card-title"
                        style={{
                          marginTop: "1rem",
                        }}
                      >
                        {m.MemberStudyYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="card my-2 py-2">
              <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md">
                      <div
                        className="info ms-2  pe-2 py-1 text-end"
                        style={{
                          marginTop: "1rem",
                          borderLeft: "1px solid #26306a",
                        }}
                      >
                        <p className="my-0 card-title fw-bold">
                          {m.MemberName}
                        </p>
                        <p className="my-0 card-title  fw-bold">
                          {m.MemberMajor}
                        </p>
                        <p className="my-0 card-title">{m.MemberDescription}</p>
                      </div>
                    </div>
                    <div className="col-md">
                      <p
                        className="py-1 card-title"
                        style={{
                          marginTop: "1rem",
                          borderLeft: "1px solid #26306a",
                        }}
                      >
                        {m.MemberGender}
                      </p>
                    </div>
                    <div className="col-md">
                      <p
                        className="py-1 card-title"
                        style={{
                          marginTop: "1rem",
                          borderLeft: "1px solid #26306a",
                        }}
                      >
                        {m.MemberStudyYear}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  {m.MemberImage ? (
                    <img
                      src={"https://" + REACT_APP_IP + img +  m.MemberImage}
                      className="rounded-circle img-thumbnail"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div>
                    {m.MemberGender=="ذكر" ? 
                    <img
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    src="/image/avatar.png"
                    className="img-fluid  rounded-circle"
                    alt="pImage"
                  /> 
                    : 
                      <img
                        style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                          }}
                        src="/image/avatar2.jpg"
                        className="img-fluid  rounded-circle"
                        alt="pImage"
                      /> 
                    }
                  </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  });

  var img = REACT_APP_IMGPATH;
            
  return (
    <div>
      <Header />
      <div className="projectInfo py-4">
        <div className="container">
          <div className="row justify-content-center d-flex">
            <div className="col-md-12">
              <div className="card py-5 px-5">
                <div className="projectNameLogo">
                  {Project.projectLogo ? (
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={
                        "https://" + REACT_APP_IP + img + Project.projectLogo
                      }
                      className="img-fluid  rounded-circle"
                      alt="pImage"
                    />
                  ) : (
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={`/image/DefaultProject.jpg`}
                      className="img-fluid  rounded-circle"
                      alt="pImage"
                    />
                  )}
                  <h2 className="heading text-center"> فريق {Team.TeamName}</h2>
                </div>
                <div className="team">
                  <span>{CollegeName=="أخرى" ? " " : CollegeName}</span>
                </div>
                <div className="TeamMembersInfo">
                  <div className="row justify-content-center d-flex">
                    {dataMember}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default TeamMembers;
