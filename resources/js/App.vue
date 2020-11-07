<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-dialog
      persistent
      min-width="350"
      max-width="400"
      :value="authModal.status"
    >
      <v-card class="text-center darken-5">
        <v-card-title class="headline d-flex justify-center warning--text">
          <v-icon left color="warning">mdi-alert</v-icon>
          {{ authModal.messageTitle }}
        </v-card-title>
        <v-card-text>
          {{ authModal.messageContent }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeAuthModal">close</v-btn>
          <v-btn color="primary darken-1" text @click.stop="goToLogin">
            login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

import Home from "./views/Home";
import Navigation from "./components/navigation/Navigation";

export default {
  name: "App",

  components: {
    Home,
    Navigation,
  },

  computed: {
    ...mapGetters(["authModal"]),

    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },

    homePage() {
      return this.$route.fullPath === "/";
    },
  },

  created: function () {},

  mounted: function () {},

  methods: {
    ...mapActions(["hideAuthModal"]),

    closeAuthModal() {
      this.hideAuthModal();
      this.$router.push({ name: "EventsPage" });
    },

    goToLogin() {
      this.hideAuthModal();
      this.$router.push({ name: "LoginPage" });
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
