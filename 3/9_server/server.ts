// how to build a server before express. 
// Much more work, but you can see how it works under the hood. 
// You can also do things like directory listing, which express doesn't do by default.

import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import qs from 'querystring';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log('request:', req.url);
  const urlObj = url.parse(req.url || '', true);
  console.log(urlObj.query.lname);

  // Handle directory listing
  if (req.method === 'GET') {
    const filepath = path.join(__dirname, urlObj.pathname as string);
    try {
      const stats = fs.statSync(filepath);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(filepath);
        let html = '<h1>Directory: ' + urlObj.pathname + '</h1><ul>';
        files.forEach((file) => {
          const fileUrl = path.join(urlObj.pathname as string, file);
          html += `<li><a href="${fileUrl}">${file}</a></li>`;
        });
        html += '</ul>';
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
        return;
      }
    } catch (e) {
      // not a directory, continue with file handling
    }
  }

  if (req.method === 'GET' && req.url?.match(/^\/.+\.html$/)) {
    const filepath = path.join(__dirname, req.url);

    fs.readFile(filepath, (err: NodeJS.ErrnoException | null, contents: Buffer) => {
      if (err) {
        res.writeHead(404);
        res.write('File not found');
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(contents);
        res.end();
      }
    });

  } else if (req.method === 'GET' && req.url?.match(/^\/.+\.jpg$/)) {
    const imgpath = path.join(__dirname, req.url);
    const imgstream = fs.createReadStream(imgpath, { highWaterMark: 1024 });
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    imgstream.pipe(res);

  } else if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', (data: Buffer) => {
      body += data.toString();
    });
    req.on('end', () => {
      const postObj = qs.parse(body);
      console.log(postObj);
      res.end();
    });
  } else {
    res.writeHead(404);
    res.write('404 Error');
    res.end();
  }
});

server.listen(8080);
console.log('Magic is happening on port 8080');
