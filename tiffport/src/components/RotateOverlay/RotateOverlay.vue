<template>
  <div class="rotate-overlay">
    <div class="rotate-content">
      <div class="rotate-icon">⟳</div>
      <h1>Please Rotate Your Device</h1>
      <p>This portfolio is best viewed in landscape mode.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.rotate-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--light-bg, #FAF3ED);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.rotate-content {
  color: var(--text-dark, #3C0008);
}

.rotate-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: rotate 2s infinite linear;
}

h1 {
  font-family: 'Maragsa Display', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-family: 'Montserrat', sans-serif;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
}

@media screen and (orientation: portrait) and (max-width: 1024px) {
  .rotate-overlay {
    display: flex;
  }
}
</style>
