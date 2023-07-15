import Footer from "./footer";
import Header from "./header";
import { Link } from "react-router-dom";

function CollagesRegisterTable() {
    return(
        <>
        <Header />
        <div className="py-5 reg-table">
            <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col" style={{color:'#26306A'}}>#</th>
                    <th scope="col" style={{color:'#26306A'}}>اسم الجامعة</th>
                    <th scope="col" style={{color:'#26306A'}}>المحافظة</th>
                    <th scope="col" style={{color:'#26306A'}}>التاريخ المتوقع</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>جامعة السلطان قابوس</td>
                    <td>مسقط</td>
                    <td>25/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>جامعة ظفار</td>
                    <td>ظفار</td>
                    <td>31/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>جامعة التقنية و العلوم التطبيقية بصلالة</td>
                    <td>ظفار</td>
                    <td>31/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">4</th>
                    <td>جامعة التقنية و العلوم التطبيقية بالمصنعة</td>
                    <td>جنوب الباطنة </td>
                    <td>19/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">5</th>
                    <td>جامعة التقنية و العلوم التطبيقية بشناص</td>
                    <td>شمال الباطنة </td>
                    <td>20/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">6</th>
                    <td>جامعة التقنية و العلوم التطبيقية بعبري (تقنية عبري)</td>
                    <td>الظاهرة </td>
                    <td>23/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">7</th>
                    <td>جامعة البريمي </td>
                    <td>البريمي  </td>
                    <td>24/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">8</th>
                    <td>جامعةالشرقية </td>
                    <td>شمال الشرقية</td>
                    <td>26/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">9</th>
                    <td>جامعة التقنية و العلوم التطبيقية بإبرا ء</td>
                    <td>شمال الشرقية</td>
                    <td>26/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">10</th>
                    <td>جامعة التقنية و العلوم التطبيقية بصور</td>
                    <td>جنوب الشرقية</td>
                    <td>23/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">11</th>
                    <td>الجامعة الألمانية</td>
                    <td>مسقط</td>
                    <td>26/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">12</th>
                    <td >الجامعة الوطنية </td>
                    <td>مسقط</td>
                    <td>24/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">12</th>
                    <td >جامعة التقنية و العلوم التطبيقية بمسقط</td>
                    <td>مسقط</td>
                    <td>30/10/2022</td>
                    </tr>
                    <tr>
                    <th scope="row">13</th>
                    <td> الكلية العالمية للهندسة و التكنولوجيا</td>
                    <td>مسقط</td>
                    <td>30/10/2022</td>
                    </tr>
                </tbody>
            </table>
                </div>
            </div>
            </div>
            <div className="my-3">
            <a  href={"https://forms.gle/pGpSHc6mNgK9pNRV8"} target={"_blank"}  class="cta">
              <span>تسجيل الجامعات</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>
            </div>
        </div>
         <Footer />
        </>
        
    )
}
export default CollagesRegisterTable;