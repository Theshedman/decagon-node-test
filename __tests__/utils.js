const { normalizeAmount } = require('../src/utils');

describe('Convert string amounts to a number', () => {
  test('it works with the amount as a string', () => {
    expect(normalizeAmount('12345')).toBe(12345);
    expect(typeof normalizeAmount('12345')).toBe('number');
  });

  test('it works with a string amount with commas', () => {
    expect(normalizeAmount('1,213')).toBe(1213);
    expect(normalizeAmount('1234,')).toBe(1234);
    expect(normalizeAmount(',1234')).toBe(1234);
  });

  test('it works with a string amount with multiple commas', () => {
    expect(normalizeAmount('1,234,5')).toBe(12345);
    expect(normalizeAmount(',54321,')).toBe(54321);
  });

  test('it should work with a numeric value', () => {
    expect(normalizeAmount(12345)).toBe(12345);
  });

  test('it works with a decimal value', () => {
    expect(normalizeAmount('12456.78')).toBe(12456.78);
    expect(normalizeAmount('1,234.56')).toBe(1234.56);
    expect(normalizeAmount('1,2,3,4.56')).toBe(1234.56);
  });
});
