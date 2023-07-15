import React, { Component } from "react";
class Carousel extends Component {
  render() {
    return (
      <>
       <div
        id="carouselExampleSlidesOnly"
        className="carousel slide slider-bg slider d-none d-lg-block d-md-none d-xl-block d-xxl-block d-sm-none"
        data-bs-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="container">
            <div className="carousel-item active ">
              <div className="row align-items-center g-0 d-flex justify-content-around">
              <div className="col-xl-6 col-lg-6   text-lg-end text-center">
                  <img  
                    src="/image/slide1.png"
                    className="img-fluid sim"
                    alt="impossible"
                  />
                </div>
                <div className="col-xl-5 col-lg-5 ">
                <img 
                    src="/image/font1.png"
                    className="img-fluid fim"
                    alt="impossible"
                  />
               
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <div className="row align-items-center g-0 d-flex justify-content-around">
              <div className="col-xl-6 col-lg-6 col-md-12  col-sm-6 text-lg-end text-center">
                  <img 
                    src="/image/slide2.png"
                    className="img-fluid sim"
                    alt="impossible"
                  />
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12  col-sm-6">
                <img 
                    src="/image/font2.png"
                    className="img-fluid fim"
                    alt="impossible"
                  />
                 
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <div className="row align-items-center g-0 d-flex justify-content-around">
              <div className="col-xl-6 col-lg-6 col-md-12  col-sm-10 text-lg-end text-center">
                  <img 
                    src="/image/slide3.png"
                    className="img-fluid sim"
                    alt="impossible"
                  />
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12  col-sm-4">
                <img 
                    src="/image/font3.png"
                    className="img-fluid fim"
                    alt="impossible"
                  />
                 
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
       {/* medium  screen */}
       <div
        id="carouselExampleSlidesOnly"
        className="carousel slide slider-bg slider d-none d-lg-none d-md-block d-xl-none d-xxl-none d-sm-none"
        data-bs-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="container">
            <div className="carousel-item active ">
            <div className="row  d-flex justify-content-center">
              <div className="col-6">
              <img style={{paddingTop:'43px'}}
                    src="/image/font1.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            <div className="row   g-0  d-flex justify-content-center">
              <div className="col-6">
              <img  
                    src="/image/slide1.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            
            </div>
            <div className="carousel-item">
            <div className="row  d-flex justify-content-center">
              <div className="col-6">
              <img style={{paddingTop:'35px'}}
                    src="/image/font2.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            <div className="row   g-0  d-flex justify-content-center">
              <div className="col-6">
              <img  style={{marginTop:'-30px'}}
                    src="/image/slide2.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
         
            </div>
            <div className="carousel-item">
            <div className="row  d-flex justify-content-center">
              <div className="col-6">
              <img style={{paddingTop:'43px'}}
                    src="/image/font3.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            <div className="row   g-0  d-flex justify-content-center">
              <div className="col-6">
              <img  style={{marginTop:'-30px'}}
                    src="/image/slide3.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
          
            </div>

          </div>
        </div>
      </div>
      {/* small screen */}
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide slider-bg slider d-none d-lg-none d-md-none d-xl-none d-xxl-none d-sm-block"
        data-bs-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="container">
            <div className="carousel-item active ">
            <div className="row  d-flex justify-content-center">
              <div className="col-8">
              <img style={{paddingTop:'45px'}}
                    src="/image/font1.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            <div className="row   g-0  d-flex justify-content-center">
              <div className="col-8">
              <img  
                    src="/image/slide1.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            
            </div>
            <div className="carousel-item">
            <div className="row  d-flex justify-content-center">
              <div className="col-8">
              <img style={{paddingTop:'35px'}}
                    src="/image/font2.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            <div className="row   g-0  d-flex justify-content-center">
              <div className="col-8">
              <img  style={{marginTop:'-30px'}}
                    src="/image/slide2.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
         
            </div>
            <div className="carousel-item">
            <div className="row  d-flex justify-content-center">
              <div className="col-8">
              <img style={{paddingTop:'45px'}}
                    src="/image/font3.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
            <div className="row   g-0  d-flex justify-content-center">
              <div className="col-8">
              <img  style={{marginTop:'-30px'}}
                    src="/image/slide3.png"
                    className="img-fluid"
                    alt="impossible"
                  />
              </div>
            </div>
          
            </div>

          </div>
        </div>
      </div>
      {/* xs screen */}
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide slider-bg slider d-block d-lg-none d-md-none d-xl-none d-xxl-bone d-sm-none"
        data-bs-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="container">
            <div className="carousel-item active">
              <div className="row  d-flex justify-content-center">
                <div className="col-10">
                <img style={{paddingTop:'60px'}}
                    src="/image/font1.png"
                    className="img-fluid"
                    alt="impossible"
                  />
               
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <div className="row  d-flex justify-content-center">
      
                <div className="col-10">
                <img style={{paddingTop:'60px'}}
                    src="/image/font2.png"
                    className="img-fluid"
                    alt="impossible"
                  />
                 
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <div className="row  d-flex justify-content-center">
          
                <div className="col-10">
                <img  style={{paddingTop:'60px'}}
                    src="/image/font3.png"
                    className="img-fluid"
                    alt="impossible"
                  />
                 
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      </>
     
      
    );
  }
}

export default Carousel;
