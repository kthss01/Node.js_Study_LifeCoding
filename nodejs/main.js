var http = require('http');
var fs = require('fs');
var url = require('url'); // fs
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

// var template = {
//   html: function(title, list, body, control) {
//     return `
//     <!doctype html>
//     <html>
//     <head>
//       <title>WEB1 - ${title}</title>
//       <meta charset="utf-8">
//     </head>
//     <body>
//       <h1><a href="/">WEB</a></h1>
//       ${list}
//       ${control}
//       ${body}
//     </body>
//     </html>
//     `;
//   },
//   list: function(filelist) {
//     var list = '<ul>';
//     var i = 0;
//     while (i < filelist.length) {
//       list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
//       i = i + 1;
//     }
//     list = list + '</ul>';
//
//     return list;
//   }
// };

// function templateHTML(title, list, body, control) {
//   return `
//   <!doctype html>
//   <html>
//   <head>
//     <title>WEB1 - ${title}</title>
//     <meta charset="utf-8">
//   </head>
//   <body>
//     <h1><a href="/">WEB</a></h1>
//     ${list}
//     ${control}
//     ${body}
//   </body>
//   </html>
//   `;
// }
//
// function templateList(filelist) {
//   var list = '<ul>';
//   var i = 0;
//   while (i < filelist.length) {
//     list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
//     i = i + 1;
//   }
//   list = list + '</ul>';
//
//   return list;
// }

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

        // var list = templateList(filelist);
        // var template = templateHTML(title, list,
        //   `<h2>${title}</h2>${description}`,
        //   `<a href="/create">create</a>`);

        var list = template.list(filelist);
        var html = template.html(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`);

        response.writeHead(200); // 웹서버가 응답할 때
        response.end(html);
      });
    } else {
      fs.readdir('./data', function(error, filelist) {
        // console.log(filelist);

        var filteredId = path.parse(queryData.id).base;

        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags: ['h1']
          });
          var list = template.list(filelist);
          var html = template.html(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a>
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`);

          response.writeHead(200); // 웹서버가 응답할 때
          response.end(html);
        });
      });
    }
  } else if (pathname === '/create_process') {
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
        response.writeHead(302, {
          Location: `/?id=${title}`
        }); // 302 리다이렉션
        response.end();
      });
    });
  } else if (pathname === '/create') {
    fs.readdir('./data', function(error, filelist) {
      var title = 'WEB - create';
      var list = template.list(filelist);
      var html = template.html(title, list, `
        <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
        </form>
      `, ``);

      response.writeHead(200); // 웹서버가 응답할 때
      response.end(html);
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function(error, filelist) {

      var filteredId = path.parse(queryData.id).base;

      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.html(title, list,
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
          </form>
          `,
          `<a href="/create">create</a>
           <a href="/update?id=${title}">update</a>`);

        response.writeHead(200); // 웹서버가 응답할 때
        response.end(html);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';

    request.on('data', function(data) {
      body = body + data;
    });

    request.on('end', function() {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;

      // console.log(post);

      fs.rename(`data/${id}`, `data/${title}`, function(err) {
        fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
          response.writeHead(302, {
            Location: `/?id=${title}`
          }); // 302 리다이렉션
          response.end();
        });
      });
    });
  } else if (pathname === '/delete_process') {
    var body = '';

    request.on('data', function(data) {
      body = body + data;
    });

    request.on('end', function() {
      var post = qs.parse(body);
      var id = post.id;

      var filteredId = path.parse(id).base;

      fs.unlink(`data/${filteredId}`, function(err) {
        response.writeHead(302, {
          Location: `/`
        }); // 302 리다이렉션
        response.end();
      });
    });
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
