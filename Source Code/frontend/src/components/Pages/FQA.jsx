import Footer from "./footer";
import Header from "./header";
import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";

function FQA() {

    const [showCondition, setshowCondition] = useState(false);
    const handleConditionOpen = () => setshowCondition(true)
    const handleConditionClose = () => setshowCondition(false);

return(
    <>
      <Header/>
    <div className="fqa py-5">
        <div className="container">
            <div className="row  d-flex justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        1.	ما هي معايير قبول المشاركين؟
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>يستهدف البرنامج الطلبة الجامعيين ممن تنطبق عليهم الشروط التالية:</strong>
                            <ul>
                                <li>طالب أكاديمي بإحدى كليات أو جامعات السلطنة الحكومية أو الخاصة.</li>
                                <li>يفضل أن يكون الطالب في السنة الدراسية الثالثة فما فوق.</li>
                                <li>يتكون الفريق من ثلاثة طلاب كحد أدنى وخمسة طلاب كحد أقصى.</li>
                                <li>يمكن للطلاب المشاركة بمشروع التخرج في برنامج بيئة تك بشرط أن يكون ضمن مجالات البرنامج الثلاثة.</li>
                                <li>يمكن تكوين فريق من تخصصات مختلفة غير المذكورة سابقا لمن لديه الرغبة في المشاركة في البرنامج.</li>
                            </ul> 
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        2.	ما هي معايير اختيار المشاريع لمرحلة التأهل؟                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>الرجوع إلى الشروط والأحكام في صفحة انضم إلينا.</p>
                          <a  onClick={handleConditionOpen} >
                            <span style={{color: 'blue'}}>
                            إقرأ الشروط والأحكام 
                            </span>
                            <svg width="13px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                            </a>
                        </div>
                        </div>

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
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        3.	أين ستقام الورش؟
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>في الكليات والجامعات المختارة.</p>
                            <p>يمكنكم التسجيل في الورش التدريبية عبر الوصلة التالية.</p>
                            <a  href={"https://forms.gle/pGpSHc6mNgK9pNRV8"} target={"_blank"} >
                            <span style={{color: 'blue'}}>تسجيل الورش التدريبية</span>
                            <svg width="13px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading4">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                        4.	هل يسمح بمشاركة الطلاب من الكليات والجامعات الأخرى؟
                        </button>
                        </h2>
                        <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>نعم يمكنهم المشاركة واستضافتهم وحضورهم للورش التي ستقام في الكليات والجامعات المختارة (يمكنك الحضور إلى الكلية أو الجامعة الأقرب إليك)</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading5">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                        5.	هل يجب على جميع أعضاء الفريق التسجيل في المنصة؟
                        </button>
                        </h2>
                        <div id="collapse5" class="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>لا . تسجيل واحد للفريق وبعد اعتماد الفريق للتحدي يتم إضافة باقي الأعضاء في المنصة عن طريق حساب خاص بالفريق.</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading6">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                        6.	متى ستقدم الورش؟                        </button>
                        </h2>
                        <div id="collapse6" class="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>من تاريخ 19 أكتوبر وإلى 9 نوفمبر 2022</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading7">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                        7.	كم مدة البرنامج؟                      </button>
                        </h2>
                        <div id="collapse7" class="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>3 أشهر قابل للتمديد.</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading8">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                        8.	ما هي مراحل البرنامج؟                    
                        </button>
                        </h2>
                        <div id="collapse8" class="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul>
                                <li>حضور الورش التي ستقام في 12 كلية وجامعة</li>
                                <li>العمل على الأفكار والمشاريع بعد حضور الورش ( سواء كبحث أو نموذج أولي (اختياري))</li>
                                <li>فرز المشاريع المسجلة وتأهل 12 فريق للمرحلة الأولى</li>
                                <li>الدعم الفني للفرق المتأهلة (جلسات استشارية ودورات في مجال التقنية والبرمجة)</li>
                                <li>التقييم النهائي للفرق المتأهلة واختيار الفائزين بالمراكز الثلاثة الأولى</li>
                                <li>الحفل الختامي للبرنامج</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading9">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                        9.	كم مدة الورش التي ستقام في ال 12 كلية وجامعة؟                    </button>
                        </h2>
                        <div id="collapse9" class="accordion-collapse collapse" aria-labelledby="heading9" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>3 ساعات (في الفترة الصباحية والتوقيت من الساعة 10:00 صباحا إلى 1:00 ظهرا). ملاحظة: يتم التنسيق بين الجهة المنفذة وإدارة الكلية أو الجامعة مسبقا في حال تغيير الوقت.</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading10">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                        10.	كم مدة العمل على الأفكار وتنفيذ المشاريع؟              
                         </button>
                        </h2>
                        <div id="collapse10" class="accordion-collapse collapse" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>شهرين.</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading11">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
                        11.	ما وضع المشاريع الفائزة بالمراكز الأولى؟                       
                          </button>
                        </h2>
                        <div id="collapse11" class="accordion-collapse collapse" aria-labelledby="heading11" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>يمكن أن يتحول المشروع إلى فكرة تطبق على أرض الواقع بعد البحث و التطوير من أحد أقسام شركة بيئة.</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading12">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
                        12.	هل سيتحول المشروع إلى مشروع استثماري أو شركة ناشئة؟                        
                      </button>
                        </h2>
                        <div id="collapse12" class="accordion-collapse collapse" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>بيئة تك هو برنامج يهدف إلى رفع الكفاءة وصقل مهارات الطلبة في المجالات المرتبطة بالبرنامج وإعطاء فرصة للفرق المشاركة لإيجاد حلول لتحديات فعلية. والبرنامج ليس حاضنة أعمال ينتج منه شركات طلابية ولكن الخروج من التجربة سيعطي الطلبة القدرة على فهم احتياجات العملاء وتقديم الحلول حسب حاجة العميل مما يعطي الطلبة قدرة تنافسية أكبر في سوق العمل مستقبلا.</p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading13">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse13" aria-expanded="false" aria-controls="collapse13">
                        13.	ما هي جوائز البرنامج؟                 
                      </button>
                        </h2>
                        <div id="collapse13" class="accordion-collapse collapse" aria-labelledby="heading13" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <strong>يحصل الفائزين بالمراكز الثلاثة الأولى على:</strong>
                            <ul>
                                <li> مبالغ نقدية</li>
                                <li> برنامج تدريبي في شركة بيئة</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  
)
}

export default FQA;