<script setup>
import { ref } from 'vue'
import { NInput, NUpload, NForm, NFormItem, NCard, NSelect, NButton } from 'naive-ui'

const templates = [
  { label: '介紹畫面', value: 'templateA' },
  { label: '最新消息', value: 'templateB' },
]

const selectedTemplate = ref('templateA')

// 各樣板的欄位狀態
const title = ref('')
const subtitle = ref('')
const content = ref('')
const imageUrl = ref(null)
const extraField = ref('') // 假設樣板B有額外欄位

function handleUpload({ file }) {
  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result
  }
  reader.readAsDataURL(file.file)
  return false
}
</script>

<template>
  <n-message-provider>
    <div style="display: flex; gap: 24px; padding: 24px">
      <!-- 左邊：編輯區 -->
      <n-card style="width: 50%">
        <!-- 樣板切換器 -->
        <n-form label-placement="top">
          <n-form-item label="選擇樣板">
            <n-select
              v-model:value="selectedTemplate"
              :options="templates"
              placeholder="請選擇樣板"
            />
          </n-form-item>
        </n-form>

        <!-- 根據樣板動態呈現表單 -->
        <n-form label-placement="top">
          <n-form-item label="大標題">
            <n-input v-model:value="title" placeholder="請輸入大標題" />
          </n-form-item>

          <n-form-item label="小標題">
            <n-input v-model:value="subtitle" placeholder="請輸入小標題" />
          </n-form-item>

          <n-form-item label="上傳圖片">
            <n-upload :custom-request="handleUpload" :show-file-list="false" accept="image/*">
              <n-button>選擇圖片</n-button>
            </n-upload>
          </n-form-item>

          <n-form-item label="文章內容">
            <n-input
              v-model:value="content"
              type="textarea"
              rows="8"
              placeholder="請輸入文章內容"
            />
          </n-form-item>

          <!-- 假如是樣板B才顯示的欄位 -->
          <n-form-item v-if="selectedTemplate === 'templateB'" label="樣板B專屬欄位">
            <n-input v-model:value="extraField" placeholder="請輸入額外資料" />
          </n-form-item>
        </n-form>
      </n-card>

      <!-- 右邊：預覽區 -->
      <n-card style="width: 50%">
        <div class="about-container">
          <section class="header-section">
            <h1 class="main-title">{{ title || '（大標題預覽）' }}</h1>
            <p class="subtitle">{{ subtitle || '（小標題預覽）' }}</p>
          </section>
          <section class="content-section">
            <img v-if="imageUrl" :src="imageUrl" class="about-image" loading="lazy" />
            <div class="about-text" style="white-space: pre-wrap">
              {{ content || '（文章內容預覽）' }}
            </div>
          </section>
        </div>

        <div v-if="selectedTemplate === 'templateB' && extraField" style="margin-top: 16px">
          <strong>樣板B額外內容：</strong> {{ extraField }}
        </div>
      </n-card>
    </div>
  </n-message-provider>
</template>
