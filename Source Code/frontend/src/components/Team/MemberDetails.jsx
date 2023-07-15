import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import TeamNavbar from "./TeamNavbar";


function MemberDetails() {
  const { MID } = useParams();
  const { TID } = useParams();
  let history = useHistory();
  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  const login = localStorage.getItem("user");
  const [teams, setteams] = useState([]);
  const [Members, setMembers] = useState([]);
  const [Plogo, setPlogo] = useState("");
  const [showEditphone, setshowEditphone] = useState(false);
  const [updateMember, setupdateMember] = useState("");
  const [phone, setphone] = useState("");
  const [showEditmem, setshowEditmem] = useState(false);
  const [MemberNumber, setMemberNumber] = useState("");
  const [CurrentCount, setCurrentCount] = useState("");
  const [mName, setmName] = useState("");
  const [mMajor, setmMajor] = useState("");
  const [mDesc, setmDesc] = useState("");
  const [mImage, setmImage] = useState("");
  const [collage, setCollege] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/MemberDetails/${MID}/${TID}`
        );
        setteams(response.team);
        setMembers(response.members);
        setPlogo(response.pLogo);
        setCurrentCount(response.getmemberCount);
        setMemberNumber(response.team.MemberNum);
        setCollege(response.college);

        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const TeamProfile = () => {
    history.push("/teamprofile");
  };

  const CountMember = () => {
    // let c = CurrentCount + " من إجمالي " + MemberNumber;
    let c = CurrentCount ;
    return c;
  };

  const refresh = () => {
    // it re-renders the component
    window.location.reload();
  };

  const handleupdate = (id) => {
    // console.log("id", id, "phone", phone);
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("phone", phone);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/phone/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "update") {
          // console.log("update phone!");
          setshowEditphone(false);
          refresh();
        }
      })
      
  };

  const handleChange = (e, changeWhat) => {
    let value = e.target.value;
    if (changeWhat === "phone") {
      setphone(value);
      setshowEditphone(true);
      // console.log("phone", phone);
    }
    if (changeWhat === "memNum") {
      setupdateMember(value);
      setshowEditmem(true);
      // console.log("memNum", updateMember);
    }
  };

  const LimitNUmMsgAlert = () => {
    Swal.fire({
      icon: "error",
      title: "خطأ...",
      text: "عدد الفريق يجيب أن يكون ما بين 3 و 5",
    });
  };

  const handleMemberNum = (id) => {
    // console.log("id", id, "updateMember", updateMember);
    const uploadData = new FormData();

    if (updateMember > 2 && updateMember < 5) {
      uploadData.append("ID", id);
      uploadData.append("updateMember", updateMember);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/member/`, uploadData)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          if (res.data === "update") {
            // console.log("update Member!");
            setshowEditmem(false);
            refresh();
          }
        })
        
    } else {
      LimitNUmMsgAlert();
      setshowEditmem(false);
      setupdateMember("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("MID", MID);
    const uploadData = new FormData();
    uploadData.append("memberNameID", MID);
    uploadData.append("memberName", mName);
    uploadData.append("memberMajor", mMajor);
    uploadData.append("memberDescription", mDesc);
    if (mImage) uploadData.append("memberImage", mImage, mImage.name);
    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/memberupdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "update") {
          // console.log("update Member Success!");
          TeamProfile();
        }
      })
      
  };

  return (
    <div>
      <TeamNavbar />
      <div className="container-fluid">
        <nav
          id="sidebarMenu"
          className="col-md-4 col-lg-3 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky">
            <ul
              className="nav flex-column list-group"
              style={{ background: "none" }}
            >
              {Plogo ? (
                <li className="list-group-item changepadding">
                  <span className="nav-link active">
                    <span>
                      <img
                        src={
                          "https://" +
                          REACT_APP_IP +
                          REACT_APP_IMGPATH +
                          "/" +
                          Plogo
                        }
                        className="rounded-circle"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                  </span>
                </li>
              ) : null}
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  اسم الفريق
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="Input1"
                    className="form-control"
                    value={teams.TeamName}
                  />
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  البريد الالكترونى
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="Input1"
                    className="form-control"
                    value={login}
                  />
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  تحديث رقم التواصل
                </label>
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => handleChange(e, "phone")}
                    type="text"
                    className="form-control"
                    defaultValue={teams.PhoneNum}
                  />
                  {showEditphone ? (
                    <button
                      onClick={() => handleupdate(teams.ID)}
                      type="button"
                      style={{ background: "none", border: "none" }}
                    >
                      <i className="fas fa-check card-title fa-lg ms-1"></i>
                    </button>
                  ) : null}
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                  اسم الكلية
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="Input1"
                    className="form-control"
                    value={collage}
                  />
                </div>
              </li>
              <li className="nav-item list-group-item changepadding">
                <label htmlFor="Input1" className="form-label">
                 عدد الأعضاء
                </label>
                <div className="input-group mb-3">
                  <input
                    value={updateMember}
                    type="text"
                    className="form-control"
                    placeholder={CountMember()}
                  />
                  {showEditmem ? (
                    <button
                      onClick={() => handleMemberNum(teams.ID)}
                      type="button"
                      style={{ background: "none", border: "none" }}
                    >
                      <i className="fas fa-check card-title fa-lg ms-1"></i>
                    </button>
                  ) : null}
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <main className="ol-md-8 ms-sm-auto col-lg-9">
          {/* Add Model */}
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h4">تحديث العضو</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary remove_hover"
                >
                  <i className="far fa-newspaper fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="row my-2">
            <div
              className="card col-md-10"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                padding: "1rem",
              }}
            >
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
              >
                <div className="input-group mb-3">
                  <label
                    className="form-label text-start me-1 mt-1"
                    style={{ display: "block" }}
                  >
                    اسم العضو
                  </label>
                  <input
                    onChange={(evt) => setmName(evt.target.value)}
                    defaultValue={Members.MemberName}
                    type="text"
                    className="form-control"
                    aria-describedby="button-addon2"
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="form-label text-start me-1 mt-1"
                    style={{ display: "block" }}
                  >
                    تخصص العضو
                  </label>
                  <input
                    onChange={(evt) => setmMajor(evt.target.value)}
                    defaultValue={Members.MemberMajor}
                    type="text"
                    className="form-control"
                    aria-describedby="button-addon2"
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="form-label text-start me-1 mt-1"
                    style={{ display: "block" }}
                  >
                    نبذة عن العضو
                  </label>
                  <textarea
                    onChange={(evt) => setmDesc(evt.target.value)}
                    className="form-control"
                    defaultValue={Members.MemberDescription}
                    rows="3"
                  ></textarea>
                </div>

                <div className="input-group mb-3">
                  <input
                    onChange={(evt) => setmImage(evt.target.files[0])}
                    accept="image/*"
                    type="file"
                    defaultValue={Members.MemberImage}
                    className="form-control"
                    id="mimg"
                    style={{ display: "none" }}
                  />
                  <label
                    className="form-control text-start uploadFile"
                    htmlFor="mimg"
                  >
                    تحميل صورة
                  </label>
                  <span className="input-group-text">
                  {Members.MemberImage ? (
                          <img
                            src={
                              "https://" +
                              REACT_APP_IP +
                              REACT_APP_IMGPATH +
                              Members.MemberImage
                            }
                            className="rounded-circle  me-2"
                            
                            style={{
                              width: "70",
                              height: "70",
                              alt: "upload image",
                            }}
                          />
                        ) : (
                          <div>
                          {Members.MemberGender=="ذكر" ? 
                          <img
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                          src="/image/avatar.png"
                          className="img-fluid  rounded-circle"
                          alt="pImage"
                        /> 
                          : 
                            <img
                              style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                }}
                              src="/image/avatar2.jpg"
                              className="img-fluid  rounded-circle"
                              alt="pImage"
                            /> 
                          }
                        </div>
                        )}
                    {/* <img
                      src={
                        "https://" +
                        REACT_APP_IP +
                        REACT_APP_IMGPATH +
                        Members.MemberImage
                      }
                      width="70"
                      height="70"
                      alt="upload image"
                    /> */}
                  </span>
                </div>
                <div className="input-group">
                  <button className="py-2 updatearticle" type="submit">
                    إرسال
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default MemberDetails;
