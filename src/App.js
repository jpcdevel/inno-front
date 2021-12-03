import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from './components/pages/Home'
import Startup from './components/startups/Startup'
import Navbar from './components/essentials/Navbar'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'

import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from './utils/ProtectedRoute'
import './static/styles/main.css'

import { UserContext } from "./components/auth/AuthLayer";

function App() {
  const { user } = useContext(UserContext)

  return (
    
      <div className="main">
          <Router>
              <Toaster
                  toastOptions={{
                      className: 'customToast',
                  }}
              />


              <div className="main">
                  {user.username && (
                    <Navbar />
                  )}
                  <ScrollToTop />
                  <div className="content">
                      <Switch>
                          <ProtectedRoute exact path="/">
                              <Home />
                          </ProtectedRoute>
                          <ProtectedRoute path="/startup">
                              <Startup />
                          </ProtectedRoute>
                          <ProtectedRoute path="/my">
                              <Home />
                          </ProtectedRoute>
                          <Route path="/login">
                              <Login />
                          </Route>
                          <Route path="/logout">
                            <Logout />
                          </Route>
                      </Switch>
                  </div>
              </div>
        </Router>
      </div>
  )
}

export default App;
