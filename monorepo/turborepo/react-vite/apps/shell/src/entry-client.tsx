import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { routes } from './components/Router'
import { ConfigProvider } from './context/ConfigContext'
import './index.css'

const router = createBrowserRouter(routes);

// @ts-ignore
const config = window.__CONFIG__ || { mfes: [] };

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <ConfigProvider config={{ mfes: config }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
)