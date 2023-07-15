import '../Admin/dashboard.rtl.css'
import AdminNav from './AdminNavBar';
import AdminSideBar from './AdminSidBar';
import axios from 'axios';
import React, { Component } from 'react'
import { Button ,Modal} from 'react-bootstrap';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

const {REACT_APP_IP,REACT_APP_BACKEND_PORT} = process.env;
class ControlTeam extends Component {
  state = { 
    teams:[],
    show :false,
    teamDetails:{},
    open : true
    
}

handleClose2 = () => this.setState({open :false })
handleToggle = () => this.setState({open :!this.state.open })

 handleClose = () => this.setState({show :false })
 handleShow = () => this.setState({show :true })
 handleData=(id,name,college,user,description,project,UserPassword, phone, member)=>{
   // console.log(id,name,college,user,description,project)
   this.setState({
    teamDetails: {id:id,name:name,college:college,user:user,description:description,project:project,UserPassword:UserPassword, phone:phone, member:member}
  });
   // console.log(this.state.teamDetails)
   
 }
 handelStatus =(status)=>{
  // console.log(status)
let sendData =  this.state.teamDetails
sendData['status'] = status
this.setState({teamDetails: sendData})
axios.post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/updatestatus/`,sendData)
   .then(res => {
     // console.log(res);
     // console.log(res.data);
     this.getData();
   })
}

getData=()=> {
    axios.get(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/teams`)
      .then(res => {
        const teams = res.data;
        console.log(res.data)
        this.setState({ teams });
        this.setState({ open: false });
      });
  }
componentDidMount() {
    this.getData();
  }

  render() { 
    const dataMap = this.state.teams.map((team,i) =>
    <tr key={team.ID}>
            <th scope="row">{i+1}</th>
            <td>{team.TeamName}</td>
            <td>{team.CollegeName}</td>  
            <td>{team.ProjectName}</td> 
            <td>{team.JoinDate}</td> 
            <td>{team.MemberNum}</td> 
            <td>{team.UserStatus}</td>
         
            <td>
            <Button style={{color:'#fff',background:'#26306a',border:'none'}} onClick={ () => {this.handleShow();this.handleData(team.ID,team.TeamName,team.CollegeName,team.userN,team.ProjectDescription,team.ProjectName,team.UserPassword, team.phone, team.MemberNum)}}>
              <i className="fas fa-edit"></i>
            </Button>
            </td> 
    </tr>

);
    return (
      <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.open}
        onClick={this.handleClose2}
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
                <h1 className="h4">إدارة الفرق</h1>
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
                      <th scope="col">تاريخ الانضمام</th>
                      <th scope="col">عدد الأعضاء</th>
                      <th scope="col">حالة الفريق</th>
                      <th scope="col">اخرى</th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataMap}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
      
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> 
            <div>
              <h6>
                <span>اسم الفريق :</span>
                <span className='ms-1'>{this.state.teamDetails.name}  </span>
              </h6>
              <h6>
                <span>اسم الكلية :</span>
                <span className='ms-1'>{this.state.teamDetails.college}</span>
              </h6>
              <h6>
                <span>عدد أعضاء الفريق  :</span>
                <span className='ms-1'>{this.state.teamDetails.member}</span>
              </h6>
              <h6>{this.state.teamDetails.user}</h6>
              <h6>{this.state.teamDetails.phone}</h6>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
              <h6>{this.state.teamDetails.project} </h6>
              <h6>{this.state.teamDetails.description} </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button  style={{color:'#fff',background:'#26306a',border:'none'}}  onClick={ () => {this.handleClose();this.handelStatus(0)}}>
              إعتماد الفريق 
          </Button>
          <Button  style={{color:'#fff',background:'#26306a',border:'none'}}  onClick={ () => {this.handleClose();this.handelStatus(1)}}>
            رفض الفريق 
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
     </div>
    );
  }
}
 

export default ControlTeam;