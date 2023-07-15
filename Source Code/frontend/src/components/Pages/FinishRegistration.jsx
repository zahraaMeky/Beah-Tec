import Header from "./header";
import Footer from "./footer";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import validator from 'validator';


function FinishRegistration() {
  const [challenges, setChallenges] = useState([]);
  const [Colleges, setColleges] = useState([]);
  const [JoinConditions, setJoinConditions] = useState([]);
  const [problem, setproblem] = useState("");
  const [team, setteam] = useState("");
  const [email, setemail] = useState("");
  const [college, setcollege] = useState("");
  const [member, setmember] = useState("");
  const [description, setdescription] = useState("");
  const [termCondition, settermCondition] = useState(false);
  const [project, setproject] = useState("");
  const [phone, setphone] = useState("");
  const [newCollegerError, setnewCollegerError] = useState(false);
  const [newCollege, setnewCollege] = useState("");
  
  const condition = useRef();

  //state for error message
  const [problemError, setproblemError] = useState(false);
  const [teamError, setteamError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [collegeError, setcollegeError] = useState(false);
  const [memberError, setmemberError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [termConditionError, settermConditionError] = useState(false);
  const [ProjectError, setProjectError] = useState(false);
  const [member5LimitError, setmember5LimitError] = useState(false);
  const [member2LimitError, setmember2LimitError] = useState(false);

  const [phoneError, setphoneError] = useState(false);
  //state for Success message
  const [successMsg, setsuccessMsg] = useState(false);
  const [showCondition, setshowCondition] = useState(false);
  const [loading, setLoading]  =  useState(false);

  //state for Email exit
  const [EmailMsg, setEmailMsg] = useState(false);
  const { REACT_APP_IP ,REACT_APP_BACKEND_PORT} = process.env;
  const handlestudentCondition = () => setshowCondition(true)
  const handleConditionClose = () => setshowCondition(false);

  const [phoneExist, setphoneExist] = useState(false);
  const [emailExist, setemailExist] = useState(false);
  const [teamExist, setteamExist]   = useState(false);

  const [phoneWFormat, setphoneWFormat] = useState(false);
  const [emailWFormat, setemailWFormat] = useState(false);

  const [others, setOthers] = useState(false);


  return (
    <div>
      <Header />


      <div className="Join py-5">
        <div className="container">
        <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>انضم إلينا</span>
        </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
              <form className="border p-4">
                {/* row one */}
                <div className="row">
                  <div className="my-4"></div>
                      <label className="form-check-label" style={{color:'#C13012',fontWeight:'600'}}>
                        * لقد انتهت فترة تسجيل الأفكار والتي استمرت إلى تاريخ 2022 / 11 / 10
                  </label>
                </div>

                <div className="row">
                  <div className="my-4"></div>
                      <label className="form-check-label" style={{color:'#C13012',fontWeight:'600'}}>
                        
                  </label>
                </div>

                <div className="row">
                  <div className="my-4"></div>

                </div>


                <div className="row">
                  <div className="my-4"></div>
                      <label className="form-check-label" style={{color:'#C13012',fontWeight:'600'}}>
                        
                  </label>
                </div>
               
              </form>
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
          </div>
          </div>
          
        </div>
      {/* container */}
      </div>
      <Footer />
    </div>
  );
}

export default FinishRegistration;
