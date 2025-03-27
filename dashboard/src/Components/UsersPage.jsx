import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    isActive: true,
  });
  const [editUser, setEditUser] = useState(null); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle user input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle switch for active status
  const handleSwitchChange = () => {
    setNewUser((prevUser) => ({ ...prevUser, isActive: !prevUser.isActive }));
  };

  // Handle form submission for adding or editing a user
  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditing) {
        // Save edited user details
        const updatedUsers = users.map((user) =>
          user.id === editUser.id ? { ...newUser, id: user.id } : user
        );
        setUsers(updatedUsers);
        setAlertMessage("User updated successfully!");
        setAlertSeverity("success");
      } else {
        // Add new user
        const user = { ...newUser, id: users.length + 1 }; // Generate a unique ID for the new user
        setUsers((prevUsers) => [...prevUsers, user]);
        setAlertMessage("User added successfully!");
        setAlertSeverity("success");
      }
      setOpenSnackbar(true);
      setOpenDialog(false); // Close dialog after submission
      resetForm();
    }
  };

  // Validate the form fields
  const validateForm = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      setAlertMessage("Please fill all fields.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  // Reset the form fields
  const resetForm = () => {
    setNewUser({ name: "", email: "", role: "User", isActive: true });
    setIsEditing(false); // Reset editing state
    setEditUser(null); // Reset the user being edited
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
    setAlertMessage("User deleted successfully!");
    setAlertSeverity("error");
    setOpenSnackbar(true);
  };

  // Handle deactivate user
  const handleDeactivateUser = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
    setAlertMessage("User status updated!");
    setAlertSeverity("warning");
    setOpenSnackbar(true);
  };

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle opening the Add New User dialog
  const handleAddUserDialog = () => {
    setIsEditing(false);
    setOpenDialog(true); // Open the dialog for adding a user
  };

  // Handle opening the Edit User dialog
  const handleEditUserDialog = (user) => {
    setIsEditing(true);
    setEditUser(user); 
    setNewUser({ ...user });
    setOpenDialog(true); 
  };

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change in pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ p: 3 }}>
        <h2 style={{marginBottom:'10px'}}>User Management</h2>

        {/* Search Box */}
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchQueryChange}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUserDialog}
          sx={{ mb: 2 }}
        >
          Add New User
        </Button>

        <h3>Users List</h3>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditUserDialog(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeactivateUser(user.id)}
                        sx={{ ml: 2 }}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ ml: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Dialog for Add or Edit User */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch checked={newUser.isActive} onChange={handleSwitchChange} />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
