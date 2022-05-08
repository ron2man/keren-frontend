<template>
  <div id="app" class="flex column height100">
    <Header/>

    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
#app {
  direction: rtl;
  font-family: var(--primary-font)
}
</style>
