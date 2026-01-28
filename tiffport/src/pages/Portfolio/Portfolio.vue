<template>
  <div class="portfolio">
    <div class="portfolio-main-content">
      <div class="portfolio-shelf-container">
        <div class="portfolio-cards">
          <PortfolioCard title="graduate" @click="openBook('graduate')">
            <div class="book-cover-wrapper">
              <img src="/book1/LinT_Portfolio_2026.jpg" alt="Graduate Portfolio Cover" class="book-cover-image" />
            </div>
          </PortfolioCard>
          <PortfolioCard title="undergrad" @click="openBook('undergrad')">
            <div class="book-cover-wrapper">
              <img src="/book1/LinT_Portfolio_2026.jpg" alt="Undergrad Portfolio Cover" class="book-cover-image" />
            </div>
          </PortfolioCard>
          <PortfolioCard title="professional" @click="openBook('professional')">
            <div class="book-cover-wrapper">
              <img src="/book1/LinT_Portfolio_2026.jpg" alt="Professional Portfolio Cover" class="book-cover-image" />
            </div>
          </PortfolioCard>
        </div>
        
        <div class="portfolio-ground">
        </div>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="isModalOpen" class="portfolio-modal" @click.self="closeBook">
        <button class="modal-close" @click="closeBook">×</button>
        <div class="modal-content">
          <FlipBook :pages="currentPages" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard.vue'
import FlipBook from '../../components/FlipBook/FlipBook.vue'

interface BookConfig {
  totalPages: number
  basePath: string
  prefix: string
}

const BOOK_CONFIGS: Record<string, BookConfig> = {
  graduate: {
    totalPages: 108,
    basePath: '/book1/',
    prefix: 'LinT_Portfolio_2026'
  },
  undergrad: {
    totalPages: 108,
    basePath: '/book1/',
    prefix: 'LinT_Portfolio_2026'
  },
  professional: {
    totalPages: 108,
    basePath: '/book1/',
    prefix: 'LinT_Portfolio_2026'
  }
}

const selectedBook = ref<string | null>(null)
const isModalOpen = ref(false)

const openBook = (book: string) => {
  selectedBook.value = book
  isModalOpen.value = true
}

const closeBook = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedBook.value = null
  }, 300)
}

const currentConfig = computed(() => {
  if (!selectedBook.value) return BOOK_CONFIGS.graduate
  return BOOK_CONFIGS[selectedBook.value] || BOOK_CONFIGS.graduate
})

function generatePageUrls(config: BookConfig): string[] {
  const pages: string[] = []
  for (let i = 1; i <= config.totalPages; i++) {
    if (i === 1) {
      pages.push(`${config.basePath}${config.prefix}.jpg`)
    } else {
      pages.push(`${config.basePath}${config.prefix}${i}.jpg`)
    }
  }
  return pages
}

const currentPages = computed(() => generatePageUrls(currentConfig.value))

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeBook()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style>
@import './Portfolio.css';
</style>
