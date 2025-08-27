<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/axios'

const posts = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/student/getStudentByStudentNo/SNO2025060002') // 實際打到 dev 或 prod 的 baseURL + /posts
    posts.value = res.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>
    <h1>文章列表</h1>
    <ul>
      {{
        posts
      }}
    </ul>
  </div>
</template>
