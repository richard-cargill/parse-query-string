const decodeUriComponent = require('decode-uri-component');

function _stripFirstChar(chars, string) {
  const charGroupMatch = new RegExp(`^[${chars}]`);
  return string.trim().replace(charGroupMatch, '');
}

function _stripQueryIndicator(string) {
  return _stripFirstChar('?#&', string);
}

function _keyValueToObj(keyValueString, obj) {
  const [key, value] = keyValueString.split('=');
  const decodedKey = decodeUriComponent(key);
  const decodedValue = decodeUriComponent(value);

  const emptyObj = obj || Object.create(null);

  // If key isn't already set, set it's value
  if (!(decodedKey in emptyObj)) {
    emptyObj[decodedKey] = decodedValue;
  // If key is an array add value to tail
  } else if (Array.isArray(emptyObj[decodedKey])) {
    emptyObj[decodedKey] = [...emptyObj[decodedKey], decodedValue];
  // Otherwise create an array
  } else {
    emptyObj[decodedKey] = [emptyObj[decodedKey], decodedValue];
  }

  return emptyObj;
}

function parse(input) {
  const resultObj = Object.create(null);

  if (!input) {
    return resultObj;
  }

  const strippedInput = _stripQueryIndicator(input);

  return strippedInput
    .split('&')
    .reduce((accu, curr) =>
      _keyValueToObj(curr, accu), resultObj);
}

export {
  _stripQueryIndicator,
  parse
};
