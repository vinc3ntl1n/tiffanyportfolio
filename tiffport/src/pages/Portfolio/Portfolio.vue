<template>
  <div class="portfolio">
    <div class="portfolio-cards">
      <PortfolioCard title="graduate" link="/portfolio/graduate">
        <div class="book-red book-rect">
          <img src="/10-1.thumb128.png" alt="graduate book" class="image-placeholder" />
          <div class="book-label">GRADUATE</div>
        </div>
      </PortfolioCard>
      <PortfolioCard title="undergrad" link="/portfolio/undergrad">
        <div class="book-green book-rect">
          <img src="/11-1.thumb128.png" alt="undergrad book" class="image-placeholder" />
          <div class="book-label">UNDERGRAD</div>
        </div>
      </PortfolioCard>
      <PortfolioCard title="professional" link="/portfolio/professional">
        <div class="book-blue book-rect">
          <img src="/12-1.thumb128.png" alt="professional book" class="image-placeholder" />
          <div class="book-label">PROFESSIONAL</div>
        </div>
      </PortfolioCard>
    </div>
    <div class="portfolio-ground">
      <!-- Brown ground bar -->
    </div>
  </div>
</template>

<script setup lang="ts">
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard.vue'
</script>

<style>
@import './Portfolio.css';
</style>
