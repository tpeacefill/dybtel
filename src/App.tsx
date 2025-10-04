import { useState } from 'react'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'


function App() {
  const [authed, setAuthed] = useState(false)
  return authed ? <Dashboard /> : <Login onSuccess={() => setAuthed(true)} />
}

export default App
