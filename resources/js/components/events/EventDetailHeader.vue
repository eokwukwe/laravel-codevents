<template>
  <v-card>
    <v-img
      :src="`/images/categoryImages/${event.category}.jpg`"
      class="white--text"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="250px"
    >
      <v-card-title
        class="text-capitalize font-weight-bold"
        v-text="event.title"
      ></v-card-title>
      <v-card-subtitle class="white--text darken-4">
        {{ formattedDate.dateTime }}
      </v-card-subtitle>

      <v-card-subtitle class="white--text">
        Hosted by
        <router-link
          style="cursor: pointer"
          class="primary--text font-weight-bolder"
          tag="span"
          :to="{ name: 'ProfilePage', params: { id: event.hostedBy.id } }"
        >
          {{ event.hostedBy.name }}
        </router-link>
      </v-card-subtitle>
    </v-img>

    <v-card-actions>
      <v-btn
        small
        depressed
        color="warning"
        @click="leave"
        v-if="!isHost && isGoing"
        :loading="joinEventLoading"
      >
        leave event
      </v-btn>
      <v-btn
        small
        depressed
        color="primary"
        @click="join"
        v-if="!isHost && !isGoing"
        :loading="joinEventLoading"
      >
        join event
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        @click="cancel"
        v-if="isHost"
        small
        depressed
        color="warning"
        :loading="eventLoading"
      >
        <v-icon small>mdi-delete</v-icon>
        cancel
      </v-btn>
      <v-btn
        v-if="isHost"
        small
        depressed
        color="success"
        :to="{ name: 'UpdateEventForm', params: { id: event.id } }"
      >
        <v-icon small class="pr-1">mdi-file-document-edit</v-icon>
        update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import helpers from "../../helpers";

export default {
  name: "EventDetailHeader",

  props: {
    event: {
      type: Object,
    },
    isHost: {
      type: Boolean,
    },
    isGoing: {
      type: Boolean,
    },
  },

  data: () => ({
    snackbar: false,
  }),

  computed: {
    ...mapGetters(["joinEventLoading", "eventActionSuccess", "eventLoading"]),

    formattedDate() {
      return helpers.formattedEventDate(this.event.date);
    },
  },

  methods: {
    ...mapActions(["joinEvent", "leaveEvent", "getSingleEvent", "cancelEvent"]),

    async join() {
      await this.joinEvent(this.event.id);

      await this.getSingleEvent(this.event.id);
    },

    async leave() {
      await this.leaveEvent(this.event.id);

      await this.getSingleEvent(this.event.id);
    },

    async cancel() {
      await this.cancelEvent(this.event.id);

      this.$router.push({ name: "EventsPage" });
    },
  },
};
</script>

<style>
</style>
