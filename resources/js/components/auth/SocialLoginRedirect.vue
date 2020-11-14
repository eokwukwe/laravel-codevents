<template>
  <v-container>
    <div class="d-flex justify-center text-h6 text-sm-h4 verification--message">
      Please wait while we verify your email
    </div>

    <v-progress-circular
      :size="70"
      :width="3"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SocialLoginRedirect",

  data: () => ({
    authenticating: false,
  }),

  mounted: function () {
    this.authenticating = true;

    const token = this.$route.query.token;
    const expiresIn = this.$route.query.expiresIn;

    this.socialLoginSuccess({ token, expiresIn });

    this.authenticating = false;

    this.getLoggedInUser()

    this.$router.push({ name: "EventsPage" });
  },

  methods: {
    ...mapActions(["socialLoginSuccess", "getLoggedInUser"]),
  },
};
</script>

<style>
</style>
