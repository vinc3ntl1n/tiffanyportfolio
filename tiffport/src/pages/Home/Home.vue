<template>
  <div class="home">
    <div class="home-content">
      <h1 class="home-title">tiffany lin</h1>
      <nav class="home-nav">
        <router-link to="/portfolio" class="home-link">portfolio</router-link>
        <router-link to="/connect" class="home-link">connect</router-link>
      </nav>
    </div>
    <div class="home-image">
      <img src="/10-1.thumb128.png" alt="hamster thumbnail" class="image-placeholder" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
@import './Home.css';
</style>
