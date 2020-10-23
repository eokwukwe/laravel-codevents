<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <home v-if="homePage" />

    <span v-else>
      <navigation />

      <v-main style="min-height: 100vh" class="grey lighten-3">
        <router-view></router-view>
      </v-main>
    </span>
  </v-app>
</template>


<script>
import Home from "./views/Home";
import Navigation from "./components/navigation/Navigation";

export default {
  name: "App",

  components: {
    Home,
    Navigation,
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },

    homePage() {
      return this.$route.fullPath === "/";
    },
  },
};
</script>

<style>
  .theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
    color: white !important;
    background-color: #9575cd !important;
    pointer-events: auto;
    cursor: not-allowed !important;
  }

  .v-btn.v-btn--depressed.v-btn--disabled.btn--cancel:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
    background-color: gray !important;
  }

  .homepage {
    background-color: transparent;
  }

  html {
    overflow-y: auto;
    scroll-behavior: smooth;
  }
</style>
