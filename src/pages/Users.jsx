import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  Fab
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/slices/userSlice';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    // In a real application, this would open an edit dialog
    console.log('Edit user:', user);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // In a real application, you would make an API call here
      await fetch(`https://reqres.in/api/users/${selectedUser.id}`, {
        method: 'DELETE'
      });
      dispatch(fetchUsers());
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#121212', minHeight: '100vh', position: 'relative' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#fff' }}>
          Users ({filteredUsers.length})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add-user')}
        >
          Add User
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
              '&.Mui-focused fieldset': { borderColor: '#37ff8b' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#fff' }} />
              </InputAdornment>
            )
          }}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: '#fff' }}>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.4)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#37ff8b' }
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: '#fff' }}>Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Role"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.4)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#37ff8b' }
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* User Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card sx={{
              height: '100%',
              backgroundColor: '#1e1e1e',
              color: '#fff',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <Avatar
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography variant="h6">
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#aaa' }}>
                    {user.email}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" gap={1} mb={2}>
                  <Chip
                    label={user.status === 'active' ? 'Active' : 'Inactive'}
                    color={user.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                  <Chip
                    label={user.role === 'admin' ? 'Admin' : 'User'}
                    color={user.role === 'admin' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={1}>
                  <IconButton
                    onClick={() => handleEdit(user)}
                    size="small"
                    sx={{ color: '#37ff8b' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user)}
                    size="small"
                    sx={{ color: '#ff4444' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#fff'
          }
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedUser?.first_name} {selectedUser?.last_name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users; 