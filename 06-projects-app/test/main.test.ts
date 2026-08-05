vi.mock('@/router', () => ({
  default: 'router',
}));

vi.mock('pinia', async (importActual) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod: any = await importActual();
  return {
    ...mod,
    createPinia: () => 'pinia',
  };
});

describe('Main.ts', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vue = require('vue');
  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createAppMock = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy,
  });

  vue.createApp = createAppMock;

  it('should be configured with pinia and router', async () => {
    await import('@/main');
    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');
    console.log('useSpy calls:', useSpy.mock.calls);
    expect(useSpy).toHaveBeenCalledWith('router');
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
