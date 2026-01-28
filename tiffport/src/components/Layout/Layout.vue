<template>
  <div class="layout">
    <Navbar @open-connect="openContact" />
    <main>
      <router-view />
    </main>
    <ContactModal 
      :is-open="isContactOpen" 
      email="tiffqlin@gmail.com" 
      @close="closeContact" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../Navbar/Navbar.vue'
import ContactModal from '../ContactModal/ContactModal.vue'

const isContactOpen = ref(false)

const openContact = () => {
  isContactOpen.value = true
}

const closeContact = () => {
  isContactOpen.value = false
}
</script>

<style>
@import './Layout.css';
</style>
