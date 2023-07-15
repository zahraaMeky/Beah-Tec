import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../Admin/dashboard.rtl.css'
import AdminNav from './AdminNavBar';
import AdminSideBar from './AdminSidBar';
import { Button, Modal } from "react-bootstrap";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
const msg = "لايوجد";
function ApprovedTeam() {
    const { REACT_APP_REALIP,REACT_APP_IP, REACT_APP_BACKEND_PORT,REACT_APP_BACKEND_HTTP } = process.env;
    const [ApprovedTeams,SetApprovedTeams] = useState([]);
    const [image, setimage] = useState();
    const [PressTeamID, setPressTeamID] = useState(); 
    const [imgError, setimgError] = useState(false); 
    const [show, setshow] = useState(false);
    const [open,setOpen] = useState(true);
    const handleClose = () =>setshow(false);
    const handleShow = () =>setshow(true);
    const handleClose2 = () => {
        setOpen(false);
    }
    const fetchData = async () => {
        try {
          const { data: response } = await axios.get(
            `${REACT_APP_BACKEND_HTTP}://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/approvedteam`
          );
          SetApprovedTeams(response.AppTeams);
          if(response.AppTeams) setOpen(false);
          console.log('response.approvedteam',response.AppTeams)
        } catch (error) {
          // console.error(error.message);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
    
      const dataTeam = ApprovedTeams.map((team, i) => {
        return (
            <>
      <tr key={team.ID}>
              <th scope="row">{i+1}</th>
              <td>{team.TeamName}</td>
              <td>{team.collegeName}</td>  
              <td>
              <Link className="card-title fw-bold" to={`/project/${team.ProjectID}`}>
              {team.ProjectName}
            </Link>
              </td>
              {team.ProjectProposal ? (
          <td>
            <a
              className="card-title fw-bold"
              href={
                REACT_APP_REALIP+"/media/" + team.ProjectProposal
              }
              target="_blank"
              type="application/octet-stream"
              download={team.ProjectProposal}
            >
              تحميل
            </a>
          </td>
        ) : (
          <td>{msg}</td>
        )}
              <td>{team.MemberNum}</td> 
              <td>{team.VoteNum}</td> 
              <td>
              {team.TeamLogo ? (
              <img
              style={{width: "50px",height:"50px",objectFit:"contain"}}
                src={
                  REACT_APP_REALIP +
                  "/media/" +
                  team.TeamLogo
                }
                className="img-fluid card-img-top"
                alt="ProjectImage"
              />
            ) : (
              <p>لا يوجد</p>
            )}
            
            </td> 
              <td>
              <Button style={{color:'#fff',background:'#26306a',border:'none'}} 
              onClick={() => {
                handleShow();
                handelTeamLogo(team.ID)
              }}>
              <i class="far fa-images"></i>
              </Button>
              </td> 
      </tr>
        </>
        )
  
});
const handelTeamLogo=(id)=>{
    setPressTeamID(id)

}
const validate = () => {
  if (!image) {
    setimgError(true);
  } else {
    setimgError(false);
  }
 
  if (!image) {
    return false;
  } else {
    return true;
  }
};
const handelUploadLogo = (e) => {
  e.preventDefault();
  const uploadData = new FormData();
  const isValid = validate();
  if (isValid) {
  uploadData.append("ID", PressTeamID);
  uploadData.append("image", image, image.name);
  axios
    .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/teamlogo/`, uploadData)
    .then((res) => {
      console.log('res',res.data);
      if (res.data == '1') {
        handleClose()
        setimgError(false);
        setimage()
        fetchData()
      }
    })
  }
};   
console.log('PressTeamID',PressTeamID)
        return (
          <div>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose2}
          >
            <Stack gap={1} justifyContent="center" alignItems="center">
              <CircularProgress color="inherit" />
              <Typography>تحميل ...</Typography>
            </Stack>
          </Backdrop> 
          <AdminNav/>
            <div className="container-fluid">
            <div className="row">
            <AdminSideBar/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h4">إدارة الفريق المعتمدة</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary remove_hover">
                      <i className="fas fa-users fa-2x"></i></button>
                  </div>
                </div>
              </div>
                    
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">رقم الفريق</th>
                      <th scope="col">اسم الفريق</th>
                      <th scope="col">اسم الكلية</th>
                      <th scope="col">اسم المشروع</th>
                      <th scope="col">مقترح المشروع</th>
                      <th scope="col">عدد الأعضاء</th>
                      <th scope="col">عدد التصويت</th>
                      <th scope="col">شعارالفريق</th>
                      <th scope="col">تحميل شعار</th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataTeam}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>تحميل شعار الفريق</h6>
            </Modal.Title>
          </Modal.Header>
        <form onSubmit={handelUploadLogo} encType="multipart/form-data">

        <Modal.Body>
          <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fas fa-image"></i>
                  </span>
                  <input
                    type="file"
                    onChange={(evt) => setimage(evt.target.files[0])}
                    className="form-control"
                    id="img"
                    style={{ display: "none" }}
                  />
                  <label
                    className="form-control text-start uploadFile"
                    htmlFor="img"
                  >
                    تحميل صورة
                  </label>
          </div>
          {imgError ? (
                    <p className="error-msg">حقل الصورة مطلوب</p>
                  ) : 
          null}
          
        </Modal.Body>
        <Modal.Footer>
          <Button   type="submit"  style={{color:'#fff',background:'#26306a',border:'none'}}>
           حفظ الصورة 
          </Button>
        </Modal.Footer>
        </form>
        </Modal>
          
     
            </div>
         </div>
        );
 }
    
     
export default ApprovedTeam;