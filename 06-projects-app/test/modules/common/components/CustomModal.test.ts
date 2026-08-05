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
    const model = wrapper.find('.modal');
    expect(model.attributes('open')).toBeDefined();
    await wrapper.setProps({ open: false });
    expect(model.attributes('open')).toBeUndefined();
  });
});
