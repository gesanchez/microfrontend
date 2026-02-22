import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from "react-router";
import { Button } from '@repo/ui/button';

function App() {
  const redirect = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };
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
        <li><Button onClick={() => redirect('/')}>Home</Button></li>
        <li><Button onClick={() => redirect('/dashboard')}>Dashboard</Button></li>
      </ul>      
      <Outlet />
    </>
  )
}

export default App
