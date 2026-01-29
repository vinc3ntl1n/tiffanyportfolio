<template>
  <div class="flipbook-container">
    <Flipbook
      class="flipbook"
      :pages="pagesArray"
      :flip-duration="400"
      :centering="true"
      :click-to-zoom="false"
      :drag-to-flip="true"
      ref="flipbookEl"
      @flip-left-end="onFlipEnd"
      @flip-right-end="onFlipEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Flipbook from 'flipbook-vue'

const props = defineProps({
  pages: {
    type: Array as () => string[],
    required: true
  }
})

const emit = defineEmits(['change'])

const pagesArray = computed(() => {
  if (!props.pages || props.pages.length === 0) return []
  return [null, ...props.pages]
})

const flipbookEl = ref(null)
const currentPageIndex = ref(1)

const flipLeft = () => {
    // @ts-ignore
    flipbookEl.value?.flipLeft()
}

const flipRight = () => {
    // @ts-ignore
    flipbookEl.value?.flipRight()
}

const onFlipEnd = (page: number) => {
    if (page === 0) {
        // @ts-ignore
        flipbookEl.value?.goToPage(1)
        return
    }
    
    currentPageIndex.value = page
    emit('change', page)
}

const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
        flipLeft()
    } else if (e.key === 'ArrowRight') {
        flipRight()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.flipbook-container {
  width: 125vh; 
  max-width: 95vw;
  height: 90vh; 
  
  padding: 2vh; 
  
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.flipbook {
  height: 85vh; 
  width: 100%;
  
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

:deep(.viewport) {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
