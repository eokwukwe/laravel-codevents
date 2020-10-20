<template>
  <v-container>
    <profile-header />

    <div class="my-4"></div>

    <profile-tabs />
  </v-container>
</template>

<script>
import ProfileTabs from "../components/user/ProfileTabs";
import ProfileHeader from "../components/user/ProfileHeader";

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
