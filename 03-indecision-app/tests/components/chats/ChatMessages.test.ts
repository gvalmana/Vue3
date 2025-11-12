import { mount } from "@vue/test-utils";
import ChatMessages from "@/components/chat/ChatMessages.vue";
import type { ChatMessage } from "@/interfaces/chat-message.interface";
import { describe, expect, test, vi } from "vitest";
const messages: ChatMessage[] = [
    { id: 1, message: 'Hello, world!', isMine: true },
    { id: 2, message: 'Hello, furom the other side!', isMine: false },
    { id: 3, message: 'Hello, from the other side!', isMine: true, image: 'https://via.placeholder.com/150' },
  ];
const wrapper = mount(ChatMessages, { props: { messages } });
describe('<ChatMessages/>', () => {
  test('it should render messages correctly', () => {
    
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });
    expect(chatBubbles.length).toBe(messages.length);
  });

  test('it should scroll downs to bottom after messages updated', async () => {
    const scrollToMock = vi.fn();

    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
    chatRef.scrollTo = scrollToMock;

    await wrapper.setProps({
        messages: [...messages, { id: 4, message: 'Hey', isMine: true }],
      });
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(scrollToMock).toHaveBeenCalled();
    expect(scrollToMock).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth',
    });
  });
});