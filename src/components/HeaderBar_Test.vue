<script setup>
import '@/assets/styles/HeaderBar.css'
import { ref, h, resolveComponent } from 'vue'
import { NMarquee, NMenu } from 'naive-ui'

// 選單項目
const menuOptions = [
  {
    label: () =>
      h(resolveComponent('RouterLink'), { to: '/about' }, { default: () => '關於白蓮寺' }),
    key: 'about',
  },
  {
    label: () => h(resolveComponent('RouterLink'), { to: '/about' }, { default: () => '松齡學院' }),
    key: 'academy',
  },
  {
    label: () =>
      h(resolveComponent('RouterLink'), { to: '/daycare' }, { default: () => '日托服務' }),
    key: 'daycare',
  },
  {
    label: () =>
      h(
        resolveComponent('RouterLink'),
        { to: '/donation' },
        { default: () => '祈福點燈/護持捐款' },
      ),
    key: 'donation',
  },
  {
    label: () =>
      h(resolveComponent('RouterLink'), { to: '/hotpot' }, { default: () => '不二齋-喜悅素鍋' }),
    key: 'hotpot',
  },
  {
    label: () =>
      h(resolveComponent('RouterLink'), { to: '/hotpot' }, { default: () => '交通資訊' }),
    key: 'traffic',
  },
  {
    label: () =>
      h(resolveComponent('RouterLink'), { to: '/hotpot' }, { default: () => '聯絡我們' }),
    key: 'contact',
  },
]

const activeKey = ref('academy')
</script>

<template>
  <!-- 跑馬燈效果展示 -->
  <n-marquee> 最新消息：端午節活動報名 </n-marquee>
  <div class="logo-bar">
    <router-link to="/" class="logo-link">
      <div class="logo-center">
        <img src="@/assets/images/logo.png" alt="Bailian Temple 標誌" class="logo" />
        <div class="logo-text">
          <span class="ch-title">白蓮寺</span>

          <span class="en-title">Bailian Temple</span>
        </div>
      </div>
    </router-link>

    <!-- 社交媒體圖示 -->
    <div class="right-group">
      <div class="social-icons">
        <a href="https://line.me" target="_blank"
          ><img src="@/assets/images/line.png" alt="Line"
        /></a>
        <a href="https://instagram.com" target="_blank"
          ><img src="@/assets/images/instagram.png" alt="Instagram"
        /></a>
        <a href="https://facebook.com" target="_blank"
          ><img src="@/assets/images/facebook.png" alt="Facebook"
        /></a>
        <a href="https://threads.net" target="_blank"
          ><img src="@/assets/images/threads.png" alt="Threads"
        /></a>
      </div>
    </div>
  </div>

  <div class="menu-bar">
    <div class="menu-bar-inner">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" responsive />
    </div>
  </div>
</template>
