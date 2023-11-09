// Import the 'http' and 'fs' modules
import { createServer } from 'http';
import { readFile } from 'fs';

// Create an HTTP server using the createServer function
const server = createServer((req, res) => {
  // Check if the HTTP method is GET and the URL is the root ("/")
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form

    // Read the content of 'index.html' from the file system
    readFile('index.html', 'utf8', (eror, data) => {
      if (eror) {
        // If there's an error reading the file, respond with an Internal Server Error (HTTP 500)
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      // If the file is successfully read, respond with a 200 status code and the HTML content
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } 
  // Check if the HTTP method is POST and the URL is '/submit'
  else if (req.method === 'POST' && req.url === '/submit') {
    // Handle form submission

    // Initialize an empty string to store the request body
    let reqBody = '';
    req.on('data', (data) => {
      // Append request data to the 'body' variable as it arrives
      reqBody += data;
    });
    req.on('end', () => {
      // When the request body is fully received, parse it as form data
      const formData = new URLSearchParams(reqBody);
      const name = formData.get('name');
      const email = formData.get('email');
      const role = formData.get('role')
      // Respond with a 200 status code and a thank you message
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Thank you, ${name}, for submitting your email address: ${email}, as a QA Engineer`);
    });
  } 
  // If the request does not match any of the above conditions, respond with a 404 status code
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
// Start the server and listen on port 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
