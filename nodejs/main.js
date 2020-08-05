var http = require('http');
var fs = require('fs');
var url = require('url'); // fs

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  // console.log(queryData.id);

  // if (_url == '/') {
  //   // url = '/index.html';
  //   title = "Welcome";
  // }
  // if (_url == '/favicon.ico') {
  //   return response.writeHead(404);
  // }

  // response.writeHead(200);
  // console.log(__dirname + url);

  // console.log(url.parse(_url, true));
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
        response.writeHead(200); // 웹서버가 응답할 때
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
        var title = queryData.id;
        var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
        response.writeHead(200); // 웹서버가 응답할 때
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }

  // response.end(fs.readFileSync(__dirname + url)); // 파일을 읽어주는거
  // response.end(queryData.id);
  // response.end(template);
  // response.end('egoging : ' + url);
});
app.listen(3000);
