import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";

function HackGallaryPage() {
   const [show, setShow] = useState(false);
    const [Images, setImages] = useState([]);
    const [ActiveImage, setActiveImage] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (img) => {
      // console.log(img)
      let Cimg = "https://www.beah-tec.com:80/media/"+img
      // console.log(Cimg)
      setShow(true);
      setActiveImage(Cimg)
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(
              `https://www.beah-tec.com:80/hackathon/`
            );
            setImages(response.images);
            // console.log("response", response);
    
          } catch (error) {
          }
        };
        fetchData();
      }, []);
      const ImagesGallary = Images.map((img, i) => {
        return (
          <>
          <div class="col-sm-6 col-md-4 col-lg-3 item">
        <div className="grid-container gallary">
        <Button
          className="gallarybtn"
              onClick={() => handleShow(img)}
              style={{
                background: "none",
                border: "none",
              }}
            >
            <img class="img-fluid" src={"https://www.beah-tec.com:80/media/"+img}/>
          </Button>
        </div>
        </div>
          </>
        );
      });
    return(
     <>
     <Header />
     <div class="winteams py-5">
        <div class="container">
            <div class="intro mb-5">
               <h2 className="heading text-center specialH">
                    <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
                    <span style={{color:'#26306A'}}>صور فعالية هاكاثون بيئة تك </span>
                </h2>
            </div>
            <div class="row justify-content-center photos">
                {ImagesGallary}
            </div>
            <div className="row">
            <Modal  className="gallaryModal" show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      </Modal.Header>
                      <Modal.Body>
                      <div id="GallaryControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img src={ActiveImage} class=" d-block w-100" />
                          </div>
                          {Images.map((img, i) => {
                              return (
                                <div class="carousel-item">
                                <img src={"https://www.beah-tec.com:80/media/"+img}
                                style= {{ boxShadow:'0px 0px 5px 2px rgba(0, 0, 0, 0.5)'}} 
                                className="d-block w-100" alt="..."
                                loading="lazy"
                                />
                                </div>
                              );
                            })}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#GallaryControls" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true">
                          <i class="fa-solid fa-circle-right card-title fa-lg" 
                          style={{background:'#EEC41A',padding:'10px',borderRadius:'5px'}}>
                          </i>
                          </span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#GallaryControls" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true">
                          <i class="fa-solid fa-circle-left card-title fa-lg"
                           style={{background:'#EEC41A',padding:'10px',borderRadius:'5px'}}>
                           </i>
                          </span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>
                      </Modal.Body>
            </Modal>
            </div>
        </div>
    </div>
    <Footer />
     </>   
    )
}
export default HackGallaryPage;