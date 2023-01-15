import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './components/shared/Footer/Footer';
import Navigation from './components/shared/Navigation/Navigation';
import Landing from './pages/Landing/Landing';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import usePersistentSession from './hooks/usePersistentSession';
import Spinner from './components/shared/Spinner/Spinner';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import MultiStepCreateStoryEntry from './pages/MultiStepCreateStoryForm/MultiStepCreateStoryEntry';
import StepChooseMediaType from './pages/MultiStepCreateStoryForm/StepChooseMediaType/StepChooseMediaType';
import StepStoryContent from './pages/MultiStepCreateStoryForm/StepStoryContent/StepStoryContent';
import StoryDetails from './pages/StoryDetails/StoryDetails';
import Trending from './pages/Trending/Trending';
import Engagements from './pages/Engagements/Engagements';
import UpdateStory from './pages/UpdateStory/UpdateStory';

export const globalContext = createContext();

function App() {
  const { loading } = usePersistentSession();

  // for context use in MultiStepCreateStoryForm
  const [mediaType, setMediaType] = useState('Text');
  const steps = {
    1: StepChooseMediaType,
    2: StepStoryContent,
  };
  const [step, setStep] = useState(1);
  const onNextHandler = () => {
    setStep(step + 1);
  };
  const onPrevHandler = () => {
    setStep(step - 1);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    mediaType,
    setMediaType,
    steps,
    step,
    setStep,
    onNextHandler,
    onPrevHandler,
  };

  return loading ? (
    <Spinner message="Loading, please wait" />
  ) : (
    <globalContext.Provider value={value}>
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
                <div className="main">
                  <Home />
                </div>
              </ProtectedRoute>

              <ProtectedRoute path="/leaderboard">
                <div className="main">
                  <Leaderboard />
                </div>
              </ProtectedRoute>

              <ProtectedRoute path="/create-story">
                <div className="main">
                  <MultiStepCreateStoryEntry />
                </div>
              </ProtectedRoute>

              <ProtectedRoute exact path="/story">
                <div className="main">
                  <StoryDetails />
                </div>
              </ProtectedRoute>

              <ProtectedRoute exact path="/update-story">
                <div className="main">
                  <UpdateStory />
                </div>
              </ProtectedRoute>

              <ProtectedRoute exact path="/engagements">
                <div className="main">
                  <Engagements />
                </div>
              </ProtectedRoute>

              <ProtectedRoute exact path="/trending">
                <div className="main">
                  <Trending />
                </div>
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
    </globalContext.Provider>
  );
}

// protected routes

// render: a function that returns the JSX to render when the route matches the current location.
function PublicRoute({ children, ...rest }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          <Redirect
            to={{
              pathname: '/home',
              // location: current path
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

function ProtectedRoute({ children, ...rest }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              // location: current path
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
