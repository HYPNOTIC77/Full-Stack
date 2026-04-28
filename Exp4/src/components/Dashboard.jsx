import React from 'react';

const Dashboard = ({ state, data, error }) => {
  if (state === 'loading') {
    return <div>Loading...</div>;
  }

  if (state === 'error') {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (state === 'empty' || !data || data.length === 0) {
    return <div>No data available.</div>;
  }

  if (state === 'loaded') {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default Dashboard;