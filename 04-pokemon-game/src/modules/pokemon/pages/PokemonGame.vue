<template>
  <section v-if="false" class="flex flex-col items-center justify-center h-screen w-screen">
    <h1 class="text-3xl">Espere por favor...</h1>
    <h3 class="animate-pulse">Cargando pokemons...</h3>
  </section>
  <section class="flex flex-col items-center justify-center h-screen w-screen">
    <h1 class="m-5">Quién es ese Pokémon?</h1>
    <!-- Pokemin Picture -->
    <PokemonPicture />
    <!-- Pokemon Options -->
    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { gameStatus } = usePokemonGame();
</script>