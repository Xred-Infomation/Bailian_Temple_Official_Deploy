<template>
  <main>
    <div class="top-container">
      <section class="main-section">
        <router-link to="/academy" class="card-link">
          <div class="card">
            <div class="card-label label-green">
              <div class="vertical-border">
                <img src="@/assets/images/school.png" alt="松齡學院示意圖" class="icon" />
                <span class="vertical-text">松齡學院</span>
              </div>
            </div>
            <img
              src="@/assets/images/mainPic1.jpg"
              alt="松齡學院示意圖"
              class="card-img"
              loading="lazy"
            />
          </div>
        </router-link>
        <div class="card">
          <router-link to="/daycare" class="card-link">
            <div class="card-label label-pink">
              <div class="vertical-border">
                <img src="@/assets/images/healthy.png" alt="日托服務示意圖" class="icon" />
                <span class="vertical-text">日托服務</span>
              </div>
            </div>
            <img
              src="@/assets/images/mainPic2.jpg"
              alt="日托服務示意圖"
              class="card-img"
              loading="lazy"
            />
          </router-link>
        </div>
        <div class="card">
          <router-link to="/hotpot" class="card-link">
            <div class="card-label label-pink">
              <div class="vertical-border">
                <img src="@/assets/images/hot-pot.png" alt="不二鍋示意圖" class="icon" />
                <span class="vertical-text">不二齋</span>
              </div>
            </div>
            <img
              src="@/assets/images/mainPic4.jpg"
              alt="不二鍋示意圖"
              class="card-img"
              loading="lazy"
            />
          </router-link>
        </div>
        <div class="card">
          <router-link to="/donation" class="card-link">
            <div class="card-label label-green">
              <div class="vertical-border">
                <img src="@/assets/images/holi.png" alt="護持捐款示意圖" class="icon" />
                <span class="vertical-text">護持捐款</span>
              </div>
            </div>
            <img
              src="@/assets/images/mainPic3.jpg"
              alt="護持捐款示意圖"
              class="card-img"
              loading="lazy"
            />
          </router-link>
        </div>
      </section>

      <aside>
        <h1>
          <img
            src="@/assets/images/butterfly_L.png"
            class="butterfly butterfly-bottom-left"
            alt="蝴蝶"
            loading="lazy"
          />
          <span class="line1">禮佛祈福</span><br />
          <span class="line2">法喜相隨</span>
          <img
            src="@/assets/images/butterfly_R.png"
            class="butterfly butterfly-top-right"
            alt="蝴蝶"
            loading="lazy"
          />
        </h1>
      </aside>
    </div>
    <div class="spacer"></div>
    <section class="news-container">
      <div class="news-inner-container">
        <span class="news-title">最新消息</span>
        <div class="table-scroll-container">
          <n-data-table
            :columns="columns"
            :data="newsData"
            :pagination="pagination"
            :bordered="false"
            :striped="true"
            :size="'large'"
            style="margin-top: 24px"
            :row-props="rowProps"
          />
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import '@/assets/styles/MainSection.css'
import { NDataTable } from 'naive-ui'
// import { columns, pagination } from '@/data/NewsData'
import { ref, onMounted } from 'vue'
import api from '@/utils/axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const newsData = ref([])

onMounted(async () => {
  try {
    const res = await api.post('/officialMana/getAllLatestNews/', {
      title: '',
      startDate: '',
      endDate: '',
    })
    newsData.value = res.data
  } catch (error) {
    console.error(error)
  }
})
const categoryMap = {
  temple: '寺院',
  academy: '松齡學院',
  daycare: '日托服務',
  hotpot: '喜悅素鍋',
  others: '其他',
}
const columns = [
  {
    title: '標題',
    key: 'title',
  },
  {
    title: '類別',
    key: 'latest_news_types',
    render(row) {
      return categoryMap[row.latest_news_types] || '未知'
    },
  },

  {
    title: '發布日',
    key: 'postDate',
    render(row) {
      const date = new Date(row.postDate)
      return date.toLocaleDateString()
    },
  },
]
const pagination = {
  pageSize: 5,
}

function rowProps(row) {
  return {
    style: 'cursor: pointer',
    onClick: () => handleRowClick(row),
  }
}
// 點選列事件
function handleRowClick(row) {
  router.push(`/news/${row.id}`)
}
</script>
