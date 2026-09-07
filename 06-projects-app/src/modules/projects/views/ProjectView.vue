<template>
  <div class="w-full">
    <section class="m-2">
      <bread-cumbs :name="project?.name ?? 'No name'"></bread-cumbs>
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Fecha de completación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project?.tasks" :key="task.id" class="hover:bg-base-300">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectStore.toggleTaskToComplete(project?.id || '', task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>

            <tr>
              <th></th>
              <td>
                <input
                  v-if="project?.id"
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="newTask"
                  @keyup.enter="addTaskToProject"
                  @focusout="addTaskToProject"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BreadCumbs from '@/modules/common/components/BreadCumbs.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import type { Project } from '@/modules/projects/interfaces/project.interface';

interface Props {
  id: string;
}
const router = useRouter();
const props = defineProps<Props>();
const projectStore = useProjectsStore();
const project = ref<Project | null>();
const newTask = ref('');

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);
const addTaskToProject = () => {
  if (!project.value) return;
  projectStore.addTaskToProject(project.value?.id, newTask.value);
  newTask.value = '';
};
</script>
