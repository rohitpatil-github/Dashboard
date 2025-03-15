import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { fetchUsers } from '../store/slices/userSlice'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Chip
} from '@mui/material'
import { Email, Phone, LocationOn } from '@mui/icons-material'
import '../styles/Dashboard.css'

function Dashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { users, loading, error, currentPage, totalPages, totalUsers } = useSelector(state => state.users)
  const [usersState, setUsersState] = useState([])

  useEffect(() => {
    dispatch(fetchUsers(1))
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handlePageChange = (event, page) => {
    dispatch(fetchUsers(page))
  }

  const getRandomLocation = () => {
    const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Berlin', 'Sydney']
    return cities[Math.floor(Math.random() * cities.length)]
  }

  const getRandomPhone = () => {
    return `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`
  }

  const getRandomRole = () => {
    const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Engineer', 'Consultant']
    return roles[Math.floor(Math.random() * roles.length)]
  }

  const getRandomStatus = () => {
    const statuses = ['Active', 'Away', 'Busy', 'Offline']
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#37ff8b'
      case 'Away':
        return '#ffd137'
      case 'Busy':
        return '#ff3737'
      case 'Offline':
        return '#808080'
      default:
        return '#808080'
    }
  }

  if (loading) {
    return (
      <Box className="dashboard-loader">
        <CircularProgress sx={{ color: '#37ff8b' }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="dashboard-error">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <div className="dashboard">
      <Box className="dashboard-container">
        <Typography variant="h4" className="dashboard-title">
          Team Members
        </Typography>

        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Card className="user-card">
                <CardContent>
                  <Box className="user-header">
                    <Avatar
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="user-avatar"
                    />
                    <Box className="user-status">
                      <Box
                        className="status-indicator"
                        sx={{ backgroundColor: getStatusColor(user.status) }}
                      />
                      <Typography variant="caption">{user.status}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" className="user-name">
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>

                  <Chip
                    label={user.role}
                    size="small"
                    className="user-role"
                  />

                  <Box className="user-info">
                    <Box className="info-item">
                      <Email fontSize="small" />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    <Box className="info-item">
                      <Phone fontSize="small" />
                      <Typography variant="body2">{user.phone}</Typography>
                    </Box>
                    <Box className="info-item">
                      <LocationOn fontSize="small" />
                      <Typography variant="body2">{user.location}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default Dashboard 