<template>
  <v-row dense>
    <v-col
      v-for="(event, idx) in events"
      :key="event.id"
      cols="12"
      sm="4"
      md="3"
    >
      <events-tab-card :event="event" />
    </v-col>
  </v-row>
</template>

<script>
import EventsTabCard from "./EventsTabCard";

export default {
  name: "EventsTab",

  components: {
    EventsTabCard,
  },

  props: {
    events: {
      type: Array,
    },
  },
};
</script>

<style>
</style>
