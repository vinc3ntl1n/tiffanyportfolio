<template>
  <router-link :to="link" class="portfolio-card">
    <div class="portfolio-card-image">
      <slot />
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  link: string
}>()
</script>

<style>
@import './PortfolioCard.css';
</style>
