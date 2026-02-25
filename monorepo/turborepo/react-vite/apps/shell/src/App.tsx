import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useNavigate } from "react-router";
import { Button } from '@repo/ui/button';
import { useEffect } from 'react';
import { navigateTo } from '@repo/utilities/navigation';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        navigate(customEvent.detail);
      }
    };

    window.addEventListener('shell:navigate', handleNavigation);
    return () => window.removeEventListener('shell:navigate', handleNavigation);
  }, [navigate]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <ul>
        <li><Button onClick={() => navigateTo('/')}>Home</Button></li>
        <li><Button onClick={() => navigateTo('/dashboard')}>Dashboard</Button></li>
      </ul>      
      <Outlet />
    </>
  )
}

export default App
