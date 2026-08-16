import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { describe } from 'vitest';
import { fakeProjects } from '../../../mocks/projects.fake';
describe('useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });
  test('should return defaults value', () => {
    const {
      noProjects,
      addProject,
      addTaskToProject,
      toggleTaskToComplete,
      projectsWithCompletion,
      projectList,
    } = useProjectsStore();
    expect(noProjects).toBe(true);
    expect(projectsWithCompletion).toEqual([]);
    expect(projectList).toEqual([]);
    expect(addProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(toggleTaskToComplete).toBeInstanceOf(Function);
  });
  test('should add project - action', () => {
    const store = useProjectsStore();
    const newProjectName = 'New Project';
    store.addProject(newProjectName);
    expect(store.projectList.length).toBe(1);
    expect(store.projectList[0]).toEqual({
      id: expect.any(String),
      name: newProjectName,
      tasks: [],
    });
  });
  test('should load from localStore', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));
    const store = useProjectsStore();
    const [project1, project2] = store.projectList;
    expect(project1).toEqual({
      id: '1',
      name: 'Project 1',
      tasks: expect.any(Array),
    });
    expect(project2).toEqual({
      id: '2',
      name: 'Project 2',
      tasks: [],
    });
    expect(store.projectList.length).toBe(4);
  });
  test('should add to task to project - action', () => {
    const store = useProjectsStore();
    store.addProject('New Project');
    const project = store.projectList.at(0)!;
    const taskName = 'New Task';
    store.addTaskToProject(project.id, taskName);
    expect(project.tasks.length).toBe(1);
    expect(project.tasks.at(0)).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: undefined,
    });
  });
  test('should toggle task to complete - action', () => {
    const store = useProjectsStore();
    store.addProject('New Project');
    const project = store.projectList.at(0)!;
    const taskName = 'New Task';
    store.addTaskToProject(project.id, taskName);
    const task = project.tasks.at(0)!;
    expect(task).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: undefined,
    });
    expect(task.completedAt).toBeUndefined();
    store.toggleTaskToComplete(project.id, task.id);
    expect(task).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });
    expect(task.completedAt).toBeInstanceOf(Date);
  });
  test('should return the projects with completion - getter', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));
    const store = useProjectsStore();
    const projectsWithCompletion = store.projectsWithCompletion;
    expect(projectsWithCompletion).toEqual([
      {
        id: '1',
        name: 'Project 1',
        taskCount: 4,
        completionPercentage: 25,
      },
      {
        id: '2',
        name: 'Project 2',
        taskCount: 0,
        completionPercentage: 0,
      },
      {
        id: '3',
        name: 'Project 3',
        taskCount: 2,
        completionPercentage: 50,
      },
      {
        id: '4',
        name: 'Project 4',
        taskCount: 3,
        completionPercentage: 33,
      },
    ]);
  });
});
