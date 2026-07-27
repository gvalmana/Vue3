<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p v-if="subTitle" class="py-4">{{ subTitle }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ingrese un valor'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />
          <div class="flex justify-end mt-5">
            <button @click="$emit('close')" class="btn mr-4">Close</button>
            <button @click="$emit('close')" class="btn mr-4">Close</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-scree h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  open: boolean;
  placeholder?: string;
  title?: string;
  subTitle?: string;
}

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();
defineProps<Props>();
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const submitValue = () => {
  if (!inputValue.value.trim()) {
    // Foco en el elemento
    inputRef.value?.focus();
    return;
  }
  emits('value', inputValue.value.trim());
  emits('close');
  inputValue.value = '';
};
</script>
