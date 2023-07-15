import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const VoteSection = () => {
    const [countdownDate, setCountdownDate] = useState(new Date('2/25/2023').getTime());
    const [state, setState] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  
    useEffect(() => {
      setInterval(() => setNewTime(), 1000);
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
                {/* <img style={{marginLeft:'5px'}}src={`image/vote.png`}/> */}
                <span style={{color:'#26306A'}}>التصويت</span>
        </h2>
        <div className="row d-flex justify-content-center">
                <div className="col-md-12 ">
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
             
                
                </div>
            </div>
                
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
export default VoteSection;