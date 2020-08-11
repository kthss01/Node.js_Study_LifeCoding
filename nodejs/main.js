var http = require('http');
var fs = require('fs');
var url = require('url'); // fs
var qs = require('querystring');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    i = i + 1;
  }
  list = list + '</ul>';

  return list;
}

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  // console.log(queryData.id);
  // console.log(pathname)

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
      fs.readdir('./data', function(error, filelist) {
        // console.log(filelist);

        var title = 'Welcome';
        var description = 'Hello, Node.js';

        // 참고
        // var list = `<ul>
        //   <li><a href="/?id=HTML">HTML</a></li>
        //   <li><a href="/?id=CSS">CSS</a></li>
        //   <li><a href="/?id=JavaScript">JavaScript</a></li>
        // </ul>`;

        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

        response.writeHead(200); // 웹서버가 응답할 때
        response.end(template);
      });
    } else {
      fs.readdir('./data', function(error, filelist) {
        // console.log(filelist);

        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

          response.writeHead(200); // 웹서버가 응답할 때
          response.end(template);
        });
      });
    }
  }
  else if(pathname === '/create_process') {
    var body = '';

    request.on('data', function(data) {
      body = body + data;
    });

    request.on('end', function() {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      // console.log(post);
      // console.log(post.title);

      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        response.writeHead(302, {Location: `/?id=${title}`}); // 302 리다이렉션
        response.end();
      });
    });
  }
  else if(pathname === '/create') {
    fs.readdir('./data', function(error, filelist) {
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
        <form action="http://localhost:3000/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
        </form>
      `);

      response.writeHead(200); // 웹서버가 응답할 때
      response.end(template);
    });
  }
  else {
    response.writeHead(404);
    response.end('Not found');
  }

  // response.end(fs.readFileSync(__dirname + url)); // 파일을 읽어주는거
  // response.end(queryData.id);
  // response.end(template);
  // response.end('egoging : ' + url);
});
app.listen(3000);
