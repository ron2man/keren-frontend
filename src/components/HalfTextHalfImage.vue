<template>
  <div class="page flex grow1 column">
    <div class="page__image flex" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
    <div class="page__text flex grow1 column">
      <h2 class="page__text__title">{{title}}</h2>
      <p v-for="(p,idx) in paragraphs" :key="idx">{{p}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HalfTextHalfImage",
  props:{
    title: {
      type: String,
      required: true
    },
    paragraphs: {
      type: Array
    },
    image: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
.page {
  @media (min-width: 768px) {
    flex-direction: row;
  }
  &__text {
    padding: 30px;
    &__title {
      margin: 10px 0;
      letter-spacing: 0.9px;
      font-size: 40px;
      line-height: 44px;
    }
    p {
      margin-bottom: 18px;
      font-size: 16px;
      line-height: 32px;
      font-weight: 400;
    }
  }
  &__image {
    background-position: center;
    //background-image: url("~@/assets/about-kl.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 350px;
    @media (min-width: 768px) {
      order: 2;
      height: unset;
      flex: 1;
    }
  }
}
</style>>