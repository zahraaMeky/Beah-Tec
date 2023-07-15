import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Countdown = () => {
  const {REACT_APP_REALIP} = process.env;
    const [countdownDate, setCountdownDate] = useState(new Date('3/3/2023').getTime());
    const [state, setState] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const [votes, setVotes] = useState(null);
    const [voteDeadline, setVoteDeadline] = useState(false);

    useEffect( async ()  => {  

      try {
      const {data: response} = await axios.post(`${REACT_APP_REALIP}/votedeadline/`);
      if (response == "1") {
        setVoteDeadline(true);
      } else setVoteDeadline(false);
      } catch (error) {
      // console.error(error.message);
      }

    }, []);
  
    useEffect(() => {
      setInterval(() => setNewTime(), 1000);
    }, []);

    useEffect(() => {  

        const fetchData = async () =>{
            try {
            const {data: response} = await axios.post(`${REACT_APP_REALIP}/votes/`);
            setVotes(response);
            } catch (error) {
            // console.error(error.message);
            }
        }
    
        fetchData();
  }, []);

  
    const setNewTime = () => {
      if (countdownDate) {
        const currentTime = new Date().getTime();
  
        const distanceToDate = countdownDate - currentTime;
  
        let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let minutes = Math.floor(
          (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
        );
        let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
  
        const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
        if (days<0) days = 0;
        if (hours<0) hours = 0;
        if (minutes<0) minutes = 0;
        if (seconds<0) seconds = 0;

        days = `${days}`;
        if (numbersToAddZeroTo.includes(hours)) {
          hours = `0${hours}`;
        } else if (numbersToAddZeroTo.includes(minutes)) {
          minutes = `0${minutes}`;
        } else if (numbersToAddZeroTo.includes(seconds)) {
          seconds = `0${seconds}`;
        }
  
        setState({ days: days, hours: hours, minutes, seconds });
      }
    };
  
    return (
      <div>
        <div className='countdown-wrapper py-5'>
            <div className="container">
            <h2 className="heading text-center specialH">
                <img style={{marginLeft:'5px'}}src={`image/bluelamp.png`}/>
                <span style={{color:'#26306A'}}>الوقت المتبقى للتصويت</span>
        </h2>
                <div className="row d-flex justify-content-center">
                <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-5 d-flex justify-content-center">

                        <div className='time-section  iconCricle'>
                        <div className="outer-circle">
                          <div className="inner-circle"></div>
                        </div>
                            <div className='time hover-fx'>{state.seconds || '00'}</div>
                            <div className="time-text mb-0  count-title">ثانية</div>
                        </div>
                        {/* <div className='time-section'>
                            <div className='time'>:</div>
                        </div> */}
                    </div>
                    <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-5 d-flex justify-content-center">
                    <div className='time-section iconCricle'>
                        <div className="outer-circle">
                          <div className="inner-circle"></div>
                        </div>
                            <div className='time hover-fx'>{state.minutes || '00'}</div>
                            <div className="time-text mb-0  count-title">دقيقة</div>
                        </div>
                        {/* <div className='time-section'>
                            <div className='time'>:</div>
                        </div> */}
                    </div>
                    <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-5 d-flex justify-content-center">
                        <div className='time-section iconCricle'>
                        <div className="outer-circle">
                          <div className="inner-circle"></div>
                        </div>
                            <div className='time hover-fx'>{state.hours || '00'}</div>
                            <small className="time-text mb-0  count-title">ساعة</small>
                        </div>
                        {/* <div className='time-section'>
                            <div className='time'>:</div>
                        </div> */}
                    </div>


                    <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-5 d-flex justify-content-center">
                        <div className='time-section iconCricle'>
                        <div className="outer-circle">
                          <div className="inner-circle"></div>
                        </div>
                            <div className='time hover-fx'>{state.days || '0'}</div>
                            <div className="time-text mb-0  count-title">يوم</div>
                        </div>
                        {/* <div className='time-section card'>
                            <div className='time'>:</div>
                        </div> */}
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                <div className="col-md-12 ">
                 
                 {voteDeadline ? <></> : 
                 
                 <div className="voteNow mt-5">
                  <Link  to={`/vote`} className="animated-button1 ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <i className="fas fa-star"></i>
               صوت لفريقك
                </Link>
                  </div>
                 
                 }
                 
                  
             
                
                </div>
            </div>

            {votes ? 
             <div className="row d-flex justify-content-center">
             <div className="col-md-12 ">
               <div className="voteNow mt-5">
                <div className="animated-button2">
                <i class="fa-solid fa-check-to-slot"></i>
               إجمالي عدد الأصوات : {votes}
               </div>
               </div>
             </div>
         </div>
         :
         <></>  
          }

            </div>
        </div>
      </div>
    );
  };




// function VoteCounterDown() {
//     const Completionist = () => <span>You are good to go!</span>;

//     return(
//         <>
//         <Countdown date={Date.now() + 5000}>
//     <Completionist />
//   </Countdown>,
//         </>
//     )
// }
export default Countdown