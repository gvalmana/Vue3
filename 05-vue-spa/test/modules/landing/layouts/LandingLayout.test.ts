import { mount, shallowMount } from '@vue/test-utils'
import router from '@/router/index'
import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue'
import { RouterView } from 'vue-router'
import { describe, expect, it } from 'vitest'

describe('<LandingLayout />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.find('header').exists()).toBeTruthy()
    expect(wrapper.find('main').exists()).toBeTruthy()
    expect(wrapper.find('footer').html()).toContain('Acme Corporation')
    expect(wrapper.find('footer').html()).toContain(
      `© ${new Date().getFullYear()} Acme Corporation. Derechos reservados`,
    )
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBeTruthy()
    expect(wrapper.findComponent(RouterView).exists()).toBeTruthy()
  })
})
