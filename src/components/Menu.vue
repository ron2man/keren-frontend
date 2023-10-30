<template>
  <ul class="items flex justify-center">
    <li class="item pointer" v-for="(item, idx) in menuItems" :key="idx" @click="onItemClick(item.route)">{{item.label}}</li>
  </ul>
</template>

<script>
export default {
  name: "Menu",
  data: function () {
    return {
      menuItems: [
        {label: 'אודות', route: '/about'},
        {label: 'פרויקטים', route: '/projects'},
        {label: 'צור קשר', route: '/contact'},
      ]
    }
  },
  methods: {
    onItemClick(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style lang="scss" scoped>
.items{
  box-sizing: border-box;
  .item{
    padding: 0 15px;
    transition: 0.3s color;
    &:hover{
      color: gray;
    }
  }
}
</style>