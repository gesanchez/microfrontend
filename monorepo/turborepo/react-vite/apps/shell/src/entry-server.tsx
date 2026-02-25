import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { 
  createStaticHandler, 
  createStaticRouter, 
  StaticRouterProvider 
} from 'react-router'
import { routes } from './components/Router'
import { ConfigProvider, MfeConfig } from './context/ConfigContext'
import './global.css';

export async function render(_req: any, _url: string, mfes: MfeConfig[]) {
  const { query } = createStaticHandler(routes);
  
  const url = new URL(_req.originalUrl || _req.url, `http://${_req.headers.host || 'localhost'}`);
  const request = new Request(url.href, {
    method: _req.method,
    headers: _req.headers,
  });

  const context = await query(request);

  if (context instanceof Response) {
    return { html: null };
  }

  const router = createStaticRouter(routes, context);

  const html = renderToString(
    <StrictMode>
      <ConfigProvider config={{ mfes }}>
        <StaticRouterProvider router={router} context={context} />
      </ConfigProvider>
    </StrictMode>,
  )
  return { html }
}