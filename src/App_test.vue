<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import { NSpace, NLayout, NLayoutContent, NLayoutFooter } from 'naive-ui'
</script>

<template>
  <div class="page-wrapper">
    <HeaderBar />
    <n-space vertical size="large">
      <n-layout>
        <n-layout-content content-style="padding: 24px;"> <router-view /> </n-layout-content>
        <n-layout-footer><FooterBar /></n-layout-footer>
      </n-layout>
    </n-space>
    <div class="lotus-container">
      <div class="lotus-group">
        <img src="@/assets/images/f1_L.png" alt="蓮花1" class="lotus" />
        <img src="@/assets/images/f1_L.png" alt="蓮花2" class="lotus2" />
      </div>
      <div class="lotus-group">
        <img src="@/assets/images/f1_R.png" alt="蓮花3" class="lotus3" />
        <img src="@/assets/images/f1_R.png" alt="蓮花4" class="lotus" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: #f9f9f7;
  padding: 24px;
}

.n-layout-sider {
  background: #f9f9f7;
}

.n-layout-content {
  background: #f9f9f7;
}

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
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.lotus-group {
  display: flex;
  gap: 1rem;
  max-width: 100%;
  flex-shrink: 1;
  overflow: hidden;
}

.lotus,
.lotus2,
.lotus3 {
  max-width: 100%;
  height: auto;
  opacity: 0.3;
  object-fit: contain;
}

.lotus {
  height: 180px;
}
.lotus2 {
  height: 120px;
  margin-top: 30px;
}
.lotus3 {
  height: 120px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .n-layout-content {
    padding: 16px !important;
  }

  .n-layout-header,
  .n-layout-footer {
    padding: 16px;
  }

  .lotus-container {
    padding: 0 1rem;
  }

  .lotus-group {
    gap: 0.5rem;
  }

  .lotus {
    height: 100px;
  }

  .lotus2,
  .lotus3 {
    height: 80px;
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .lotus-container {
    padding: 0 0.5rem;
  }

  .lotus-group {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .lotus,
  .lotus2,
  .lotus3 {
    height: 80px;
  }
}
</style>
