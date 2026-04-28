import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export default function App() {
  const [status, setStatus] = useState('Checking backend...');

  useEffect(() => {
    let active = true;

    async function loadHealth() {
      try {
        const response = await fetch(`${API_BASE}/health`);
        if (!response.ok) {
          throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setStatus(`Backend: ${data.status}`);
        }
      } catch {
        if (active) {
          setStatus('Backend: UNREACHABLE (frontend deploy still works)');
        }
      }
    }

    loadHealth();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="container">
      <h1>Exp10 CI/CD Demo</h1>
      <p className="subtitle">GitHub Actions + AWS EC2 + Firebase Hosting</p>

      <section className="card">
        <h2>Deployment Status</h2>
        <p>{status}</p>
      </section>

      <section className="card">
        <h2>Implemented Requirements</h2>
        <ul>
          <li>CI on every push (test + build)</li>
          <li>Artifacts for frontend dist and backend JAR</li>
          <li>Docker image push to GHCR on main</li>
          <li>Backend deploy to AWS EC2</li>
          <li>Frontend deploy to Firebase Hosting</li>
          <li>Optional Firebase custom-domain mapping</li>
        </ul>
      </section>
    </main>
  );
}
