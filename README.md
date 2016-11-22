# nn-mapping

nn-mapping maps the given JSON objects to JSON structure which are more suitable for neural network processing.
Neural networks need float values as input and output. 
nn-mapping maps deep structures and non numeric values n dimensional float arrays and key value pairs.
Key value pairs are used as abstraction layer for the model. 
The mapping is done based on a JSON mapping definition.

## Usage

### Command line 

The module installs the `nn-mapping` command line tool in the npm path.
The following arguments are required to run the tool:

    nn-mapping --mapping <mappingDefinition> <inputFile> > <outputFile>

- `mappingDefinition`: Path to the file that contains the JSON mapping definition.
- `inputFile`: The JSON input. `stdin` is used if this arguments is not given.
- `outputFile`: The mapped JSON is written to `stdout`.

### API

The module exports the following functions:

- `mapItem(mapping, object)`: Maps the given object and returns the mapped object.
- `mapArray(mapping, objects)`: Maps an array of objects and returns an array of the mapped objects.
- `mapStringStream(mapping, stream)`: Parses the given JSON string stream and maps each object of the array.  

### Mapping definition

The mapping definition is JSON object.
It starts with an object mapping.

#### Object mapping

- `map`: An array of property mappings.
- `loop` An array of array mappings.

#### Property mapping

- `group`: The output group the value will be assigned to.
- `property`: The property that will be used as source for the mapping.
- `mapping`: The value mapping.

#### Value mapping

- `neuron`: The name of the neuron the value will be assigned to.
- `equals`: The mapping will be only processed if value is equals to the value of `equals`.
- `value`: A hard coded value. Useful conditional mappings.

#### Array mapping

- `group`: The output group for the array
- `property`: The property that contains the array.
- `map`: An array of property mappings.
- `loop` An array of array mappings.

## Example: Calculator

The examples folder contains a simple calcualtor example, which generates datasets sequences of numbers and +-* operations.
The `calculator.sh` script prepares two training datasets with different sequence lengths and a test dataset.
It also does the mapping.
To run the examples switch to the example folder and run:

    ./calculator.sh

[Keras Gaia](https://github.com/bergos/keras_gaia) is able to process the dataset.
It also contains prepared example projects for the nn-mapping calculator example.
