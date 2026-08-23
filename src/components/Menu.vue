<template>
  <nav aria-label="ניווט ראשי">
    <ul class="items flex justify-center" role="list">
      <li class="item" v-for="(item, idx) in menuItems" :key="idx" role="listitem">
        <a :href="item.route" @click.prevent="onItemClick(item.route)" :aria-current="isActive(item.route) ? 'page' : undefined">
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  data: function () {
    return {
      menuItems: [
        { label: 'ראשי', route: '/' },
        { label: 'אודות', route: '/about' },
        { label: 'פרויקטים', route: '/projects' },
        { label: 'צור קשר', route: '/contact' },
      ]
    }
  },
  methods: {
    onItemClick(route) {
      this.$router.push(route);
    },
    isActive(route) {
      return this.$route && this.$route.path === route;
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin: 0;
  .item {
    padding: 0 15px;
    a {
      text-decoration: none;
      color: inherit;
      transition: 0.3s color;
      display: block;
      padding: 8px 0;
      &:hover,
      &:focus {
        color: gray;
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }
      &[aria-current="page"] {
        font-weight: 600;
      }
    }
  }
}
</style>