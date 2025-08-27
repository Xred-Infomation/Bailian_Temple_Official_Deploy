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
    const res = await api.get('/officialMana/getCarouselImg/bailianTemple')
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
        <h1 class="main-title">一磚一瓦的心願：白蓮寺的溫暖歷程</h1>
        <p class="subtitle">創建、遷建到重建，是眾人合力築起的信仰與情感之地。</p>
      </section>

      <section class="content-section">
        <!-- <img class="about-image" src="@/assets/images/about.jpg" alt="白蓮寺外觀" loading="lazy" /> -->
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
          <p>{{ aboutText.about1 }}</p>
        </div>
      </section>
    </div>
  </main>
</template>
