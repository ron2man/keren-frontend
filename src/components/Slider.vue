<template>
  <ul id="all_slides">
    <li class="slide" v-for="(slide, idx) in sliders" :key=idx :class="{active: activeSlideIdx == idx}"></li>
  </ul>
</template>

<script>
export default {
  name: "Slider",
    data: function() {
    return {
        activeSlideIdx: 0,
        interval: null,
        //TODO - change to slides with image path
        sliders: ['test','hello','kitty']
    };
  },
  methods: {
      goToNextSlide(){
          if (this.activeSlideIdx + 1 < this.sliders.length) {
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
  font-size: 40px;
  padding: 40px;
  box-sizing: border-box;
  background: #333;
  color: #fff;
  background-size: cover;
}
.slide:nth-of-type(1) {
  background-image: url("~@/assets/hp/1.jpg");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.slide:nth-of-type(2) {
  background-image: url("~@/assets/hp/2.png");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.slide:nth-of-type(3) {
  background-image: url("~@/assets/hp/3.png");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.controls {
  display: none;
}
.controls {
  display: inline-block;
  position: relative;
  top: 1rem;
  right: 0.5rem;
  border: none;
  outline: none;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid #fff;
  border-radius: 1.5rem;
  background: gold;
  width: 3rem;
  height: 3rem;
  margin-left: 0.5rem;
}
.controls:hover,
.controls:focus {
  background: #eee;
  color: #333;
}
.container {
  position: relative;
}
.buttons {
  position: absolute;
  right: 0.5rem;
  top: 0px;
  z-index: 10;
  font-size: 0px;
}
</style>