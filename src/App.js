import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Dashboard from "./pages/Dashboard";
import BulkMappingPage from './pages/BulkMapping';
import SingleMappingPage from "./pages/SingleMapping";
import Terminal from "./pages/Terminal";
import Authentication from "./pages/Authentication";

function App () {
  return(
    <Router>
      {
        localStorage.getItem("x-access") ?
        <div className='dashboard-container'>
          <SideBar menu={sidebar_menu} />
          <div className='dashboard-body'>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/terminal" element={<Terminal />} />
              <Route exact path="/bulk-mapping" element={<BulkMappingPage />} />
              <Route exact path="/single-mapping" element={<SingleMappingPage />} />
            </Routes>
          </div>
        </div>
          :
          <div>
            <Routes>
              <Route exact path="/login" element={< Authentication/>} />
            </Routes>
          </div>
        }
    </Router>
  )
}

export default App;