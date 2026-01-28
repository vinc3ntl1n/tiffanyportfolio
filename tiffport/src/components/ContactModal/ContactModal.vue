<template>
  <Transition name="modal">
    <div v-if="isOpen" class="contact-modal-backdrop" @click.self="$emit('close')">
      <div class="contact-modal-content">
        <button class="modal-close" @click="$emit('close')">×</button>
        
        <h2>Connect</h2>
        
        <form @submit.prevent="sendEmail" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" placeholder="Your name" required />
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" v-model="subject" placeholder="What is this regarding?" required />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="message" rows="5" placeholder="Your message..." required></textarea>
          </div>
          
          <button type="submit" class="submit-btn">Send Email</button>
          
          <p class="direct-email">
            or email me at <a :href="'mailto:' + email">{{ email }}</a>
          </p>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
  email: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const name = ref('')
const subject = ref('')
const message = ref('')

const sendEmail = () => {
  const mailtoLink = `mailto:tiffqlin@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(`Name: ${name.value}\n\n${message.value}`)}`
  window.open(mailtoLink, '_blank')
  emit('close')
}
</script>

<style>
@import './ContactModal.css';
</style>
