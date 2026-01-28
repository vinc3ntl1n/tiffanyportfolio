<template>
  <div class="flipbook-container" @wheel.prevent="onWheel">
    <button class="flipbook-nav prev" @click="flipLeft">‹</button>
    <Flipbook
      class="flipbook"
      :pages="virtualPages"
      :flip-duration="400"
      :centering="true"
      :click-to-zoom="false"
      :drag-to-flip="true"
      ref="flipbook"
      @flip-left-end="onFlip"
      @flip-right-end="onFlip"
    />
    <button class="flipbook-nav next" @click="flipRight">›</button>
    <div class="flipbook-indicator">
      {{ currentPage }} / {{ totalPages }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Flipbook from 'flipbook-vue'

const props = defineProps<{
  pages: string[]
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const flipbook = ref<InstanceType<typeof Flipbook> | null>(null)
const currentPage = ref(1)

const pagesWithCover = computed(() => [null, ...props.pages])

const totalPages = computed(() => props.pages.length)

const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
const LOAD_BUFFER = 2

const virtualPages = computed(() => {
  return pagesWithCover.value.map((pageUrl, index) => {
    if (pageUrl === null) return null
    
    const distance = Math.abs(index - currentPage.value)
    if (distance <= LOAD_BUFFER) {
      return pageUrl
    }
    
    return TRANSPARENT_PIXEL
  })
})

const flipLeft = () => {
  flipbook.value?.flipLeft()
}

const flipRight = () => {
  flipbook.value?.flipRight()
}

const onFlip = (pageNum: number) => {
  if (flipbook.value) {
    currentPage.value = flipbook.value.page || 1
    emit('pageChange', currentPage.value)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') flipLeft()
  if (e.key === 'ArrowRight') flipRight()
}

const onWheel = (e: WheelEvent) => {
  if (Math.abs(e.deltaY) < 30) return 
  
  if (e.deltaY > 0) {
    flipRight()
  } else {
    flipLeft()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.flipbook-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}

.flipbook {
  width: 95vw;
  height: 85vh;
}

.flipbook-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary-color);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 100;
}

.flipbook-nav:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.flipbook-nav.prev {
  left: 0.5rem;
}

.flipbook-nav.next {
  right: 0.5rem;
}

.flipbook-indicator {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
