import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { fetchUsers } from '../store/slices/userSlice';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card 
    sx={{ 
      height: '100%',
      backgroundColor: '#1e1e1e',
      border: '1px solid rgba(55, 255, 139, 0.1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        transition: 'transform 0.2s ease-in-out',
        border: '1px solid #37ff8b',
      }
    }}
  >
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Icon sx={{ fontSize: 40, color }} />
        </Grid>
        <Grid item xs>
          <Typography variant="h6" component="div" sx={{ color: '#fff' }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ color: '#37ff8b' }}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { users, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress sx={{ color: '#37ff8b' }} />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        backgroundColor: '#000000',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Welcome Message */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3, 
                mb: 3, 
                backgroundColor: '#111111',
                border: '1px solid #37ff8b',
              }}
            >
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                component="h1" 
                gutterBottom
                sx={{ color: '#fff' }}
              >
                Welcome to the Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Here's an overview of your application statistics
              </Typography>
            </Paper>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={PeopleIcon}
              title="Total Users"
              value={users?.length || 0}
              color="#37ff8b"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={TrendingUpIcon}
              title="Active Users"
              value={users?.filter(user => user.active)?.length || 0}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AssessmentIcon}
              title="Reports"
              value="24"
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AccountCircleIcon}
              title="New Users"
              value={users?.filter(user => 
                new Date(user.created_at).getMonth() === new Date().getMonth()
              )?.length || 0}
              color="#f44336"
            />
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                backgroundColor: '#111111',
                border: '1px solid #37ff8b',
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ color: '#fff' }}
              >
                Recent Activity
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                maxHeight: 400,
                overflowY: 'auto'
              }}>
                {users?.slice(0, 5).map((user) => (
                  <Paper 
                    key={user.id} 
                    sx={{ 
                      p: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 2,
                      backgroundColor: '#1e1e1e',
                      border: '1px solid rgba(55, 255, 139, 0.1)',
                      '&:hover': {
                        border: '1px solid #37ff8b',
                      }
                    }}
                  >
                    <AccountCircleIcon sx={{ color: '#37ff8b' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {user.first_name} {user.last_name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 