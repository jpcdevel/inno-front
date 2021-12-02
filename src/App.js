import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from './components/pages/Home'
import Navbar from './components/essentials/Navbar'

import ScrollToTop from "./utils/ScrollToTop";
import './static/styles/main.css'

function App() {
  return (
      <div className="main">
          <Router>
              <Toaster
                  toastOptions={{
                      className: 'customToast',
                  }}
              />


              <div className="main">
                  <Navbar />
                  <ScrollToTop />
                  <div className="content">
                      <Switch>
                          <Route exact path="/">
                              <Home />
                          </Route>
                          <Route path="/my">
                              <Home />
                          </Route>
                      </Switch>
                  </div>
              </div>
        </Router>
      </div>
  )
}

export default App;
