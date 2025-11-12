import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import MessageBox from '@/components/chat/MessageBox.vue';

describe('<MessageBox/>', () => {
  const wrapper = mount(MessageBox);
  test('it should render inputs and button correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button svg').exists()).toBe(true);
  });

  test('it should emit sendMessage event when button is clicked with message valid', async () => {
    const message = 'Hello, world!';
    await wrapper.find('input[type="text"]').setValue(message);
    await wrapper.find('button').trigger('click');
    console.log(wrapper.emitted());
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);

    expect((wrapper.vm as unknown as { message: string }).message).toBe('');
  });

  test('it should emit sendMessage event when key.press.enter is triggered with message valid', async () => {
    const message = 'Hello, world!';
    const input = wrapper.find('input');
    await input.setValue(message);
    await input.trigger('keypress.enter');
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
  });
  test('it should emit sendMessage event when key.press.enter is triggered with message valid', async () => {
    const wrapper = mount(MessageBox);
    const input = wrapper.find('input');
    await input.trigger('keypress.enter');
    expect(wrapper.emitted('sendMessage')).toBeFalsy();
  });  
});
