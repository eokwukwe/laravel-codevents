<template>
  <v-container>
    <profile-header />

    <div class="my-4"></div>

    <profile-tabs />
  </v-container>
</template>

<script>
import ProfileTabs from "./ProfileTabs";
import ProfileHeader from "./ProfileHeader";

export default {
  name: "Profile",

  components: {
    ProfileTabs,
    ProfileHeader,
  },
};
</script>

<style scoped>
</style>
