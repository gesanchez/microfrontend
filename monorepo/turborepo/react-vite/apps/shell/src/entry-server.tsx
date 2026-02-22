import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import './global.css';

/**
 * @param {string} _url
 */
export function render(req: any, _url: string) {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html }
}