<template>
  <div class="portfolio-detail">
    <aside class="portfolio-detail-sidebar">
      <span class="portfolio-detail-category">{{ category }}</span>
    </aside>
    <main class="portfolio-detail-content">
      <FlipBook :pages="pages" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
}

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

const route = useRoute()
const router = useRouter()

const category = computed(() => route.params.category as string || 'graduate')

const config = computed(() => BOOK_CONFIGS[category.value] || BOOK_CONFIGS.graduate)
const pages = computed(() => generatePageUrls(config.value))

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') router.back()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style>
@import './PortfolioDetail.css';
</style>
