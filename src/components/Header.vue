<template>
  <header class="flex justify-between width100 align-center">
    <a class="logo-container flex justify-center align-center" @click.prevent="goHome" href="/" :aria-label="'קרן ליזרוביץ - עמוד הבית'">
      <img class="logo" src="@/assets/keren-leizarovich.png" alt="" aria-hidden="true" />
      <span class="title" aria-hidden="true">
        קרן ליזרוביץ
        <span>אדריכלות ועיצוב פנים</span>
      </span>
    </a>
    <Menu class="menu" />
    <div class="icons flex justify-center align-center" role="list">
      <div v-for="(icon,index) in icons" :key="index" class="icon-container flex justify-center align-center" role="listitem">
        <a :href="icon.link" :target="icon.external ? '_blank' : '_self'" :rel="icon.external ? 'noopener noreferrer' : undefined" :aria-label="icon.label">
          <i :class="icon.path" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  name: "Header",
  components: {Menu},
  data: function() {
    return {
      icons: [
        { path: "fa fa-phone", link: "tel:+972548166025", label: "התקשר אלינו", external: false },
        { path: "fa fa-facebook", link: "https://www.facebook.com/keren.leizarovitch", label: "פייסבוק - נפתח בחלון חדש", external: true },
        { path: "fa fa-instagram", link: "https://www.instagram.com/keren.lei__architect/", label: "אינסטגרם - נפתח בחלון חדש", external: true },
        { path: "fa fa-whatsapp", link: "https://api.whatsapp.com/send?phone=972548166025&text=Let's%20start%20a%20new%20project", label: "וואטסאפ - נפתח בחלון חדש", external: true },
        { path: "fa fa-envelope-o", link: "mailto:kerenleizarovitch@gmail.com", label: "שלח אימייל", external: false }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push("/").catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background: white;
  z-index: 3;
  flex-direction: column;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    padding: 0 30px;
    width: unset;
  }
  a.logo-container {
    padding: 15px 0;
    text-decoration: none;
    .logo {
      max-height: 50px;
    }
    .title {
      user-select: none;
      font-size: 16px;
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
  .menu {
    display: none;
    @media only screen and (min-width: 600px) {
      display: inherit;
    }
  }
  .icons {
    margin-bottom: 10px;
    @media only screen and (min-width: 600px) {
      margin: 0;
    }
    .icon-container {
      transition: 0.3s;
      cursor: pointer;
      margin: 0 10px;
      width: 30px;
      height: 30px;
      border: 1px grey solid;
      border-radius: 50%;
      a,
      a:active,
      a:visited {
        color: grey;
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
}
</style>
