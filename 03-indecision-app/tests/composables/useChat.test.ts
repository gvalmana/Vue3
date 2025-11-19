import { useChat } from "@/composables/useChat";
import { describe, expect, test, vi } from "vitest";

describe('useChat', () => {
  test('it should add message correctly when onMessage is called', async () => {
    const textMessage = 'Hello, world!';
    const { messages, onMessage } = useChat();
    await onMessage(textMessage);

    expect(messages.value.length).toBe(1);
    expect(messages.value[0]?.isMine).toBe(true);
    expect(messages.value[0]?.message).toBe(textMessage);
    expect(messages.value[0]).toEqual({
        id: expect.any(Number),
        message: textMessage,
        isMine: true
    })
  });
  test('it should not add message if message is empty', async () => {
    const emptyMessage = '';
    const { messages, onMessage } = useChat();
    await onMessage(emptyMessage);
    expect(messages.value.length).toBe(0);
  });
  test('it should get response when message ends with ?', async () => {
    const questionMessage  = 'Do you want coffee?'

    const { messages, onMessage } = useChat();
    await onMessage(questionMessage);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const [myMessage, herMessage] = messages.value;
    expect(messages.value.length).toBe(2);
    expect(herMessage).toEqual({
        id: expect.any(Number),
        image: expect.any(String),
        message: expect.any(String),
        isMine: false        
    });
    expect(myMessage).toEqual({
        id: expect.any(Number),
        message: questionMessage,
        isMine: true,
    });
  });

  test('mock response - fetch api', async () => {
    const mockResponse = {
      answer: 'Yes',
      forced: false,
      image: 'https://via.placeholder.com/150',
    };
    (window as unknown as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }));
    const questionMessage  = 'Do you want coffee?'
    const { messages, onMessage } = useChat();
    await onMessage(questionMessage);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const [, herMessage] = messages.value;
    expect(herMessage).toEqual({
        id: expect.any(Number),
        image: mockResponse.image,
        message: mockResponse.answer,
        isMine: false        
    });
  });
});