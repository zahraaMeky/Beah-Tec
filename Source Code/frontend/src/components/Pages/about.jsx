import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
function About() {
  const [BeahTec, setBeahTec] = useState([]);
  const { REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/beahTecdisplay`
        );
        setBeahTec(response.BeahTec);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const databeahtec = BeahTec.map((beah, i) => {

    var img = REACT_APP_IMGPATH;

    return (
      <>
        <div className="about py-5">
          <div className="aboutOverlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <h2
                    className="text-start"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    بيئة تك
                  </h2>
                  <p className="lead text-start">{beah.Description}</p>
                  <div className="mt-5"></div>
                  <span className="blue-color">
                    <Link
                      className="about-more"
                      to="/about"
                      style={{
                        color: "#eec515",
                        padding: "7px 9px",
                        borderRadius: "7px",
                      }}
                    >
                      تعرف علينا أكثر{" "}
                      <i className="fas fa-angle-double-left ms-2"></i>
                    </Link>
                  </span>
                </div>
                {/*col 1 */}
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="imge-1 ms-3">
                      <div className="image-above mb-2">
                        <img
                          className="img-fluid"
                          src={"https://" + REACT_APP_IP + img + beah.Image}
                          alt="about"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  return databeahtec;
}

export default About;
