import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { mount } from '@vue/test-utils';
import { describe } from 'vitest';
import { fakeProjects } from '../../../mocks/projects.fake';

vi.mock('view-router');
vi.mock('@/modules/projects/store/projects.store');

describe('<ProjectView />', () => {
  test('should render with a project', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: fakeProjects,
    });
    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });
    const tableRows = wrapper.findAll('tr.hover');
    console.log(tableRows);
    expect(tableRows.length).toBe(fakeProjects.at(0)?.tasks.length);
  });
});
