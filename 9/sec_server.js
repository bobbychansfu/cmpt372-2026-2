import { createServer } from 'https';
import { readFileSync } from 'fs';

const options = {
  key: readFileSync('./encrypt/key.pem'), // the private key
  cert: readFileSync('./encrypt/cert.pem'),

};

createServer(options, function(req, res){
  res.writeHead(200);
  res.end("hello world\n");
}).listen(443);
