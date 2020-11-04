<template>
  <v-container>
    <profile-header :profile="userProfile" />

    <div class="my-4"></div>

    <profile-tabs :profile="userProfile" :events="userEvents" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import helpers from "../helpers";
import ProfileTabs from "../components/user/ProfileTabs";
import ProfileHeader from "../components/user/ProfileHeader";

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
    ...mapGetters(["userEvents", "userProfile", "loggedInUser"]),

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
