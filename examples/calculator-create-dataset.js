#!/usr/bin/env node

var createEntries = require('./calculator-create').createEntries
var program = require('commander')

program
  .usage('[options]')
  .option('-n, --number-of-entries <numberOfEntries>', 'number of entries')
  .option('-m, --max-sequence-length <maxSequenceLength>', 'max length of generated sequences')

program.parse(process.argv)

process.stdout.end(JSON.stringify(createEntries(program.numberOfEntries, program.maxSequenceLength || 5), null, ' '))
