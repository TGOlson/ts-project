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

    test('array matchers', () => {
      expect([[1, 2], [3, 4, 5], [6, 7, 8, 9]].map(sum)).toEqual([3, 12, 30]);
    })
  });
});
