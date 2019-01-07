import test from 'ava';
import {_stripQueryIndicator, parse} from '..';

test('remove first char if `?`, `#` or `&`', t => {
  t.is(_stripQueryIndicator('?test=test'), 'test=test');
  t.is(_stripQueryIndicator('#test=test'), 'test=test');
  t.is(_stripQueryIndicator('&test=test'), 'test=test');
  t.is(_stripQueryIndicator('test=test'), 'test=test');
});

test('parse query string with single param', t => {
  t.deepEqual(parse('?test=test'), {test: 'test'});
});

test('parse query string with multiple params', t => {
  t.deepEqual(parse('?test=test&anotherThing=pew pew&other=test'), {other: 'test', test: 'test', anotherThing: 'pew pew'});
});

test('parse query string with multiple params with the same key', t => {
  t.deepEqual(parse('?foo=test&foo=pew pew&foo=test'), {foo: ['test', 'pew pew', 'test']});
});
