import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 150, flexShrink: 0 }}>
      <List sx={{width: 150,height: '100vh', backgroundColor: "#EEEEEE"}}>
        <ListItem button component={Link} to="/">
          <DashboardIcon/><ListItemText primary="Dashboard" sx={{color:'#210F37',padding:'5px'}}/>
        </ListItem>
        <ListItem button component={Link} to="/users">
          <GroupIcon/><ListItemText primary="Users" sx={{color:'#210F37',padding:'5px'}}/>
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <ReportIcon/><ListItemText primary="Reports" sx={{color:'#210F37',padding:'5px'}}/>
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <SettingsIcon/><ListItemText primary="Settings" sx={{color:'#210F37',padding:'5px'}}/>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
