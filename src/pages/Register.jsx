import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Alert,
} from '@mui/material';
import { addUser } from '../store/slices/userSlice';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const resultAction = await dispatch(addUser(values));
      if (addUser.fulfilled.match(resultAction)) {
        navigate('/users');
      } else {
        setStatus(resultAction.error.message || 'Failed to register');
      }
    } catch (error) {
      setStatus('Failed to register');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        overflow: 'auto'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '90%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#111111',
          border: '1px solid #37ff8b',
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(55, 255, 139, 0.1)',
          position: 'relative',
          margin: 'auto'
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            mb: 3, 
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Sign up
        </Typography>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            status,
          }) => (
            <Form style={{ width: '100%' }}>
              {status && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'rgba(255, 55, 55, 0.1)',
                    color: '#ff3737',
                    border: '1px solid #ff3737'
                  }}
                >
                  {status}
                </Alert>
              )}
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
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
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  to="/login" 
                  style={{ 
                    textDecoration: 'none',
                    color: '#37ff8b'
                  }}
                >
                  <Typography variant="body2">
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Register; 