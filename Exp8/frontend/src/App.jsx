import { Navigate, Route, Routes } from 'react-router-dom'
import PublicProductsTable from './components/PublicProductsTable'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'

const isAuthenticated = () => Boolean(localStorage.getItem('token'))

function App() {
  return (
    <div className="app-shell">
      <h1>Exp8: React + Spring Boot Integration</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PublicProductsTable />
              <div className="two-col">
                <RegisterForm />
                <LoginForm />
              </div>
            </>
          }
        />
        <Route path="/login" element={<LoginForm standalone />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
