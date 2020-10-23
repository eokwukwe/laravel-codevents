<template>
  <v-container>
    <v-row>
      <v-col order="last" order-sm="0" cols="12" sm="8">
        <event-list v-for="n in 3" :key="n" />
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
</style>
