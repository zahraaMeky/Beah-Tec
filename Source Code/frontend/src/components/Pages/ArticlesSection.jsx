import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const MAX_LENGTH = 100;
const {REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
const email = localStorage.getItem("email");
// console.log("email", email);
class ArticlesSection extends Component {
  state = {
    articles: [],
  };
  getData = () => {
    axios.get(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/articleinweb`).then((res) => {
      const articles = res.data;
      // console.log(articles);
      this.setState({ articles });
      // console.log("get data");
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
          <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch mb-3">
            <Link
              key={article.ID}
              to={`/article/${article.ID}`}
              className="card"
              style={{ width: "20rem" }}
            >
              <img
                src={"https://" + REACT_APP_IP + img + article.ArticleImage}
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
            <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch mb-3">
              <Link
                key={article.ID}
                to={`/article/${article.ID}`}
                className="card"
                style={{ width: "20rem" }}
              >
                <img
                  src={"https://" + REACT_APP_IP + img + article.ArticleImage}
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
      <div className="articles py-5">
        <div className="container">
          <h2 className="heading text-center">المقالات</h2>
          <div className="row">{dataMap}</div>
          <div className="py-3"></div>
          <div className="row">
            <div className="col-md">
              <Link to="/allarticles" className="login-btn">
                المزيد من المقالات
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesSection;
