import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { getRoutes } from './components/Router/RouterConfig';
import { ConfigProvider } from './context/ConfigContext'
import './i18n';
import './index.css'

// @ts-ignore
const config = window.__CONFIG__ || {};
const mfes = Array.isArray(config) ? config : (config.mfes || []);
const router = createBrowserRouter(getRoutes(mfes));

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <ConfigProvider config={{ mfes }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
)