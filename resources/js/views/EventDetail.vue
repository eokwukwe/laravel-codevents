<template>
  <v-container>
    <v-row>
      <v-col order="last" order-sm="0" cols="12" sm="8">
        <event-detail-header />

        <div class="my-3"></div>

        <event-detail-info />

        <div class="my-3"></div>

        <event-detail-comment />
      </v-col>

      <v-col cols="12" sm="4">
        <event-detail-attendees />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventDetailInfo from "../components/events/EventDetailInfo";
import EventDetailHeader from "../components/events/EventDetailHeader";
import EventDetailComment from "../components/events/EventDetailComment";
import EventDetailAttendees from "../components/events/EventDetailAttendees";

export default {
  name: "EventDetail",

  components: {
    EventDetailInfo,
    EventDetailHeader,
    EventDetailComment,
    EventDetailAttendees,
  },
};
</script>

<style>
</style>
