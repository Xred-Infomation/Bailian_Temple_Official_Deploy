<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <div class="page-wrapper">
    <HeaderBar />

    <router-view />

    <FooterBar />
    <div class="lotus-container">
      <div class="lotus-group lotus-left-group">
        <img src="@/assets/images/f1_L.png" alt="蓮花1" class="lotus" />
        <img src="@/assets/images/f1_L.png" alt="蓮花2" class="lotus2" />
      </div>
      <div class="lotus-group lotus-right-group">
        <img src="@/assets/images/f1_R.png" alt="蓮花3" class="lotus3" />
        <img src="@/assets/images/f1_R.png" alt="蓮花4" class="lotus" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  background-color: #f9f9f7;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.lotus-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  pointer-events: none;
}
.lotus-group {
  display: flex;
  gap: 1rem;
}

.lotus {
  height: 180px;
  width: auto;
  opacity: 0.3;
}
.lotus2 {
  height: 120px;
  width: auto;
  opacity: 0.3;
  margin-top: 30px;
}
.lotus3 {
  height: 120px;
  width: auto;
  opacity: 0.3;
  margin-top: 30px;
}

/* 當螢幕寬度小於等於 768px (平板) 時，開始縮小圖片 */
@media (max-width: 768px) {
  /* 1. 縮小圖片尺寸 */
  .lotus {
    height: 120px; /* 從 180px 縮小 */
  }
  .lotus2,
  .lotus3 {
    height: 90px; /* 從 120px 縮小 */
    margin-top: 20px; /* 同時縮小垂直位移 */
  }

  /* 2. 減少左右邊距和圖片間距 */
  .lotus-container {
    padding: 0 1rem; /* 從 2rem 減少 */
  }
  .lotus-group {
    gap: 0.5rem; /* 從 1rem 減少 */
  }
}

/* 當螢幕寬度小於等於 480px (手機) 時，隱藏第二朵蓮花 */
@media (max-width: 480px) {
  /* 隱藏每組中的第二朵蓮花，讓版面更簡潔 */
  .lotus2,
  .lotus3 {
    display: none;
  }

  /* 可以稍微再縮小剩下的蓮花 */
  .lotus {
    height: 100px;
  }
}
</style>
