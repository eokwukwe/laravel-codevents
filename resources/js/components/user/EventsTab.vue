<template>
  <v-row dense>
 <div v-if="!hasEvents">No pending events</div>

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

  computed: {
    hasEvents(){
      return this.events.length > 0
    }
  }
};
</script>

<style>
</style>
