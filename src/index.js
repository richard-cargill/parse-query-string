function _stripFirstChar(chars, string) {
  const charGroupMatch = new RegExp(`^[${chars}]`);
  return string.trim().replace(charGroupMatch, '');
}

function _stripQueryIndicator(string) {
  return _stripFirstChar('?#&', string);
}

function _keyValueToObj(keyValueString, obj) {
  const [key, value] = keyValueString.split('=');

  const emptyObj = obj || Object.create(null);

  // If key isn't already set, set it's value
  if (!(key in emptyObj)) {
    emptyObj[key] = value;
  // If key is an array add value to tail
  } else if (Array.isArray(emptyObj[key])) {
    emptyObj[key] = [...emptyObj[key], value];
  // Otherwise create an array
  } else {
    emptyObj[key] = [emptyObj[key], value];
  }

  return emptyObj;
}

function parse(input) {
  const strippedInput = _stripQueryIndicator(input);

  return strippedInput
    .split('&')
    .reduce((accu, curr) =>
      _keyValueToObj(curr, accu), Object.create(null));
}

export {
  _stripQueryIndicator,
  parse
};
