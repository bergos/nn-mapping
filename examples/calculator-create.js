var availableOperators = ['plus', 'minus', 'multiply']

function round (n) {
  return Math.round(n * 100) / 100
}

function createEntry (sequenceLength) {
  var sequence = []
  var result = Math.random()
  var label = round(result).toString()

  sequence.push({
    operator: 'begin',
    number: result
  })

  for (var i = 0; i < sequenceLength; i++) {
    var operator = availableOperators[Math.floor(Math.random() * availableOperators.length)]
    var number = Math.random()

    sequence.push({
      operator: operator,
      number: number
    })

    if (operator === 'plus') {
      result += number
      label += ' + '
    } else if (operator === 'minus') {
      result -= number
      label += ' - '
    } else if (operator === 'multiply') {
      result *= number
      label += ' * '
    }

    label += round(number)
  }

  sequence.push({
    operator: 'end'
  })

  label += ' = ' + round(result)

  return {
    label: label,
    sequence: sequence,
    result: result
  }
}

function createEntries (numberOfEntries, maxSequenceLength) {
  var entries = []

  for (var i = 0; i < numberOfEntries; i++) {
    entries.push(createEntry(Math.ceil(Math.random() * maxSequenceLength)))
  }

  return entries
}

module.exports = {
  createEntry: createEntry,
  createEntries: createEntries
}
