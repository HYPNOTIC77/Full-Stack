import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, removeProduct } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useAuth } from '../context/AuthContext';

const ProductManager = () => {
  const { user } = useAuth();
  const products = useSelector(state => state.products.items);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddProduct = () => {
    if (newProductName && newProductPrice) {
      dispatch(addProduct({ name: newProductName, price: Number(newProductPrice) }));
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const handleUpdateProduct = () => {
    if (editingId && newProductName && newProductPrice) {
      dispatch(updateProduct({ id: editingId, name: newProductName, price: Number(newProductPrice) }));
      setEditingId(null);
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
  };

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Product Catalog</h2>
      {user?.role === 'admin' && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #3498db' }}>
          <h3 style={{ marginTop: 0, color: '#3498db' }}>Admin Panel</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {editingId ? (
              <>
                <button onClick={handleUpdateProduct} style={{ flex: 1 }}>Update Product</button>
                <button onClick={() => { setEditingId(null); setNewProductName(''); setNewProductPrice(''); }} style={{ flex: 1, backgroundColor: '#95a5a6' }}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAddProduct} style={{ flex: 1 }}>Add Product</button>
            )}
          </div>
        </div>
      )}

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{product.name}</h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#3498db' }}>₹{product.price}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => dispatch(addToCart(product))} style={{ backgroundColor: '#27ae60' }}>Add to Cart</button>
              {user?.role === 'admin' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => startEditing(product)} style={{ flex: 1, backgroundColor: '#f39c12' }}>Edit</button>
                  <button 
                    onClick={() => dispatch(removeProduct(product.id))} 
                    className="remove-btn"
                    style={{ flex: 1, backgroundColor: '#e74c3c' }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', borderLeft: '4px solid #27ae60' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: '#27ae60' }}>Cart Summary</h3>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#7f8c8d', fontWeight: '600' }}>Total Items: <span style={{ fontSize: '18px', fontWeight: '700', color: '#3498db' }}>{cart.reduce((total, item) => total + item.quantity, 0)}</span></p>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {cart.map(item => (
            <li key={item.id} style={{ padding: '12px', marginBottom: '8px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', border: '1px solid #ecf0f1' }}>
              <span style={{ fontWeight: '500', color: '#2c3e50' }}>{item.name} <span style={{ color: '#95a5a6', fontSize: '12px' }}>× {item.quantity}</span></span>
              <span style={{ fontWeight: '600', color: '#3498db' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
          {cart.length === 0 && <li style={{ textAlign: 'center', color: '#bdc3c7', padding: '20px' }}>Your cart is empty</li>}
        </ul>
      </div>
    </div>
  );
};

export default ProductManager;
