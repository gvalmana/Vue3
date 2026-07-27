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
          v-for="(project, index) in projectStore.projectList"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.task.length }}</td>
          <td><progress class="progress progress-primary w-56" value="1" max="100"></progress></td>
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
  <custom-modal :open="customModalOpen">
    <template #header>
      <h3 class="font-bold text-lg">Ingrese el nombre del proyecto</h3>
      <p class="py-4">Dale un nombre único a tu proyecto</p>
    </template>
    <template #body>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore optio, atque quod placeat
        soluta alias in velit quisquam mollitia facere fugiat cumque corrupti non, explicabo earum
        quo quaerat numquam possimus.
      </p></template
    >
    <template #actions>
      <div class="flex justify-end mt-5">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn mr-4">Aceptar</button>
      </div>
    </template>
  </custom-modal>
  <fab-button @click="modalOpen = true">
    <add-circle />
  </fab-button>
  <fab-button @click="customModalOpen = true" position="bottom-left">
    <modal-icon />
  </fab-button>
</template>
<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/projects.store';

const projectStore = useProjectsStore();
const modalOpen = ref(false);
const customModalOpen = ref(false);
</script>
