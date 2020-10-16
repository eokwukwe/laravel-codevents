<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <navigation />
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
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
  },
};
</script>

<style>
  /* .h-screen {
                                min-height: 100vh;
                              } */
</style>
