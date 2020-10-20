<template>
  <v-container>
    <v-row>
      <v-col order="last" order-sm="0" cols="12" sm="8">
        <event-list />
        <event-list />
        <event-list />
        <event-list />
        <event-list />
      </v-col>

      <v-col cols="12" sm="4">
        <event-filter-status />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventList from "../components/events/EventList";
import EventFilterStatus from "../components/events/EventFilterStatus";

export default {
  name: "EventDashboard",

  components: {
    EventList,
    EventFilterStatus,
  },
};
</script>

<style scoped>
  /* .sticky--header {
    position: fixed;
    right: 0;
  } */
  /* .overflow {
    overflow-y: auto;
  } */
</style>
