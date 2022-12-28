import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Navigation from "./components/shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="layout">
          <Navigation />
          <Switch>
            <Route exact path="/">
              <div className="main">
                <Home />
              </div>
            </Route>

            <Route exact path="/get-started">
              <div className="main">
                <SignUp />
              </div>
            </Route>

            <Route exact path="/sign-in">
              <div className="main">
                <SignIn />
              </div>
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
