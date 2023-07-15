import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const MAX_LENGTH = 300;
const {REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
const email = localStorage.getItem("email");
// console.log("email", email);


function ArticleSectionNew() {
  const [articles, setarticles] = useState([]);
  const [firstArticles, setfirstArticles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/articleinweb`
        );
        setarticles(response.Articles);
        setfirstArticles(response.FirstArticles);
        // console.log('firstArticles',firstArticles)
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  // console.log('articles',articles.length)
  const dataMap = articles.map((article, i) => {
    if (email) {
      return (
        <div className="carousel-item" key={i}>
              <div className="row "> 
          <div className="col-md-12">
              <div className="row d-flex justify-content-around">
                  <div className="col-lg-6 col-md-6">
                  <div className="card-body">
                    <div>
                    <h5 className="card-title" style={{fontWeight:'700',textAlign:'right'}}>{article.ArticleTitle}</h5>
                    </div>
                { article ? (article.ArticleDescription.length > MAX_LENGTH ? (
                  <p className="card-text articlep" style={{color:'#26306A'}}>
                    {`${article.ArticleDescription.substring(
                      0,
                      MAX_LENGTH
                    )}...`}
                  </p>
                ) : (
                  <p className="card-text articlep" style={{color:'#26306A'}}>{article.ArticleDescription}</p>
                )) :  (<p className="card-text articlep" style={{color:'#26306A'}}></p>)
                }
                 <Link to={`/article/${article.ID}`} style={{float:'right',marginBottom:'10px'}}>
                 <span style={{color:'#26306A',fontSize:'18px',fontWeight:'500'}}>إقرأ المزيد</span>
                 <img style={{marginRight:'5px'}} src={`/image/barrow.png`}/>

              </Link>
              </div>
                  </div>
                  <div className="col-lg-4 col-md-6  d-flex align-items-center">
                  {article ? (
                  <img 
                src={"https://" + REACT_APP_IP + REACT_APP_IMGPATH + article.ArticleImage}
                className="img-fluid imgCard img-thumbnail"
                alt="ProjectImage"/>
                  ) : <div></div>}
                  </div>
              </div>
          </div>
           </div> 
          </div>

      );
    } else {
      if (article.ArticleStatus == 0) {
        return (
          <div className="carousel-item" key={i}>
          <div className="row "> 
          <div className="col-md-12">
          <div className="row  d-flex justify-content-around">
              <div className="col-lg-6 col-md-6">
              <div className="card-body">
              <div>
                    <h5 className="card-title"  style={{fontWeight:'700',textAlign:'right'}}>{article.ArticleTitle}</h5>
              </div>
            {article.ArticleDescription.length > MAX_LENGTH ? (
              <p className="card-text articlep" style={{color:'#26306A'}}>
                {`${article.ArticleDescription.substring(
                  0,
                  MAX_LENGTH
                )}...`}
              </p>
            ) : (
              <p className="card-text articlep" style={{color:'#26306A'}}>{article.ArticleDescription}</p>
            )}
            <Link to={`/article/${article.ID}`} style={{float:'right',marginBottom:'10px'}}>
            <img style={{marginRight:'5px'}} src={`/image/barrow.png`}/>
            <span style={{color:'#26306A',fontSize:'18px',fontWeight:'500'}}>إقرأ المزيد</span>

            </Link>
          </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-center">
              <img
            src={"https://" + REACT_APP_IP + REACT_APP_IMGPATH + article.ArticleImage}
            className="img-fluid card-img-top"
            alt="ProjectImage"/>
              </div>
          </div>
          </div>
          </div>
          </div>
        );
      }
    }
  });

  // console.log('firstArticles.ArticleTitle',firstArticles.ArticleTitle)
  const firstArticleMap =() => {
    if (email) {
      return (
          <div className="col-md-12">
              <div className="row  d-flex justify-content-around">
                  <div className="col-lg-6 col-md-6">
                  <div className="card-body">
                    <div>
                    <h5 className="card-title"  style={{fontWeight:'700',textAlign:'right'}}>{firstArticles.ArticleTitle}</h5>
                    </div>
                {firstArticles.ArticleDescription.length > MAX_LENGTH ? (
                  <p className="card-text articlep" style={{color:'#26306A'}}>
                    {`${firstArticles.ArticleDescription.substring(
                      0,
                      MAX_LENGTH
                    )}...`}
                  </p>
                ) : (
                  <p className="card-text articlep" style={{color:'#26306A'}}>{firstArticles.ArticleDescription}</p>
                )}
                 <Link to={`/article/${firstArticles.ID}`} style={{float:'right',marginBottom:'10px'}}>
                 <img style={{marginRight:'5px'}} src={`/image/barrow.png`}/>
                 <span style={{color:'#26306A',fontSize:'18px',fontWeight:'500'}}>إقرأ المزيد</span>

              </Link>
              </div>
                  </div>
                  <div className="col-lg-4 col-md-6 d-flex align-items-center">
                  <img 
                src={"https://" + REACT_APP_IP + REACT_APP_IMGPATH + firstArticles.ArticleImage}
                className="img-fluid imgCard img-thumbnail"
                alt="ProjectImage"/>
                  </div>
              </div>
          </div>

      );
    } else {
      if (firstArticles.ArticleStatus == 0) {
        return (
          <div className="col-md-12">
          <div className="row  d-flex justify-content-around">
              <div className="col-lg-6  col-md-6">
              <div className="card-body">
              <div>
                    <h5 className="card-title"  style={{fontWeight:'700',textAlign:'right'}}>{firstArticles.ArticleTitle}</h5>
              </div>
            {firstArticles.ArticleDescription.length > MAX_LENGTH ? (
              <p className="card-text articlep" style={{color:'#26306A'}}>
                {`${firstArticles.ArticleDescription.substring(
                  0,
                  MAX_LENGTH
                )}...`}
              </p>
            ) : (
              <p className="card-text articlep" style={{color:'#26306A'}}>{firstArticles.ArticleDescription}</p>
            )}
            <Link to={`/article/${firstArticles.ID}`} style={{float:'right',marginBottom:'10px'}}>
            <img style={{marginRight:'5px'}} src={`/image/barrow.png`}/>
            <span style={{color:'#26306A',fontSize:'18px',fontWeight:'500'}}>إقرأ المزيد</span>
            </Link>
          </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-center">
              <img
            src={"https://" + REACT_APP_IP + REACT_APP_IMGPATH + firstArticles.ArticleImage}
            className="img-fluid card-img-top"
            alt="ProjectImage"/>
              </div>
          </div>
          </div>
        );
      }
    }
  };

    return (
        <div 
        id="carouselarticls"
        className="carousel slide articlesNew py-5"
        data-bs-ride="carousel"
        data-interval="1000"
      >
        <h2 className="heading text-center specialH specialar">
        <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
        <span style={{color:'#26306A'}}>المقالات</span>
        </h2>
        <div className="container">
          <div className="carousel-inner" style={{background:'#EEC41A',padding:'30px'}}>
            <div className="carousel-item active">
              <div className="row ">
              { firstArticles.length>0 ? firstArticleMap() : <></>}
              </div>
            </div>
            {/* <div className="carousel-item">
              <div className="row "> */}
              {dataMap}
              {/* </div>
            </div> */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselProjects"
            data-bs-slide="prev"
          >
            <i
              className="fas fa-chevron-circle-right blue-color carousel-control-prev-icon fa-2x"
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
              className="fas fa-chevron-circle-left blue-color carousel-control-next-icon fa-2x"
              aria-hidden="true"
            ></i>
            <span className="visually-hidden">Next</span>
          </button>
          <div className="py-3"></div>
          <div className="row">
            <div className="col-md">
            <div ontouchstart="">
              <div class="mybutton">
              <Link to="/allarticles" className="mybtn arcbtn" >
                المزيد من المقالات
                <img style={{marginLeft:'5px'}}src={`/image/more.png`}/>
              </Link>
              </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>


    
    );
  
}

export default ArticleSectionNew;
