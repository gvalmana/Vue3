import { test, describe, vi, type Mock, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import PokemonGame from '@pokemon/pages/PokemonGame.vue';
import { GameStatus } from "@/modules/pokemon/interfaces/game-status.enum";
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn(),
}));

const pokemonOptions = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Charmander' },
    { id: 3, name: 'Squirtle' },
    { id: 4, name: 'Pikachu' },
];

describe('<PokemonGame />', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    test('should initialize with the correct default values', () => {
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: true,
            pokemonOptions: [],
            randomPokemon: undefined,
            getNextRound: vi.fn(),
            checkAnswer: vi.fn(),
        });
        const wrapper = mount(PokemonGame);
        expect(wrapper.get('h1').text()).toBe('Espere por favor');
        expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);
        expect(wrapper.get('h3').text()).toBe('Cargando pokemons...');
        expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
    });
    test('should render <PokemonPicture /> and <PokemonOptions />', () => {
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: false,
            pokemonOptions: pokemonOptions,
            randomPokemon: pokemonOptions.at(0),
            getNextRound: vi.fn(),
            checkAnswer: vi.fn(),
        });
        const wrapper = mount(PokemonGame);
        const pokemons = pokemonOptions.map(p => p.name);
        const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
        expect(wrapper.find('img').attributes('src')).toBe(imageUrl);
        const optionButtons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');
        expect(optionButtons.length).toBe(pokemonOptions.length);
        optionButtons.forEach((button, index) => {
            expect(pokemons).toContain(button.text());
        });
    });

    test('should render button for a new game', () => {
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Won,
            isLoading: false,
            pokemonOptions: pokemonOptions,
            randomPokemon: pokemonOptions.at(0),
            getNextRound: vi.fn(),
            checkAnswer: vi.fn(),
        });
        const wrapper = mount(PokemonGame);
        const newGameButton = wrapper.find('[data-testid="new-game-button"]');
        expect(newGameButton.text()).toBe('Jugar de nuevo?');
    });

    test('should call getNextRound when new game button is clicked', async () => {
        const getNextRoundSpy = vi.fn();
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Won,
            isLoading: false,
            pokemonOptions: pokemonOptions,
            randomPokemon: pokemonOptions.at(0),
            getNextRound: getNextRoundSpy,
            checkAnswer: vi.fn(),
        });
        const wrapper = mount(PokemonGame);
        const newGameButton = wrapper.find('[data-testid="new-game-button"]');
        await newGameButton.trigger('click');
        expect(getNextRoundSpy).toHaveBeenCalled();
        expect(getNextRoundSpy).toHaveBeenCalledWith(4);
        expect(getNextRoundSpy).toHaveBeenCalledOnce();
    });
});