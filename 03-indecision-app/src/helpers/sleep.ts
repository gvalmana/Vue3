export const sleep = (ms: number = 1) => {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
};
