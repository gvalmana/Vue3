import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));
  const addProject = (name: string) => {
    if (name.length === 0) return;
    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: [],
    });
  };
  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;
    const projectToAtachTask = projects.value.find((p) => p.id === projectId);
    if (!projectToAtachTask) return;
    projectToAtachTask.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };
  const toggleTaskToComplete = (projectId: string, taskId: string) => {
    const projectToToggleTask = projects.value.find((p) => p.id === projectId);
    if (!projectToToggleTask) return;
    const taskToToggle = projectToToggleTask.tasks.find((t) => t.id === taskId);
    if (!taskToToggle) return;
    taskToToggle.completedAt = taskToToggle.completedAt ? null : new Date();
  };
  return {
    // Properties
    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const totalTasks = project.tasks.length;
        const completedTaskCount = project.tasks.filter((t) => t.completedAt).length;
        const completionPercentage = totalTasks === 0 ? 0 : (completedTaskCount / totalTasks) * 100;
        return {
          id: project.id,
          name: project.name,
          taskCount: totalTasks,
          completionPercentage: Math.round(completionPercentage),
        };
      });
    }),
    // Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    // Actions
    addProject,
    addTaskToProject,
    toggleTaskToComplete,
  };
});
