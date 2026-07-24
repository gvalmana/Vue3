<template>
  <div class="flex flex-col">
    <top-menu />
    <main>
      <side-menu />
      <route-view />
    </main>
  </div>
</template>
<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
</script>
