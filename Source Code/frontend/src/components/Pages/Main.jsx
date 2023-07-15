
import Home from './home';
import Header from './header';
import Footer from './footer';
import AboutPage from './aboutPage';
import JoinUs from './Joinus';
import Login from './Login';
import {Route,Switch} from "react-router-dom";

function Main() {
  return (
    <div className="main">
      <Header/>
      <Switch>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/about">
        <AboutPage />
      </Route>
      <Route exact path="/join">
        <JoinUs />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      </Switch>
      
    </div>
  );
}

export default Main;
