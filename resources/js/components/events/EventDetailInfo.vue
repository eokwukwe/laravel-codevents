<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="primary" size="25px">mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ event.description }}
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="primary" size="25px">mdi-calendar-clock</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ formattedDate.dateTime }}
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="primary" size="25px">mdi-map-marker-radius</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <div class="d-flex align-center justify-space-between">
            <span>{{ event.venue.address }}</span>
            <v-btn
              outlined
              small
              color="primary"
              class="text-capitalize"
              @click="showMap = !showMap"
            >
              {{ showMapButtonText }}
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-show="showMap"></v-divider>

      <v-scroll-y-transition>
        <v-list-item v-show="showMap">
          <v-list-item-content>
            <event-map :venueLatLng="event.venue" />
          </v-list-item-content>
        </v-list-item>
      </v-scroll-y-transition>
    </v-list>
  </v-card>
</template>

<script>
import helpers from "../../helpers";
import EventMap from "../common/EventMap";

export default {
  name: "EventDetailInfo",

  components: {
    EventMap,
  },

  props: {
    event: {
      type: Object,
    },
    loggedInUser: {
      type: Object,
    },
  },

  data: () => ({
    showMap: true,
  }),

  computed: {
    showMapButtonText() {
      return this.showMap ? "hide map" : "show map";
    },

    formattedDate() {
      return helpers.formattedEventDate(this.event.date);
    },
  },

};
</script>

<style>
</style>
