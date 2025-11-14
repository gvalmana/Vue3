import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import IndesicionView from '@/views/IndecisionView.vue';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';

const mockChatMessages = {
  template: '<div data-testid="mock-chat-messages">Mock Chat Messages</div>',
};

describe('<IndesicionView />', () => {
  test('reders chat messages and messagebox correctly', () => {
    const wrapper = mount(IndesicionView);

    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true);
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true);
  });

  test('call onMessage when sending a message', async () => {
    const message = 'Hello, world!';
    const wrapper = mount(IndesicionView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
        },
      },
    });
    const messagesBoxComponent = wrapper.findComponent(MessageBox);

    messagesBoxComponent.vm.$emit('sendMessage', message);
    await new Promise((r) => setTimeout(r, 100));
    expect(wrapper.html()).toMatchSnapshot()
  });
});
