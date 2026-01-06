import { expect, test, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonPicture from '../../../../src/modules/pokemon/components/PokemonPicture.vue';

describe('<PokemonPicture />', () => {
  const pokemonId = 25;
  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
  test('should render the hiddend imagen when showPokemon prop is false', async () => {
    const wrapper = mount(PokemonPicture, { props: { pokemonId, showPokemon: false } });
    const image = wrapper.find('img');
    const imagesAttributes = image.attributes();
    expect(image.exists()).toBe(true);
    expect(imagesAttributes).toEqual(expect.objectContaining({
      class: 'brightness-0 h-[200px]',
      src: pokemonImage,
    }));
  });

  test('should render the pokemon imagen when showPokemon prop is true', async () => {
    const wrapper = mount(PokemonPicture, { props: { pokemonId, showPokemon: true } });
    const image = wrapper.find('img');
    const imagesAttributes = image.attributes();
    expect(image.exists()).toBe(true);
    expect(imagesAttributes).toEqual(expect.objectContaining({
        alt: 'Pokemon image',
        class: 'fade-in h-[200px]',
        src: pokemonImage,
      }));
  });
});
