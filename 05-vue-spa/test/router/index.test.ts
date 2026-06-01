import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '../../src/App.vue'
import router from '../../src/router/index'
import RouteLocationNormalized from 'vue-router';

describe('Router', () => {
  let wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  })
  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
  })
  it('should render HomePage when visiting /', async () => {
    await router.isReady()
    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web')
  })
  it('should render FeaturesPage when visiting /features', async () => {
    await router.replace('/features')
    await router.isReady()
    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom')
  })
  it('should render FeaturesPage when visiting /pricing', async () => {
    await router.replace('/pricing')
    await router.isReady()
    expect(wrapper.html()).toContain('Plans')
  })
  it('should render FeaturesPage when visiting /contact', async () => {
    await router.replace('/contact')
    await router.isReady()
    expect(wrapper.html()).toContain('Feedback')
  })
  it('should render LoginPage when visiting /pokemon/:id with no authentication', async () => {
    localStorage.clear();
    await router.replace('/pokemon/111515')
    await router.isReady()
    expect(wrapper.find('h1').text()).toContain('Login')
  })
  it('should render PokemonPage when visiting /pokemon/:id with authentication', async () => {
    const pokemonId = 11;
    localStorage.setItem('userId', 'ABC-123');
    await router.replace(`/pokemon/${pokemonId}`)
    await router.isReady()
    expect(wrapper.find('h1').text()).toContain(`Pokemon #${pokemonId}`)
    expect(wrapper.html()).toContain(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`)
  })
  it('should convert segment into number', async () => {
    
    const route: RouteLocationNormalized = {
      name: 'pokemon',
      path: '',
      params: { id: '2' },
      query: {},
      hash: '',
      fullPath: '/pokemon/2',
    }
    const pokemnRoute = router.getRoutes().find(route => route.name === 'pokemon');
    const { id } = pokemnRoute?.props.default(route);
    expect(pokemnRoute).toBeTruthy();
    expect(id).toBe(2);
  })
  it('should return default id if the segment is not a number', async () => {
    
    const route: RouteLocationNormalized = {
      name: 'pokemon',
      path: '',
      params: { id: '2abc' },
      query: {},
      hash: '',
      fullPath: '/pokemon/2',
    }
    const pokemnRoute = router.getRoutes().find(route => route.name === 'pokemon');
    const { id } = pokemnRoute?.props.default(route);
    expect(pokemnRoute).toBeTruthy();
    expect(id).toBe(1);
  })
})
