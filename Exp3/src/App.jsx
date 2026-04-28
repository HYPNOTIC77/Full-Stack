import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // API Caching test
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        // Map the original global data to Indian equivalents
        const indianNames = ["Aarav Sharma", "Vivaan Kapoor", "Aditya Singh", "Vihaan Iyer", "Arjun Reddy", "Sai Krishna", "Ayaan Desai", "Rohan Joshi", "Krishna Das", "Ishaan Verma"];
        const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"];
        const indianCompanies = ["TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "Reliance", "L&T", "Adani Group", "Mahindra", "Bajaj Auto"];
        
        const indianData = json.map((user, index) => {
          const name = indianNames[index % indianNames.length];
          return {
            ...user,
            name: name,
            email: name.toLowerCase().replace(' ', '.') + "@example.in",
            address: { ...user.address, city: indianCities[index % indianCities.length] },
            company: { ...user.company, name: indianCompanies[index % indianCompanies.length] }
          };
        });
        
        setData(indianData)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setLoading(false)
      });

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredData = data.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      {isOffline && (
        <div className="offline-banner">
          📶 You are currently offline. Viewing cached content.
        </div>
      )}

      <header className="header">
        <h1>Team Directory</h1>
        <p>Progressive Web App - Data is cached for offline use</p>
      </header>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="user-grid">
          {[1, 2, 3, 4, 5, 6].map(skeleton => (
            <div key={skeleton} className="skeleton-card"></div>
          ))}
        </div>
      ) : filteredData.length > 0 ? (
        <div className="user-grid">
          {filteredData.map(user => (
            <div className="user-card" key={user.id}>
              <div className="user-avatar">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>📧 {user.email}</p>
                <p>🏢 {user.company.name}</p>
                <p>📍 {user.address.city}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No team members found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}

export default App
