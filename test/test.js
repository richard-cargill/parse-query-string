import test from 'ava';
import {_stripQueryIndicator, parse} from '..';

test('remove first char if `?`, `#` or `&`', t => {
  t.is(_stripQueryIndicator('?test=test'), 'test=test');
  t.is(_stripQueryIndicator('#test=test'), 'test=test');
  t.is(_stripQueryIndicator('&test=test'), 'test=test');
  t.is(_stripQueryIndicator('test=test'), 'test=test');
});

test('If an empty string is parsed returns an empty `{}`', t => {
  t.deepEqual(parse(''), {});
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

test('parse a complex query string', t => {
  t.deepEqual(parse('?q=tree+-swing&l=commderiv&d=taken-20000101-20051231&ct=0&mt=all&adv=1'), {
    q: 'tree -swing',
    l: 'commderiv',
    d: 'taken-20000101-20051231',
    ct: '0',
    mt: 'all',
    adv: '1'
  });
});

test('parse nested urls', t => {
  t.deepEqual(parse('?u=http://www.google.co.uk'), {
    u: 'http://www.google.co.uk'
  });
});

test('parse complex encoded query string', t => {
  t.deepEqual(parse('?user=Mar%C3%ADa%20Rodr%C3%ADguez&awesome=true&awesomeness=64&ZOMG%2B%26%3D*(=*%5E%25*GMOZ'), {
    user: 'María Rodríguez',
    awesome: 'true',
    awesomeness: '64',
    'ZOMG+&=*(': '*^%*GMOZ'
  });
});
