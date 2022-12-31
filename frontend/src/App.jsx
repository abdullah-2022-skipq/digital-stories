import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Navigation from "./components/shared/Navigation/Navigation";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="layout">
          <Navigation />
          <Switch>
            <PublicRoute exact path="/">
              <div className="main">
                <Landing />
              </div>
            </PublicRoute>

            <ProtectedRoute path="/home">
              <Home />
            </ProtectedRoute>

            <PublicRoute exact path="/get-started">
              <div className="main">
                <SignUp />
              </div>
            </PublicRoute>

            <PublicRoute exact path="/sign-in">
              <div className="main">
                <SignIn />
              </div>
            </PublicRoute>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

// protected routes

// render: a function that returns the JSX to render when the route matches the current location.
const PublicRoute = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/home",
              // location: current path
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              // location: current path
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

export default App;
