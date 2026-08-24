<template>
  <div class="page flex grow1 column">
    <h1 class="visually-hidden">קרן ליזרוביץ – אדריכלות ועיצוב פנים</h1>
    <Slider class="page__slideshow flex grow1" />
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";

export default {
  components: { Slider },
  created() {
    console.log("Homepage created");
  },
};
</script>

<style lang="scss" scoped>
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
</style>
