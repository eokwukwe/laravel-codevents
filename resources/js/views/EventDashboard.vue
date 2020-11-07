<template>
  <v-container>
    <v-row>
      <v-col
        order="last"
        order-sm="0"
        cols="12"
        :sm="isLoggedIn ? '8' : '10' "
        :offset-sm="isLoggedIn ? '0' : '1'"
      >
        <event-list
          v-for="event in fetchedEvents"
          :key="event.id"
          :event="event"
        />

        <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
          <div slot="no-more">That will be all for now...</div>
        </infinite-loading>
      </v-col>

      <v-col v-if="isLoggedIn" cols="12" sm="4">
        <event-filter-status />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InfiniteLoading from "vue-infinite-loading";

import helpers from "../helpers";
import EventList from "../components/events/EventList";
import SkeletonLoader from "../components/common/SkeletonLoader";
import EventFilterStatus from "../components/events/EventFilterStatus";

import request from "../api/request";

export default {
  name: "EventDashboard",

  components: {
    EventList,
    SkeletonLoader,
    InfiniteLoading,
    EventFilterStatus,
  },

  data: () => ({
    page: 1,
    fetchedEvents: [],
  }),

  computed: {
    ...mapGetters(["loggedInUser", "isLoggedIn"]),
    // ...mapGetters(["allEvents", "eventLoading", "loggedInUser"]),

    // eventExist() {
    //   return this.fetchedEvents.length > 0;
    // },

    // eventExist() {
    //   return this.allEvents.data.length > 0;
    // },
  },

  mounted: async function () {
    // await this.getAllEvents(this.page);
  },

  methods: {
    // ...mapActions(["getAllEvents", "getLoggedInUser"]),

    infiniteHandler($state) {
      request()
        .get(`/events?page=${this.page}`)
        .then(({ data }) => {
          if (data.data.length) {
            this.page += 1;

            this.fetchedEvents.push(...data.data);

            $state.loaded();

            this.eventLoading = false;
          } else {
            $state.complete();
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
  },
};
</script>

<style scoped>
</style>
