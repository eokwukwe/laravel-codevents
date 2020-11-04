<template>
  <v-card>
    <v-tabs center-active show-arrows v-model="tabs" color="primary darken-2">
      <v-tab> <v-icon left>mdi-calendar</v-icon> Events </v-tab>
      <v-tab> <v-icon left>mdi-account-arrow-right</v-icon> Followers </v-tab>
      <v-tab> <v-icon left>mdi-account-arrow-left</v-icon> Following </v-tab>
      <v-tab> <v-icon left>mdi-account-edit</v-icon>Edit Profile </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <!-- Events -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <events-tab :events="events" />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Followers -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <relationship-tab
              :name="'Followers'"
              :relationships="profile.followers"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Followings -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <relationship-tab
              :name="'Followings'"
              :relationships="profile.followings"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <edit-profile-tab />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import EventsTab from "./EventsTab";
import EditProfileTab from "./EditProfileTab";
import RelationshipTab from "./RelationshipTab";

export default {
  name: "ProfileTabs",

  props: {
    profile: {
      type: Object,
    },
    events: {
      type: Array,
    },
  },

  components: {
    EventsTab,
    EditProfileTab,
    RelationshipTab,
  },

  data: () => ({
    tabs: null,
  }),

  mounted: function () {
    console.log("profile tab", JSON.stringify(this.events));
  },
};
</script>

<style>
</style>
