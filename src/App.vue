<template>
  <div id="app" class="flex column height100">
    <Header/>
    <router-view class="main-view" />
    <Menu class="menu-bottom width100"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu";

export default {
  components: {
    Menu,
    Header
  }
};
</script>

<style lang="scss">
#app {
  direction: rtl;
  font-family: var(--primary-font);
  .main-view{
    padding-bottom: 56px;
    @media only screen and (min-width: 600px) {
      padding-bottom: unset;
    }
  }
  .menu-bottom{
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    padding: 20px;
    position: fixed;
    bottom: 0;
    background: white;
    z-index: 2;
    @media only screen and (min-width: 600px) {
      display: none
    }
  }
}
</style>