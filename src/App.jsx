import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import AddUser from './pages/AddUser'
import Users from './pages/Users'
import AuthPage from './pages/AuthPage'
import Layout from './components/Layout'
import './App.css'

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const AuthRoute = ({ children }) => {
    return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/auth" />
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
        <Route path="/users" element={<AuthRoute><Users /></AuthRoute>} />
        <Route path="/add-user" element={<AuthRoute><AddUser /></AuthRoute>} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  )
}

export default App