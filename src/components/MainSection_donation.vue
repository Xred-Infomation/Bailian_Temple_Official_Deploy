<script setup>
import '@/assets/styles/About.css'
import { aboutText } from '@/data/AboutText'
import { ref, onMounted } from 'vue'
import 'vue3-carousel/carousel.css'
import '@/assets/styles/Gallery.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useGallery } from '@/composables/useGallery.js'
import api from '@/utils/axios'

const { currentSlide, slideTo, galleryConfig, thumbnailsConfig } = useGallery([])
function bufferToImageUrl(file) {
  const byteArray = new Uint8Array(file.data)
  const blob = new Blob([byteArray], { type: file.mimetype })
  return URL.createObjectURL(blob)
}
const images = ref([])
onMounted(async () => {
  try {
    const res = await api.get('/officialMana/getCarouselImg/blessingLight')
    console.log(res)
    images.value = res.data.map((item) => ({
      id: item.id,
      url: bufferToImageUrl(item.file),
    }))
  } catch (error) {
    console.error('取得圖片失敗', error)
  }
})
</script>
<template>
  <main>
    <div class="about-container">
      <section class="header-section">
        <h1 class="main-title">一念護持·萬世福田</h1>
        <p class="subtitle">善念匯聚，共護法輪轉，利益無量眾生</p>
      </section>

      <section class="content-section">
        <!-- <img class="about-image" src="@/assets/images/donation.jpg" alt="捐款" loading="lazy" /> -->
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
          <p>{{ aboutText.donation1 }}</p>
          <p>{{ aboutText.donation2 }}</p>

          <div>
            <p><strong>點燈服務專線：</strong>039512827</p>
            <hr />
            <h3>捐款詳情</h3>
            <p><strong>機構：</strong>羅東西門郵局</p>
            <ul>
              <li><strong>戶名：</strong>白蓮寺</li>
              <li><strong>帳號：</strong>01113340058271</li>
            </ul>
            <p class="note">匯款或無摺存款請備註姓名、贊助項目以利查核</p>
          </div>
        </div>
        <img
          src="@/assets/images/monk.png"
          alt="小圖"
          class="corner-icon"
          style="width: 15%"
          loading="lazy"
        />
      </section>
    </div>
  </main>
</template>
