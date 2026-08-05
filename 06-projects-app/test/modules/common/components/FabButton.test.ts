import FabButton from '@/modules/common/components/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('<FabButton />', () => {
  it('renders with default position', () => {
    const wrapper = shallowMount(FabButton);
    expect(wrapper.props().position).toBe('bottom-right');
    const buttonClasses = wrapper.find('button').classes();
    const classesToHave = ['btn', 'btn-circle', 'btn-secondary', 'p-1', 'fixed', 'bottom-right'];
    classesToHave.forEach((cls) => {
      expect(buttonClasses).toContain(cls);
    });
  });
  it('renders with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: { position: 'top-left' },
    });
    expect(wrapper.props().position).toBe('top-left');
    const button = wrapper.find('button');
    const buttonClasses = button.classes();
    expect(buttonClasses).toContain('top-left');
  });
  it('renders with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      props: { position: 'top-right' },
    });
    expect(wrapper.props().position).toBe('top-right');
    const button = wrapper.find('button');
    const buttonClasses = button.classes();
    expect(buttonClasses).toContain('top-right');
  });
  it('render with slot inside button', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Click me</span>',
      },
    });
    const slotContent = wrapper.find('button span');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.html()).toContain('Click me');
  });
});
