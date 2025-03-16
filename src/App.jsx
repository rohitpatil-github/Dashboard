import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import store from './store'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import AddUser from './pages/AddUser'
import AuthRoute from './components/AuthRoute'
import Sidenav from './components/Sidenav'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#37ff8b',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#37ff8b',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#000000',
          '&:hover': {
            backgroundColor: '#2be077',
          },
        },
      },
    },
  },
})

const ProtectedLayout = ({ children }) => (
  <AuthRoute>
    <Sidenav>{children}</Sidenav>
  </AuthRoute>
)

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedLayout>
                  <Users />
                </ProtectedLayout>
              }
            />
            <Route
              path="/add-user"
              element={
                <ProtectedLayout>
                  <AddUser />
                </ProtectedLayout>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App