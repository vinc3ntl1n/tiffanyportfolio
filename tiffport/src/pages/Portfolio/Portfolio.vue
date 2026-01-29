<template>
  <div class="portfolio">
    <div class="portfolio-main-content">
      <div v-for="(shelf, index) in shelves" :key="index" class="portfolio-shelf-container">
        <div class="portfolio-cards">
          <div v-for="book in shelf" :key="book.id" class="book-wrapper">
             <h3 class="book-title-display">{{ book.title.includes(' - ') ? book.title.split(' - ')[1] : book.title }}</h3>
             <PortfolioCard 
               :title="book.title.includes(' - ') ? book.title.split(' - ')[1] : book.title" 
               @click="openBook(book.id)"
             >
                <div class="book-cover-wrapper">
                  <img :src="book.coverImage" :alt="book.title + ' Portfolio Cover'" class="book-cover-image" />
                </div>
             </PortfolioCard>
          </div>
        </div>
        
        <div class="portfolio-ground">
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard.vue'
import { books } from '../../config/books'

const router = useRouter()

const shelves = computed(() => {
  const chunkSize = 3
  const result = []
  for (let i = 0; i < books.length; i += chunkSize) {
    result.push(books.slice(i, i + chunkSize))
  }
  return result
})

const openBook = (bookId: string) => {
  router.push('/book/' + bookId)
}
</script>

<style>
@import './Portfolio.css';
</style>
