import React, { useState } from 'react';
import Button from './components/Button';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

function App() {
  const [dashboardState, setDashboardState] = useState('loaded');

  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Exp4 - Components Live View</h1>

      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>1. Button Component</h2>
        <Button text="Click Me!" onClick={() => alert('Button was clicked!')} />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>2. Form Component</h2>
        <Form />
      </section>

      <section style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>3. Dashboard Component</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Change State: </strong>
          <select value={dashboardState} onChange={(e) => setDashboardState(e.target.value)}>
            <option value="loaded">Loaded</option>
            <option value="loading">Loading</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
          <Dashboard 
            state={dashboardState} 
            data={mockData} 
            error="Something went wrong while fetching data!" 
          />
        </div>
      </section>
    </div>
  );
}

export default App;