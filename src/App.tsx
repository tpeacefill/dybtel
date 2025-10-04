import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import ActivityHistory from './pages/ActivityHistory'
import TopUp from './pages/TopUp'
import { useAuthStore } from './store/authStore'

function App() {
  const { isLoggedIn } = useAuthStore()
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/topup" replace /> : <Login onSuccess={() => {}} />} 
        />
        <Route 
          path="/topup" 
          element={isLoggedIn ? <TopUp onBackToLogin={() => {}} /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/activity-history" 
          element={isLoggedIn ? <ActivityHistory /> : <Navigate to="/login" replace />} 
        />
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App
