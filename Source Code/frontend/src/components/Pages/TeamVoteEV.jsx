import React, { useState ,useEffect} from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReactiveButton from 'reactive-button';
import ProgressButton from 'react-progress-button';
import { ProgressButtonComponent } from '@syncfusion/ej2-react-splitbuttons';


function TeamVoteEV() {
    const {REACT_APP_REALIP} = process.env;
    const [teams, setTeams] = useState([])
    const [phone, setphone] = useState("")
    const [TeamID, setTeamID] = useState("")
    const [OTPWrong, setOTPWrong] = useState(false)
    const [OTP, setOTP] = useState("")
    const [LastPhoneAddedID, setLastPhoneAddedID] = useState("")
    const [phoneExit, setphoneExit] = useState(false);
    const [showphonebox, setshowphonebox] = useState(false);
    const [OTPEmpty, setOTPEmpty] = useState(false);
    const [showOTPbox, setshowOTPbox] = useState(false);
    const [PhoneEmpty, setPhoneEmpty] = useState(false);
    const [Phonelenght, setPhonelenght] = useState(false);
    const [phoneWrong, setphoneWrong] = useState(false);
    const [ResendOTP, setResendOTP] = useState(false);
    const [TeamsData,setTeamsData] = useState(null)
    const [showchart,setshowchart] = useState(null)
    const [minTeam,setminTeam] = useState([])
    const [maxTeam,setmaxTeam] = useState([])
    const [state, setState] = useState('idle');
    const [disable, setDisable] = useState(true);

    const onClickHandler = () => {
        setDisable(true);
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
        // handleOTPSubmit();
    }


    const handleClosePhoneModal = () => {
      setshowphonebox(false);
      setphone("")
      setPhoneEmpty(false)
      setphoneExit(false)
      setPhonelenght(false)
      setphoneWrong(false)
    }
    const handleShowchart= () => setshowchart(true);
    const handleCloseShowchart = () => {setshowchart(false);}
    const handleShowPhoneModal = () => setshowphonebox(true);
    const handleCloseOTPModal = () => {
      setshowOTPbox(false);
      setOTP("")
      setOTPEmpty(false)
    }
    const handleShowOTPModal = () => setshowOTPbox(true);

    useEffect(() => {  
      // MsgAlert();
        const fetchData = async () =>{
            try {
            const {data: response} = await axios.get(`${REACT_APP_REALIP}/team2vote/`);
            setTeams(response.newlist);
            setminTeam(response.minTeam);
            setmaxTeam(response.maxTeam);
             // console.log(response)
            } catch (error) {
            // console.error(error.message);
            }
        }
    
        fetchData();
  }, []);

  useEffect(()=>{
    if (teams.length>0)
    setTeamsData({
      labels: teams.map((data) => data.teamName),
      datasets: [
        {
          label: "نتائج التصويت",
          fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
          data:teams.map((data) => data.VoteNum),
          backgroundColor: [
            "#EEC41A",
            "#26306A",
            "rgba(237, 237, 237)"
          ],
          borderColor: "black",
          borderWidth:1,
          barThickness:25,
          
        },
      ],

    })
    
  }, [teams]);

  const handleTeamID =(id)=>{
   // console.log('teamID',id)
   setTeamID(id)
  }
  const successMsgAlert = (teamName) => {
    Swal.fire(`تم التصويت لفريق ${teamName}`)
  };

  const MsgAlert = () => {
    Swal.fire(`نعتذر منكم ٬سيتم فتح التصويت لاحقا ٬سيتم إعلامكم بإمكانية التصويت عما قريب .. شكرا لتفهمكم`)
  };

  const teamData = teams.map((team, i) => {
    return (
      <>
        <div className="col-xl-3 col-lg-3 col-md-6 d-flex align-items-stretch mb-3">
        <div className="card" style={{ width: "20rem" }}>
                    <div className="card-img rounded">
            { team.projectLogo ? (
              <div>
              <img
                src={
                REACT_APP_REALIP +
                  "/media/" +
                  team.projectLogo
                }
                className="card-img-top rounded-circle img-cover"
                alt="teamImage"
              />
              </div>
            ) : (
              <div>
                <img
                src="/image/DefaultTeam.PNG"
                className="card-img-top rounded-circle img-cover"
                alt="teamImage"
              />
              </div>
            )}
                    </div>
                    <div className="card-body">
                        {/* <Link  to={`/project/${team.projectID}`}> */}
                          <h5 className="card-title">{team.teamName}</h5>
                        
                         {/* <Link to={`/project/${team.projectID}`}> */}
                          <p className="card-text">{team.ProjectName}</p>
                          {/* </Link> */}
                        <button className="joinbutton-74"
                        onClick={() => {
                          handleShowPhoneModal();
                          handleTeamID(team.teamID)
                          // MsgAlert();
                        }}
                        >صوت الآن</button>
                    </div>
                    {/* <div class="card-footer border-success">
                      <small class="text-muted">عدد الأصوات :</small>
                      <small class="text-muted">{team.VoteNum}</small>
                    </div> */}
            </div>
        </div>
      </>
    );
  });
 //  form validation
 const validatePhone = () => {

  var newPhoneStr = phone.replace(/\s/g, "");

  let phonelenght = newPhoneStr.length
  // console.log('phonelenght',phonelenght)
  if (phonelenght == 0) {
      setPhoneEmpty(true)
  } else {
    setPhoneEmpty(false)
  }
  if (phonelenght == 8) {
    setPhonelenght(false)
} else {
  setPhonelenght(true)
}
  if (phonelenght == 8  ) {
      return true;
  } else {
      return false;
  }
  };
  const validateOTp= () => {
    if (OTP == "") {
      setOTPEmpty(true)
    } else {
      setOTPEmpty(false)
    }
    if (OTP=="") {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validatePhone();
    // console.log('isValid', isValid)
    if (isValid) {
      onClickHandler();
      setDisable(true);
    const uploadData = new FormData();
    var pho = phone.replace(/\s/g, "");
    uploadData.append("phone", pho);
    axios
      .post(`${REACT_APP_REALIP}/recievephone/`, uploadData)
      .then((res) => {
        // console.log('phone',res);
        // console.log(res.data);
        setDisable(false);
        if (res.data >0) {
          setLastPhoneAddedID(res.data)
          handleClosePhoneModal()
          handleShowOTPModal()
        }
        if (res.data < 0) {
          setphoneWrong(true);
        }
        if (res.data ===0) {
          setphoneExit(true);
        }
        // setDisable(false);
      })
    }
  };
  let options = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: true,
        color: "rgba(0,0,0,0.8)",
        formatter: Math.round,
        font: {
          weight: 'bold',
          size:12
      },
      anchor: 'center',
      align: 'left',
      offset: -20
      }
   
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks:{
          font: {
              size:9,
              weight:'bold',
          },
        beginAtZero: true,
        color: '#26306A',
    }
      },
      y: {
        grid: {
          display: false
        },
        ticks:{
            font: {
                size: 12,
                weight:'bold',
            },
          beginAtZero: true,
          color: '#26306A',
      }
      }
    }
}
const maxteam = maxTeam.map((team, i) => {
  return(
   <>
   <span style={{color:'#26306a'}}>{team.teamName}</span>
   <span style={{color:'#26306a'}}  className='px-2'>عدد الأصوات :</span>
   <span style={{color:'#26306a'}}>{team.VoteNum}</span>
   </>
  )
  
})
const minteam = minTeam.map((team, i) => {
  return(
   <>
   <span style={{color:'#26306a'}}>{team.teamName}</span>
   <span style={{color:'#26306a'}}  className='px-2'>عدد الأصوات :</span>
   <span style={{color:'#26306a'}}>{team.VoteNum}</span>
   </>
  )
  
})
  const handleOTPSubmit = (e) => {
    // console.log("handleOTPSubmit");
    e.preventDefault();
    const isValid = validateOTp();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("OTP", OTP);
    uploadData.append("TeamID", TeamID);
    uploadData.append("LastPhoneAddedID", LastPhoneAddedID);

    axios
      .post(`${REACT_APP_REALIP}/voteteam/`, uploadData)
      .then((res) => {
        // console.log('phone',res);
        // console.log(res.data);
        let checkResponse=res.data
        if (checkResponse.length>2) {
          handleCloseOTPModal()
          successMsgAlert(checkResponse);
        }
        if (res.data ==="0") {
          setOTPWrong(true)
        }
      })
    } 
  };
    const handleResendOTP= (e) => {
      e.preventDefault();
      // console.log('handleResendOTP')
      const uploadData = new FormData();
      uploadData.append("LastPhoneAddedID", LastPhoneAddedID);
      axios
        .post(`${REACT_APP_REALIP}/resendOTP/`, uploadData)
        .then((res) => {
          // console.log('res',res);
          if (res.data === 1) {
            setResendOTP(true)

          }
          
        })
      } 
 
  const alertPhoneExit = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setphoneExit(false)} show={phoneExit} delay={3000} autohide>
            <Toast.Body>تم التصويت برقم الهاتف سابقا</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertResendOTP = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setResendOTP(false)} show={ResendOTP} delay={3000} autohide>
            <Toast.Body>تم إعادة إرسال رمز OTP</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertphoneWrong = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setphoneWrong(false)} show={phoneWrong} delay={3000} autohide>
            <Toast.Body>خطأ في رقم الهاتف </Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertOTPEmpty = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setOTPEmpty(false)} show={OTPEmpty} delay={3000} autohide>
            <Toast.Body>رمز OTP مطلوب</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertPhonelenght = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setPhonelenght(false)} show={Phonelenght} delay={3000} autohide>
            <Toast.Body>رمز الهاتف يجب أن يكون من 8 أرقام</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertPhoneEmpty = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setPhoneEmpty(false)} show={PhoneEmpty} delay={3000} autohide>
            <Toast.Body>رقم الهاتف مطلوب</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertOTP = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setOTPWrong(false)} show={OTPWrong} delay={3000} autohide>
          <Toast.Body>رمز OTP خطأ</Toast.Body>
          </Toast>
      </div>
    );
  }
  // console.log('setLastPhoneAddedID',LastPhoneAddedID)

// console.log('TeamsData',TeamsData )
// console.log('teams',teams)

function BarChart() {
  return <Bar data={TeamsData }  plugins={[ChartDataLabels]} options={options}
/>;
}

    return (
        <>
         <Header/>
         <div className="contactheader">
         <div className="image-container">
            <img   src={`/image/vote.png`}/>
        </div>
      </div>
        <div className="Vote py-5">
          <div className="container">
            {/* <div className="float-end">
            <Button  className="animated-button1"
                onClick={() => {
                  handleShowchart();
                }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
               نتائج التصويت
               <i class="far fa-chart-bar"></i>
               
                </Button>
            </div> */}
            <div className="clear"></div>
            <div className='row'>
              <h2 className="heading text-center specialH">
              <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
              <span style={{color:'#26306A'}}>صوت لفريقك المفضل</span>
              </h2>
            </div>
                <div className="row">
                 {teamData}
                </div>
            </div>
        </div>
        <div className='modals'>
          <div className='container'>
            <div className='row'>
            <Modal show={showphonebox} onHide={handleClosePhoneModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>تفعيل رقم الهاتف</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  onChange={(evt) => { 
                    if (evt.target.value.length==8) setDisable(false);
                    else setDisable(true);
                    setphone(evt.target.value); 
                  }}
                  type="text"
                  className="form-control"
                  placeholder="رقم الهاتف"
                />
                  <span className="input-group-text" id="basic-addon1">
                  &#x1F1F4;&#x1F1F2;(+968)
                </span>
              </div>
              {phoneWrong ? (
                alertphoneWrong()
              ) : null}
              {Phonelenght ? (
                alertPhonelenght()
              ) : null}
              {PhoneEmpty ? (
                alertPhoneEmpty()
              ) : null}
              {phoneExit ? (
                alertPhoneExit()
              ) : null}
              <Modal.Footer>
              <ReactiveButton
                    buttonState={state}
                    // onClick={onClickHandler}
                    color={'primary'}
                    idleText={'إرسال'}
                    loadingText={'...انتظر'}
                    successText={'تم'}
                    errorText={'خطأ'}
                    type={'submit'}
                    style={{
                      color: "#fff",
                      background: "#26306a",
                      border: "none",
                    }}
                    disabled={disable}
                    messageDuration={2000}
                />
                {/* <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#26306a",
                    border: "none",
                  }}
                 
                >
                  إرسال
                </Button> */}
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
            </div>
            <div className='row'>
            <Modal show={showOTPbox} onHide={handleCloseOTPModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>تفعيل رمز OTP</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                <i className="fab fa-digital-ocean"></i>
                </span>
                <input
                  onChange={(evt) => setOTP(evt.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="otp"
                />
              </div>

              <div className="input-group mb-3">
                <h9 style={{ color: "#FF5733"}}>يرجى الانتظار لفترة زمنية حتى وصول رسالة رمز التفعيل</h9>
              </div>

              
              {ResendOTP ? (
                alertResendOTP()
              ) : null}

              {OTPEmpty ? (
                alertOTPEmpty()
              ) : null}
              {OTPWrong ? (
                alertOTP()
              ) : null}
              <Modal.Footer>
              <Button
                  type="submit"
                  style={{
                    color: "#26306A",
                    background: "#EEC41A ",
                    border: "none",
                  }}
                  onClick={handleResendOTP}
                >
                  إعادة إرسال OTP
                </Button>
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#26306a",
                    border: "none",
                  }}
                  onClick={handleOTPSubmit}
                >
                    تأكيد التصويت 
                </Button>
            
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
            </div>
            {/* <div className='row'>
            <Modal className="votemodal" show={showchart} onHide={handleCloseShowchart}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>نتائج التصويت</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <div className='voteChart'>
              {TeamsData!=null ? 
         <div  className="controlchart" >
          {BarChart()}
       </div>
         : <></>}
           </div>
    
          </Modal.Body>
        </Modal>
            </div> */}
          </div>
        </div>
        <Footer/>
        </>
        
    )
}
export default TeamVoteEV;