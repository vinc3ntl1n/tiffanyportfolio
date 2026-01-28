<template>
  <div class="portfolio">
    <div class="portfolio-main-content">
      <div class="portfolio-shelf-container">
        <div class="portfolio-cards">
          <PortfolioCard 
            v-for="book in books" 
            :key="book.id"
            :title="book.title" 
            @click="openBook(book.id)"
          >
            <div class="book-cover-wrapper">
              <img :src="book.coverImage" :alt="book.title + ' Portfolio Cover'" class="book-cover-image" />
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
import { books, type BookConfig } from '../../config/books'

const selectedBookId = ref<string | null>(null)
const isModalOpen = ref(false)

const openBook = (bookId: string) => {
  selectedBookId.value = bookId
  isModalOpen.value = true
}

const closeBook = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedBookId.value = null
  }, 300)
}

const currentConfig = computed(() => {
  if (!selectedBookId.value) return books[0]
  return books.find(b => b.id === selectedBookId.value) || books[0]
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
