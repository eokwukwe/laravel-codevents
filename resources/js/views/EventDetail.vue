<template>
  <v-container>
    <v-row v-if="eventLoading">
      <v-col order="last" order-sm="0" cols="12" sm="8">
        <skeleton-loader :type="'image, actions'" />

        <skeleton-loader
          :type="'list-item-two-line, list-item-two-line, list-item-two-line'"
        />

        <skeleton-loader
          :type="'list-item-two-line, list-item-two-line, list-item-two-line'"
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col order="last" order-sm="0" cols="12" sm="8">
        <event-detail-header
          :isHost="isHost"
          :isGoing="isGoing"
          :event="singleEvent"
          :loggedInUser="loggedInUser"
        />

        <div class="my-3"></div>

        <event-detail-info :event="singleEvent" />

        <div class="my-3"></div>

        <event-detail-comment :event="singleEvent" />
      </v-col>

      <v-col cols="12" sm="4">
        <event-detail-attendees
          :event="singleEvent"
          :loggedInUser="loggedInUser"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import SkeletonLoader from "../components/common/SkeletonLoader";
import EventDetailInfo from "../components/events/EventDetailInfo";
import EventDetailHeader from "../components/events/EventDetailHeader";
import EventDetailComment from "../components/events/EventDetailComment";
import EventDetailAttendees from "../components/events/EventDetailAttendees";

export default {
  name: "EventDetail",

  props: {
    id: { type: Number },
  },

  components: {
    SkeletonLoader,
    EventDetailInfo,
    EventDetailHeader,
    EventDetailComment,
    EventDetailAttendees,
  },

  created: function () {
    this.getSingleEvent(this.id);
  },

  watch: {
    "$route.params.id": function (id) {
      this.getSingleEvent(id);
    },
  },

  computed: {
    ...mapGetters(["singleEvent", "eventLoading", "loggedInUser"]),

    isHost() {
      return this.singleEvent.hostedBy.id === this.loggedInUser.id;
    },

    isGoing() {
      return this.singleEvent?.attendees?.some(
        (a) => a.id === this.loggedInUser.id
      );
    },
  },

  methods: {
    ...mapActions(["getSingleEvent", "getLoggedInUser"]),
  },
};
</script>

<style>
</style>
