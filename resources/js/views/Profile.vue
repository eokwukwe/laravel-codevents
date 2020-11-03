<template>
  <v-container>
    <profile-header />

    <div class="my-4"></div>
    <v-btn @click="getProfile('76b060cc-4895-43bd-9e24-57482da91d53')">
      get profile
    </v-btn>

    <profile-tabs />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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

  methods: {
    ...mapActions(["clearErrors", "getProfile"]),
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log("beforeRouteUpdate", to);
  // },
};
</script>

<style scoped>
</style>
