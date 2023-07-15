import React, { useState ,useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../Admin/dashboard.rtl.css'
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

 function ArticlesDetailsInWebsite() {
     //Get Id of article from url
    const { id } = useParams()
    const [data, setData] = useState([])
    const {REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_REALIP} = process.env;
    const [open, setOpen] = useState(true);
    const [img , setImg] = useState(REACT_APP_IMGPATH);
 
    useEffect(() =>{
        // setOpen(false);
        try {
            if (data.ArticleImage.includes("media/")) {
                setImg(":80/");
              } else {
                setImg(REACT_APP_IMGPATH);
            }
          } catch {
            setImg(REACT_APP_IMGPATH);
        }

    }, [data]);


    // useEffect(() =>{
    //     // setOpen(false);
    // }, [img]);

    useEffect(() => {

          const delayDebounceFn = setTimeout(() => {
            setOpen(false);
          }, 1000);
    
          return () => clearTimeout(delayDebounceFn)
      }, [data]);

    useEffect(() => {  
      const fetchData = async () =>{
          try {
          const {data: response} = await axios.get(`${REACT_APP_REALIP}/articles/${id}`);
          setData(response);
          // console.log(data)
          } catch (error) {
          // console.error(error.message);
          }

          try {
            if (data.ArticleImage.includes("media/")) {
                img = REACT_APP_IMGPATH;
              } else {
                img = 'media/' + REACT_APP_IMGPATH;
            }
          } catch {
            img = REACT_APP_IMGPATH;
          }

      }
  
      fetchData();
}, []);

    //  var img = ":80";

    //  try {
    //     if (data.ArticleImage.includes("media/")) {
    //         img = ":80/";
    //       } else {
    //         img = REACT_APP_IMGPATH;
    //     }
    //   } catch {
    //     img = REACT_APP_IMGPATH;
    //   }

            
const Close = () => {
  setOpen(false);
}

return (
    <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={Close}
      >
        <Stack gap={1} justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>تحميل ...</Typography>
        </Stack>
      </Backdrop> 
        <Header/>
    <div className='projects articlePage py-5' >
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-10'>
            <h2 className='heading text-center' style={{color:'#26306A'}}>{data.ArticleTitle}</h2>
                <div>
                    <p>
                        <span>تم النشر فى </span>
                        <span>{data.CreatedDate}</span>
                    </p>
                </div>
            </div>
        </div>
        <div className='py-2'></div>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-10'>
               { data ? <img src={"https://"+REACT_APP_IP+ img + data.ArticleImage} className='img-fluid card-img-top img-thumbnail'  alt='ProjectImage'/> : <div></div> }
            </div>
        </div>
         <div className='py-3'></div>
        <div className='row d-flex justify-content-center'>
        <div className='col-md-10'>
            <p className="card-text" style={{textAlign:'justify',lineHeight:'1.8'}}>{data.ArticleDescription}</p>
        </div>
        </div>
    </div>
    </div> 
    <Footer/>
   </div>
  )
}
export default ArticlesDetailsInWebsite;