<template>
  <ul id="all_slides">
    <li class="slide" v-for="(slide, idx) in 13" :key=idx :class="{active: activeSlideIdx == idx}"></li>
  </ul>
</template>

<script>
export default {
  name: "Slider",
    data: function() {
    return {
        numOfSlides: 9,
        activeSlideIdx: 0,
        interval: null,
    };
  },
  methods: {
      goToNextSlide(){
          if (this.activeSlideIdx + 1 < this.numOfSlides) {
            this.activeSlideIdx += 1
          } else this.activeSlideIdx = 0 
      }
  },
  created(){
    this.interval = setInterval(this.goToNextSlide, 2100); 
  },
  destroyed(){
      clearInterval(this.interval)
  }
};
</script>

<style scoped lang="scss">
#all_slides {
  position: relative;
  height: 100vh;
  padding: 0px;
  margin: 0px;
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
@for $i from 1 through 12 {
  .slide:nth-of-type(#{$i}) {
    background-image: url(~@/assets/background/#{$i}.jpg);
  }
}
</style>