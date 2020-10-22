<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
import Navigation from "./components/navigation/Navigation";

export default {
  name: "App",

  components: {
    Navigation,
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },

    homePage() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style>
  .theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
    color: white !important;
    background-color: #9575cd !important;
    cursor: not-allowed !important;
  }

  .v-btn.v-btn--depressed.v-btn--disabled.btn--cancel:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
    background-color: gray !important;
  }
</style>
