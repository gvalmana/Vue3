import PokemonPages from '@/modules/pokemons/pages/PokemonPage.vue'
import router from '@/router/index'
import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('<PokemonPages />', () => {
  const wrapper = mount(PokemonPages, {
    props: {
      id: 25,
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [router],
    },
  })
  it('should render the component correctly', () => {
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
    )
  })
  it('should redirect to the next pokemon', async () => {
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props().to).toEqual({ name: 'pokemon', params: { id: 26 } })
  })
})
