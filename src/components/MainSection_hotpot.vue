<script setup>
import '@/assets/styles/About.css'
import { aboutText } from '@/data/AboutText.js'
import { ref, onMounted } from 'vue'
import 'vue3-carousel/carousel.css'
import '@/assets/styles/Gallery.css'

import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useGallery } from '@/composables/useGallery.js'
import api from '@/utils/axios'
const menuImagesSource = ref([])
const restaurantImages = ref([])
const { currentSlide, slideTo, galleryConfig, thumbnailsConfig, menuconfig, images, menuImages } =
  useGallery(menuImagesSource.value)

const carouselKey = ref(0)
function bufferToImageUrl(file) {
  const byteArray = new Uint8Array(file.data)
  const blob = new Blob([byteArray], { type: file.mimetype })
  return URL.createObjectURL(blob)
}
onMounted(async () => {
  try {
    const menu = await api.get('/officialMana/getCarouselImg/menu')
    const res = await api.get('/officialMana/getCarouselImg/restaurant')
    menuImages.value = menu.data.map((item) => ({
      id: item.id,
      url: bufferToImageUrl(item.file),
    }))
    restaurantImages.value = res.data.map((item) => ({
      id: item.id,
      url: bufferToImageUrl(item.file),
    }))
  } catch (error) {
    console.error('取得菜單圖片失敗', error)
  }

  setTimeout(() => {
    carouselKey.value++
  }, 200)
})
</script>

<template>
  <main>
    <div class="about-container">
      <section class="header-section">
        <h1 class="main-title">純粹自然的美味火鍋體驗</h1>
        <p class="subtitle">細火慢熬，感受自然清新滋味</p>
      </section>
      <section class="content-section">
        <div class="gallery-container">
          <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
            <Slide v-for="image in restaurantImages" :key="image.id">
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
            <Slide v-for="image in restaurantImages" :key="image.id">
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
          <p>{{ aboutText.hotpot1 }}</p>
          <p>{{ aboutText.hotpot2 }}</p>
        </div>
      </section>
      <hr class="divider" />

      <h1>菜單</h1>
      <div class="menu-container">
        <Carousel v-bind="menuconfig" :key="carouselKey">
          <Slide v-for="image in menuImages" :key="image.id">
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
            <Pagination />
          </template>
        </Carousel>
      </div>
      <hr class="divider" />

      <div>
        <h1>營業時間</h1>
        <p>{{ aboutText.hotpot3 }}</p>
      </div>
    </div>
  </main>
</template>
