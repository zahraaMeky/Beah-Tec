import React, { Component } from "react";
import axios from "axios";
import Footer from "./footer";
import Header from "./header";
import { Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';


const MAX_LENGTH = 100;
const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;

const email = localStorage.getItem("email");

class ArticlesSection extends Component {
  state = {
    articles: [],
    open: true,
  };

  getData = () => {
    axios.get(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/articles`).then((res) => {
      const articles = res.data;
      // console.log(articles);
      this.setState({ articles });
      // console.log("get data");
      // console.log(email);
      this.setState({ open: false });
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const dataMap = this.state.articles.map((article, i) => {
      if (email) {

        var img = REACT_APP_IMGPATH;
            
        return (
          <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch">
            <Link
              key={article.ID}
              to={`/article/${article.ID}`}
              className="card mb-4"
              style={{ width: "20rem" }}
            >
              <img
                src={
                  "https://" +
                  REACT_APP_IP +
                  img + 
                  article.ArticleImage
                }
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
              <div className="card-body">
                <h5 className="card-title">{article.ArticleTitle}</h5>
                {article.ArticleDescription.length > MAX_LENGTH ? (
                  <p className="card-text" style={{ color: "#69696a" }}>
                    {`${article.ArticleDescription.substring(
                      0,
                      MAX_LENGTH
                    )}...`}
                  </p>
                ) : (
                  <p className="card-text">{article.ArticleDescription}</p>
                )}
              </div>
            </Link>
          </div>
        );
      } else {
        if (article.ArticleStatus == 0) {

          var img = REACT_APP_IMGPATH;

          return (
            <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch">
              <Link
                key={article.ID}
                to={`/article/${article.ID}`}
                className="card mb-4"
                style={{ width: "20rem" }}
              >
                <img
                  src={
                    "https://" +
                    REACT_APP_IP +
                    img + 
                    article.ArticleImage
                  }
                  className="img-fluid card-img-top"
                  alt="ProjectImage"
                />
                <div className="card-body">
                  <h5 className="card-title">{article.ArticleTitle}</h5>
                  {article.ArticleDescription.length > MAX_LENGTH ? (
                    <p className="card-text" style={{ color: "#69696a" }}>
                      {`${article.ArticleDescription.substring(
                        0,
                        MAX_LENGTH
                      )}...`}
                    </p>
                  ) : (
                    <p className="card-text">{article.ArticleDescription}</p>
                  )}
                </div>
              </Link>
            </div>
          );
        }
      }
    });

    return (
      <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.open}
        onClick={this.handleClose2}
      >
        <Stack gap={1} justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>تحميل ...</Typography>
        </Stack>
      </Backdrop> 
        <Header />
        <div className="contactheader">
          <div className="image-container">
            <img  src={`/image/articalimg.png`}/>
        </div>
      </div>
      
        <div
          className="projects py-5"
          style={{ backgroundColor: "rgba(237, 237, 237,0.5)", minHeight: "100vh" }}
        >
          <div className="container">
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>المقالات</span>
        </h2>
            <div className="row d-flex justify-content">{dataMap}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ArticlesSection;
