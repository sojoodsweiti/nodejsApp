// Import the 'http' and 'fs' modules
import { createServer } from 'http';
import { readFile } from 'fs';

const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/get-json') {
        readFile('data.json', 'utf8', (error, data) => {
            if (error) {
                // If there's an error reading the file, respond with an Internal Server Error (HTTP 500)
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            else{
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
            })
    }


})   


const port = 3000;
// Start the server and listen on port 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

