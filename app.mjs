// Import the 'http' and 'fs' modules
import { createServer } from 'http';
import { readFile, writeFile } from 'fs';


const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
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
            });
    }else if (req.method === 'POST' && req.url === '/') {
        let body = '';
      
        req.on('data', (chunk) => {
          body += chunk;
        });
      
        req.on('end', () => {
          try {
            // Parse the incoming JSON data
            const newData = JSON.parse(body);
      
            // Read the existing JSON file
            readFile('data.json', 'utf8', (readError, existingData) => {
              if (readError) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
              } else {
                // Merge the existing data with the new data
                const mergedData = { ...JSON.parse(existingData), ...newData };
      
                // Write the merged data back to the JSON file
                writeFile('data.json', JSON.stringify(mergedData), (writeError) => {
                  if (writeError) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                  } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'JSON data updated successfully' }));
                  }
                });
              }
            });
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON data' }));
          }
        });
      }
       
});    

const port = 3000;
// Start the server and listen on port 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

