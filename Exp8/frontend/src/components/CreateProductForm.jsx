import { useState } from 'react'
import api from '../api/client'

function CreateProductForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', category: '', price: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const payload = { ...form, price: Number(form.price) }
      const response = await api.post('/products', payload)
      setIsError(false)
      setMessage(`Created product #${response.data.id}`)
      setForm({ name: '', category: '', price: '' })
      onCreated()
    } catch (err) {
      const status = err.response?.status
      setIsError(true)
      if (status === 400) {
        setMessage(err.response?.data?.message || 'Please enter valid product data')
      } else {
        setMessage(err.response?.data?.message || 'Failed to create product')
      }
    }
  }

  return (
    <section className="card">
      <h2>Create Product (Protected POST)</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Product Name"
          required
        />
        <input
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          placeholder="Category"
          required
        />
        <input
          value={form.price}
          onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          placeholder="Price"
          type="number"
          min="1"
          step="0.01"
          required
        />
        <button type="submit">Create Product</button>
      </form>
      {message && <p className={`msg ${isError ? 'error' : 'success'}`}>{message}</p>}
    </section>
  )
}

export default CreateProductForm
