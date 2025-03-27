import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/Topbar';
import DashboardPage from './Components/DashboardPages';
import UsersPage from './Components/UsersPage';
import ReportsPage from './Components/ReportsPage';
import { Box, CssBaseline } from '@mui/material';
import Settings from './Components/Settings';
import Personal from './Personal';
import ColorInversionFooter from './Components/Footer';
 
 
const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <TopBar />
          <Box component="main" sx={{ p: 3 }}>
            <Routes>
              <Route index element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path='/settings' element={<Settings/>} />
              <Route path='/settings/personal info' element={<Personal/>} />
            </Routes>
          </Box>
          <ColorInversionFooter/>
        </Box>
      </Box>
    </Router>
  );
};
 
export default App;