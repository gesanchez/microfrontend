import { useNavigate } from "react-router";
import { useEffect } from 'react';

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

  return <></>;
}

export default App
