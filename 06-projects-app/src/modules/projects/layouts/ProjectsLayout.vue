<template>
  <div class="flex flex-col">
    <top-menu />
    <main class="flex flex-row">
      <side-menu />
      <router-view />
    </main>
  </div>
</template>
<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { RouterView } from 'vue-router';
</script>
