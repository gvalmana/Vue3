<template>
  <bread-cumbs :name="project?.name ?? 'No name'"></bread-cumbs>
</template>

<script setup lang="ts">
import BreadCumbs from '@/modules/common/components/BreadCumbs.vue';
import { useProjectsStore } from '../store/projects.store';
import { ref, watch } from 'vue';
import type { Project } from '../interfaces/project.interface';

interface Props {
  id: string;
}
const props = defineProps<Props>();
const projectStore = useProjectsStore();
const project = ref<Project | null>();

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id);
  },
  {
    immediate: true,
  },
);
</script>
