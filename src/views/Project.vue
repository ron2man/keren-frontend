<template>
    <div class="page container project flex column">
      <div class="text-side">
        <h3 class="category">ENVIRONMENT</h3>
        <h2 class="title">Luxurious apartment</h2>
        <p>Main goal for this project was to create highly aesthetic images of a beautiful living space for promotional purposes. The art direction for those interiors was to create Scandinavian interiors with its very characteristic dark interiors combining functionality with minimalism..</p>
      </div>
      <div class="images">
        <img src="@/assets/background/1.jpg" alt="">
        <img src="@/assets/background/1.jpg" alt="">
        <img src="@/assets/background/1.jpg" alt="">
      </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
.project{
  @media (min-width: 768px) {
    padding-top: 100px;
    flex-direction: row;
  }
  .text-side{
    flex: 1;
    padding: 20px;
    @media (min-width: 768px) {
      padding-inline-end: 100px;
    }
    h3.category {
      font-weight: 300;
      letter-spacing: 4.5px;
      margin-top: 0;
      margin-bottom: 0;
      color: #111111;
      font-size: 14px;
      line-height: 18px;
    }
    h2.title{
      letter-spacing: 1px;
      margin-bottom: 0;
      margin-top: 20px;
      color: #111111;
      font-size: 40px;
      line-height: 44px;
    }
    p{
      font-size: 16px;
      line-height: 32px;
      font-weight: 400;
      color: #7e7d7d;
      margin-bottom: 32px;
      margin-top: 27px;
    }
  }
  .images{
    flex: 2;
    & > img {
      max-width: 100%;
      margin-bottom: 30px;
    }
  }

}
</style>>