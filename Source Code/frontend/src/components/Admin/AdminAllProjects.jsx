import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSideBar from "./AdminSidBar";
import AdminNav from "./AdminNavBar";
import Select from 'react-select'
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
function AminAllProjects() {
  const { REACT_APP_IP, REACT_APP_BACKEND_PORT,REACT_APP_BACKEND_HTTP ,REACT_APP_REALIP} = process.env;
  const [data, SetData] = useState([]);
  const [show, setshow] = useState(false);
  const [projects, Setprojects] = useState([]);
  const [teams, Setteams] = useState([]);
  const [projectID, setprojectID] = useState("");
  const [collegeID, setcollegeID] = useState("");
  const [TeamID, setTeamID] = useState("");
  const [TeamContactID, setTeamContactID] = useState("");
  const [closeFilter, setcloseFilter] = useState(false);
  const [colleges, setcolleges] = useState([]);
  const [Contacts, SetContacts] = useState([]);
  const [isDisableSelectProject, setisDisableSelectProject] = useState(false);
  const [isDisableSelectCollege, setisDisableSelectCollege] = useState(false);
  const [isDisableSelectTeam, setisDisableSelectTeam] = useState(false);
  const [isDisableSelectContact, setisDisableSelectContact] = useState(false);
  const msg = "لايوجد";
  // #Open and close model
  const handleClose = () =>{
    setisDisableSelectProject(false)
    setisDisableSelectCollege(false)
    setisDisableSelectTeam(false)
    setisDisableSelectContact(false)
    setshow(false);
   
  }
  const handleShow = () => setshow(true);
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/projectsInAdmin`
      );
      SetData(response.Info);
      Setprojects(response.projects);
      setcolleges(response.colleges);
      Setteams(response.teams);
      SetContacts(response.teamsContact)
      console.log('Info',response.Info);
    } catch (error) {
      // console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleprojectID = (value) => {
    setprojectID(value.value);
    setisDisableSelectCollege(true)
    setisDisableSelectTeam(true)
    setisDisableSelectContact(true)
  }
  const handleTeamID = (value) => {
    setTeamID(value.value);
    setisDisableSelectCollege(true)
    setisDisableSelectProject(true)
    setisDisableSelectContact(true)
    
  }
  
  const handleCollege = (value) => {
    setcollegeID(value.value);
    setisDisableSelectProject(true)
    setisDisableSelectTeam(true)
    setisDisableSelectContact(true)

  }
  const handleContacts = (value) => {
    setTeamContactID(value.value);
    setisDisableSelectProject(true)
    setisDisableSelectTeam(true)
    setisDisableSelectCollege(true)

  }
  console.log('projectID',projectID)
  const SelectBox = () => {
    return(
        <>
        <div className="mb-2">
        <label class="form-label">اسم المشروع</label>
         <Select options={projects} onChange={handleprojectID}
          isDisabled={isDisableSelectProject}
          />
        </div>
        <div className="mb-2">
        <label class="form-label">اسم الكلية</label>
         <Select options={colleges} onChange={handleCollege}
          isDisabled={isDisableSelectCollege}
         />
        </div>
        <div className="mb-2">
        <label class="form-label">اسم الفريق</label>
         <Select options={teams} onChange={handleTeamID}
          isDisabled={isDisableSelectTeam}
         />
        </div>
        <div className="mb-2">
        <label class="form-label">أرقام التواصل</label>
         <Select options={Contacts} onChange={handleContacts}
          isDisabled={isDisableSelectContact}
         />
        </div>
        </>   
    )
    
    }
    console.log('collegeID',collegeID)

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("projectID", projectID);
    uploadData.append("collegeID", collegeID);
    uploadData.append("TeamID", TeamID);
    uploadData.append("TeamContactID", TeamContactID);
    axios
      .post(`${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/filter/`, uploadData)
      .then((response) => {
        // console.log(res);
        // console.log(res.data);
        if (response.data) {
          SetData(response.data);
          setcloseFilter(true)
          setprojectID("")
          setcollegeID("")
          setTeamID("")
          setTeamContactID("")
          console.log('filter',response.data)
        }
       
      }) 
  };

  const dataRender = data.map((d, i) => {
    return (
      <>
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>
          <Link className="card-title fw-bold" to={`/project/${d.ProjectID}`}>
            {d.ProjectN}
          </Link>
        </td>
        <td>{d.teamN}</td>
        <td>{d.teamColleage}</td>
        <td>{d.teamPhone}</td>
        <td>{d.userEmail}</td>
        <td>{d.ProjectChallenge}</td>
        {d.ProjectProposal ? (
          <td>
            <a
              className="card-title fw-bold"
              href={
                REACT_APP_REALIP+"/" + d.ProjectProposal
              }
              target="_blank"
              type="application/octet-stream"
              download={d.ProjectProposal}
            >
              تحميل
            </a>
          </td>
        ) : (
          <td>{msg}</td>
        )}
      </tr>
    </>
    );
  });

const handleCloseFilter=()=>{
  fetchData();
  setcloseFilter(false)
}
  return (
    <div>
      {<AdminNav />}
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">إدارة المشاريع</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                {closeFilter ? 
               <Button
               type="button"
               className="btn btn-secondary"
               style={{ color: "#fff", background: "#26306a", border: "none" }}
               onClick={handleCloseFilter}
             >
               <i class="fas fa-window-close"></i>
               </Button>
                :null
                }
                <Button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="إضافة أدمن"
                  style={{ color: "#fff", background: "#26306a", border: "none" }}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
                </div>
              </div>
            </div>
            <div className=" my-2 d-flex justify-content-end ">
           
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">رقم المشروع</th>
                    <th scope="col">اسم المشروع</th>
                    <th scope="col">اسم الفريق</th>
                    <th scope="col">اسم الكلية</th>
                    <th scope="col">رقم الهاتف</th>
                    <th scope="col">البريد الإلكتروني</th>
                    <th scope="col">اسم التحدي</th>
                    <th scope="col">مقترح المشروع</th>
                  </tr>
                </thead>
                <tbody>{dataRender}</tbody>
              </table>
            </div>
          </main>
        </div>
        <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>بحث متقدم</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
            {SelectBox()}
     
              <Modal.Footer>
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#26306a",
                    border: "none",
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  بحث
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        </div>
      </div>
    </div>
  );
}
export default AminAllProjects;
