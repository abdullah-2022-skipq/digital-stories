import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Navigation from "./components/shared/Navigation/Navigation";
import Home from "./pages/Home/Home";

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
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App
