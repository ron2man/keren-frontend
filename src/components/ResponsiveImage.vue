<template>
  <picture>
    <source
      v-for="(source, index) in webpSources"
      :key="`webp-${index}`"
      :srcset="source.srcset"
      :media="source.media"
      type="image/webp"
    />
    <img
      :src="fallbackSrc"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :loading="loading"
      :width="width"
      :height="height"
      :class="imgClass"
      @load="onLoad"
      @error="onError"
    />
  </picture>
</template>

<script>
import { getPictureSources, getImageSrcSet, getResponsiveImageSrc } from '@/utils/image-helper'

export default {
  name: 'ResponsiveImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['thumbnail', 'medium', 'large'].includes(value)
    },
    loading: {
      type: String,
      default: 'lazy',
      validator: (value) => ['lazy', 'eager'].includes(value)
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    imgClass: {
      type: String,
      default: ''
    },
    sizes: {
      type: String,
      default: '(max-width: 767px) 350px, (max-width: 1023px) 800px, 1200px'
    }
  },
  computed: {
    webpSources() {
      const sources = getPictureSources(this.src)
      return sources || []
    },
    srcset() {
      const set = getImageSrcSet(this.src)
      return set || ''
    },
    fallbackSrc() {
      const optimized = getResponsiveImageSrc(this.src, this.size)
      return optimized || this.src
    }
  },
  methods: {
    onLoad(event) {
      this.$emit('load', event)
    },
    onError(event) {
      this.$emit('error', event)
    }
  }
}
</script>
