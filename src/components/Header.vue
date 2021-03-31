<template>
  <header>
    <div class="logo-container flex">
      <img class="logo" src="@/assets/keren-leizarovich.png" alt="KL logo" />
      <h1 class="title">
        Keren Leizerovitch
        <span>Architecture & Interior design</span>
      </h1>
    </div>
    <div class="icons flex">
      <div v-for="(icon,index) in icons" :key="index" class="icon-container">
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
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  background: white;
  position: fixed;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .logo-container {
    align-items: center;
    padding: 14px;

    .logo {
      max-height: 50px;
      padding: 0 15px 0 0;
    }
    .title {
      user-select: none;
      font-family: Roboto, sans-serif;
      font-size: 16x;
      line-height: 18px;
      letter-spacing: 4px;
      font-weight: 400;
      color: #111;
      span {
        font-weight: 300;

        display: block;
        letter-spacing: 1.6px;
      }
    }
  }
  .icons {
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    .icon-container {
      transition: 0.3s;
      cursor: pointer;
      margin: 0 10px;
      width: 30px;
      height: 30px;
      border: 1px black solid;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
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
    width: unset;
    position: relative;
  }
}
</style>
