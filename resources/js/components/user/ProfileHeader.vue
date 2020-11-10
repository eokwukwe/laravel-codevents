<template>
  <v-card>
    <div class="d-flex flex-no-wrap align-sm-start">
      <v-avatar class="mt-3 ml-3 mr-0" size="100">
        <v-img :src="profile.photoURL || '/images/user.png'"></v-img>
      </v-avatar>

      <div>
        <v-card-title class="headline text-capitalize">
          {{ profile.name }}
        </v-card-title>

        <v-card-subtitle class="">
          <span>
            <v-icon small>mdi-phone</v-icon>{{ profile.phone || "" }}</span
          >
          <br />
          <v-btn
            x-small
            depressed
            class="mt-2"
            @click="relationships"
            :loading="followLoading"
            v-if="!isLoggedInUserProfile"
            :color="isFollowing ? 'warning' : 'success'"
          >
            {{ isFollowing ? "unfollow" : "follow" }}
          </v-btn>
        </v-card-subtitle>

        <v-card-text class="d-flex">
          <div class="d-flex flex-column mr-3">
            <span class="primary--text stat">{{ profile.followersCount }}</span>
            <span>Followers</span>
          </div>
          <div class="d-flex flex-column">
            <span class="primary--text stat">
              {{ profile.followingsCount }}
            </span>
            <span>Followings</span>
          </div>
        </v-card-text>
      </div>
    </div>

    <v-divider></v-divider>

    <v-card-text>
      <span class="bio font-weight-bold">About Me</span>
      <br />
      <span>
        {{ profile.bio || "Your yet to tell us about yourself 😉😉" }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProfileHeader",

  props: {
    profile: {
      type: Object,
      required: true,
    },
    loggedInUser: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters(["followLoading", "userActionSuccess"]),

    isFollowing() {
      return this.profile?.followers?.some(
        (follower) => follower.id === this.loggedInUser.id
      );
    },

    isLoggedInUserProfile() {
      return this.profile.id === this.loggedInUser.id;
    },
  },

  methods: {
    ...mapActions(["userRelationships", "getUserProfile"]),

    async relationships() {
      await this.userRelationships(this.profile.id);
      await this.getUserProfile(this.profile.id);
    },
  },
};
</script>

<style scoped>
  .stat {
    font-size: 1rem;
    font-weight: bold;
  }

  .bio {
    border-bottom: 1px solid grey;
  }
</style>
