import React, { useState } from 'react';
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

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  age: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .min(0, 'Age must be a positive number')
    .typeError('Age must be a number')
});

const UserForm = () => {
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });

  const initialValues = {
    name: '',
    email: '',
    age: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, error: null });
        resetForm();
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      setSubmitStatus({ success: false, error: error.message });
    } finally {
      setSubmitting(false);
    }
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
          maxWidth: 500,
          backgroundColor: '#111111',
          border: '1px solid #37ff8b'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', textAlign: 'center' }}>
          User Registration
        </Typography>

        {submitStatus.success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 2,
              backgroundColor: 'rgba(55, 255, 139, 0.1)',
              color: '#37ff8b',
              border: '1px solid #37ff8b'
            }}
          >
            Form submitted successfully!
          </Alert>
        )}

        {submitStatus.error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              backgroundColor: 'rgba(255, 55, 55, 0.1)',
              color: '#ff3737',
              border: '1px solid #ff3737'
            }}
          >
            {submitStatus.error}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field name="name">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    margin="normal"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
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

              <Field name="age">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Age (optional)"
                    margin="normal"
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
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
                disabled={isSubmitting}
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
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default UserForm; 