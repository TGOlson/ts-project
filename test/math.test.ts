import { add, sum } from '../src/math';

describe('math', () => {
  describe('add', () => {
    test('adds two numbers', () => {
      expect(add(1, 2)).toBe(3);
    });
  });
  describe('sum', () => {
    test('sums a list of numbers', () => {
      expect(sum([1, 2, 5, 10])).toBe(18);
    });
    test('works with an empty list', () => {
      expect(sum([])).toBe(0);
    });
  });
});
