
function BeforeProject() {
    const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
 return(
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
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
        <div className="row d-flex justify-content-center">
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex align-items-center">
            <div className="card">
                <img  className="card-img-top img-fluid" src={`/image/defaultProject.png`} alt="Card image"/>
            </div>
            </div>
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
          className="fas fa-chevron-circle-right yellow-color  carousel-control-prev-icon fa-2x"
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
          className="fas fa-chevron-circle-left yellow-color carousel-control-next-icon fa-2x"
          aria-hidden="true"
        ></i>
        <span className="visually-hidden">Next</span>
      </button>
   
    </div>
  </div>
 )
}

export default BeforeProject;