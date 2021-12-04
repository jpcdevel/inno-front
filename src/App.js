import React, { useState, useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from './components/pages/Home'
import Project from './components/pages/Project'
import ProjectsList from './components/pages/ProjectsList'
import Startup from './components/startups/Startup'
import Navbar from './components/essentials/Navbar'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'

import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from './utils/ProtectedRoute'
import './static/styles/main.css'

import { UserContext } from "./components/auth/AuthLayer";
import Invitation from "./components/pages/Invitation";

export const GlobalContext = React.createContext()

function App() {
  const { user } = useContext(UserContext)
  const [startup, setStartup] = useState()
  const [cats, setCats] = useState()

  const [startups, setStartups] = useState()
  const [filterType, setFilterType] = useState()
  const [filters, setFilters] = useState({cats: [], stage: "", inculcation: "", teamNumber: "", pilot: ""})

  const context = {
    startup, 
    setStartup,
    cats,
    setCats
  }

  return (
    
      <div className="main">
          <GlobalContext.Provider value={ context }>
            <Router>
                  <Toaster
                      toastOptions={{
                          className: 'customToast',
                      }}
                  />


<<<<<<< HEAD
                  <div className="main rel">
                      {user.username && (
                        <Navbar />
                      )}
                      <ScrollToTop />
                      <div className="content">
                          <Switch>
                              <ProtectedRoute exact path="/">
                                  <Home 
                                    startups={startups}
                                    setStartups={setStartups}
                                    filterType={filterType}
                                    setFilterType={setFilterType}
                                    filters={filters}
                                    setFilters={setFilters}
                                  />
                              </ProtectedRoute>
                              <ProtectedRoute path="/startup/:id">
                                  <Startup />
                              </ProtectedRoute>
                              <ProtectedRoute exact path="/my">
                                  <ProjectsList />
                              </ProtectedRoute>
                              <ProtectedRoute path="/my/:id">
                                  <Project />
                              </ProtectedRoute>
                              <Route path="/login">
                                  <Login />
                              </Route>
                              <Route path="/logout">
                                <Logout />
                              </Route>
                          </Switch>
                      </div>
=======
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
                          <ProtectedRoute path="/request">
                              <Invitation />
                          </ProtectedRoute>
                          <Route path="/login">
                              <Login />
                          </Route>
                          <Route path="/logout">
                            <Logout />
                          </Route>
                      </Switch>
>>>>>>> 05cdcd0d06b899829237fb491477b9f3e86c3050
                  </div>
            </Router>
          </GlobalContext.Provider>
      </div>
  )
}

export default App;
