<template>
  <v-container>
    <div class="d-flex justify-center text-h6 text-sm-h4 verification--message">
      {{ errorMessage }} Or try registering with an email and password.
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
    errorMessage: "",
  }),

  mounted: function () {
    if (this.$route.query.error) {
      this.errorMessage = this.$route.query.error;

      return;
    }

    const token = this.$route.query.token;
    const expiresIn = this.$route.query.expiresIn;

    this.socialLoginSuccess({ token, expiresIn });

    this.getLoggedInUser();

    this.$router.push({ name: "EventsPage" });
  },

  methods: {
    ...mapActions(["socialLoginSuccess", "getLoggedInUser"]),
  },
};
</script>

<style>
</style>
