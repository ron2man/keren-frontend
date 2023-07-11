<template>
  <div :id="'lightgallery-'+idx">
    <a
        :href="item.image"
        v-for="(item, index) in items"
        :id="(index == 0) ? `first-${idx}` : ''" :key="index"
        style="display: none">
      <img :src="item.image" style="display: none">
    </a>
  </div>
</template>

<script>
import 'lightgallery.js'
import 'lightgallery.js/dist/css/lightgallery.css'

export default {
  name: "LightGallery",
  props: {
    items: {
      type: Array,
      required: true,
      // validator: value => value.image && value.thumbnail
    },
    idx: {
      type: Number,
      required: true
    }
  },
  mounted() {
    const el = document.getElementById(`lightgallery-${this.idx}`)
    window.lightGallery(el,{
      thumbnail:true,
      animateThumb: false,
      showThumbByDefault: true,
      download: false,
      toggleThumb: true,
    })
    document.getElementById(`first-${this.idx}`).click()

  }

}
</script>