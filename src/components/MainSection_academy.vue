<script setup>
import '@/assets/styles/About.css'
import { aboutText } from '@/data/AboutText'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import locale from '@fullcalendar/core/locales/zh-tw'
import { ref, onMounted } from 'vue'
import 'vue3-carousel/carousel.css'
import '@/assets/styles/Gallery.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useGallery } from '@/composables/useGallery.js'
import api from '@/utils/axios'

const { currentSlide, slideTo, galleryConfig, thumbnailsConfig } = useGallery([])
function bufferToImageUrl(file) {
  // 後端傳來的 file 包含 { data: [...], mimetype: 'image/jpeg' }
  const byteArray = new Uint8Array(file.data)
  const blob = new Blob([byteArray], { type: file.mimetype })
  return URL.createObjectURL(blob)
}
const images = ref([])
onMounted(async () => {
  try {
    const res = await api.get('/officialMana/getCarouselImg/course')
    // console.log(res)
    images.value = res.data.map((item) => ({
      id: item.id,
      url: bufferToImageUrl(item.file),
    }))
  } catch (error) {
    console.error('取得圖片失敗', error)
  }
})
const isDialogVisible = ref(false)
const selectedEvent = ref(null) // 儲存被點擊的日曆事件基本資訊
const detailedCourse = ref(null) // 儲存從 API 獲取的詳細課程資料
const isLoadingCourse = ref(false) // 控制載入中狀態
const courseError = ref('') // 儲存 API 錯誤訊息
function parseAndFormatCourseData(rawData) {
  const data = {}
  for (const key in rawData) {
    let value = rawData[key]
    if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
      try {
        value = JSON.parse(value)
      } catch (e) {}
    }
    data[key] = value
  }

  if (data.courseDate) {
    const datePart = data.courseDate.split('T')[0] // 取 'YYYY-MM-DD'
    if (data.courseSTime) {
      data.start = `${datePart}T${data.courseSTime}:00` // 組合出 'YYYY-MM-DDTHH:mm:ss'
    }
    if (data.courseETime) {
      data.end = `${datePart}T${data.courseETime}:00`
    }
  }

  return data
}
async function fetchCourseDetails(courseNo) {
  isLoadingCourse.value = true
  detailedCourse.value = null
  courseError.value = ''
  try {
    const res = await api.get(`/school/course/${courseNo}`)
    detailedCourse.value = parseAndFormatCourseData(res.data)
  } catch (err) {
    console.error('取得一筆課程資料失敗:', err.response?._data || err)
    courseError.value = '讀取課程詳細資料失敗，請稍後再試。'
  } finally {
    isLoadingCourse.value = false
  }
}

async function openDialog(event, id) {
  selectedEvent.value = event
  isDialogVisible.value = true

  if (id) {
    await fetchCourseDetails(id)
  } else {
    courseError.value = '找不到課程編號，無法讀取詳細資料。'
  }
}

function closeDialog() {
  isDialogVisible.value = false
  setTimeout(() => {
    selectedEvent.value = null
    detailedCourse.value = null
    isLoadingCourse.value = false
    courseError.value = ''
  }, 300)
}

function formatDateTime(date) {
  if (!date) return '無提供'
  return new Date(date).toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
async function getAllCalendarCourses(query = {}) {
  try {
    const res = await api.post('/school/course/calender', {
      type: query.type,
      startDate: query.startDate,
      endDate: query.endDate,
    })
    return res.data
  } catch (err) {
    console.error('取得行事曆課程資訊失敗:', err.response?._data || err)
    return []
  }
}
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  height: 780,
  timeZone: 'Asia/Taipei',
  locale, // 語言設定
  dayMaxEventRows: 3, // for all non-TimeGrid views
  fixedWeekCount: false,
  handleWindowResize: true,
  windowResizeDelay: 100,
  aspectRatio: 2,
  headerToolbar: {
    left: 'prev,next,today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  selectable: true,
  editable: true,
  events: async function (info) {
    const startRange = info.startStr.split('+', 1) + '.000Z'
    const endRange = info.endStr.split('+', 1) + '.000Z'
    const apiParameters = {
      startDate: startRange,
      endDate: endRange,
      type: 'college',
    }
    const originalEvents = await getAllCalendarCourses(apiParameters)

    if (Array.isArray(originalEvents)) {
      return originalEvents.map((event) => ({
        ...event,
        display: 'block',
        backgroundColor: '#bde0fe', // 作用於整個事件容器
        borderColor: '#bde0fe', // 控制邊框顏色
        textColor: '#2c3e50', // 控制文字顏色
      }))
    }
    return []
  },
  eventContent: function (arg) {
    const html = `<div style="white-space: normal; ">
                    <b>${arg.timeText}</b>
                    <span>${arg.event.title}</span>
                  </div>`
    return { html }
  },
  // 查看課程資訊
  eventClick: async function (info) {
    // 帶ID連結到課程資訊頁面
    info.jsEvent.preventDefault() // 阻止瀏覽器預設行為 (例如跳轉)
    openDialog(info.event, info.event.id)
  },
})
</script>
<template>
  <main>
    <div class="about-container">
      <section class="header-section">
        <h1 class="main-title">學習不老，松齡同行</h1>
        <p class="subtitle">啟動第二人生，一起探索、一起成長──在松齡學院，活出豐盛每一天</p>
      </section>

      <section class="content-section">
        <!-- <img class="about-image" src="@/assets/images/mainPic1.jpg" alt="松齡學院" /> -->
        <div class="gallery-container">
          <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
            <Slide v-for="image in images" :key="image.id">
              <img
                :src="image.url"
                alt="Gallery Image"
                class="gallery-image"
                loading="lazy"
                @load="(e) => e.target.classList.add('loaded')"
              />
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>

          <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
            <Slide v-for="image in images" :key="image.id">
              <template #default="{ currentIndex, isActive }">
                <div
                  :class="['thumbnail', { 'is-active': isActive }]"
                  @click="slideTo(currentIndex)"
                >
                  <img
                    :src="image.url"
                    alt="Thumbnail Image"
                    class="thumbnail-image"
                    loading="lazy"
                    @load="(e) => e.target.classList.add('loaded')"
                  />
                </div>
              </template>
            </Slide>
          </Carousel>
        </div>
        <div class="about-text">
          <p>{{ aboutText.academy1 }}</p>
        </div>
        <img src="@/assets/images/in-love.png" alt="小圖" class="corner-icon" loading="lazy" />
      </section>

      <hr class="divider" />

      <section class="calendar-section">
        <!-- <h2 style="color: red">🚫行事曆功能建置中</h2> -->
        <img src="@/assets/images/icon_lotus.png" alt="蓮花" class="lotus-icon" loading="lazy" />
        <span class="calendar-title">行事曆</span>
        <img src="@/assets/images/icon_lotus.png" alt="蓮花" class="lotus-icon" loading="lazy" />
        <FullCalendar :options="calendarOptions" style="width: 100%" />
      </section>
    </div>

    <!-- 課程資訊對話框 -->
    <div v-if="isDialogVisible" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>{{ detailedCourse?.courseName || selectedEvent?.title || '課程詳細資訊' }}</h3>
          <button class="close-button" @click="closeDialog">&times;</button>
        </div>
        <div class="dialog-body">
          <!-- 載入中狀態 -->
          <div v-if="isLoadingCourse" class="loading-state">載入中，請稍候...</div>
          <!-- 錯誤狀態 -->
          <div v-else-if="courseError" class="error-state">{{ courseError }}</div>
          <!-- 成功獲取資料 -->
          <div v-else-if="detailedCourse">
            <p class="dialog-text">
              <strong>課程名稱：</strong> {{ detailedCourse.courseName || '無' }}
            </p>
            <p class="dialog-text">
              <strong>授課老師：</strong> {{ detailedCourse.Lecturer.empName || '無' }}
            </p>
            <p class="dialog-text">
              <strong>課程地點：</strong> {{ detailedCourse.classRoom || '無' }}
            </p>
            <p class="dialog-text">
              <strong>開始時間：</strong> {{ formatDateTime(detailedCourse.start) }}
            </p>
            <p class="dialog-text">
              <strong>結束時間：</strong> {{ formatDateTime(detailedCourse.end) }}
            </p>
            <p class="dialog-text"><strong>課程描述：</strong></p>
            <p class="dialog-text">{{ detailedCourse.courseDescription || '無詳細描述' }}</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button @click="closeDialog">關閉</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.dialog-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  transform: scale(1);
  transition: transform 0.3s ease;
  overflow: hidden;
}
.dialog-text {
  font-size: 15px;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d9534f;
  color: white;
  padding: 12px 24px;
}

.dialog-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8); /* 半透明白色 */
  line-height: 1;
  padding: 0;
}
.close-button:hover {
  color: white; /* 滑鼠懸浮時變為不透明白色 */
}

.dialog-body {
  padding: 16px 24px;
  line-height: 1.6;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dialog-body h4 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #0056b3;
}
.dialog-body p {
  margin: 8px 0;
}
.dialog-body p strong {
  color: #0056b3;
  font-size: 1.05em;
  margin-right: 8px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}
.error-state {
  color: #d9534f;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  background-color: #f7f7f7;
  border-top: 1px solid #eee;
}

.dialog-footer button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}
.dialog-footer button:hover {
  background-color: #0056b3;
}
</style>
