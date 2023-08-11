import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Dashboard from "./pages/Dashboard";
import BulkMappingPage from './pages/BulkMapping';
import SingleMappingPage from "./pages/SingleMapping";
import Terminal from "./pages/Terminal";

function App () {
  // const loggedIn = localStorage.getItem("x-auth-t");
  return(
    <Router>
        <div className='dashboard-container'>
          <SideBar menu={sidebar_menu} />
          <div className='dashboard-body'>
            <Routes>
              <Route exact path="*" element={<Dashboard />} />
              <Route exact path="/terminal" element={<Terminal />} />
              <Route exact path="/bulk-mapping" element={< BulkMappingPage/>} />
              <Route exact path="/single-mapping" element={<SingleMappingPage />} />
            </Routes>
          </div>
        </div>

    </Router>
  )
}

export default App;