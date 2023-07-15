import { Link } from "react-router-dom";

function Buttons() {
    return(
        <>
         {/* <Link className="button-74 joinbutton-74  vote-button" to="/vote" role="button">
          
          <i class="fas fa-star-half-alt"></i>صوت الآن
        </Link> */}
        <Link className="button-74 loginbutton-74" to="/login" role="button">
            تسجيل دخول 
        </Link>
        
        <Link className="button-74 joinbutton-74" to="/join" role="button">
        <i className="far fa-user pe-1"></i>انضم إلينا 
        </Link>
       

        </>
    )
}
export default Buttons;

