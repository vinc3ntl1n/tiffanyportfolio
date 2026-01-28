<template>
  <div class="flipbook-container">
    <button class="flipbook-nav prev" @click="flipLeft">‹</button>
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
    <button class="flipbook-nav next" @click="flipRight">›</button>
    <div class="flipbook-indicator">
      {{ displayPage }} / {{ totalPages }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, markRaw, watch } from 'vue'
import Flipbook from 'flipbook-vue'

const props = defineProps<{
  pages: string[]
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

// Store the raw DOM element ref, NOT a reactive component instance
const flipbookEl = ref<HTMLElement | null>(null)

// Keep flipbook instance completely outside Vue's reactivity system
let flipbookInstance: any = null

const displayPage = ref(1)
const isAnimating = ref(false)
const totalPages = computed(() => props.pages.length)

const pagesArray = computed(() => {
  return Object.freeze([null, ...props.pages]) as (string | null)[]
})

onMounted(() => {
  console.log('FlipBook: Mounted (V9 - markRaw Instance)')
  window.addEventListener('keydown', handleKeyDown)
  
  if (flipbookEl.value) {
    const el = flipbookEl.value as any
    if (el) {
      flipbookInstance = markRaw(el)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  flipbookInstance = null
})

const flipLeft = () => {
  if (isAnimating.value || !flipbookInstance) return
  
  if (flipbookInstance.canFlipLeft) {
    isAnimating.value = true
    flipbookInstance.flipLeft()
  }
}

const flipRight = () => {
  if (isAnimating.value || !flipbookInstance) return
  
  if (flipbookInstance.canFlipRight) {
    isAnimating.value = true
    flipbookInstance.flipRight()
  }
}

const onFlipEnd = () => {
  setTimeout(() => {
    isAnimating.value = false
    
    if (flipbookInstance) {
      const page = flipbookInstance.page
      if (typeof page === 'number' && page !== displayPage.value) {
        displayPage.value = page
        emit('pageChange', page)
      }
    }
  }, 0)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') flipLeft()
  if (e.key === 'ArrowRight') flipRight()
}
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
