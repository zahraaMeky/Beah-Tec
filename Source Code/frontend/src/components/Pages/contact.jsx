import Header from "./header";
import Footer from "./footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function Contact() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [msg, setmsg] = useState("");
  const [nameError, setnameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [msgError, setmsgError] = useState(false);
  const [msgSuccess, setmsgSuccess] = useState(false);
  const {REACT_APP_IP,REACT_APP_BACKEND_PORT} = process.env;
  const [Contacts, setContacts] = useState([]);
  const [FooterSocials, setFooterSocials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/displayfootercontact`
        );
        setContacts(response.contact);
        setFooterSocials(response.footer);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);
  const successMsgAlert = () => {
    Swal.fire({
      title: "تم لإستقبال رسالتكم ",
      text: "الرجاء إنتظار سوف يتم الرد فى أقرب فرصة",
      icon: "success",
    });
  };
  const dataContact = Contacts.map((contact, i) => {
    return (
      <>
        <div className="contact-info mt-3 border-bottom pb-2">
          <span className="px-2 card-title">
            <i className="fas fa-map-marker-alt pe-1 blue-color "></i>
            {contact.Address}
          </span>
          <span className="px-2 card-title">
            <i className="fas fa-phone pe-1 blue-color "></i>
            {contact.PhoneNum}
          </span>
          <span className="px-2 card-title">
            <i className="fas fa-clock pe-1 blue-color "></i>
            {contact.startTime}
          </span>
          {parseInt(contact.startTime )< 12 ? <span className="card-title">ص</span> : null}
          <span className="card-title px-1">-</span>
          {
            parseInt(contact.EndTime )>= 12 ?<span className="px-2 card-title">{parseInt(contact.EndTime )-12}:00</span> 
            : <span className="px-2 card-title">contact.EndTime</span>
          }
          {parseInt(contact.EndTime )>= 12 ? <span className="card-title">م</span> : null}
        </div>
      </>
    );
  });
  const dataFooterLinks = FooterSocials.map((FooterSocial, i) => {
    return (
      <>
       <div className="social">
          <a href={FooterSocial.facebookLink} className="px-1 blue-color">
            <i className="fab fa-facebook-square fa-2x"></i>
          </a>
          <a href={FooterSocial.TwiterLink} className="px-1 blue-color">
            <i className="fab fa-twitter-square fa-2x"></i>
          </a>
          <a href={FooterSocial.LinkedinLink} className="px-1 blue-color">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href={FooterSocial.InstagramLink} className="px-1 blue-color">
          <i class="fa-brands fa-square-instagram fa-2x"></i>
          </a>
        
        </div>
      </>
      );
    });
  const clearState = () => {
    setname("");
    setemail("");
    setmsg("");
  };
  const validate = () => {
    if (name === "") {
      setnameError(true);
    } else {
      setnameError(false);
    }
    if (email === "") {
      setemailError(true);
    } else {
      setemailError(false);
    }
    if (msg === "") {
      setmsgError(true);
    } else {
      setmsgError(false);
    }

    if (name === "" || email === "" || msg === "") {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    // console.log(isValid);
    if (isValid) {
      const uploadData = new FormData();
      uploadData.append("name", name);
      uploadData.append("email", email);
      uploadData.append("msg", msg);

      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/contact/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "success") {
            setmsgSuccess(true);
            e.target.reset();
            clearState();
          }
        })
       
    }
    // setmsgSuccess(false);
  };
  return (
    <div>
      <Header />
      <div className="contactheader">
          <div className="image-container">
            <img  src={`/image/contactimg.png`}/>
        </div>
      </div>
      <div className="contact py-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
            <h2 className="heading text-center specialH">
              <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
              <span style={{color:'#26306A'}}> كن على تواصل معنا</span>
            </h2>
              {
                dataFooterLinks.length>0?(
                dataFooterLinks
                ):(
                  <div className="social">
                  <a href="#" className="px-1 blue-color">
                    <i className="fab fa-facebook-square fa-2x"></i>
                  </a>
                  <a href="#" className="px-1 blue-color">
                    <i className="fab fa-twitter-square fa-2x"></i>
                  </a>
                  <a href="#" className="px-1 blue-color">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                  <a href="#" className="px-1 blue-color">
                    <i className="fab fa-instagram-square fa-2x"></i>
                  </a>
                  
                </div>
                )

              }
            
              {Contacts.length > 0 ? (
                dataContact
              ) : (
                <>
                  <div className="contact-info mt-3 border-bottom pb-2">
                    <span className="px-2 card-title">
                      <i className="fas fa-map-marker-alt pe-1 blue-color "></i>
                    </span>
                    <span className="px-2 card-title">
                      <i className="fas fa-phone pe-1 blue-color "></i>
                    </span>
                    <span className="px-2 card-title">
                      <i className="fas fa-clock pe-1 blue-color "></i>
                    </span>
                  </div>
                </>
              )}

              <form className="my-4" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                  <div class="input-group mb-3">
                  <input
                        onChange={(evt) => setname(evt.target.value)}
                        type="input"
                        className="form-control"
                        placeholder="الاسم"
                      />
                      <span class="input-group-text" id="basic-addon2"><i class="fas fa-signature"></i></span>
                  </div>
                   
                    {/* show error msg */}
                    {nameError ? (
                      <p className="error-msg">حقل الاسم مطلوب</p>
                    ) : null}
                  </div>
                  </div>
                  <div class="row">
                  <div className="col-12">
                  <div class="input-group mb-3">
                  <input
                        onChange={(evt) => setemail(evt.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="البريد الإلكترونى"
                      />
                      <span class="input-group-text" id="basic-addon2">
                      <i class="far fa-envelope-square"></i>
                        </span>
                  </div>
                    
                    {/* show error msg */}
                    {emailError ? (
                      <p className="error-msg">حقل البريد الإلكترونى مطلوب</p>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                  <div class="input-group mb-3">
                  <textarea
                        onChange={(evt) => setmsg(evt.target.value)}
                        className="form-control"
                        placeholder="اكتب رسالة هنا"
                      ></textarea>
                      <span class="input-group-text" id="basic-addon2">
                      <i class="far fa-file-signature"></i>
                        </span>
                  </div>
                    {/* show error msg */}
                    {msgError ? (
                      <p className="error-msg">حقل الرسالة مطلوب</p>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-6">
                    <div className="mb-3">
                      <button
                        className="button-51"
                       
                      >
                        إرسال<i class="fal fa-share-all"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* show error msg */}
                {msgSuccess ? (
                  successMsgAlert()
                ) : null}
              </form>
            </div>
            {/* <div className="col-md-6">
              <img src="/image/contactus.png" className="img-fluid" />
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Contact;
