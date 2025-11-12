import ChatBubble from "@/components/chat/ChatBubble.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe('<ChatBubble/>', () => {
  test('it should render own message correctly', () => {
    const message = 'Hello, world!';
    const wrapper = mount(ChatBubble, { props: { message, isMine: true } });
    const ownMessage = wrapper.find('div.bg-blue-200');
    expect(ownMessage.exists()).toBe(true);
    expect(ownMessage.text()).toContain(message);
    const otherMessage = wrapper.find('div.bg-gray-300');
    expect(otherMessage.exists()).toBe(false);
  });

  test('it should render received message correctly', () => {
    const message = 'Hello, from the other side!';
    const wrapper = mount(ChatBubble, { props: { message, isMine: false } });
    const ownMessage = wrapper.find('div.bg-blue-200');
    expect(ownMessage.exists()).toBe(false);
    const otherMessage = wrapper.find('div.bg-gray-300');
    expect(otherMessage.exists()).toBe(true);
    expect(otherMessage.text()).toContain(message);
    expect(otherMessage.find('img').exists()).toBe(false);
  });

  test('it should render received message with image correctly', () => {
    const message = 'Hello, from the other side!';
    const image = 'https://via.placeholder.com/150';
    const wrapper = mount(ChatBubble, { props: { message, isMine: false, image } });
    const ownMessage = wrapper.find('div.bg-blue-200');
    expect(ownMessage.exists()).toBe(false);
    const otherMessage = wrapper.find('div.bg-gray-300');
    expect(otherMessage.exists()).toBe(true);
    expect(otherMessage.text()).toContain(message);
    expect(otherMessage.find('img').attributes('src')).toBe(image);
  });
});