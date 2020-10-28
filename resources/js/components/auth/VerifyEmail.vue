<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <span
      v-if="authLoading"
      class="d-flex flex-column align-center justify-center"
    >
      <div
        class="d-flex justify-center text-h6 text-sm-h4 verification--message"
      >
        Please wait while we verify your email
      </div>

      <v-progress-circular
        :size="70"
        :width="3"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </span>

    <span
      v-if="isVerified.status"
      class="d-flex flex-column align-center justify-center"
    >
      <div
        class="d-flex justify-center text-h6 text-sm-h4 verification--message"
      >
        {{ isVerified.message }}
      </div>

      <v-btn :to="{ name: 'LoginPage' }" depressed color="primary">
        Proceed to login
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </span>

    <span
      v-if="!isVerified.status && !authLoading"
      class="d-flex flex-column align-center justify-center"
    >
      <div
        class="text-center text-h6 text-sm-h4 verification--message"
      >
        <span>{{ verifyError.message }}</span>
      </div>

      <v-btn :to="{ name: 'ResendLinkPage' }" depressed color="primary">
        request a new link
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </span>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "VerifyEmail",

  data: () => ({
    snackbar: true,
  }),

  mounted: async function () {
    const requestData = {
      id: this.$route.params.id,
      query: Object.keys(this.$route.query)
        .map((key) => `${key}=${this.$route.query[key]}`)
        .join("&"),
    };

    console.log("verify", this.isVerified);

    await this.verification(requestData);
  },

  computed: {
    ...mapGetters(["authLoading", "verifyError", "isVerified"]),
  },

  methods: {
    ...mapActions(["verify"]),

    async verification(props) {
      await this.verify(props);
    },
  },
};
</script>

<style scoped>
  .verification--message {
    padding: 4rem 0;
  }
</style>
