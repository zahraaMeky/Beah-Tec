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


function Home() {
  
  const RedirectPage = () => {
    useEffect(() => {
      window.location.replace('https://forms.gle/pGpSHc6mNgK9pNRV8');
    }, [])
  
    // Render some text when redirecting
    // You can use a loading gif or something like that
    return <div>
      <h3>Redirecting...</h3>
    </div>
  }

  return (
    <div className="home">
      <Header />
       {RedirectPage}
      <Footer />
    </div>
  );
}

export default Home;
