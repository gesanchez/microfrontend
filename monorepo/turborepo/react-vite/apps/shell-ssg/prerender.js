import fs from 'node:fs/promises'
import path from 'node:path'

async function prerender() {
  try {
    // 1. Read the production client template
    const templatePath = path.resolve('dist/client/index.html')
    let templateHtml;
    try {
      templateHtml = await fs.readFile(templatePath, 'utf-8')
    } catch (e) {
      console.error('Could not find dist/client/index.html. Did you run build:client first?')
      process.exit(1)
    }

    // 2. Load the SSR build of the App
    const { render } = await import('./dist/server/entry-server.js')
    
    // 3. Fetch configuration for the layout
    let config = [];
    try {
      const response = await fetch('http://localhost:5005/api/config/mfes');
      if (response.ok) {
        config = await response.json();
      }
    } catch (e) {
      console.warn('⚠️  Failed to fetch MFE config during SSG:', e.message);
      console.warn('⚠️  Using default local fallback configuration...');
      config = [
        {
          name: "dashboard",
          module: "./Dashboard",
          url: "http://localhost:5001/assets/remoteEntry.js",
          template: "main",
          route: "/dashboard",
          icon: "LayoutDashboard",
          label: "Dashboard"
        },
        {
          name: "account",
          module: "./Account",
          url: "http://localhost:5002/assets/remoteEntry.js",
          template: "main",
          route: "/dashboard/account",
          icon: "UserCircle",
          label: "Manage Account"
        }
      ];
    }

    // 4. Render to HTML string for each route
    const routesToPrerender = ['/', '/dashboard', '/dashboard/account'];
    config.forEach(mfe => {
      if (mfe.route && !routesToPrerender.includes(mfe.route)) {
        routesToPrerender.push(mfe.route);
      }
    });

    for (const url of routesToPrerender) {
      const req = { 
        originalUrl: url,
        method: 'GET',
        headers: { host: 'localhost' }
      }
      const rendered = await render(req, url, config)

      // 5. Inject HTML into the template holes
      const html = templateHtml
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '')
        .replace(`<!--app-config-->`, `<script>window.__CONFIG__ = ${JSON.stringify(config)}</script>`)

      // 6. Save the fully baked HTML statically to route paths
      const filePath = url === '/' 
        ? 'dist/client/index.html' 
        : `dist/client${url}/index.html`;
        
      const dir = path.dirname(path.resolve(filePath));
      await fs.mkdir(dir, { recursive: true });
      
      await fs.writeFile(path.resolve(filePath), html, 'utf-8')
      console.log(`Successfully prerendered ${url} to ${filePath}`)
    }
  } catch(e) {
    console.error('SSG build failed:', e)
    process.exit(1)
  }
}

prerender();
