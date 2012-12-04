var http = require('http')
  , url = require('url')
  , static = require('node-static')

var file = new (static.Server)('./public')
  , port = 8080

http.createServer(function (request, response) {

  var match_root = /^\/$/.exec(request.url)
    , match_members = /^\/(members|about)\/(.*)/.exec(request.url)
    , match_class = /^\/(essential-nodejs-training-course|nodejs-consulting-subscriptions)/.exec(request.url)

  if (match_root) {
    request.url = "index.html"
  } else if (match_members) {
    request.url = "members/" + match_members[2].replace("+", "") + ".html"
  } else if (match_class) {
    request.url = match_class[1] + ".html"
  }

  request.url = request.url.toLowerCase()
  console.log(request.url)

  request.on('end', function () {
    file.serve(request, response)
  })

}).listen(port, function () { console.log("Listening on %d", port) })
