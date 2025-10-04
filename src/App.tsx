import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import ActivityHistory from './pages/ActivityHistory'

function App() {
  const [authed, setAuthed] = useState(false)
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={authed ? <Navigate to="/dashboard" replace /> : <Login onSuccess={() => setAuthed(true)} />} 
        />
        <Route 
          path="/dashboard" 
          element={authed ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/activity-history" 
          element={authed ? <ActivityHistory /> : <Navigate to="/login" replace />} 
        />
        <Route path="/" element={<Navigate to={authed ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App
