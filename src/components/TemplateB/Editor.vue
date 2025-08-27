<template>
  <n-form label-placement="top">
    <n-form-item label="大標題">
      <n-input v-model:value="localTitle" placeholder="請輸入大標題" />
    </n-form-item>

    <n-form-item label="小標題">
      <n-input v-model:value="localSubtitle" placeholder="請輸入小標題" />
    </n-form-item>

    <n-form-item label="上傳圖片">
      <n-upload :custom-request="handleUpload" :show-file-list="false" accept="image/*">
        <n-button>選擇圖片</n-button>
      </n-upload>
    </n-form-item>

    <n-form-item label="文章內容">
      <n-input v-model:value="localContent" type="textarea" rows="6" placeholder="請輸入內容" />
    </n-form-item>

    <n-form-item label="樣板B專屬欄位">
      <n-input v-model:value="localExtraField" placeholder="請輸入額外內容" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { NInput, NUpload, NForm, NFormItem, NButton } from 'naive-ui'

const props = defineProps(['title', 'subtitle', 'content', 'imageUrl', 'extraField'])
const emit = defineEmits([
  'update:title',
  'update:subtitle',
  'update:content',
  'update:imageUrl',
  'update:extraField',
])

const localTitle = ref(props.title)
const localSubtitle = ref(props.subtitle)
const localContent = ref(props.content)
const localExtraField = ref(props.extraField)

watch(localTitle, (val) => emit('update:title', val))
watch(localSubtitle, (val) => emit('update:subtitle', val))
watch(localContent, (val) => emit('update:content', val))
watch(localExtraField, (val) => emit('update:extraField', val))

function handleUpload({ file }) {
  const reader = new FileReader()
  reader.onload = () => emit('update:imageUrl', reader.result)
  reader.readAsDataURL(file.file)
  return false
}
</script>
