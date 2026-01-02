<template>
  <section
    v-if="isLoading || randomPokemon?.id === undefined"
    class="flex flex-col items-center justify-center h-screen w-screen"
  >
    <h1 class="text-3xl">Espere por favor...</h1>
    <h3 class="animate-pulse">Cargando pokemons...</h3>
  </section>
  <section v-else class="flex flex-col items-center justify-center h-screen w-screen">
    <h1 class="m-5">Quién es ese Pokémon?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Próxima ronda
      </button>
    </div>
    <!-- Pokemin Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      @selected-option="checkAnswer"
      :correct-answer="randomPokemon.id"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  isLoading,
  randomPokemon,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();
</script>
