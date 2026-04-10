import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Reports from './pages/Reports';
import ReportDetails from './pages/ReportDetails';
import GSTPortal from './pages/GSTPortal';
import Verification from './pages/Verification';
import Integrations from './pages/Integrations';
import Reconciliation from './pages/Reconciliation';
import TallyExport from './pages/TallyExport';
import BankAI from './pages/BankAI';
import Team from './pages/Team';
import Clients from './pages/Clients';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Protected Routes Wrapper could be added here */}
        <Route path="/app" element={<Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:id" element={<ReportDetails />} />
          <Route path="gst-portal" element={<GSTPortal />} />
          <Route path="verification" element={<Verification />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="reconciliation" element={<Reconciliation />} />
          <Route path="tally-export" element={<TallyExport />} />
          <Route path="bank-ai" element={<BankAI />} />
          <Route path="team" element={<Team />} />
          <Route path="clients" element={<Clients />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
