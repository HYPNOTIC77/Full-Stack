import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

function LoginForm({ standalone = false }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await api.post('/auth/login', form)
      localStorage.setItem('token', response.data.token)
      setIsError(false)
      setMessage(response.data.message || 'Login successful')
      navigate('/dashboard')
    } catch (err) {
      const status = err.response?.status
      setIsError(true)
      if (status === 401) {
        setMessage(err.response?.data?.message || 'Invalid username or password')
      } else if (status === 400) {
        setMessage(err.response?.data?.message || 'Please enter all fields correctly')
      } else {
        setMessage('Login failed')
      }
    }
  }

  return (
    <section className="card">
      <h2>{standalone ? 'Login Required' : 'Login (JWT Token)'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          placeholder="Username"
          required
        />
        <input
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className={`msg ${isError ? 'error' : 'success'}`}>{message}</p>}
    </section>
  )
}

export default LoginForm
