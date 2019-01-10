(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.lib = {}));
}(this, function (exports) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var decodeUriComponent = require('decode-uri-component');

  function _stripFirstChar(chars, string) {
    var charGroupMatch = new RegExp("^[".concat(chars, "]"));
    return string.trim().replace(charGroupMatch, '');
  }

  function _stripQueryIndicator(string) {
    return _stripFirstChar('?#&', string);
  }

  function _keyValueToObj(keyValueString, obj) {
    var _keyValueString$split = keyValueString.split('='),
        _keyValueString$split2 = _slicedToArray(_keyValueString$split, 2),
        key = _keyValueString$split2[0],
        value = _keyValueString$split2[1];

    var decodedKey = decodeUriComponent(key);
    var decodedValue = decodeUriComponent(value);
    var emptyObj = obj || Object.create(null); // If key isn't already set, set it's value

    if (!(decodedKey in emptyObj)) {
      emptyObj[decodedKey] = decodedValue; // If key is an array add value to tail
    } else if (Array.isArray(emptyObj[decodedKey])) {
      emptyObj[decodedKey] = [].concat(_toConsumableArray(emptyObj[decodedKey]), [decodedValue]); // Otherwise create an array
    } else {
      emptyObj[decodedKey] = [emptyObj[decodedKey], decodedValue];
    }

    return emptyObj;
  }

  function parse(input) {
    var resultObj = Object.create(null);

    if (!input) {
      return resultObj;
    }

    var strippedInput = _stripQueryIndicator(input);

    return strippedInput.split('&').reduce(function (accu, curr) {
      return _keyValueToObj(curr, accu);
    }, resultObj);
  }

  exports._stripQueryIndicator = _stripQueryIndicator;
  exports.parse = parse;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
