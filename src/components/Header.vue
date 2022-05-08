<template>
  <header class="flex justify-between width100">
    <div class="logo-container flex justify-center align-center" v-on:click="goHome">
      <img class="logo" src="@/assets/keren-leizarovich.png" alt="KL logo" />
      <h1 class="title">
        קרן לייזרוביץ
        <span>אדריכלות ועיצוב פנים</span>
      </h1>
    </div>
    <div class="icons flex justify-center align-center">
      <div v-for="(icon,index) in icons" :key="index" class="icon-container flex justify-center align-center">
        <a :href="icon.link" target="_blank">
          <i :class="icon.path" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      icons: [
        { path: "fa fa-phone", link: "tel:+972548166025" },
        {
          path: "fa fa-facebook",
          link: "https://www.facebook.com/keren.leizarovitch"
        },
        {
          path: "fa fa-instagram",
          link: "https://www.instagram.com/keren.lei__architect/"
        },
        {
          path: "fa fa-whatsapp",
          link:
            "https://api.whatsapp.com/send?phone=972548166025&text=Let's%20start%20a%20new%20project"
        },
        { path: "fa fa-envelope-o", link: "mailto:kerenleizarovitch@gmail.com" }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background: white;
  z-index: 3;
  flex-direction: column;
  .logo-container {
    cursor: pointer;
    padding: 15px 0;
    .logo {
      max-height: 50px;
    }
    .title {
      user-select: none;
      font-size: 16x;
      line-height: 18px;
      letter-spacing: 4px;
      font-weight: 600;
      color: #111;
      span {
        margin-top: 5px;
        font-weight: 300;
        display: block;
        letter-spacing: 1.6px;
      }
    }
  }
  .icons {
    margin-bottom: 10px;
    .icon-container {
      transition: 0.3s;
      cursor: pointer;
      margin: 0 10px;
      width: 30px;
      height: 30px;
      border: 1px black solid;
      border-radius: 50%;
      a,
      a:active,
      a:visited {
        color: black;
      }
      &:hover {
        background: black;
        a,
        a:active,
        a:visited {
          color: white;
        }
      }
    }
  }

  @media only screen and (min-width: 600px) {
    flex-direction: row;
    padding: 0 30px;
    width: unset;
  }
}
</style>
