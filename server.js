const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const ALLOWED = new Set(['/index.html', '/robots.txt', '/sitemap.xml']);

http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  } catch {
    pathname = '/';
  }
  if (pathname === '/') pathname = '/index.html';

  // Everything unknown falls back to the landing page (single-page campaign site)
  const file = ALLOWED.has(pathname) ? pathname : '/index.html';
  const full = path.join(ROOT, file);

  fs.readFile(full, (err, buf) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Internal error');
    }
    res.writeHead(file === pathname ? 200 : (pathname === '/index.html' ? 200 : 404), {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    res.end(buf);
  });
}).listen(PORT, () => console.log(`zipline-landing listening on ${PORT}`));
