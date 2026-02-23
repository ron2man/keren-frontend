<template>
  <div class="page flex grow1 column">
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

<style lang="scss" scoped></style>>
