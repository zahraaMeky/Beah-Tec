import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
function Parteners (){
    const [parteners, setParteners] = useState([]);
    const {REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/parteners`);
            setParteners(response);
            // console.log("response", response);
          } catch (error) {
            // console.error(error.message);
          }
        };
        fetchData();
      }, []);
      const dataparteners = parteners.map((partener, i) => {

        var img = REACT_APP_IMGPATH;

        return (
          <>
          <a href={partener.URl} target="_blank" className='col-sm-3 mb-3  align-items-center'>
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="tooltip-disabled">
                    {partener.URl}
              </Tooltip>
              }
            >
              {/* style={{width:'200px',height:'150px',objectFit:'contain'}}  */}
              <Button variant="success" style={{background:'none',border:'none'}}>
              <img  
                  src={"https://" + REACT_APP_IP + img + partener.Image}/>
              </Button>
          </OverlayTrigger>
        
            {/* <div class="imgcontainer">
            <img  style={{width:'200px',height:'150px',objectFit:'contain'}} 
                  src={"https://" + REACT_APP_IP +  partener.Image}/>
              <div class="overlay">
                <div class="text">{partener.URl}</div>
                <a href={partener.URl} target="_blank"></a>
              </div>
            </div> */}
           </a>
          </>
        );
      });
        return (
            <div className='part py-5'>
             <div className='container'>
                <div className='row justify-content-center'>
                <h2 className="heading text-center specialH specialar">
                <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
                <span style={{color:'#26306A'}}>شركاء البرنامج</span>
                </h2>
              
                    {dataparteners}
                </div>
              </div>    
        </div>
        );
    }

 
export default Parteners;