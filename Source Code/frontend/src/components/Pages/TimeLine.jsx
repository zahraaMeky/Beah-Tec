import FontAwesomeIcon from 'react-fontawesome';

function TimeLine() {

return(
<div className="beahtec-timeline pb-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="main-timeline">
                    <div class="timeline">
                        <a  class="timeline-content">
                            <span class="timeline-year">10/11/2022</span>
                            <div class="timeline-icon">
                              {/* <i class="fa-regular fa-lightbulb-on"></i> */}
                              <i class="fa-solid fa-lightbulb"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">تسجيل الأفكار</h3>
                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                            <div class="timeline-year">
                            <p className="my-0">9/11/2022 </p>
                            </div>
                            <div class="timeline-year excute-pro">
                            <p className="my-0"> 19/10/2022 </p>
                            </div>
                            <div class="timeline-icon">
                                {/* <i class="fas fa-user-hard-hat"></i> */}
                                <i class="fa-solid fa-chalkboard-user"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">تقديم الورش</h3>

                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                        <div class="timeline-year" style={{color:'#69696a'}}>
                            <p className="my-0">20/11/2022</p>
                        </div>
                            <div class="timeline-year excute-pro">
                            <p className="my-0">31/12/2022</p>
                            </div>
                            <div class="timeline-icon">
                                <i class="fas fa-cog"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">تنفيذ المشاريع وتسليم ملف المشروع</h3>

                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                        <div class="timeline-year excute-pro">
                            <p className="my-0">1/1/2023 </p>
                        </div>
                            <div class="timeline-year" style={{color:'#69696a'}}>
                            <p className="my-0">7/1/2023</p>
                            </div>
                            <div class="timeline-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">تأهل ال 12 فريق</h3>
                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                        <div class="timeline-year excute-pro">
                            
                            <p className="my-0"> 28/1/2023</p>
                        </div>
                            <div class="timeline-year" style={{color:'#69696a'}}>
                            <p className="my-0">8/1/2023</p>
                            </div>
                            <div class="timeline-icon">
                                {/* <i class="fas fa-users-class"></i> */}
                                <i class="fa-solid fa-handshake"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">
                                الإجتماع مع الفرق المتأهلة 
                                </h3>
                                <h3 class="title"> والدعم الفني ل 12 فريق  </h3>

                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                        <div class="timeline-year excute-pro">
                            <p className="my-0">29/1/2023 </p>
                        </div>
                            <div class="timeline-year">
                            <p className="my-0">11/2/2023</p>
                            </div>
                            <div class="timeline-icon">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">تسليم ملف المسابقة (للفرق ال 12 المتأهلة)</h3>

                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                        <div class="timeline-year">
                            
                            <p className="my-0">12/2/2023 </p>
                        </div>
                            <div class="timeline-year excute-pro">
                            <p className="my-0">18/2/2023 </p>
                            </div>
                            <div class="timeline-icon">
                                {/* <i class="fas fa-object-ungroup"></i> */}
                                <i class="fa-solid fa-people-group"></i>
                            </div>
                            <div class="content">
                                <h3 class="title">التقييم النهائي للفرق</h3>
                            </div>
                        </a>
                    </div>
                    <div class="timeline">
                        <a class="timeline-content">
                            <div class="timeline-year excute-pro" style={{color:'#69696a'}}>
                            <p className="my-0">20/2/2023 </p>
                            </div>
                            <div class="timeline-icon">
                                {/* <i class="far fa-birthday-cake"></i> */}
                                <i class="fa-solid fa-graduation-cap"></i>
                            </div>
                            <div class="content">
                                <h3 class="title"> الحفل الختامي</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}
export default TimeLine;