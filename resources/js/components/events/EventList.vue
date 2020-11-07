<template>
  <v-card class="mb-4">
    <div class="d-flex flex-no-wrap align-start">
      <v-avatar class="ml-3 mr-2 my-3" size="90">
        <v-img
          alt="user photo"
          :src="event.hostedBy.photoURL || '/images/user.png'"
        ></v-img>
      </v-avatar>

      <div>
        <v-card-title class="text-capitalize primary--text font-weight-bold">
          {{ event.title }}
        </v-card-title>

        <v-card-subtitle>
          Hosted by
          <router-link
            style="cursor: pointer"
            class="primary--text"
            tag="span"
            :to="{ name: 'ProfilePage', params: { id: event.hostedBy.id } }"
          >
            {{ event.hostedBy.name }}
          </router-link>
        </v-card-subtitle>
      </div>
    </div>

    <v-divider></v-divider>

    <!-- Event date and time -->
    <v-card-text>
      <div>
        <span>
          <v-icon small>mdi-clock</v-icon>
          <span>{{ formattedDate.dateTime }}</span>
        </span>
        <span class="ml-1 text-capitalize">
          <v-icon small>mdi-map-marker</v-icon>
          <span>{{ event.venue.address }}</span>
        </span>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <!-- Event attendees -->
    <v-card-text class="grey lighten-3 d-flex align-center">
      <v-item-group multiple>
        <event-list-attendees
          v-for="attendee in attendees"
          :key="attendee.id"
          :attendee="attendee"
        />
      </v-item-group>
    </v-card-text>

    <v-divider class="my-0"></v-divider>

    <!-- Event description -->
    <v-card-text class="pb-0">
      <span>
        {{ event.description }}
      </span>
    </v-card-text>

    <v-card-text class="py-0">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="viewEvent"
          small
          depressed
          dark
          color="success px-3 ml-2"
        >
          details
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import helpers from "../../helpers";
import EventListAttendees from "./EventListAttendees";

export default {
  name: "EventList",

  components: {
    EventListAttendees,
  },

  props: {
    event: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters(["isLoggedIn"]),

    formattedDate() {
      return helpers.formattedEventDate(this.event.date);
    },

    attendees() {
      return this.event.attendees;
    },
  },

  methods: {
    viewEvent() {
      if (!this.isLoggedIn) {
        this.$store.dispatch("showAuthModal", {
          status: true,
          messageTitle: "Ooops!!! You're not logged in",
          messageContent:
            "You need to login in or register to proceed.",
        });
        return;
      }

      this.$router.push({
        name: "EventDetailPage",
        params: { id: this.event.id },
      });
    },
  },
};
</script>

<style>
</style>
