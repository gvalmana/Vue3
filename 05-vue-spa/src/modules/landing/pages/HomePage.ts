import {
  defineComponent,
  onErrorCaptured,
  onBeforeUnmount,
  onBeforeMount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  ref,
} from 'vue'

export default defineComponent({
  setup() {
    console.log('HomePage setup');
    const counter = ref(0);
    onMounted(()=>{console.log('HomePage onMounted')});

    onUpdated(()=>{console.log('HomePage onUpdated')});

    onUnmounted(()=>{console.log('HomePage onUnmounted')});

    onBeforeMount(()=>{console.log('HomePage onBeforeMount')});

    onBeforeUpdate(()=>{console.log('HomePage onBeforeUpdate')});

    onBeforeUnmount(()=>{console.log('HomePage onBeforeUnmount')});

    onErrorCaptured(()=>{console.log('HomePage onErrorCaptured')});

    onRenderTracked(()=>{console.log('HomePage onRenderTracked')});

    onRenderTriggered(()=>{console.log('HomePage onRenderTriggered')});

    onActivated(()=>{console.log('HomePage onActivated')});

    onDeactivated(()=>{console.log('HomePage onDeactivated')});

    return {
      counter,
    }
  },
})
