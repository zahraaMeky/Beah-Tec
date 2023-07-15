import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function Footer() {
  const [Footer, setFooter] = useState([]);
  const {REACT_APP_IP,REACT_APP_BACKEND_PORT} = process.env;
  const [showCondition, setshowCondition] = useState(false);
  const [showPrivacy, setshowPrivacy] = useState(false);

  // #Open and close model
  const handleConditionClose = () => setshowCondition(false);
  const handlePrivacyClose = () => setshowPrivacy(false);

  const handleConditionShow = () => setshowCondition(true);
  const handlePrivacyShow = () => setshowPrivacy(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/footer`
        );
        setFooter(response.footer);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  // console.log("facebookLink", Footer.facebookLink);
  const dataFooter = Footer.map((footer, i) => {
    return (
      <>
        <div className="footer">
          <div className="bottom-footer py-4">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="copyright">
                    &copy; الحقوق محفوظة
                    <strong>
                      <span> منصة بيئة. </span>
                    </strong>
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                  <a type="button"  href={footer.facebookLink} target="_blank"  className="px-1"  data-bs-toggle="tooltip" data-bs-placement="top" title={footer.facebookLink}>
                   <i className="fab fa-facebook-f"></i>
                  </a>
                   
                    <a
                      href={footer.TwiterLink}
                      target="_blank"
                      className="px-1"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={footer.LinkedinLink}
                      target="_blank"
                      className="px-1"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href={footer.InstagramLink}
                      target="_blank"
                      className="px-1"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-4">
                <div>
                 <Link  to={`/conditions`}>الشروط والأحكام</Link>
                </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Modal show={showCondition} onHide={handleConditionClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h6>السياسات والأحكام</h6>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img
                        src="/image/terms-of-service.png"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          backgroundPosition: "top",
                        }}
                      />
                      <p className="lead">{footer.Conditions}</p>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Modal show={showPrivacy} onHide={handlePrivacyClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h6>سياسة الخصوصية</h6>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img
                        src="/image/privacy-policy.png"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          backgroundPosition: "top",
                        }}
                      />
                      <p className="lead">{footer.Privacy}</p>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  const CheckFooter = () => {
    if (Footer.length > 0) {
      return dataFooter;
    } else {
      return (
        <>
          <div className="footer">
            <div className="bottom-footer py-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="copyright">
                      &copy; الحقوق محفوظة
                      <strong>
                        <span style={{marginRight:'2px'}}>لدى شركة بيئة</span>
                      </strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <a href="#" className="px-1">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="px-1">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="px-1">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="px-1">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Link   style={{
                        color: "#fff",
                        background: "none",
                        border: "none",
                      }}
                      to={'/conditions'}>الشروط والأحكام</Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Modal show={showCondition} onHide={handleConditionClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <h6>السياسات والأحكام</h6>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body></Modal.Body>
                    </Modal>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Modal show={showPrivacy} onHide={handlePrivacyClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <h6>الخصوصية</h6>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body></Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  return CheckFooter();
}

export default Footer;
