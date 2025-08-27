<script setup>
import '@/assets/styles/HeaderBar.css'
import { ref, onMounted } from 'vue'
import { NMarquee } from 'naive-ui'
import api from '@/utils/axios'

import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
const menuOpen = ref(false)
const marqueeText = ref('')

onMounted(async () => {
  try {
    const res = await api.get('/officialMana/getNewsTicker/')
    // console.log('res.data = ', res.data)
    if (res.data && res.data.length > 0) {
      const filtered = res.data.filter((item) => item.isVisible).map((item) => item.title)
      marqueeText.value = filtered.length > 0 ? filtered.join('  ***  ') : '目前無公告訊息'
    } else {
      marqueeText.value = '目前無公告訊息'
    }
  } catch (error) {
    console.error('載入跑馬燈內容失敗:', error)
    marqueeText.value = '無法載入公告訊息'
  }
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>
<template>
  <!--跑馬燈-->
  <n-marquee class="marquee-bar" :duration="20000">
    {{ marqueeText }}
  </n-marquee>
  <header class="main-header">
    <div class="logo-bar">
      <router-link to="/" class="logo-link">
        <div class="logo-center">
          <!-- <router-link to="/"> -->
          <img src="@/assets/images/logo.png" alt="Bailian Temple 標誌" class="logo" />
          <!-- </router-link> -->
          <div class="logo-text">
            <span class="ch-title">白蓮寺</span>

            <span class="en-title">Bailian Temple</span>
          </div>
        </div>
      </router-link>

      <div class="right-group">
        <div class="social-icons">
          <a href="https://lin.ee/29a2r8B" target="_blank"
            ><img src="@/assets/images/line.png" alt="Line"
          /></a>
          <a href="https://www.facebook.com/bai.lian.si.2025/" target="_blank"
            ><img src="@/assets/images/facebook.png" alt="Facebook"
          /></a>
        </div>
        <button class="hamburger" @click="toggleMenu" aria-label="切換選單">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
  <nav class="navbar" :class="{ open: menuOpen }">
    <ul>
      <li><router-link to="/about">關於白蓮寺</router-link></li>
      <li><router-link to="/academy">松齡學院</router-link></li>
      <li><router-link to="/daycare">日托服務</router-link></li>
      <li><router-link to="/donation">祈福點燈/護持捐款</router-link></li>
      <li><router-link to="/hotpot">不二齋</router-link></li>
      <li><router-link to="/contact">聯絡我們</router-link></li>
      <li><router-link to="/">回首頁</router-link></li>
    </ul>
  </nav>
</template>
<style>
.marquee-bar {
  letter-spacing: 0.2em;
}
</style>
