<template>
  <div>
    <h1>{{ title || '（大標題預覽）' }}</h1>
    <p>{{ subtitle || '（小標題預覽）' }}</p>
    <img v-if="imageUrl" :src="imageUrl" style="max-width: 100%; margin: 16px 0" />
    <div style="white-space: pre-wrap">{{ content || '（文章內容預覽）' }}</div>

    <div v-if="extraField" style="margin-top: 16px">
      <strong>樣板B額外內容：</strong> {{ extraField }}
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'subtitle', 'content', 'imageUrl', 'extraField'])
</script>
