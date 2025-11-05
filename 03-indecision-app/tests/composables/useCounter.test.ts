import { useCounter } from '@/composables/useCounter';
import { test, expect, describe } from 'vitest';

describe('useCounter', () => {
  test('it should initilice counter with provided default value', () => {
    const { counter, squareCounter } = useCounter();
    expect(counter.value).toBe(5);
    expect(squareCounter.value).toBe(25);
  });
  test('it should initilice counter with provided initial value', () => {
    const initialValue = 10;
    const { counter, squareCounter } = useCounter(initialValue);
    expect(counter.value).toBe(initialValue);
    expect(squareCounter.value).toBe(initialValue * initialValue);
  });

  test('it should increment counter correctly', async () => {
    const initialValue = 6;
    const { counter, squareCounter } = useCounter(initialValue);
    counter.value++;
    expect(counter.value).toBe(initialValue + 1);
    expect(squareCounter.value).toBe((initialValue + 1) * (initialValue + 1));
  });
  test('it should decrement counter correctly', async () => {
    const initialValue = 6;
    const { counter, squareCounter } = useCounter(initialValue);
    counter.value--;
    expect(counter.value).toBe(initialValue - 1);
    expect(squareCounter.value).toBe((initialValue - 1) * (initialValue - 1));
  });
});
