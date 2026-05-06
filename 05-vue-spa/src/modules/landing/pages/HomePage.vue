<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Bienvenido a nuestro sitio web</h1>
    <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <p>Counter: {{ counter }}</p>
    <button
      @click="counter++"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4"
    >
      Increment +1
    </button>
  </div>
</template>

<script src="./HomePage.ts" lang="ts"></script>
