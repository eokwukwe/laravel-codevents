<template>
  <v-card>
    <v-img
      :src="`/images/categoryImages/${event.category}.jpg`"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="150px"
    >
      <v-card-title
        style="font-size: 1rem; text-transform: capitalize; line-height: 1.2rem"
      >
        {{ event.title }}
      </v-card-title>
    </v-img>

    <v-card-actions>
      <span class="d-inline-flex align-center mr-3">
        <v-icon small>mdi-calendar</v-icon>
        {{ formattedDate.day }}
      </span>

      <span class="d-inline-flex align-center">
        <v-icon small>mdi-clock</v-icon>
        {{ formattedDate.time }}
      </span>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { format, parseISO } from "date-fns";

import helpers from "../../helpers";

export default {
  name: "EventsTabCard",

  props: {
    event: {
      type: Object,
    },
  },

  computed: {
    formattedDate() {
      return helpers.formattedEventDate(this.event.date);
    },
  },
};
</script>

<style>
</style>
