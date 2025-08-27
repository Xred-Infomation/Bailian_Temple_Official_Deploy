// src/composables/useGallery.js
import { ref } from 'vue'

const staticImages = [
  {
    id: 1,
    url: new URL('@/assets/images/mainPic4.jpg', import.meta.url).href,
  },
  {
    id: 2,
    url: new URL('@/assets/images/hotpot1.jpg', import.meta.url).href,
  },
  {
    id: 3,
    url: new URL('@/assets/images/hotpot2.jpg', import.meta.url).href,
  },
  {
    id: 4,
    url: new URL('@/assets/images/hotpot3.jpg', import.meta.url).href,
  },
  {
    id: 5,
    url: new URL('@/assets/images/hotpot4.jpg', import.meta.url).href,
  },
]

const menuImages = [
  {
    id: 1,
    url: new URL('@/assets/images/hotpotmenu1.jpg', import.meta.url).href,
  },
  {
    id: 2,
    url: new URL('@/assets/images/hotpotmenu2.jpg', import.meta.url).href,
  },
]
// const menuImages = staticImages.map((img) => ({ ...img }))
export function useGallery(initialMenuImages = []) {
  const currentSlide = ref(0)
  const slideTo = (index) => {
    currentSlide.value = index
  }

  const galleryConfig = {
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade',
    mouseDrag: false,
    touchDrag: false,
    height: 320,
  }

  const thumbnailsConfig = {
    height: 80,
    itemsToShow: 6,
    wrapAround: true,
    touchDrag: false,
    gap: 10,
  }
  const menuconfig = {
    height: 750,
    itemsToShow: 'auto',
    gap: 10,
  }
  return {
    currentSlide,
    slideTo,
    galleryConfig,
    thumbnailsConfig,
    menuconfig,
    images: staticImages,
    menuImages: ref(initialMenuImages),
  }
}
