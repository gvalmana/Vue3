<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-grey-500 mx-4">No hay proyectos</p>
    <ul v-else class="menu rounded-box w-56">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.task.length > 0">
          <details>
            <summary>
              <RouterLink :to="`/projects/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.task" :key="task.id">
                <RouterLink :to="`/projects/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <template>
          <li>
            <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
          </li>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { useProjectsStore } from '../store/projects.store';

const projectsStore = useProjectsStore();
</script>
