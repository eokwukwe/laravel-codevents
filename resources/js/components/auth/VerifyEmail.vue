<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <div class="d-flex justify-center text-h6 text-sm-h4 verification--message">
      Please wait while we verify your email
    </div>

    <v-progress-circular
      :size="70"
      :width="3"
      color="purple"
      indeterminate
    ></v-progress-circular>

    <div class="d-flex justify-center text-h6 text-sm-h4 verification--message">
      Email verification successful
    </div>

    <v-btn depressed color="primary">
      Proceed to login
      <v-icon right>mdi-arrow-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "VerifyEmail",
};
</script>

<style scoped>
  .verification--message {
    padding: 4rem 0;
  }
</style>
