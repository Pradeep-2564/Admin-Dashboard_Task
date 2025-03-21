import { Typography, Paper, Box } from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

const Personal = () => {
  return (
    <div>
      <Paper sx={{ p: 3, backgroundColor: "lightblue" }}>
        <Typography variant="h5">Personal info</Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Typography sx={{cursor: "pointer"}}>Manage Account </Typography>
          <AccountCircle />
        </Box>
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Typography sx={{cursor: "pointer"}}>Manage Passwords</Typography>
          <LockIcon />
        </Box>
      </Paper>
    </div>
  );
};

export default Personal;
