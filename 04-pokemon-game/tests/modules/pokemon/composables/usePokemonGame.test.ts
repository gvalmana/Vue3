import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from "../utils/with-setup";
import { GameStatus } from "@/modules/pokemon/interfaces";
import { flushPromises } from "@vue/test-utils";
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";
import MockAdapter from "axios-mock-adapter";
import { pokemonListFake } from "../../../data/fake-pokemons";
import confetti from 'canvas-confetti';

const mockPokemonsApi = new MockAdapter(pokemonApi);

mockPokemonsApi.onGet('/?limit=151').reply(200,{results: pokemonListFake});

vi.mock('canvas-confetti', () => ({
    default: {
        confetti: vi.fn(),
    },
}));

describe('usePokemonGame', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    test('should initialize with the correct default values', async () => {
        const [result, app ]= await withSetup(usePokemonGame);
        expect(result.gameStatus.value).toBe(GameStatus.Playing);
        expect(result.isLoading.value).toBeTruthy();
        expect(result.pokemonOptions.value).toEqual([]);
        expect(result.randomPokemon.value).toBeUndefined();

        await flushPromises();

        expect(result.isLoading.value).toBeFalsy();
        expect(result.pokemonOptions.value.length).toBe(4);
        expect(result.randomPokemon.value).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
        });
    });

    test('should correctly handle getNextRound and return different pokemon', async () => {
        const [ result ]= await withSetup(usePokemonGame);
        await flushPromises();

        result.gameStatus.value = GameStatus.Won;

        // Estímulo
        result.getNextRound(5);
        expect(result.gameStatus.value).toBe(GameStatus.Playing);
        expect(result.pokemonOptions.value).toHaveLength(5);

    });

    test('should correctly handle getNextRound', async () => {
        const [ result ]= await withSetup(usePokemonGame);
        await flushPromises();
        const firstOptions = result.pokemonOptions.value.map(p => p.name);
        result.getNextRound();
        const secondOptions = result.pokemonOptions.value.map(p => p.name);
        secondOptions.forEach(pokemon => {
            expect(firstOptions).not.toContain(pokemon);
        })
        expect(secondOptions).not.toEqual(firstOptions);
    });

    test('should correctly handle an incorrect answer checkAnswer', async () => {
        const [ result ]= await withSetup(usePokemonGame);
        await flushPromises();
        const { checkAnswer, gameStatus } = result;
        expect(gameStatus.value).toBe(GameStatus.Playing);
        checkAnswer(10000000); // Pokemon that does not exist
        expect(gameStatus.value).toBe(GameStatus.Lost);
    });

    test('should correctly handle a correct answer checkAnswer', async () => {
        const [ result ]= await withSetup(usePokemonGame);
        await flushPromises();
        const { checkAnswer, gameStatus, randomPokemon } = result;
        expect(gameStatus.value).toBe(GameStatus.Playing);
        checkAnswer(randomPokemon.value?.id ?? 0);
        expect(confetti).toHaveBeenCalledWith(expect.objectContaining({
            particleCount: 300,
            spread: 150,
            origin: { y: 0.6 },
        }));
        expect(gameStatus.value).toBe(GameStatus.Won);
    });
});