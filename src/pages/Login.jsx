import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
} from '@mui/material';
import { loginAsync } from '../store/slices/authSlice';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginAsync(values)).unwrap();
      if (result.token) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Error is handled by the reducer
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#111111',
            border: '1px solid #37ff8b',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 3, 
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            Sign in
          </Typography>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                backgroundColor: 'rgba(255, 55, 55, 0.1)',
                color: '#ff3737',
                border: '1px solid #ff3737'
              }}
            >
              {error}
            </Alert>
          )}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#37ff8b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#37ff8b',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#37ff8b',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#ffffff',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#ffffff',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#37ff8b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#37ff8b',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#37ff8b',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#ffffff',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#ffffff',
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#37ff8b',
                    color: '#000000',
                    '&:hover': {
                      backgroundColor: '#2be077',
                    },
                    '&:disabled': {
                      backgroundColor: '#1a1a1a',
                      color: '#666666',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Link 
                    to="/register" 
                    style={{ 
                      textDecoration: 'none',
                      color: '#37ff8b'
                    }}
                  >
                    <Typography variant="body2">
                      Don't have an account? Sign up
                    </Typography>
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 