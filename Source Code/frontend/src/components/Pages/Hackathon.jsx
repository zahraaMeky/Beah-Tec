import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HackGallarySlider from "./HackGallarySlider";


function Hackathon() {
return(
    <>
    <div className="winteams pt-5">
        <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>هاكاثون بيئة تك</span>
         </h2>
        <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-md-5 d-flex align-items-stretch">
                <video  className="mb-4 img-thumbnail" style={{objectFit:'contain',height:"350px", width:"100%"}}
                controls src={`video/hackathon.mp4`}
                type="video/mp4">
                </video>
            </div>
            <div className="col-md-5">
                <HackGallarySlider/>
            </div>
        </div>
        <div className="gallaryImg d-none d-lg-block d-md-block d-xl-block d-xxl-block d-sm-block">
            <div className="row d-flex justify-content-center">
            <div className="col-md-8 d-flex align-items-center">
            {/* <a class="dedcription-btn"  target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdhGrHb0GDC2RKPC3Ba7jHDjU7dRE_ZXlKnrANhvaPfyA5VVw/viewform" >
                <span class="name-descripeion">استمارة التسجيل</span>
                <div class="btn-icon heart">
                <i class="fas fa-user-edit"></i>
                </div>
            </a> */}
            <Link class="dedcription-btn" to={`/hackathon`}>
                <span class="name-descripeion">المزيد من الصور</span>
                <div class="btn-icon heart">
                <i class="fas fa-camera-retro "></i>
                </div>
            </Link>
            </div>
            </div>
        </div>
        <div className="gallaryImg d-block d-lg-none d-md-none d-xl-none d-xxl-none d-sm-none">
            <div className="row d-flex justify-content-center">
            {/* <div className="col-md-12 d-flex align-items-center">
            <a class="dedcription-btn"  target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdhGrHb0GDC2RKPC3Ba7jHDjU7dRE_ZXlKnrANhvaPfyA5VVw/viewform" >
                <span class="name-descripeion">استمارة التسجيل</span>
                <div class="btn-icon heart">
                <i class="fas fa-user-edit"></i>
                </div>
            </a>
            </div> */}
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex align-items-center">
                <Link class="dedcription-btn" to={`/hackathon`}>
                <span class="name-descripeion">المزيد من الصور</span>
                <div class="btn-icon heart">
                <i class="fas fa-camera-retro "></i>
                </div>
            </Link>
                </div>
            </div>
        </div>    
        </div>
    </div>
    </>
)
}
export default Hackathon;
