<template>
  <section aria-label="גלריית תמונות רקע" aria-roledescription="carousel">
    <p class="visually-hidden" aria-live="polite" aria-atomic="true">
      תמונה {{ activeSlideIdx + 1 }} מתוך {{ numOfSlides }}
    </p>
    <ul id="all_slides" aria-label="שקופיות">
      <li
        class="slide"
        v-for="(slide, idx) in numOfSlides"
        :key="idx"
        :class="{ active: activeSlideIdx === idx }"
        :aria-hidden="activeSlideIdx !== idx ? 'true' : undefined"
      ></li>
    </ul>
    <button
      class="slider-pause-btn"
      @click="togglePause"
      :aria-label="isPaused ? 'הפעל מצגת' : 'השהה מצגת'"
      :aria-pressed="isPaused"
    >
      <i :class="isPaused ? 'fa fa-play' : 'fa fa-pause'" aria-hidden="true"></i>
    </button>
  </section>
</template>

<script>
export default {
  name: "Slider",
  data: function() {
    return {
      numOfSlides: 13,
      activeSlideIdx: 0,
      interval: null,
      isPaused: false,
    };
  },
  methods: {
    goToNextSlide() {
      this.activeSlideIdx = (this.activeSlideIdx + 1) % this.numOfSlides;
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.goToNextSlide, 2100);
      }
    }
  },
  created() {
    this.interval = setInterval(this.goToNextSlide, 2100);
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

section {
  position: relative;
  width: 100%;
  flex: 1;
}

.slider-pause-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.8);
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
}

#all_slides {
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.slide {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  -webkit-transition: opacity 1.5s;
  -moz-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
}
.active {
  opacity: 1;
  z-index: 2;
}
.slide {
  padding: 40px;
  box-sizing: border-box;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
@for $i from 1 through 13 {
  .slide:nth-of-type(#{$i}) {
    background-image: url(~@/assets/background/#{$i}.jpg);
  }
}
</style>