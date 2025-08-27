<script setup>
import '@/assets/styles/About.css'
defineProps(['title', 'subtitle', 'content', 'imageUrl'])
</script>

<template>
  <!-- <div class="about-container">
    <section class="header-section">
      <h1>{{ title || '（大標題預覽）' }}</h1>
      <p>{{ subtitle || '（小標題預覽）' }}</p>
    </section>
    <section class="content-section">
      <img v-if="imageUrl" :src="imageUrl" style="max-width: 100%; margin: 16px 0" />
      <div style="white-space: pre-wrap">{{ content || '（文章內容預覽A）' }}</div>
    </section>
  </div> -->
  <div class="about-container">
    <section class="header-section">
      <h1 class="main-title">{{ title || '（大標題預覽）' }}</h1>
      <p class="subtitle">{{ subtitle || '（小標題預覽）' }}</p>
    </section>
    <section class="content-section">
      <img v-if="imageUrl" :src="imageUrl" class="about-image" />
      <div class="about-text" style="white-space: pre-wrap">
        {{ content || '（文章內容預覽）' }}
      </div>
    </section>
  </div>
</template>
