#!/usr/bin/env node

var path = require('path'),
    http = require('http'),
    url = require('url'),
    static = require('node-static');

var file = new(static.Server)('.');

http.createServer(function (request, response) {
  
  var selected_file
    , match_root = /^\/$/.exec(request.url)
    , match_members = /^\/(members|about)\/(.*)/.exec(request.url)
    , match_class = /^\/(essential-nodejs-training-course)/.exec(request.url)
    ;
  
  if (match_root) {
    request.url = "index.html"
  } else if (match_members) {
    request.url = "members/" + match_members[2].replace("+", "") + ".html";
  } else if (match_class) {
    request.url = match_class[1] + ".html";
  }

  console.log(request.url);
  // if (request.url === '/') {
  //   request.url = 'index.html'
  // }
  // else if (path.extname(request.url) === '') {
  //   request.url += '.html';
  // }
  
  request.addListener('end', function () {

    //
    // Serve files!
    //
    file.serve(request, response);
  });

}).listen(8080);


console.log("8080");