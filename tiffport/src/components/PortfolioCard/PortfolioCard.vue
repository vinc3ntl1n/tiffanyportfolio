<template>
  <div class="portfolio-card" role="button" tabindex="0">
    <div class="portfolio-card-image">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style>
@import './PortfolioCard.css';
</style>
