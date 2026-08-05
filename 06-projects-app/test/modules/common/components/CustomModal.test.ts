import CustomModal from '@/modules/common/components/CustomModal.vue';
import { shallowMount } from '@vue/test-utils';

describe('<CustomModal />', () => {
  test('renders with default props', () => {
    const wrapper = shallowMount(CustomModal);
    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeUndefined();
    expect(wrapper.props().open).toBe(false);
  });
  test('renders dialog with header, body, and footer slots', () => {
    const wrapper = shallowMount(CustomModal, {
      props: { open: true },
      slots: {
        header: '<span>Header Content</span>',
        body: '<span>Body Content</span>',
        footer: '<span>Footer Button</span>',
      },
    });
    expect(wrapper.text()).toContain('Header Content');
    expect(wrapper.find('.my-5').text()).toContain('Body Content');
    expect(wrapper.text()).toContain('Footer Button');
  });
  test('open and closes dialog when open prop changes', async () => {
    const wrapper = shallowMount(CustomModal, {
      props: { open: true },
    });
    const modal = wrapper.find('.modal');
    const modalBackdrop = wrapper.find('.modal-backdrop');
    expect(modalBackdrop.exists()).toBeTruthy();
    console.log(modalBackdrop.classes());
    expect(modalBackdrop.classes()).toEqual([
      'modal-backdrop',
      'fixed',
      'top-0',
      'left-0',
      'z-10',
      'bg-black',
      'opacity-50',
      'w-scree',
      'h-screen',
    ]);
    expect(modal.attributes('open')).toBeDefined();
    await wrapper.setProps({ open: false });
    expect(modal.attributes('open')).toBeUndefined();
    expect(wrapper.find('.modal-backdrop').exists()).toBeFalsy();
  });
});
