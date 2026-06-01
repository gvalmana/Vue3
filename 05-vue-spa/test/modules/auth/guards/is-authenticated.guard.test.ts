import isAuthenticatedGuard from '../../../../src/modules/auth/guards/is-authenticated.guard'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('isAuthenticatedGuard', () => {
  const to: RouteLocationNormalized = {
    name: undefined,
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    meta: {},
    path: '/home-screen',
    params: {},
  }
  const from: RouteLocationNormalized = {
    name: undefined,
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    meta: {},
    path: '',
    params: {},

  }
  const next: NavigationGuardNext = vi.fn()
  beforeEach(() => {
    localStorage.clear();
  });
  it('should return true if the user is authenticated', async () => {
    await isAuthenticatedGuard(to, from, next);
    expect(next).toHaveBeenCalledWith({ name: 'login' });
  });
  it('should called localstorage.setItem with the lastPath', async () => {
    await isAuthenticatedGuard(to, from, next);
    const lastPath = localStorage.getItem('lastPath');
    expect(lastPath).toBe(to.path);
  });

  it('should block if not authenticated with spies', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    await isAuthenticatedGuard(to, from, next);
    expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
  });
  it('should pass if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123');
    await isAuthenticatedGuard(to, from, next);
    expect(next).toHaveBeenCalledWith();
  });
})
