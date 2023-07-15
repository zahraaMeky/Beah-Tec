import './App.css';
import Home from './components/Pages/home';
import AboutPage from './components/Pages/aboutPage';
import Join from './components/Pages/Joinus';
import Login from './components/Pages/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import ControlTeam from './components/Admin/ControlTeam';
import ControlProjects from './components/Admin/ControlProjects';
import CompetitionContent from './components/Admin/CompetitionContent';
import SiteContent from './components/Admin/SiteContent';
import AdminAllProjects from './components/Admin/AdminAllProjects';
import ControlPrivilege from './components/Admin/ControlPrivilege';
import ControlCompetition from './components/Admin/ControlCompetition';
import Articles from './components/Admin/Articles';
import AdminArticlesDetails from './components/Admin/AdminArticlesDetails';
import ArticlesDetails from './components/Pages/ArticlesDetails';
import ArticlesPage from './components/Pages/ArticlesPage';
import {Route,Switch} from "react-router-dom";
import TeamDashboard from './components/Team/TeamDashboard';
import Contact from './components/Pages/contact';
import TeamProfile from './components/Team/TeamProfile';
import SubjectDetails from './components/Team/SubjectDetails';
import MemberDetails from './components/Team/MemberDetails';
import AllProjects from './components/Pages/AllProjects';
import ProjectDetails from './components/Pages/ProjectDetails';
import TeamMembers from './components/Pages/TeamMembers';
import SubjectDetailsPage from './components/Pages/SubjectDetailsPage';
import AdminProjectDetails from './components/Admin/AdminProjectDetails';
import FooterControl from './components/Admin/FooterControl';
import PartenerControl from './components/Admin/PartenerControl';
import PartenerDetails from './components/Admin/PartenerDetails';
import ChallengeControl from './components/Admin/ChallengeControl';
import ChallengeDetails from './components/Admin/ChallengeDetails';
import BeahTecSectionControl from './components/Admin/BeahTecSectionControl';
import PromotionalImagesControl from './components/Admin/PromotionalImagesControl';
import ChalengeDetailsInWeb from './components/Pages/ChalengeDetailsInWeb'
import Colleges from './components/Admin/Colleges';
import CollegeDetails from './components/Admin/CollegeDetails'
import ContactInfoControl from './components/Admin/ContactInfoControl'
import AdminDetails from './components/Admin/AdminDetails';
import NotificationsPage from './components/Admin/NotificationsPage';
import AllTeamNotifications from './components/Team/AllTeamNotifications';
import ForgetPassword from './components/Pages/ForgetPassword';
import AllBefeforeProject from './components/Pages/AllBefeforeProject';
import React, { useState, useEffect } from "react";
import axios from "axios";
import NewTeamDashboard from "./components/Team/NewTeamDashboard";
import FQA from "./components/Pages/FQA";
import GallaryPage from "./components/Pages/GallaryPage";
import FinishRegistration from './components/Pages/FinishRegistration';
import AllIdeas from './components/Pages/AllIdeas';
import Teams12Dashboard from "./components/Team/Teams12Dashboard";
import ApprovedTeam from "./components/Admin/ApprovedTeam";
import TeamVote from './components/Pages/TeamVote';
import TermConditions from './components/Pages/TermConditions';
import HackGallaryPage  from './components/Pages/HackGallaryPage';
import TeamVoteEV from './components/Pages/TeamVoteEV';


function App() {
  const [ProjectExit, setProjectExit] = useState(false);
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

  const checkLogin =()=>{
    const loggedInUser = localStorage.getItem("email");
    if (loggedInUser) {
       return true
    }
  }
  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <AboutPage />
      </Route>
      {/* <Route exact path="/join">
        <FinishRegistration />
      </Route> */}
      <Route exact path="/join">
        <Join />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/admin" onEnter={checkLogin}>
        <AdminDashboard />
      </Route>
      <Route exact path="/team">
        <ControlTeam />
      </Route>
      <Route exact path="/project">
        <ControlProjects />
      </Route>
      <Route exact path="/Content">
        <CompetitionContent />
      </Route>
      <Route exact path="/Site">
        <SiteContent />
      </Route>
      <Route exact path="/privilege">
        <ControlPrivilege />
      </Route>
      <Route exact path="/competition">
        <ControlCompetition/>
      </Route>
      <Route exact path="/teamDash">
        <ControlTeam/>
      </Route>
      <Route exact path="/articles">
        <Articles/>
      </Route>
      <Route exact path="/allarticles">
        <ArticlesPage/>
      </Route>
      <Route exact path="/allprojects">
                   <AllProjects/>
      </Route>
      <Route exact path="/allprojects">
        <AllProjects/>
      </Route>
      <Route exact path="/articles/:id">
        <AdminArticlesDetails/>
      </Route>
      <Route exact path="/article/:id">
        <ArticlesDetails/>
      </Route>
      <Route exact path="/project/:id">
        <ProjectDetails/>
      </Route>
      <Route exact path="/teammember/:id">
        <TeamMembers/>
      </Route>
      <Route exact path="/newteamdashboard">
        <Teams12Dashboard/>
      </Route>
      <Route exact path="/teamdashboard">
        <NewTeamDashboard/>
      </Route>
      <Route exact path="/contact">
        <Contact/>
      </Route>
      <Route exact path="/teamprofile">
        <TeamProfile/>
      </Route>
      <Route exact path="/aprovedteam">
        <ApprovedTeam/>
      </Route>
      <Route exact path="/Subject/:SID/:PID">
        <SubjectDetails/>
      </Route>
      <Route exact path="/Member/:MID/:TID">
        <MemberDetails/>
      </Route>
      <Route exact path="/subjectdetailsPage/:PID/:TID/:SID">
        <SubjectDetailsPage/>
      </Route>
      <Route exact path="/adminprojects">
        <AdminAllProjects/>
      </Route>
      <Route exact path="/adminProjectDetails/:pid">
        <AdminProjectDetails/>
      </Route>
      <Route exact path="/footercontrol">
        <FooterControl/>
      </Route>
      <Route exact path="/partenercontrol">
        <PartenerControl/>
      </Route>
      <Route exact path="/partener/:id">
        <PartenerDetails/>
      </Route>
      <Route exact path="/challenges">
        <ChallengeControl/>
      </Route>
      <Route exact path="/challenge/:id">
        <ChallengeDetails/>
      </Route>
      <Route exact path="/ChallengeDetail/:currentid">
        <ChalengeDetailsInWeb/>
      </Route>
      <Route exact path="/beahtecsection">
        <BeahTecSectionControl/>
      </Route>
      <Route exact path="/promotional">
        <PromotionalImagesControl/>
      </Route>
      <Route exact path="/Colleges">
        <Colleges/>
      </Route>
      <Route exact path="/college/:id">
        <CollegeDetails/>
      </Route>
      <Route exact path="/contactControl">
        <ContactInfoControl/>
      </Route>
      <Route exact path="/adminedite/:id">
        <AdminDetails/>
      </Route>
      <Route exact path="/AllNotifications">
        <NotificationsPage/>
      </Route>
      <Route exact path="/AllteamNotifications">
        <AllTeamNotifications/>
      </Route>
      <Route exact path="/forgetpassword">
        <ForgetPassword/>
      </Route>
      <Route exact path="/fqa">
        <FQA/>
      </Route>

      <Route exact path="/gallary">
        <GallaryPage/>
      </Route>

      <Route exact path="/allideas">
        <AllIdeas/>
      </Route>
      <Route exact path="/vote">
        <TeamVote/>
      </Route>
      <Route exact path="/itisfortesting">
        <TeamVoteEV/>
      </Route>
      <Route exact path="/conditions">
        <TermConditions/>
      </Route>
      <Route exact path="/hackathon">
        <HackGallaryPage/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
