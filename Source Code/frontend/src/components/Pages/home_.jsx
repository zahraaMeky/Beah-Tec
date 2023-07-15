import React, { useState, useEffect } from "react";
import Carousel from "./carousel";
import Statistics from "./statistics";
import About from "./about";
import Projects from "./projects";
import ArticlesSection from "./ArticlesSection";
import Parteners from "./partener";
import Header from "./header";
import Footer from "./footer";
import ProjectsNew from "./ProjectsNew";
import ArticleSectionNew from "./ArticleSectionNew";
import Chalenges from "./Chalenges";
import Slider from "./Slider";
import BeforeProject from "./BeforeProject";
import axios from "axios";
import Workshops from './Workshops';
import Ideas from './Ideas';

function Home() {
  const [ProjectExit, setProjectExit] = useState();
  const {REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: response } = await axios.get(
  //         `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/checkIfProject`
  //       );
  //       setProjectExit(response.ProjectExit);
  //       console.log('response.ProjectExit',response.ProjectExit);  
  //     } catch (error) {
  //       // console.error(error.message);
  //     }
  //   };
  
  //   fetchData();
  // }, []);


  return (
    <div className="home">
      <Header />
      <Carousel/>  
      {/* <Slider />  */}
      <Statistics />
      <About />

      {/* <a  href={"https://forms.gle/pGpSHc6mNgK9pNRV8"} target={"_blank"}  class="cta">
              <span>تسجيل الجامعات</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
      </a> */}

      <Workshops />
      {/* <BeforeProject /> */}
      {/* this will be after register ProjectsNew */}
      {/* <ProjectsNew/> */}
      {/* <Projects /> */}
      <Ideas />
      <ArticleSectionNew/>
      {/* <ArticlesSection /> */}
      <Parteners />
      <Footer />
    </div>
  );
}

export default Home;
