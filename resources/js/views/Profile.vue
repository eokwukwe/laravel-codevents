<template>
  <v-container>
    <profile-header :profile="userProfile" :loggedInUser="loggedInUser" />

    <div class="my-4"></div>

    <profile-tabs
      :profile="userProfile"
      :events="userEvents"
      :loggedInUser="loggedInUser"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import helpers from "../helpers";
import ProfileTabs from "../components/user/ProfileTabs";
import ProfileHeader from "../components/user/ProfileHeader";
import SkeletonLoader from "../components/common/SkeletonLoader";

export default {
  name: "Profile",

  props: {
    id: {
      type: String,
    },
  },

  components: {
    ProfileTabs,
    ProfileHeader,
    SkeletonLoader,
  },

  created: function () {
    this.getUserEvents(this.id);
    this.getUserProfile(this.id);
  },

  watch: {
    "$route.params.id": function (id) {
      this.getUserEvents(this.id);
      this.getUserProfile(this.id);
    },
  },

  computed: {
    ...mapGetters(["userEvents", "userProfile", "loggedInUser", "userLoading"]),

    userPro() {
      return this.userProfile;
    },
  },

  methods: {
    ...mapActions(["getUserProfile", "getUserEvents"]),
  },
};
</script>

<style scoped>
</style>
