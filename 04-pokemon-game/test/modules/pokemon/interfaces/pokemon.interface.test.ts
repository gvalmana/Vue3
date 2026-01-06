import { describe, expect, test } from 'vitest';
import { Pokemon } from '../../../../src/modules/pokemon/interfaces/pokemon.interface';

describe('Pokemon Interface', () => {
  const pokemon: Pokemon = { id: 1, name: 'pikachu' };

  test('should have id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  test('should have name property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
