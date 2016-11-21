#!/usr/bin/env node

var fileStreamOrStream = require('../lib/filestream-or-stream')
var fs = require('fs')
var mapStringStream = require('..').mapStringStream
var program = require('commander')

function processMapping () {
  process.stderr.write('map to neural network ready data\n')

  var mapping = JSON.parse(fs.readFileSync(program.mapping))
  var outputStream = mapStringStream(mapping, fileStreamOrStream(program.args.shift(), process.stdin))

  outputStream.on('error', function (err) {
    process.stderr.write('error: ' + (err.stack || err.message) + '\n')
  })

  outputStream.pipe(process.stdout)
}

program
  .usage('[options] <file>')
  .option('-v, --verbose', 'verbose output')
  .option('-m, --mapping <file>', 'mapping file')

program.parse(process.argv)

processMapping()
