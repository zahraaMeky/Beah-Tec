import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
function Chalenges() {
  const { REACT_APP_IP, REACT_APP_IMGPATH ,REACT_APP_BACKEND_PORT} = process.env;
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/displaychallenges`
        );
        setChallenges(response);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);
  const datachallenge = challenges.map((challenge, i) => {
    return (
      <>
      <div className="col-md d-flex align-items-stretch mb-5 changetooltip">
          <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-disabled">
                  {challenge.Title}
                </Tooltip>
              }
            >
            <Link
              
              to={`/ChallengeDetail/${challenge.ID}`}
              className="card"
              style={{ width: "20rem" }}
            >
            <img
                    className="img-fluid card-img-top img-thumbnail"
                    src={
                      "https://" +
                      REACT_APP_IP +
                      REACT_APP_IMGPATH +
                      challenge.Image
                    }
                    alt="Card image cap"
              />
          </Link>
          </OverlayTrigger>
      </div>
      </>
    );
  });
  return (
    <div className="chalenge py-5">
      <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>التحديات</span>
      </h2>
      <div className="container">
        <div className="row justify-content-center">{datachallenge}</div>
      </div>
    </div>
  );
}

export default Chalenges;
