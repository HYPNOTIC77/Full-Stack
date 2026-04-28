import { useState } from 'react'
import api from '../api/client'

function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await api.post('/auth/register', form)
      setIsError(false)
      setMessage(response.data.message || 'Registered successfully')
      setForm({ username: '', password: '' })
    } catch (err) {
      const status = err.response?.status
      if (status === 409) {
        setMessage(err.response?.data?.message || 'Username already exists')
      } else if (status === 400) {
        setMessage(err.response?.data?.message || 'Please enter valid form details')
      } else {
        setMessage('Registration failed')
      }
      setIsError(true)
    }
  }

  return (
    <section className="card">
      <h2>Register (Form Submission)</h2>
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
        <button type="submit">Register</button>
      </form>
      {message && <p className={`msg ${isError ? 'error' : 'success'}`}>{message}</p>}
    </section>
  )
}

export default RegisterForm
