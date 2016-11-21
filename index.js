var last = require('lodash/last')
var JSONStream = require('JSONStream')

function processMapping (mapping, input, output) {
  var neuron = mapping.neuron

  if (Array.isArray(output)) {
    output = last(output)
  }

  if (mapping.equals) {
    if (mapping.equals === input) {
      output[neuron] = mapping.value
    }
  } else {
    output[neuron] = input
  }
}

function processLoop (loop, input, output) {
  loop.map(function (map) {
    output[map.group] = output[map.group] || []

    input[map.property].map(function (input) {
      output[map.group].push({})

      if (map.mapping) {
        map.mapping.forEach(function (mapping) {
          processMapping(mapping, input, last(output[map.group]))
        })
      }

      if (map.map) {
        processMaps(map.map, input, output)
      }
    })
  })
}

function processMap (map, input, output) {
  output[map.group] = output[map.group] || {}

  map.mapping.forEach(function (mapping) {
    processMapping(mapping, input[map.property], output[map.group])
  })
}

function processMaps (maps, input, output) {
  maps.forEach(function (map) {
    processMap(map, input, output)
  })
}

function mapItem (mappings, input) {
  var output = {}

  if (mappings.map) {
    processMaps(mappings.map, input, output)
  }

  if (mappings.loop) {
    processLoop(mappings.loop, input, output)
  }

  return {
    label: input.label,
    data: output
  }
}

function mapArray (mappings, input) {
  return input.map(function (input) {
    return mapItem(mappings, input)
  })
}

function mapStringStream (mappings, input) {
  var inputJson = JSONStream.parse('*')
  var output = JSONStream.stringify()

  inputJson.on('data', function (item) {
    output.write(mapItem(mappings, item))
  })

  inputJson.on('end', function () {
    output.end()
  })

  inputJson.on('error', function (error) {
    output.emit('error', error)
  })

  input.pipe(inputJson)

  return output
}

module.exports = {
  mapItem: mapItem,
  mapArray: mapArray,
  mapStringStream: mapStringStream
}
