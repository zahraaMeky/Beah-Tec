
function Workshops() {
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
    <span style={{color:'#26306A'}}>الورش التدريبية</span>
    </h2>
    <div className="container">
      
    <div className="row">
            <div className="col-md">
            <div ontouchstart="">
              <div class="mybutton">
              <a href={"https://forms.gle/pGpSHc6mNgK9pNRV8"} target={"_blank"} className="mybtn arcbtn" >
                 تسجيل الورش التدريبية
                <img style={{marginLeft:'5px'}}src={`/image/more.png`}/>
              </a>
              </div>
              </div>
            
            </div>
          </div>

    {/* <a  href={"https://forms.gle/pGpSHc6mNgK9pNRV8"} target={"_blank"}  class="cta">
              <span>تسجيل الورش التدريبية</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
      </a> */}

   
    </div>
  </div>
 )
}

export default Workshops;