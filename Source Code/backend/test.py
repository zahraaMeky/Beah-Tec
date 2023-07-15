import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.message import EmailMessage

EMAIL_ADDRESS = 'support@beah-tec.com'
EMAIL_PASSWORD = 'beAh@2022!'
mail_server  = "smtp.ionos.com"
mail_port = 465

# Send Email Function
def sendEmail(user, password, name, custmsg, subject, status, callFrom):
    global EMAIL_ADDRESS, EMAIL_PASSWORD, mail_server, mail_port
    receivedMsg = custmsg
    # EMAIL_ADDRESS = 'techbeah@gmail.com'
    # EMAIL_PASSWORD = 'jsqxghkxazbcnbse'
    # EMAIL_ADDRESS = 'beah-tec@beah.om'
    # EMAIL_PASSWORD = 'beAh@2022!'
    msg = EmailMessage()

    if callFrom == 'Anounce2':
        rec = user
        msg['To'] = rec
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير </span>💫
                                  <br><br>
                                  <span style="font-weight: 700;">ملاحظة مهمة</span>
                                  <br><br>
                                  عند رفع ملف المشروع يرجى التأكد من اسم الملف بحيث يكون <span style="font-weight: 700;">باللغة الإنجليزية</span> ٬ وللتأكد من إتمام رفع الملف ستظهر خانة <span style="font-weight: 700;">الملف المرفوع حاليا</span> التي تُظهِر اسم الملف ويمكنك معاينة الملف للتأكد.
                                  <br>
                                  <br>
                                  ولأي استفسارات أخرى تخطر على بالكم يرجى التواصل معنا مباشرة عبر: 
                                  <br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                                  <br><br>
                                  <p>حظا موفقا للجميع✨</p>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'NewTimeLine':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير</span>💫
                                  <br><br>
                                  نود إبلاغكم بأنه تم تعديل الخطة الزمنية للبرنامج حيث تم تمديد المرحلة الحالية (مرحلة تنفيذ المشاريع وتسليم ملف المشروع) إلى 
                                  <span style="font-weight: 700;">نهاية شهر ديسمبر ٢٠٢٢</span>
                                  <br>
                                  حتى يتسنى لكم العمل على أفكاركم ومشاريعكم الخاصة ببرنامج بيئة تك مع مراعاة فترات الدراسة والاختبارات.
                                  <br>
                                  <br>مزيد من التفاصيل عن الخطة الزمنية للبرنامج تجدونها عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/about" target="_blank" >https://www.beah-tec.com/about</a></span>
                                  <br>
                                  <p>طاب يومكم 🌿</p>

                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'noteams12':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>انتهت فترة تنفيذ المشاريع وتسليم ملف المشروع في منصة بيئة تك
                        <br>
                        <br><span style="font-weight: 700;">ويؤسفنا إبلاغكم بأن فريقكم لم يتأهل للانتقال للمرحلة التالية.</span>
                        <br>
                        <br>نتطلع إلى مشاركتكم مرة أخرى في التحدي القادم ونتمنى لكم كل التوفيق والنجاح.
                        <br>
                        <br>لأي استفسارات بإمكانكم التواصل معنا عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'teams12':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>انتهت فترة تنفيذ المشاريع وتسليم ملف المشروع في منصة بيئة تك 
                        <br>
                        <br><span style="font-weight: 700;">يسعدنا إبلاغكم بأن فريقكم قد تأهل للمرحلة التالية !</span>
                        <br>
                        <br>وهكذا تستمر رحلتكم في مرحلة ال 12 فريق والتي تستمر من الآن إلى تاريخ 7 يناير 2023
                        <br>
                        <br>يمكنكم الدخول للمنصة لتعديل الأفكار ورفع البيانات والملفات المطلوبة عبر الحساب التالي:
                        <br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                        <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'Anounce':
        rec = user
        msg['To'] = rec
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير </span>💫
                                  <br><br>
                                  نود إبلاغكم بأنه تم تمديد تسليم ملف المشروع إلى يوم الأحد بتاريخ
                                  <br>
                                  <span style="font-weight: 700;">📆: 1 يناير 2023</span>
                                  <br>
                                  <span style="font-weight: 700;">⏰: 11:59 ليلاً  🌙</span>
                                  <br>
                                  <br>
                                  <br>يمكنكم الدخول للمنصة عبر الحساب التالي:
                                  <br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                                  <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                                  <br>
                                  <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                                  <br>
                                  <br>مزيد من التفاصيل عن الخطة الزمنية للبرنامج تجدونها عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/about" target="_blank" >https://www.beah-tec.com/about</a></span>
                                  <br><br>
                                  <br>
                                  ولأي استفسارات أخرى تخطر على بالكم يرجى التواصل معنا مباشرة عبر: 
                                  <br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                                  <br><br>
                                  <p>حظا موفقا للجميع✨</p>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'test':
        msg['To'] = user
        msg['Subject'] = 'نتيجة القبول | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html style="font-size: 16px;" lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
<link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
<link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
    <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Home">
    <meta property="og:type" content="website">
    <link rel="canonical" href="/">
  </head>
  <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
          <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
        </a>
      </div></header>
    <section class="u-clearfix u-section-1" id="sec-8c62">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
              
              <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                <div class="u-container-layout u-container-layout-2">
                  <h2 class="u-text u-text-default u-text-1">رسالة نتيجة القبول</h2>
                  <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                    <br>
                    <br>لقد تم اختياركم للمنافسة في تحدي بيئة تك متمنين لكم كل التوفيق والنجاح<br>يمكنكم الدخول للمنصة عبر الحساب التالي:<br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                    <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                    <br>
                    <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                    <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                    <br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-clearfix u-section-2" id="sec-d9c6">
      <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
              <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                <div class="u-container-layout u-container-layout-1"></div>
              </div>
              <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                  <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>شركة بيئة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img class="u-image u-image-contain u-image-default u-preserve-proportions u-image-1" src="https://beah-tec.com/image/beahlogo.png" alt="" data-image-width="618" data-image-height="321">
      </div>
    </section>
  
</body></html>
            """, subtype='html')

    if callFrom == 'team':
        msg['To'] = user
        if status == 0:
            msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px"> أهلا {name}٬ </p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">تمت الموافقة!</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 هذه الرسالة من فريق بيئة تك لإعلامك بأنه تمت الموافقة على طلبك.
                 اسم المستخدم: {user} 

                 كلمة المرور: {password}
                 </p><br>
            </body>
            </html>
            """, subtype='html')
            # message = f'Your request accepted and your username is {user} and password {password}'
            msg['Subject'] = 'نتيجة القبول | بيئة تك'
        else:
            msg['Subject'] = 'نتيجة القبول | بيئة تك'
            msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">Hey  {user},</p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">لم تتم الموافقة!</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 هذه الرسالة من فريق بيئة تك لإعلامك بأنه لم تتم الموافقة على طلبك ٬متمنين لكم حظا أوفراً في الفعاليات القادمة.
                 </p><br>
            </body>
            </html>
            """, subtype='html')

    if callFrom == 'request':
        msg['To'] = user
        msg['Subject'] = 'استقبال الطلب | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px"> {name} أهلا فريق </p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!تم استقبال طلبك</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 هذه الرسالة من فريق بيئة تك لإعلامك بأنه تم استقبال طلبك بنجاح وسيتم مراجعتها من قِبل الفريق يتم إشعاركم في حال القبول أو عدمه.
                 </p><br>
            </body>
            </html>
            """, subtype='html')
    if callFrom == 'contact':
        msg = msg
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = 'رسالة تواصل | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!رسالة</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 <br>
                 :لقد تم إرسال رسالة من الموقع تفاصيلها<br>
                 {name} :المرسل<br>
                 {user} :البريد الإلكتروني<br>
                        :محتوى الرسالة<br>
                 {receivedMsg}<br>
                 </p><br>
            </body>
            </html>
            """, subtype='html')
    if callFrom == 'join':
        msg['To'] = EMAIL_ADDRESS
        # message = f'You Recieve a new Join Request Please Check Admin Dashboard'
        # msg['Subject'] = 'Beah Tec Join Request'
        msg['Subject'] = ' طلب جديد | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">طلب جديد!</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                لقد تم استقبال طلب جديد يرجى تسجيل الدخول للمنصة ومتابعة تفاصيلها.
                 </p><br>
            </body>
            </html>
            """, subtype='html')
    if callFrom == 'registerteam':
        msg['To'] = user
        # message = f'You are register in beah tec \n your email is {user}\n and your password is {password}'
        # msg['Subject'] = 'Beah Tec Join Request'

        msg['Subject'] = ' مستخدم جديد | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">مستخدم جديد!</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                لقد تم إضافتك في منصة بيئة تك كمستخدم مسؤول لمتابعة المنصة.\n
                اسم المستخدم: {user}\n
                كلمة المرور: {password}\n
                رابط المنصة: https://beah-tec.com
                 </p><br>
            </body>
            </html>
            """, subtype='html')


    if callFrom == 'emailAll':
        # print('emailAll user', user)
        rec_list = user
        rec = ', '.join(rec_list)
        # print('emailAll rec', rec)
        msg['To'] = rec
        message = receivedMsg
        # # print('emailAll message', message)
        msg['Subject'] = subject
    if callFrom == 'admin':
        msg['To'] = user
        message = f'Your are admin of Beah Tech. your username is {user} and password {password}'
        msg['Subject'] = 'Beah Tech Admin'
    if callFrom == "Send":
        msg['To'] = user
        message = receivedMsg
        msg['Subject'] = "رسالة | بيئة تك"
    if callFrom == 'Rcode':
        msg['To'] = user
        message = f'activation code for reset password {receivedMsg}'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">Hey  {user},</p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">رمز التفعيل!</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 هذه الرسالة من فريق بيئة تك لإعطائك رمز التفعيل : {receivedMsg}
                 يرجي عدم مشاركته للآخرين
                 </p><br>
            </body>
            </html>
            """, subtype='html')
        msg['Subject'] = "رمز التفعيل | بيئة تك"
    
    msg['From'] = EMAIL_ADDRESS

    # with smtplib.SMTP(mail_server, mail_port) as smtp:
    #     smtp.starttls()
    #     smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    #     smtp.send_message(msg)
    #     smtp.close()

    with smtplib.SMTP_SSL(mail_server, mail_port) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
        smtp.close()
    return True

user = "supermind92@gmail.com"
callFrom = 'Anounce2'
name = 'Enviro care'
password = "test1234"
custmsg = ""
subject = ""
status  = ""
sendEmail(user, password, name, custmsg, subject, status, callFrom)

# from datetime import datetime
# import pytz

# timezone = pytz.timezone("Asia/Muscat") 
# datetime = datetime.now(timezone)
# y = datetime.year
# m = datetime.month
# d = datetime.day
# print(y , " - " , m , " - ", d)