let port = process.env.PORT || 3000,
  http = require('http'),
  fs = require('fs'),
  // html = fs.readFileSync(__dirname + '/../index2.html');

  log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
  };

let server = http.createServer(function(req, res) {
  console.log('in server');
  if (req.method === 'POST') {
    let body = '';

    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      if (req.url === '/') {
        log('Received message: ' + body);
      } else if ((req.url = '/scheduled')) {
        log(
          'Received task ' +
            req.headers['x-aws-sqsd-taskname'] +
            ' scheduled at ' +
            req.headers['x-aws-sqsd-scheduled-at']
        );
      }

      res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
      res.end();
    });
  } else {
    console.log('in else');
    res.writeHead(200);
    res.write('again another content');
    res.end();
  }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
