import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import { loginAsync, clearError } from '../store/slices/authSlice';
import '../styles/Login.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values) => {
    dispatch(loginAsync(values));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000000',
        padding: '20px'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#111111',
          border: '1px solid #37ff8b'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', textAlign: 'center' }}>
          Login
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            onClose={() => dispatch(clearError())}
            sx={{ 
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
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
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
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Password"
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
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
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
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
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login; 