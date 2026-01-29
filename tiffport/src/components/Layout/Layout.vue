<template>
  <div class="layout" :class="{ 'layout--dark': route.meta.theme === 'dark' }">
    <Navbar v-if="route.path !== '/'" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Navbar from '../Navbar/Navbar.vue'

const route = useRoute()
</script>

<style>
@import './Layout.css';
</style>
