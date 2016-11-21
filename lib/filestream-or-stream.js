var fs = require('fs')

function fileStreamOrStream (filename, stream, verbose) {
  if (filename) {
    if (verbose) {
      process.stderr.write('read from: ' + filename + '\n')
    }

    return fs.createReadStream(filename)
  } else {
    return stream
  }
}

module.exports = fileStreamOrStream
