<template>
  <div :id="'lightgallery-'+idx" role="region" :aria-label="'גלריית תמונות - ' + projectTitle">
    <a
      :href="item.image"
      v-for="(item, index) in loadedItems"
      :id="(index == 0) ? `first-${idx}` : ''"
      :key="index"
      :aria-label="projectTitle + ' - תמונה ' + (index + 1) + ' מתוך ' + loadedItems.length"
      style="display: none">
      <img :src="item.image" :alt="projectTitle + ' - תמונה ' + (index + 1)" style="display: none">
    </a>
  </div>
</template>

<script>
export default {
  name: "LightGallery",
  props: {
    galleryPaths: {
      type: Array,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    projectTitle: {
      type: String,
      default: 'פרויקט'
    }
  },
  data() {
    return {
      loadedItems: [],
      lightGalleryLoaded: false
    }
  },
  async mounted() {
    this.loadGalleryImages()
    await this.loadLightGallery()
    this.initGallery()
  },
  methods: {
    loadGalleryImages() {
      const images = require.context('@/assets/projects', true, /\.(jpg|jpeg|png|gif)$/i)

      this.loadedItems = this.galleryPaths.map(path => {
        const imagePath = `./${path.replace('projects/', '')}`
        try {
          return { image: images(imagePath) }
        } catch (e) {
          console.warn(`Failed to load image: ${path}`, e)
          return { image: '' }
        }
      })
    },
    async loadLightGallery() {
      if (this.lightGalleryLoaded) return

      await Promise.all([
        import('lightgallery.js'),
        import('lightgallery.js/dist/css/lightgallery.css')
      ])

      this.lightGalleryLoaded = true
    },
    initGallery() {
      this.$nextTick(() => {
        const el = document.getElementById(`lightgallery-${this.idx}`)
        if (el && window.lightGallery) {
          window.lightGallery(el, {
            thumbnail: true,
            animateThumb: false,
            showThumbByDefault: true,
            download: false,
            toggleThumb: true,
          })
          const firstEl = document.getElementById(`first-${this.idx}`)
          if (firstEl) {
            firstEl.click()
          }
        }
      })
    }
  },
  beforeDestroy() {
    const el = document.getElementById(`lightgallery-${this.idx}`)
    if (el && el.___lightGallery) {
      el.___lightGallery.destroy(true)
    }
  }
}
</script>
