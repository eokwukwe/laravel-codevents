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

  created: function () {
    console.log("profile", this.$route.path);
  },

  watch: {
    "$route.params.id": function (id) {
      console.log("profile id route change", id);
    },
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log("beforeRouteUpdate", to);
  // },
};
</script>

<style scoped>
</style>
