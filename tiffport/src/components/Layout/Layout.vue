<template>
  <div class="layout">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../Navbar/Navbar.vue'
</script>

<style>
@import './Layout.css';
</style>
