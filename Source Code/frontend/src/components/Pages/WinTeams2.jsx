import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";


function WinTeams2() {
    const { REACT_APP_IP,REACT_APP_REALIP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT,REACT_APP_BACKEND_HTTP } = process.env;
    const [winTeams, setwinTeams] = useState([]);
    const [votes, setVotes] = useState(null);

    useEffect(() => {  

      const fetchData = async () =>{
          try {
          const {data: response} = await axios.post(`${REACT_APP_REALIP}/votes/`);
          setVotes(response);
          } catch (error) {
          // console.error(error.message);
          }
      }
  
      fetchData();
}, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(
             `${REACT_APP_REALIP}/winTeams/`
            );
            setwinTeams(response.winTeams);
            // console.log("winTEams",response.winTeams);
    
          } catch (error) {
          }
        };
    
        fetchData();
      }, []);
const WinProjectTeams = winTeams.map((team, i) => {
    return(
        <div className="col-lg-4 col-md-12 col-sm-12  d-flex align-items-stretch mb-4 justify-content-center">
            <Link style={{marginBottom:'60px'}}className="flip-card" tabIndex="0" key={team.projectID}
                to={`/project/${team.projectID}`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <div class="card" style={{width:'300px',height:'300px'}}>
                    { team.TeamLogo ? (
                  <img style={{width:'300px',height:'200px',objectFit:'cover'}}
                    src={
                        REACT_APP_REALIP+
                        "/media/" +
                        team.TeamLogo
                    }
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                ) : (
                  <img 
                  style={{width:'300px',height:'200px',objectFit:'cover'}}
                    src={`image/DefaultTeam.png`}
                    className="img-fluid card-img-top"
                    alt="ProjectImage"
                  />
                )}
                  <div class="card-body" style={{background:'#EEC41A'}}>
                  <h5 className="card-title">{team.TeamName}</h5>
                  <div style={{color:'#26306A'}}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  </div>
                  <div style={{color:'#26306A'}}>
                    <span>عدد الأصوات : </span>
                    <span> {team.VoteNum}</span>
                  </div>
                  </div>
                    </div>
                </div>
                    <div className="flip-card-back">
                    <div class="card" style={{width:'300px',height:'300px'}}>
                    {team.projectLogo ? (
                  <img style={{width:'300px',height:'200px',objectFit:'cover'}}
                    src={
                     REACT_APP_REALIP+
                      "/media/" +
                      team.projectLogo
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
                  <h5 className="card-title">{team.projectName}</h5>
                  </div>
                    </div>
                    </div>
                  </div>
            </Link>
        </div>
    )
});

    return(
    <div className="winteams pt-5">
        <h2 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`image/bluelamp.png`}/>
                <span style={{color:'#26306A'}}>الفرق المتأهلة</span>
        </h2>
        <div className="container">
            <div className="row justify-content-center">
                {WinProjectTeams}
            </div>
            {votes ? 
             <div className="row d-flex justify-content-center">
             <div className="col-md-12 ">
               <div className="voteNow mt-5">
                <div className="animated-button2">
                <i class="fa-solid fa-check-to-slot"></i>
               إجمالي عدد الأصوات : {votes}
               </div>
               </div>
             </div>
         </div>
         :
         <></>  
          }
        </div>
    </div>
    )
   
}

export default WinTeams2;