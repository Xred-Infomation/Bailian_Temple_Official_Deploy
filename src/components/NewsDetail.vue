<template>
  <div v-if="news" class="news-detail-wrapper">
    <div class="news-detail-card">
      <div class="news-header">
        <div class="title-row">
          <h1 class="news-title">{{ news.title }}</h1>
          <p class="post-date">{{ formattedDate }}</p>
        </div>
        <hr class="title-line" />
      </div>
      <div class="news-content" v-html="news.htmlContent"></div>
    </div>
  </div>
  <div v-else class="loading">載入中...</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/axios'
import '@/assets/styles/news.css'

const route = useRoute()
const news = ref(null)
const formattedDate = ref('')

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await api.get(`/officialMana/getLatestNewsByID/${id}`)
    news.value = res.data[0]
    if (news.value?.postDate) {
      formattedDate.value = new Date(news.value.postDate).toLocaleDateString()
    }

    // 等 DOM 更新完成後，移除圖片的寬高屬性和行內 aspect-ratio
    await nextTick()
    const imgs = document.querySelectorAll('.news-content figure.image img')
    imgs.forEach((img) => {
      img.removeAttribute('width')
      img.removeAttribute('height')
      img.style.aspectRatio = 'auto' // 清除行內 aspect-ratio
    })
  } catch (err) {
    console.error('取得新聞內容失敗', err)
  }
})
</script>
