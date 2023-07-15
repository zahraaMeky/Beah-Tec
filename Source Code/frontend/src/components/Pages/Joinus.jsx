import Header from "./header";
import Footer from "./footer";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import validator from 'validator';
import { Link } from "react-router-dom";


function Join() {
  const [challenges, setChallenges] = useState([]);
  const [Colleges, setColleges] = useState([]);
  const [JoinConditions, setJoinConditions] = useState([]);
  const [problem, setproblem] = useState("");
  const [team, setteam] = useState("");
  const [email, setemail] = useState("");
  const [college, setcollege] = useState("");
  const [member, setmember] = useState("");
  const [description, setdescription] = useState("");
  const [termCondition, settermCondition] = useState(false);
  const [project, setproject] = useState("");
  const [phone, setphone] = useState("");
  const [newCollegerError, setnewCollegerError] = useState(false);
  const [newCollege, setnewCollege] = useState("");
  
  const condition = useRef();

  //state for error message
  const [problemError, setproblemError] = useState(false);
  const [teamError, setteamError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [collegeError, setcollegeError] = useState(false);
  const [memberError, setmemberError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [termConditionError, settermConditionError] = useState(false);
  const [ProjectError, setProjectError] = useState(false);
  const [member5LimitError, setmember5LimitError] = useState(false);
  const [member2LimitError, setmember2LimitError] = useState(false);

  const [phoneError, setphoneError] = useState(false);
  //state for Success message
  const [successMsg, setsuccessMsg] = useState(false);
  const [showCondition, setshowCondition] = useState(false);
  const [loading, setLoading]  =  useState(false);

  //state for Email exit
  const [EmailMsg, setEmailMsg] = useState(false);
  const { REACT_APP_IP ,REACT_APP_BACKEND_PORT} = process.env;
  const handlestudentCondition = () => setshowCondition(true)
  const handleConditionClose = () => setshowCondition(false);

  const [phoneExist, setphoneExist] = useState(false);
  const [emailExist, setemailExist] = useState(false);
  const [teamExist, setteamExist]   = useState(false);

  const [phoneWFormat, setphoneWFormat] = useState(false);
  const [emailWFormat, setemailWFormat] = useState(false);

  const [others, setOthers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/collegesandchallenges`
        );
        setChallenges(response.Challenges);
        setColleges(response.Colleges);
        setJoinConditions(response.Conditions);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchData();
  }, []);
  
  const successMsgAlert = () => {
    Swal.fire({
      title: "تم تقديم طلب الانضمام",
      text: "الرجاء إنتظار إعتماد طلبكم .. سيتم إشعاركم عبر البريد الإلكتروني",
      icon: "success",
    });
  };

  const EmailMsgAlert = () => {
    Swal.fire({
      icon: "error",
      title: "خطأ...",
      text: "الايميل موجود بالفعل ادخل إيميل أخر",
    });

    setEmailMsg(false);
  };

  const clearState = () => {
    setproblem("");
    setteam("");
    setemail("");
    setcollege("");
    setmember("");
    setdescription("");
    settermCondition();
    setproject("");
    setphone("");
    settermCondition(false);
    condition.checked = false;
    setproblemError(false);
    setteamError(false);
    setcollegeError(false);
    setemailError(false);
    setmember2LimitError(false);
    setmember5LimitError(false);
    setmemberError(false);
    setdescriptionError(false);
    setProjectError(false);
    setphoneError(false);
    settermConditionError(false);
    setsuccessMsg(false);
    setEmailMsg(false);
    setemailExist(false);
    setphoneExist(false);
    setteamExist(false);
    setemailWFormat(false);
    setphoneWFormat(false);

  };
  const validate = () => {
    if (problem == "") {
      setproblemError(true);
    } else {
      setproblemError(false);
    }
    if (team == "") {
      setteamError(true);
    } else {
      setteamError(false);
    }
    if (email == "") {
      setemailError(true);
      setemailWFormat(false);
    } else {
      if (validator.isEmail(email)) {
        setemailError(false);
        setemailWFormat(false);
      }
      else {
        setemailError(false);
        setemailWFormat(true);
      }
    }
    if (college == "" || college == "اسم الكلية" || college == "أخرى") {
      setcollegeError(true);
    } else {
      setcollegeError(false);
    }
    if (member == "") {
      setmemberError(true);
      setmember5LimitError(false);
      setmember2LimitError(false);
    } else {
      if (member > 5) {
        setmember5LimitError(true);
        setmemberError(false);
        setmember2LimitError(false);
      }
      else if (member < 3) {
        setmember2LimitError(true);
        setmemberError(false);
        setmember5LimitError(false);
      } else {
        setmember2LimitError(false);
        setmemberError(false);
        setmember5LimitError(false);
      }
    }
    if (description == "") {
      setdescriptionError(true);
    } else {
      setdescriptionError(false);
    }
    if (project == "") {
      setProjectError(true);
    } else {
      setProjectError(false);
    }
    if (phone == "") {
      setphoneError(true);
      setphoneWFormat(false);
      setphoneExist(false);
    } else {
      var isPhone = !isNaN(+phone) && (phone.length==8);
      if (isPhone) {
        setphoneError(false);
        setphoneWFormat(false);
        setphoneExist(false);
      } else {
        setphoneError(false);
        setphoneWFormat(true);
        setphoneExist(false);
      }
      
    }
    if (termCondition == false) {
      settermConditionError(true);
    } else {
      settermConditionError(false);
    }
    if (
      phoneWFormat ||
      emailWFormat ||
      problem == "" ||
      team == "" ||
      email == "" ||
      college == "" ||
      member == "" ||
      description == "" ||
      project == "" ||
      termCondition == "" ||
      phone == "" ||
      college == "اسم الكلية" || college == "أخرى" ||
      member5LimitError == true ||
      member2LimitError == true
    ) {
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
      uploadData.append("problem", problem);
      uploadData.append("team", team);
      uploadData.append("email", email);
      uploadData.append("college", college);
      uploadData.append("member", member);
      uploadData.append("description", description);
      uploadData.append("termCondition", termCondition);
      uploadData.append("project", project);
      uploadData.append("phone", phone);
      axios
        .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/info/`, uploadData)
        .then((res) => {
    
          // console.log(res);
          // console.log(res.data);
          if (res.data === "join") {
            setsuccessMsg(true);
            setEmailMsg(false);
            clearState();
          }
          else  {
            if ( res.data.includes("E") ) {
              // setEmailMsg(true);
              setemailError(false);
              setemailExist(true);
              setsuccessMsg(false);
            } else {
              setemailError(false);
              setemailExist(false);
              setsuccessMsg(false);
            }

            if ( res.data.includes("T") ) {
              setteamError(false)
              setteamExist(true);
              setsuccessMsg(false);
            } else {
              setteamError(false)
              setteamExist(false);
              setsuccessMsg(false);
            }

            if (phoneWFormat) {
              setphoneError(false);
              setphoneExist(false);
              setsuccessMsg(false);
            } else {
              if ( res.data.includes("P")) {
                setphoneError(false);
                setphoneExist(true);
                setsuccessMsg(false);
              } else {
                setphoneError(false);
                setphoneExist(false);
                setsuccessMsg(false);
              }
            }

          }
          // if (res.data === "Email") {
          //   setEmailMsg(true);
          //   setsuccessMsg(false);
          // }
        })

    }

    setLoading(false);

  };
  //function to generate select box for problems
  const selectChallenges = challenges.map((challenge, i) => {
    return (
      <>
        <option key={challenge.ID} value={challenge.ID}>
          {challenge.Title}
        </option>
      </>
    );
  });
  //function to generate join conditions
  const conditionsData = JoinConditions.map((condition, i) => {
    return (
      <>
        <li key={condition.ID}>{condition.condition}</li>
      </>
    );
  });
  //function to generate select box for colleges
  const selectColleges = Colleges.map((college, i) => {
    return (
      <>
        <option key={college.ID} value={college.ID}>
          {college.CollegeName}
        </option>
      </>
    
    );
  });
  return (
    <div>
      <Header />


      <div className="Join py-5">
        <div className="container">
        <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>انضم إلينا</span>
        </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
              <form className="border p-4" onSubmit={handleSubmit}>
                {/* row one */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="far fa-times-circle"></i>
                      </span>
                      <select
                        value={problem}
                        onChange={(evt) => setproblem(evt.target.value)}
                        className="form-select"
                        name="problem"
                        disabled
                      >
                        <option selected>اختر التحدى </option>
                        {selectChallenges}
                      </select>
                    </div>
                    {/* show error msg */}
                    {problemError ? (
                      <p className="error-msg">حقل إختيار المشكلة مطلوب</p>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-user-friends"></i>
                      </span>
                      <input
                        value={team}
                        onChange={(evt) => setteam(evt.target.value)}
                        type="text"
                        name="team"
                        className="form-control"
                        placeholder="اسم الفريق"
                        disabled
                      />
                    </div>
                    {/* show erroe msg */}
                    {teamError ? (
                      <p className="error-msg">حقل إسم الفريق مطلوب</p>
                    ) : null}

                    {teamExist ? (
                      <p className="error-msg">اسم الفريق مسجل سابقا</p>
                    ) : null}

                  </div>
                </div>
                {/* row two */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="far fa-envelope"></i>
                      </span>
                      <input
                        value={email}
                        onChange={(evt) => setemail(evt.target.value)}
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="البريد الإلكترونى"
                        disabled
                      />
                    </div>
                    {/* show erroe msg */}
                    {emailError ? (
                      <p className="error-msg">حقل البريد الإلكتروني مطلوب</p>
                    ) : null}
                    {emailExist ? (
                      <p className="error-msg">البريد الإلكتروني مسجل سابقا</p>
                    ) : null}
                    {emailWFormat ? (
                      <p className="error-msg">البريد الإلكتروني غير صحيح</p>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3 ">
                      <span className="input-group-text">
                        <i className="fas fa-graduation-cap"></i>
                      </span>
                      <select
                      disabled
                        value={college}
                        className="form-select"
                        onChange={(evt) => {
                          // console.log(evt.target.value);
  
                          if (evt.target.value!=18) {
                            setcollege(evt.target.value);
                            setOthers(false);
                          }
                          else {
                            // setcollege(evt.target.value);
                            // console.log("others");
                            setOthers(true);
                          }
                        }}
                        name="college"
                      >
                        <option selected>اسم الكلية</option>
                        {selectColleges}
                      </select>
                    </div>

                    {/* show erroe msg */}
                    {collegeError && !others ? (
                      <p className="error-msg">حقل إسم الكلية مطلوب</p>
                    ) : null}
                  </div>
                </div>
                {/* row three */}
                {others ? (
              <div className="row">
                    <div className="col-md-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="fas fa-graduation-cap"></i>
                        </span>
                        <input
                        onChange={(evt) => setcollege(evt.target.value)}
                          type="text"
                          name="newcollege"
                          className="form-control"
                          placeholder="اكتب اسم الكلية"
                          disabled
                        />
                      </div>
                      {/* show erroe msg */}
                      {collegeError ? (
                        <p className="error-msg">حقل اسم الكلية مطلوب</p>
                      ) : null}
                    </div>
              </div>
              ) : null}
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-mobile-alt"></i>
                      </span>
                      <input
                        value={phone}
                        onChange={(evt) => setphone(evt.target.value)}
                        type="text"
                        name="project"
                        className="form-control"
                        placeholder="رقم الهاتف"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        disabled
                      />
                    </div>
                    {/* show erroe msg */}
                    {phoneError ? (
                      <p className="error-msg">حقل رقم الهاتف مطلوب</p>
                    ) : null}
                    {phoneExist ? (
                      <p className="error-msg"> رقم الهاتف مسجل سابقا</p>
                    ) : null}
                    {phoneWFormat ? (
                      <p className="error-msg"> رقم الهاتف غير صحيح</p>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fal fa-abacus"></i>
                      </span>
                      <input
                        maxLength={8}
                        value={member}
                        onChange={(evt) => setmember(evt.target.value)}
                        type="number"
                        name="member"
                        className="form-control"
                        placeholder="عدد الأعضاء"
                        disabled
                      />
                    </div>
                    {/* show erroe msg */}
                    {memberError ? (
                      <p className="error-msg">حقل عدد الأعضاء مطلوب</p>
                    ) : null}
                    {member5LimitError ? (
                      <p className="error-msg">
                        عدد الأعضاء يجب ألا يزيد عن 5
                      </p>
                    ) : null}
                    {member2LimitError ? (
                      <p className="error-msg">عدد الأعضاء يجب ألا يقل عن 3</p>
                    ) : null}
                  </div>
                </div>
                {/* row four */}
                <div className="row">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-edit"></i>
                      </span>
                      <input
                        value={project}
                        onChange={(evt) => setproject(evt.target.value)}
                        type="text"
                        name="project"
                        className="form-control"
                        placeholder="اسم المشروع"
                        disabled
                      />
                    </div>
                    {/* show erroe msg */}
                    {ProjectError ? (
                      <p className="error-msg">حقل اسم المشروع مطلوب</p>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fas fa-file-medical-alt"></i>
                      </span>
                      <textarea
                        value={description}
                        onChange={(evt) => setdescription(evt.target.value)}
                        className="form-control"
                        name="description"
                        placeholder="وصف المشروع لحل المشكلة"
                        disabled
                      ></textarea>
                    </div>
                    {/* show erroe msg */}
                    {descriptionError ? (
                      <p className="error-msg">حقل وصف المشروع مطلوب</p>
                    ) : null}
                  </div>
                </div>
                {/* row five */}
                <div className="row">
                  <div className="col-12">
                  {/* <Button
                      type="button"
                      className="btn btn-secondary term ps-3 policy conditionBtn fw-bold"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      style={{
                        color: "rgb(38, 48, 106)",
                        background: "none",
                        border: "none",
                        float:"right",
                        borderBottom:'1px solid #EEC41A '
                    
                      }}
                      onClick={() => {
                        handlestudentCondition();
                      }}
                    >
                  إقرأ الشروط والأحكام
                    </Button> */}
                    <Link to={`/conditions`}
                      style={{
                        color: "rgb(38, 48, 106)",
                        background: "none",
                        border: "none",
                        float:"right",
                        borderBottom:'1px solid #EEC41A '
                    
                      }}
                    >إقرأ الشروط والأحكام</Link>

                    <div className="my-2"></div>
                    <div className="clear"></div>
                    {/* this is condition come from data base  */}
                    {/* <ul className="term-condition-text text-start">
                      {conditionsData}
                    </ul> */}
                    {/* show erroe msg */}
                    {termConditionError ? (
                      <p className="error-msg" >
                        لابد من الموافقة على الشروط والأحكام
                      </p>
                    ) : null}
                    <div className="form-check text-start mb-3">
                      <input
                        onChange={(evt) => settermCondition(evt.target.value)}
                        className="form-check-input"
                        type="checkbox"
                        name="termCondition"
                        ref={condition}
                        disabled
                      />
                        <label className="form-check-label" style={{color:'#26306A',fontWeight:'600'}}>
                        أوافق على الشروط والأحكام
                      </label>
                      </div>
                      <div className="my-2" style={{textAlign:'right'}}>
                      <label className="" style={{color:'#C13012',fontWeight:'600'}}>
                       انتهت فترة التسجيل
                      </label>
                      </div>
                      <div className="" style={{textAlign:'right'}}>
                      <label className="form-check-label" style={{color:'#C13012',fontWeight:'600'}}>
                        * لمزيد من الاستفسار وطلب الدعم الفني انتقل لصفحة تواصل معنا
                      </label>
                      </div>
                  </div>
                </div>
                {successMsg ? successMsgAlert() : null}
                {/* {EmailMsg ? EmailMsgAlert() : null} */}
                {/* <button  onClick={(e) => handleSubmit(e)}
                  className="my-3 button-51"disabled
                  type="submit"  role="button" >إرسال<i class="fal fa-share-all"></i>
                  </button> */}
                  <button  onClick={(e) => handleSubmit(e)}
                  className="my-3 button-disabled "disabled
                  type="submit"  role="button" >إرسال<i class="fal fa-share-all"></i>
                  </button>
              </form>
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
            <Modal show={showCondition} onHide={handleConditionClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h6 className="blue-color">السياسات والأحكام</h6>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <>
                <div className="aimcond">
                <h5 className="card-title  py-2" style={{fontWeight:'700',textAlign:'right'}}>الأهداف الأساسية لبرنامج بيئة تك</h5>
                <ul className="my-4">
                <li >1.	سد الفجوة بين القطاع الأكاديمي وقطاع إدارة النفايات والموارد في سلطنة عمان.</li>
                <li>2.	تسليط الضوء على مجال تكنولوجيا الثورة الصناعية الرابعة وإشراك الطلبة المشاركين في إيجاد حلول مجدية لتحديات فعلية في القطاع.</li>
                <li>3.	تقديم الدعم العلمي والتقني اللازمين للمشاركين لرفع كفاءتهم المهنية والعلمية ورفع نسبة نجاح مشاريعهم.</li>
                <li>4.	دعم قطاع البحث والتطوير في السلطنة.</li>
                </ul>
                </div>
                <div className="aimcond">
                <h5 className="card-title  py-2" style={{fontWeight:'700',textAlign:'right'}}>الشروط والأحكام العامة</h5>
                <ul className="my-4">
                  <li>1.	يشترط على الفريق المشارك أن يكون من طلبة السنة الثالثة أو الرابعة من الجامعات أو الكليات المشاركة. </li>
                  <li>2.	أن يكون أعضاء الفريق متمكن أو ملم بالتخصصات المرتبطة بمجال  البرمجة أو الروبوتات وغيرها من التخصصات. </li>
                  <li>3.	يجب على الفريق التسجيل بعنوان بريد إلكتروني واحد عن كل أعضاء الفريق في المنصة المخصصة و سيمنح رمز واحد لدخول المنصة لكل فريق. </li>
                  <li>4.	ستقدم الورش التدريبية باللغة العربية أو الإنجليزية في بعض الأحيان. </li>
                  <li>5.	مشاركتك في البرنامج يمنح الحق لشركة "بيئة"  لنشر صور المشاركين في البرنامج على المنصة أو وسائل التواصل المختلفة. </li>
                  <li>6.	يحق لإدراة المشروع حرمان أي فرد/فريق من الإستمرار في البرنامج إذا ثبت على الفرد/الفريق تصرف مسيئ أو لا أخلاقي أثناء المشاركة في البرنامج. </li>
                  <li>7.	موافقتك على المشاركة في البرنامج يعطي الحق لشركة "بيئة" بتملك المحتوى الذي تم المشاركة به في منصات التفاعل المخصصة.</li>
                  <li>8.	إذا تم اختيار مشاركتك كأحد المشاركات المتأهلة للمراحل النهائية فإنك تقر بحق ملكية شركة "بيئة" بالمحتوى ويحق التصرف في محتوى المشروع بعد إنتهاء البرنامج.</li>
                  <li>9.	يحق للمشاركين نشر معلومات عن مشاريعهم في الوسائل المختلفة لغرض الدعاية والتسويق.</li>
                  <li>10.	تملك شركة  "بيئة" جميع حقوق البرنامج والمنصة وجميع المحتوى المرفوع عليها.</li>
                  <li>11.	يحق للشركة تعديل الشروط والأحكام بما يتناسب حسب الحاجة إذا لزم ذلك دون الرجوع للمستخدم/المشارك.</li>
                  <li>12.	للشركة الحق في إلغاء/تأجيل البرنامج دون الكشف عن الأسباب وتكتفي بتبليغ المشاركين عن قراراتها فيما يخص البرنامج.</li>
                </ul>
                </div>
                <div className="aimcond">
                <h5 className="card-title  py-2" style={{fontWeight:'700',textAlign:'right'}}>معايير تقييم المشاريع</h5>
                <ul className="my-4">
                  <li>1.	تحديد الهدف الرئيسي لتنفيذ المشروع (تحديد المشكلة).</li>
                  <li>2.	مدى إرتباط الفكرة بالمجال المحدد (الذكاء الإصطناعي وتقنيات الثورة الصناعية الرابعة).</li>
                  <li>3.	شرح طريقة معالجة المشكلة وما هي الحلول المناسبة لها (من ناحية الجانب التقني).</li>
                  <li>4.	 طريقة تحليل ومناقشة المشروع ضمن الفريق (التعاون والعمل الجماعي).</li>
                  <li>5.	مدى قابلية تنفيذ الفكرة.</li>
                  <li>6.	هل المشروع مجدي إقتصادياً وممكن أن يُشكل مدخول آخر ويعطي استمرارية للمشروع (الجدوى الاقتصادية).</li>
                  <li>7.	 تحديد متطلبات المشروع.</li>
                  <li>8.	 طريقة عرض وشرح المشروع بشكل كامل ودقيق (مهارات التقديم).</li>
                  <li>9.	 تحليل النموذج المبدئي للمشروع (المخططات الأولية).</li>
                  <li>10.	تصور وشكل النموذج الأولي للمشروع.</li>
                  <li>11.	تحديد ميزانية المشروع (المتوقعة).</li>
                </ul>
                </div>
                <div className="aimcond">
                <h5 className="card-title  py-2" style={{fontWeight:'700',textAlign:'right'}}>الاشتراك في المسابقة</h5>
                <ul className="my-4">
                  <li>1.	يجب أن يكون الاشتراك في المسابقة وفقا للشروط المقررة والتاريخ والزمن المحددين في إشعار المسابقة. وسيؤدي عدم الالتزام بذلك لاستبعاد المشارك من المسابقة.</li>
                  <li>2.	لا يوجد أي شرط شراء للاشتراك المسابقة وليست هناك أية رسوم للتسجيل مقابل استخدام الموقع.</li>
                <li>3.	ينبغي أن يدرك المشاركون أنه ما لم ينص على خلاف ذلك، فإن شركة بيئة لا تتحمل مسؤولية إرجاع أية مشاركة، بما في ذلك كل ما يتكون من مواد فنية، أو مادية، أو معنوية، أو غيرها.</li>
                </ul>
                </div>
                </>
              </Modal.Body>
            </Modal>
          </div>
          </div>
          
        </div>
      {/* container */}
      </div>
      <Footer />
    </div>
  );
}

export default Join;
