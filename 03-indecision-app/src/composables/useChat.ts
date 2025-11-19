import { sleep } from '@/helpers/sleep';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';
import { ref } from 'vue';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);
  const getHerResponse = async (): Promise<YesNoResponse> => {
    try {
      const response = await fetch('https://yesno.wtf/api');
      const data = (await response.json()) as YesNoResponse;
      return data;
    } catch (error) {
      console.error(error);
      return {
        answer: 'No se pudo obtener la respuesta',
        forced: false,
        image: undefined,
      };
    }
  };

  const onMessage = async (message: string) => {
    if (message.length === 0) return;
    messages.value.push({
      id: new Date().getTime(),
      message,
      isMine: true,
    });

    if (!message.trim().endsWith('?')) return;

    await sleep(1);
    const { answer, image } = await getHerResponse();
    messages.value.push({
      id: new Date().getTime(),
      message: answer,
      isMine: false,
      image: image,
    });
  };
  return {
    //props
    messages,
    //methods
    onMessage,
  };
};
