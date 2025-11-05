export function sum(a: number, b: number): number {
  return a + b;
}

export function sumArray(array: number[]): number {
  if (array.some((item) => typeof item !== 'number')) {
    throw new Error('The array must contain only numbers');
  }
  return array.reduce((acc, curr) => acc + curr, 0);
}
