import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'
import CreateProductForm from './CreateProductForm'

function Dashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')

  const loadProtectedProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
      setMessage('Protected API loaded successfully')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load protected products')
    }
  }

  useEffect(() => {
    loadProtectedProducts()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <section className="card">
        <div className="row between">
          <h2>Dashboard (JWT Protected Calls)</h2>
          <button onClick={logout}>Logout</button>
        </div>
        {message && <p className="msg success">{message}</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <CreateProductForm onCreated={loadProtectedProducts} />
    </div>
  )
}

export default Dashboard
