<template>
  <div class="book-reader">
    <div class="reader-content">
      <div class="flipbook-wrapper">
        <FlipBook 
          class="book-layer"
          v-if="pages.length > 0"
          :pages="pages" 
          @change="handlePageChange"
        />
        <div v-else class="epub-placeholder">
          <h2>Loading...</h2>
        </div>

        <div class="overlay-controls">
          <router-link to="/portfolio" class="back-link">BACK</router-link>
          <div class="book-title-vertical">
            <h1>{{ bookId.includes(' - ') ? bookId.split(' - ')[1] : bookId }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import FlipBook from '../../components/FlipBook/FlipBook.vue'
import { books } from '../../config/books'

const route = useRoute()
const bookId = computed(() => route.params.id as string)

const currentBook = computed(() => books.find(b => b.id === bookId.value))
const pages = computed(() => currentBook.value?.images || [])

const currentPage = ref(1)

const handlePageChange = (pageIndex: number) => {
  currentPage.value = pageIndex
}
</script>

<style scoped>
.book-reader {
  width: 100vw;
  height: 90vh;
  background-color: #3c280d; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.reader-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.flipbook-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
}

.book-layer {
  position: relative;
  z-index: 10;
}
.overlay-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.back-link {
  position: absolute;
  transform: none; 
  
  color: white; 
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  pointer-events: auto;
  transition: opacity 0.3s;
  
  bottom: 4vh; 
  left: -5rem; 
  line-height: 1;
}

.back-link:hover {
  opacity: 0.7;
}

.book-title-vertical {
  position: absolute;
  transform-origin: top left;
  transform: rotate(-90deg) translateX(-100%);
  
  white-space: normal; 
  width: 80vh; 
  text-align: right; 
  
  pointer-events: auto;
  top: 4vh; 
  left: -5rem; 
}

.book-title-vertical h1 {
  margin: 0;
  font-family: 'Maragsa Display', serif;
  font-weight: normal; 
  font-size: 4rem; 
  color: white;
  letter-spacing: 2px;
  line-height: 0.9; 
}
</style>
