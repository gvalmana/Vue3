<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avances</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectStore.projectsWithCompletion"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completionPercentage"
              max="100"
            ></progress>
            {{ project.completionPercentage }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectStore.addProject"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
    sub-title="Dale un nombre único a tu proyecto"
  />
  <fab-button @click="modalOpen = true">
    <add-circle />
  </fab-button>
</template>
<script setup lang="ts">
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/projects.store';

const projectStore = useProjectsStore();
const modalOpen = ref(false);
</script>
