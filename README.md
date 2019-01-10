# Parse query string

Small lib for parsing query strings into objects. 

[![Build Status](https://travis-ci.com/richard-cargill/parse-query-string.svg?branch=master)](https://travis-ci.com/richard-cargill/parse-query-string)

## Install

``` 
$ npm install git+https://git@github.com/richard-cargill/parse-query-string.git 
```

## Usage
```js
const {parse} = require('parse-query-string');

const parsedFromString = parse('?key=value');
// {key: 'value'}

// https://example.com?key=value
const parsedFromSearch = parse(location.search);
// {key: 'value'}

const parsedWithSameKeys = parse('?key=value 1&key=value 2&key=value 3');
// {key: ['value 1', 'value 2', 'value 3']}
```

The only method currently available is parse. Keys and values are automatically decoded.

## License

[MIT](LICENSE).
