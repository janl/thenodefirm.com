#!/usr/bin/env node

var path = require('path'),
    http = require('http'),
    static = require('node-static');

var file = new(static.Server)('./public');

http.createServer(function (request, response) {

  if (request.url === '/') {
    request.url = 'index.html'
  }
  else if (path.extname(request.url) === '') {
    request.url += '.html';
  }
  
  request.addListener('end', function () {

    //
    // Serve files!
    //
    file.serve(request, response);
  });

}).listen(8080);

