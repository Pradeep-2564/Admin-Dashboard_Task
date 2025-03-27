import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Settings = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Settings</Typography>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Typography>Notifications:</Typography>
          <Box sx={{mt: 4}}>
          <Typography>
            Email <Switch {...label} defaultChecked /> 
          </Typography>
          <Typography>
            SMS <Switch {...label} />
          </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Link to="personal info"><Typography variant="button">Personal info </Typography></Link>
        </Box>
        <Button variant="contained" sx={{mt: 4}} onClick={()=> alert('Setting is saved!')} color="secondary">Save setting</Button>
      </Paper>
    </div>
  );
};

export default Settings;
