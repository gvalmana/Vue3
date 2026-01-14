import { describe, expect, test } from "vitest";
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from "../utils/with-setup";
import { GameStatus } from "@/modules/pokemon/interfaces";
import { flushPromises } from "@vue/test-utils";

describe('usePokemonGame', () => {
    test('should initialize with the correct default values', async () => {
        const [result, app ]= await withSetup<ReturnType<typeof usePokemonGame>>(usePokemonGame);
        expect(result.gameStatus.value).toBe(GameStatus.Playing);
        expect(result.isLoading.value).toBeTruthy();
        expect(result.pokemonOptions.value).toEqual([]);
        expect(result.randomPokemon.value).toBeUndefined();
        
        await new Promise(r=> setTimeout(r, 1000));
        await flushPromises();
        expect(result.isLoading.value).toBeFalsy();
        expect(result.pokemonOptions.value.length).toBe(4);
        expect(result.randomPokemon.value).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
        });
    });
});