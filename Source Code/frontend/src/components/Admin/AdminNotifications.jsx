import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function AdminNotifications() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  // console.log("retrievedValue: ", email);
  // console.log("retrievedValue: ", role);
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const [show, setshow] = useState(false);
  const [notificationDetails, SetnotificationDetails] = useState([]);
  const [notifications, Setnotifications] = useState([]);
  const [len, Setlen] = useState([]);

  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/adminNotifications`
      );
      Setnotifications(response.notifications);
      Setlen(response.len);
      // console.log(response);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

const Notifications=()=>{
  if (len > 0){
    // console.log("len", len);
    return( 
          
      notifications.map((notification, index, arr) => {
        return(
        <>
        <Dropdown.Item key={notification.ID}>
          <Button
            type="button"
            className="btn btn-secondary notifyBTN"
            style={{ color: "#333", background: "none", border: "none" }}
            onClick={() => {
              handleShow();
              handleUpdate(notification.ID);
            }}
          >
            {notification.message}
          </Button>
        </Dropdown.Item>
        <Dropdown.Divider />
        {
          index === arr.length - 1 ? (
            <Dropdown.Item className="text-center card-title">
              <Link to={`/AllNotifications/`}className="card-title notifylink">المزيد من الإشعارات</Link>
            </Dropdown.Item>
          ) : null
        }
        </>
        )
        })
        
        )
  }else{
    return (<Dropdown.Item className="text-center card-title">لا توجد إشعارات جديده</Dropdown.Item>)
  }
}
  function handleUpdate(id) {
    const uploadData = new FormData();
    uploadData.append("ID", id);
    // console.log(id);
    axios
      .post(`https://${REACT_APP_IP}:7000/updatenotify/`, uploadData)
      .then((res) => {
        SetnotificationDetails(res.data.notify);
        // console.log(res.data);
        if (res) {
          fetchData();
          // console.log("update! fetchData()");
        }
      })

  }
  // console.log("notificationDetails", notificationDetails);
  const Notificationdetails = notificationDetails.map((notification, index) => {
    return (
      <div className="msgdetails text-center">
        <p>{notification.msg}</p>
        <span dir="rtl" className="msgdate">
          {notification.date}
        </span>
        <span dir="rtl" className="msgtime">
          {notification.time}
        </span>
      </div>
    );
  });
  const alert =()=>{
    if (len > 0){
      return(
        <span className="alert">
          <span className="badge" style={{background:'#eec515',borderRadius:'50%'}}> {len}</span>
          <span className="alertspan"> <i class="far fa-bell"></i> </span>
         
        </span>
       
      )
    }else{return null}
  }
  return (
    <>
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {alert()}
          <span className="pe-2">{email}</span>
          <i className="fas fa-user"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>{Notifications()}</Dropdown.Menu>
      </Dropdown>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>إشعار جديد</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{Notificationdetails}</Modal.Body>
      </Modal>
    </>
  );
}
export default AdminNotifications;
