var createEntry = require('./calculator-create').createEntry
var fs = require('fs')
var http = require('http')
var mapItem = require('..').mapItem
var url = require('url')

function calculate (input) {
  return new Promise(function (resolve, reject) {
    var options = url.parse('http://localhost:8080/')

    options.method = 'POST'

    var req = http.request(options, function (res) {
      var result = ''

      res.on('data', function (chunk) {
        result += chunk.toString()
      })

      res.on('end', function () {
        resolve(JSON.parse(result))
      })
    })

    req.on('error', function (err) {
      reject(err)
    })

    req.end(JSON.stringify(input))
  })
}

var mapping = JSON.parse(fs.readFileSync('calculator.mapping.json').toString())

function next () {
  var entry = mapItem(mapping, createEntry(10))

  calculate(entry.data.input).then(function (result) {
    console.log(entry.label)
    console.log(result['output:result'])

    next()
  })
}

next()
