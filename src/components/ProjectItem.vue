<template>
  <div class="project-item flex column text-center">
    <ResponsiveImage 
      :src="imgSrc" 
      :alt="title" 
      size="thumbnail"
      loading="lazy" 
      :width="350" 
      :height="250"
    />
    <h3 class="title">{{ title }}</h3>
    <p class="subtitle">{{ subtitle }}</p>
    <p class="description">{{ description }}</p>
    <p class="location">{{ location }}</p>
  </div>
</template>

<script>
import ResponsiveImage from './ResponsiveImage.vue'

export default {
  name: "ProjectItem",
  components: {
    ResponsiveImage
  },
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.project-item {
  img{
    height: 250px;
    object-fit: cover;
  }
  .title {
    padding-top: 17px;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    margin: 0;
  }
  .subtitle {
    font-size: 16px;
    padding-bottom: 8px;
    margin: 0;
  }
  .description {
    font-size: 16px;
    padding-bottom: 6px;
    font-weight: 400;
    margin: 0;
  }
  .location {
    font-size: 14px;
    font-weight: 300;
    margin: 0;
  }
}
</style>