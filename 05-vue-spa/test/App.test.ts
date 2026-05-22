import { mount, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import router from '../src/router/index'
import { expect } from 'vitest';

describe('App', () => {
  it('should be render correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
      },
    });
    console.log(wrapper.html());
    const routerView = wrapper.findComponent({name: 'RouterView'});
    expect(routerView.exists()).toBeTruthy();
  })
})
