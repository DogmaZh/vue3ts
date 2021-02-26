<template>
  <div class="app" id="app">
    <app-header :items="navItems" title="Dogs App" />
    <main class="app__content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { NavItem } from "@/models";
import appHeader from "@/components/app-header.vue";

export default {
  name: "App",
  components: { appHeader },
  setup() {
    const navItems: NavItem[] = [
      {
        id: 0,
        text: "Home",
        route: "home",
        icon: "home"
      },
      {
        id: 1,
        text: "Favorites",
        route: "favorites",
        icon: "favorite"
      }
    ];

    return { navItems };
  }
};
</script>

<style lang="scss">
.app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  box-sizing: border-box;

  &__content {
    padding: 20px 40px 50px;
  }
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
