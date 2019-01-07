import test from 'ava';
import {stripQueryIndicator} from '..';

test('remove first char if `?`, `#` or `&`', t => {
  t.is(stripQueryIndicator('?test=test'), 'test=test');
  t.is(stripQueryIndicator('#test=test'), 'test=test');
  t.is(stripQueryIndicator('&test=test'), 'test=test');
  t.is(stripQueryIndicator('test=test'), 'test=test');
});
