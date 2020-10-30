<template>
  <span>
    <v-btn
      icon
      style="background-color: #bbdefb"
      color="blue darken-3"
      depressed
      @click="socialLogin('facebook')"
    >
      <v-icon size="30" color="blue darken-4">mdi-facebook</v-icon>
    </v-btn>

    <v-btn
      icon
      style="background-color: #e0e0e0"
      depressed
      class="ml-4"
      @click="socialLogin('github')"
    >
      <v-icon color="black darken-4">mdi-github</v-icon>
    </v-btn>
  </span>
</template>

<script>
import request from "../../api/request";

export default {
  name: "SocialAuthButtons",

  data: () => ({
    socialLoginBaseURL: "",
  }),

  created: function () {
    process.env.NODE_ENV === "development"
      ? (this.socialLoginBaseURL = process.env.MIX_DEV_BASE_URL)
      : (this.socialLoginBaseURL = process.env.MIX_PROD_BASE_URL);
  },

  methods: {
    socialLogin(provider) {
      window.location.href = `${this.socialLoginBaseURL}/login/${provider}`;
    },
  },
};
</script>

<style>
</style>
