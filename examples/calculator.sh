#!/bin/bash

mkdir -p data

node calculator-create-dataset -n 20000 -m 10 > data/calculator-short.train.json
node ../bin/nn-mapping --mapping calculator.mapping.json data/calculator-short.train.json > data/calculator-short.train.data.json

node calculator-create-dataset -n 20000 -m 20 > data/calculator-long.train.json
node ../bin/nn-mapping --mapping calculator.mapping.json data/calculator-long.train.json > data/calculator-long.train.data.json

node calculator-create-dataset -n 20 -m 15 > data/calculator.test.json
node ../bin/nn-mapping --mapping calculator.mapping.json data/calculator.test.json > data/calculator.test.data.json
