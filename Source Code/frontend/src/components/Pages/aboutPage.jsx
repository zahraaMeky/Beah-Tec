import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Footer from "./footer";
import Header from "./header";
import { Link } from "react-router-dom";
import React from "react";
import Chalenges from "./Chalenges";
import Carousel from "./carousel";
import TimeLine from "./TimeLine";
function AboutPage() {
  const { REACT_APP_IP, REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT } = process.env;
  const myboolean = 1
  return (
    <div className="aboutPage">
      <Header />
  
      <Carousel/>
      <div className="about-text text-center py-5">
        <div className="container">
          <div className="row">
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>بيئة تك</span>
          </h2>
            <p className="lead">
              بيئة تك برنامج يهدف إلى رفع كفاءة الشباب من أجل صقل مهاراتهم في
              إيجاد حلول مستدامة لتطوير قطاع إدارة النفايات من خلال توظيف حلول
              تقنية وعملية . يركز البرنامج على منح الطلبة الفرصة للابتكار وخلق
              حلول تقنية وعملية بإستخدام التقنيات الحديثة والثورة الصناعية
              الرابعة. تم تخصيص هذا البرنامج إيمانا منّا بقوة الشباب وطاقته في
              إيجاد حلول مبتكرة فعّالة تساهم في عملية التطوير. يستهدف برنامج
              بيئة تك طلاب الكليات والجامعات الذين لهم صلة بالتخصصات البيئية
              والهندسية. كما يركز البرنامج على المشاكل والتحديات التي يواجهها
              قطاع إدارة النفايات بالسلطنة.
            </p>
            {/* <div className="my-3">
            <Link  to={`/register-table`} target={"_blank"}  class="cta">
              <span>تسجيل الجامعات</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </Link>
            </div> */}
            <div className="my-3">
            {/* <Link class="cta"> */}
              <a href={"https://forms.gle/pGpSHc6mNgK9pNRV8"} target="_blank" class="cta">
              <span>تسجيل الورش التدريبية</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
              </a>
            {/* </Link> */}
            </div>
          </div>
          <Chalenges />
          <div className="acceptanceConditions">
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>معايير قبول المشاركين</span>
          </h2>
            <div className="row d-flex justify-content-center">
              <div className="col-xl-2 col-lg-4 col-md-6 my-4">
                <div className="mt-2">
                <div className="d-inline-block iconCricle">
                     <i class="fas fa-user-graduate hover-fx"></i>
                  </div>
                <div className="box mt-2">
                      <p>
                    طالب أكاديمي بإحدى كليات أو جامعات السلطنة الحكومية أو
                        الخاصة                      
                    </p>
                    </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 mb-4">
              <div className="mt-4">
              <div className="d-inline-block iconCricle">
                      <i class="fab fa-css3 hover-fx"></i>
              </div>
              <div className="box mt-2">
                      <p>
                      يفضل أن يكون الطالب في السنة الدراسية الثالثة فما فوق                      
                      </p>
               </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6  mb-4">
                <div className="mt-4">
                    <div className="d-inline-block iconCricle">
                      <i class="fas fa-list-ol hover-fx"></i>
                    </div>
                    <div className="box mt-2">
                      <p >
                        يتكون الفريق من ثلاثة طلاب كحد أدنى وخمسة طلاب كحد أقصى
                      </p>
                      </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6  mb-4">
              <div className="mt-4">
                    <div className="d-inline-block iconCricle">
                      <i class="fas fa-cogs hover-fx"></i>
                      </div>
                    <div className="box mt-2">
                      <p>
                    يمكن للطلاب المشاركة بمشروع التخرج في برنامج بيئة تك
                        بشرط أن يكون ضمن مجالات البرنامج 
                        </p>
                    </div>
                </div>
            
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6  mb-4">
              <div className="mt-4">
              <div className="d-inline-block iconCricle">
                      
                      <i class="fas fa-users hover-fx"></i>
                    </div>
              <div className="box mt-2">
                      <p>
                    يمكن تكوين فريق من تخصصات مختلفة غير المذكورة سابقا لمن
                    لديه الرغبة في المشاركة في البرنامج
                    </p>
                </div>
                   
                    
                </div>
              </div>
            </div>
          </div>
            {/* timeline  */}
       
    <div className="timeline pb-5">
      <div className="row d-flex justify-content-center">
      <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>مراحل برنامج بيئة تك</span>
      </h2>
      <div className="my-4"></div>
      <TimeLine/> 
      </div>
    </div>
          <div className="progStage pb-5">
          <h2 className="heading text-center specialH">
          <img style={{marginLeft:'5px'}}src={`/image/bluelamp.png`}/>
          <span style={{color:'#26306A'}}>المراحل الأساسية للبرنامج التدريبي</span>
          </h2>
            <div className="container">
              <div className="wizard my-5">
                <ul
                  className="nav nav-tabs justify-content-center"
                  id="myTab"
                  role="tablist"
                >
                  <li
                    className="nav-item flex-fill"
                    role="presentation"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="الورشة المهارية "
                  >
                    <a
                      className="nav-link active rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      href="#step1"
                      id="step1-tab"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="step1"
                      aria-selected="true"
                    >
                      <i className="fas fa-chalkboard-teacher  fa-2x"></i>
                    </a>
                  </li>
                  <li
                    className="nav-item flex-fill"
                    role="presentation"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="الورشة التقنية"
                  >
                    <a
                      className="nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      href="#step2"
                      id="step2-tab"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="step2"
                      aria-selected="false"
                      title="الورشة التقنية"
                    >
                      <i className="fas fa-laptop  fa-2x"></i>
                    </a>
                  </li>
                  <li
                    className="nav-item flex-fill"
                    role="presentation"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Step 3"
                  >
                    <a
                      className="nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      href="#step3"
                      id="step3-tab"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="step3"
                      aria-selected="false"
                      title="الدعم الفني
"
                    >
                      <i class="fas fa-headset fa-2x"></i>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent" style={{height:'100px'}}>
                  <div
                    className="tab-pane fade show active text-start"
                    role="tabpanel"
                    id="step1"
                    aria-labelledby="step1-tab"
                  >
                    <h5 className="my-0">الورشة المهارية </h5>
                    <p className="my-0">
                      مفهوم التفكير التصميمي Design Thinking ومراحله لتنفيذ أي
                      مشروع
                    </p>
                    <p className="my-0">
                      مهارات القرن الحادي والعشرين في حل المشكلات
                    </p>
                    <p className="my-0">
                      كيفية اكتشاف المشاكل وتحليلها من حولنا
                    </p>
                    <p className="my-0">
                      أدوات التفكير العلمية في حل المشكلات (العصف الذهني –
                      سكامبر- قمع الجدوى)
                    </p>
                    <p className="my-0">طريقة وضع خطط العمل لتنفيذ المشروع</p>
                  </div>
                  <div
                    className="tab-pane fade text-start"
                    role="tabpanel"
                    id="step2"
                    aria-labelledby="step2-tab"
                  >
                    <h5>الورشة التقنية</h5>
                    <p className="my-0">مفهوم الثورة الصناعية الرابعة</p>
                    <p className="my-0">مجالات الثورة الصناعية الرابعة</p>
                  </div>
                  <div
                    className="tab-pane fade text-start"
                    role="tabpanel"
                    id="step3"
                    aria-labelledby="step3-tab"
                  >
                    <h5>الدعم الفني</h5>
                    <p className="my-0">
                      يقدم فريق القرية الهندسية مع مجموعة من الخبراء{" "}
                    </p>
                    <p className="my-0">
                      مجموعة من الجلسات التي تهدف لمساندة الفرق المتأهلة في
                      الجوانب التقنية{" "}
                    </p>
                    <p className="my-0">
                      مثل جلسات الاستشارة الهندسية، الورش التقنية، توفير المراجع
                      والمصادر المساعدة في تنفيذ المشاريع
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  );
}

export default AboutPage;
