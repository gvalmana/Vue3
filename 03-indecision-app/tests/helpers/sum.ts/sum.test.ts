import { sum, sumArray } from '../../../src/helpers/sum';
import { test, expect, describe } from 'vitest';

describe('sum', () => {
  test('it should sum the numbers 1 and 2 and the result should be 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});

describe('sumArray', () => {
  test('it should sum the array [1, 2, 3] and the result should be 6', () => {
    const array = [1, 2, 3];
    const result = sumArray(array);
    expect(result).toBe(6);
  });

  test('it should return 0 if the array is empty', () => {
    const array = [];
    const result = sumArray(array);
    expect(result).toBe(0);
  });
});
