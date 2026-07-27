import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
const initialProjectsLoad = (): Project[] => {
  return [
    {
      id: uuidv4(),
      name: 'Project 1',
      task: [],
    },
    {
      id: uuidv4(),
      name: 'Project 2',
      task: [],
    },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(initialProjectsLoad());
  const addProject = (name: string) => {
    if (name.length === 0) return;
    projects.value.push({
      id: uuidv4(),
      name: name,
      task: [],
    });
  };
  return {
    // Properties
    // projects,
    // Getters
    projectList: computed(() => [...projects.value]),
    // Actions
    addProject,
  };
});
