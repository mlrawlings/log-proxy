var fs = require('fs')
var url = require('url')
var http = require('http')
var colors = require('colors')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer({})

const PORT = process.env.PORT || 5050

http.createServer((req, res) => {
    var parts = url.parse(req.url)
    var target = parts.protocol+'//'+parts.host
    var color = /^https/.test(parts.protocol) ? 'yellow' : 'green'
    var uri = colors[color].bold(parts.protocol+'//')+colors.bold(parts.host)+colors.grey(parts.path)
    console.log(uri)
    Object.keys(req.headers).forEach(headerName => {
        if(headerName == 'host') return
        console.log(colors.cyan(headerName)+colors.grey(':'), req.headers[headerName])
    })
    console.log('\n')
    proxy.web(req, res, { target }, (error) => {
        console.log(colors.red.bold('[ERROR]'), uri)
        console.log(error)
        console.log('\n')
    })
}).listen(PORT)