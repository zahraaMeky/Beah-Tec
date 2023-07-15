import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChalengeDetailsInWeb() {
  const { currentid } = useParams();
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const [challenge, setChallenge] = useState([]);
  const [FChallenge, setFChallenge] = useState();
  const [LChallenge, setLChallenge] = useState();
  const [id, setid] = useState(currentid);

  useEffect(() => {
    fetchData(currentid);
  }, []);
  const fetchData = async (ID) => {
    var url = `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/challengedetails/${ID}`;
    try {
      const { data: response } = await axios.get(url);
      setChallenge(response.challengeDetails);
      setFChallenge(response.firstchallenge);
      setLChallenge(response.lastchallenge);
      // console.log(response);
      if (response) {
        // console.log("challenge");
      }
    } catch (error) {
      // console.error(error.message);
    }
  };

  const handleID = () => {
    if (id == LChallenge) {
      // console.log("currentid==LChallenge");
      setid(parseInt(FChallenge));
      // console.log("currentid==LChallenge,id ", FChallenge);
      // console.log("currentid==LChallenge,url ", URL);
      fetchData(FChallenge);
    } else {
      var ID = parseInt(id) + 1;
      // console.log("currentid+1 ", ID);
      // console.log("currentid+1 url", URL);
      setid(ID);
      fetchData(ID);
    }
  };
  return (
    <>
    <Header/>
    <div className="contactheader">
          <div className="image-container">
            <img  src={`/image/grrenwaste.png`}/>
        </div>
      </div>

      <div className="challengedetails py-5">
        <div className="container">
          <div className="float-end">
            <button className="my-2 chalenge-btn" onClick={handleID}>
              تحدى آخر
            </button>
          </div>
          <div className="clear"></div>
          <div className="row justify-content-center d-flex">
          <div className="col-md-12">
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>{challenge.Title}</span>
          </h2>
            <p className="lead">{challenge.Description}</p>
          </div>
          </div>
          {
            challenge.SubTitle ?(
              <div className="row">
                <div className="col-md-12">
                  <h4 className="text-start" style={{fontSize:'20px',color:'#26306A'}}>{challenge.SubTitle }</h4>
                </div>
              </div>
            ):(
              null
            )
          }
            {
            challenge.SubDescription ?(
              <div className="row">
                <div className="col-md-12">
                  <p className="text-start lead">{challenge.SubDescription }</p>
                </div>
              </div>
            ):(
              null
            )
          }
          <div className="row d-flex justify-content-between">
            <div className="col-md-12">
              <div className="py-3">
              <h4 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`/image/broblemicon.png`}/>
                <span style={{color:'#26306A'}}>المشكلة </span>
              </h4>
                <p className="lead">{challenge.Problems}</p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-md-12">
              <div className="py-3">
              <h4 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`/image/resulticon.png`}/>
                <span style={{color:'#26306A'}}>الأثر السلبي على القطاع </span>
              </h4>
                <p className="lead">{challenge.Negative}</p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-md-12">
              <div className="py-3">
              <h4 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`/image/solicon.png`}/>
                <span style={{color:'#26306A'}}>ما هي الحلول المتوقعة ؟ </span>
              </h4>
                <p className="lead">{challenge.Solution}</p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6  d-flex align-items-stretch ">
              <div className="py-3 letter">
              <h4 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`/image/repeaticon.png`}/>
                <span style={{color:'#26306A'}}>معدل تكرار المشكلة</span>
              </h4>
                
                <p className="lead" style={{ marginTop: "11px" }}>
                  {challenge.ProblemRepeat}
                </p>
              </div>
            </div>
            <div className="col-md-6  d-flex align-items-stretch">
              <div className="letter py-3">
              <h4 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`/image/placeicon.png`}/>
                <span style={{color:'#26306A'}}> اماكن الحدوث</span>
              </h4>
                
                <p className="lead" style={{ marginTop: "11px" }}>
                  {challenge.Places}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
        <Footer />
    </>
  );
}
export default ChalengeDetailsInWeb;
