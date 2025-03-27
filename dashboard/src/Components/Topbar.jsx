import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Snackbar, Alert, Checkbox } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [notificationCount, setNotificationCount] = React.useState(3);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginError] = React.useState(false);
  
  const theme = useTheme();

  const randomMessages = [
    "New update available!",
    "Your password was successfully updated.",
    "A new comment on your post.",
    "Server maintenance scheduled for tonight."
  ];


  React.useEffect(() => {
    const loggedInState = sessionStorage.getItem('isLoggedIn');
    if (loggedInState === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    if (notificationCount > 0) {
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setMessage(randomMessage);
      setOpenSnackbar(true);
      setNotificationCount(notificationCount - 1);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('userCredentials'); // Remove credentials on logout
    sessionStorage.removeItem('isLoggedIn'); // Remove login state on logout
    setMessage('Logged out successfully!');
    setOpenSnackbar(true);
  };

  // Sign-in 
  const signInHandler = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    setMessage('Login successful!');
    setOpenSnackbar(true);
  };

  // Admin Dashboard component
  const AdminDashboard = () => (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#210F37' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            {auth && (
              <div>
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon sx={{ cursor: 'pointer' }} onClick={handleNotificationClick} />
                </Badge>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  style={{ position: 'absolute', top: '40px', left: '90vw' }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem>Setting</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={loginError ? 'error' : 'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );

  // Sign-in page component using @toolpad/core
  const SlotPropsSignIn = () => (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signInHandler}
        slotProps={{
          emailField: { variant: 'standard', autoFocus: false },
          passwordField: { variant: 'standard' },
          submitButton: { variant: 'outlined' },
          rememberMe: {
            control: (
              <Checkbox
                name="tandc"
                value="true"
                color="primary"
                sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
              />
            ),
            color: 'textSecondary',
            label: 'I agree with the T&C',
          },
        }}
        providers={providers}
      />
    </AppProvider>
  );

  return (
    <>
      <div>
        {isLoggedIn ? <AdminDashboard /> : <SlotPropsSignIn />}
      </div>
    </>
  );
}
