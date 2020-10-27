<template>
  <span>
    <v-btn
      icon
      style="background-color: #bbdefb"
      color="blue darken-3"
      depressed
    >
      <v-icon size="30" color="blue darken-4">mdi-facebook</v-icon>
    </v-btn>

    <v-btn icon style="background-color: #e0e0e0" depressed class="ml-4">
      <v-icon color="black darken-4">mdi-github</v-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  name: 'SocialAuthButtons'
};
</script>

<style>
</style>
