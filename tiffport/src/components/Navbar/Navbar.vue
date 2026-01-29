<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link nav-home">HOME</router-link>
    <router-link to="/portfolio" class="nav-link" :class="{ 'router-link-active': $route.path.startsWith('/book') }">PORTFOLIO</router-link>
    <router-link to="/connect" class="nav-link">CONNECT</router-link>
  </nav>
</template>

<script setup lang="ts">
</script>

<style>
@import './Navbar.css';
</style>
