import React, { useState ,useEffect} from 'react';
import AdminNav from './AdminNavBar';
import AdminSideBar from './AdminSidBar';
import '../Admin/dashboard.rtl.css'
import axios from 'axios';
import {useHistory,useParams } from "react-router-dom"

 function PartenerDetails() {
    let history = useHistory();
    const { id } = useParams()
    const {REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
    const [partener, setPartener] = useState([])
    const [url, seturl] = useState("")
    const [image,setimage] = useState("")


    useEffect(() => {  
     
        const fetchData = async () =>{
            try {
            const {data: response} = await axios.get(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/partenersdetails/${id}`);
            setPartener(response);
            // console.log(response)
            } catch (error) {
            // console.error(error.message);
            }
        }
    
        fetchData();
  }, []);
  const RedirectToPartener=()=>{
    history.push("/partenercontrol");
  }
    // #Submit form 
    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('ID', id);
        uploadData.append('url', url);
        uploadData.append('image', image);

        axios.post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/partenerupdate/`, uploadData)
        .then(res => {
          // console.log(res);
          // console.log(res.data);
          if(res.data === 'Updated'){ RedirectToPartener()}
        })
      }
  return (
    <div>
    {<AdminNav/>}
    <div className="container-fluid">
                  <div className="row">
                  <AdminSideBar/>
                  <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                      <h1 className="h4">تحديث الرعاة</h1>
                      <div className="btn-toolbar mb-2 mb-md-0">
                          <div className="btn-group me-2">
                          <button type="button" className="btn btn-sm btn-outline-secondary remove_hover"><i className="far fa-newspaper fa-2x"></i></button>
                          </div>
                      </div>
                      </div>
                      <div className="row my-2">    
                        <div className='card col-md-10' style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',padding:'1rem'}}>
                          <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                             <label  className="form-label text-start me-1 mt-1" style={{display:'block'}}>رابط الرعاة</label>
                              <input defaultValue={partener.URl} onChange={(evt) => seturl(evt.target.value)} type="text" className="form-control"   aria-describedby="button-addon2"/>
                            </div>
                        
                     
                            <div className="input-group mb-3">
                            <input type="file" defaultValue={partener.Image} onChange={(evt) => setimage(evt.target.files[0])}className="form-control" id="img" style={{display:'none'}}/>
                                  <label  className='form-control text-start uploadFile' htmlFor="img">تحميل صورة</label>
                              <span className="input-group-text">
                                <img src={"https://"+ REACT_APP_IP + partener.Image} width="70" height="70"  alt='upload image'/>
                              </span>
                            </div>
                              <div className="input-group">
                                 <button  className="py-2 updatearticle" type="submit">إرسال</button>
                              </div>
                          </form>
                        </div> 
                      </div>
                  </main>
                  </div> 
              </div>
  </div>
  )
}
export default PartenerDetails
