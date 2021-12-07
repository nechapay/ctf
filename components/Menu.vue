<template>
  <div class="menu">
    <ul class="menu__list">
      <li
        v-for="(item, key, i) in items"
        class="menu__item"
      >
        <menu-item
          :disabled="$store.state.dataSaving"
          :item="item"
          :link="'ws-' + key"
          :index="i * 2 + 2"
          fallback="/ws"
          @check="handleCheck($event, key)"
        ></menu-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import MenuItem from '~/components/menu/MenuItem'

  export default {
    name: 'Menu',
    components: {
      MenuItem: MenuItem
    },
    computed: {
      ...mapState({
        items: state => state.menu.items
      })
    },
    methods: {
      handleCheck ({ selected, item }, name) {
        this.$store.dispatch('menu/setItem', { name, val: Object.assign({}, item, { checked: selected }) })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu {

    &__list {
      list-style: none;
      padding-left: 0;
    }

    &__item {
      margin-bottom: map_get($spacers, 5);
      margin-top: map_get($spacers, 5);
    }
  }
</style>
