<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link" exact>HOME</router-link>
    <router-link to="/portfolio" class="nav-link">PORTFOLIO</router-link>
    <a href="#" class="nav-link" @click.prevent="$emit('open-connect')">CONNECT</a>
  </nav>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'open-connect'): void
}>()
</script>

<style>
@import './Navbar.css';
</style>
