import { createServer } from 'http';
import { readFile } from 'fs';

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form
    readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
   } else if (req.method === 'POST' && req.url === '/submit') {
    // Handle form submission
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const name = formData.get('name');
      const email = formData.get('email');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Thank you, ${name}, for submitting your email address: ${email}`);
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

