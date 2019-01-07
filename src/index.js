function stripFirstChar(chars, string) {
  const charGroupMatch = new RegExp(`^[${chars}]`);
  return string.trim().replace(charGroupMatch, '');
}

function stripQueryIndicator(string) {
  return stripFirstChar('?#&', string);
}

function helloWorld() {
  return 'hello world';
}

export {stripQueryIndicator, helloWorld};
