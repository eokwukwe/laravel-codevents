<template>
  <v-container>
    <v-row>
      <v-col
        order="last"
        order-sm="0"
        cols="12"
        :sm="isLoggedIn ? '8' : '10'"
        :offset-sm="isLoggedIn ? '0' : '1'"
      >
        <event-list
          v-for="event in fetchedEvents"
          :key="event.id"
          :event="event"
        />

        <infinite-loading
          spinner="waveDots"
          :identifier="infiniteId"
          @infinite="infiniteHandler"
        >
          <div class="grey--text" slot="no-more">
            That will be all for now...
          </div>
          <div
            style="height: 80vh"
            class="d-flex flex-column justify-center align-center"
            slot="no-results"
          >
            <div class="d-flex primary--text mb-4">
              <v-icon left x-large color="primary">mdi-alert</v-icon>
              <span class="text-h4 font-italic">Oh dear!!!</span>
            </div>
            <span class="grey--text">
              Looks like nothing is up for the moment.
            </span>
          </div>
        </infinite-loading>
      </v-col>

      <v-col v-if="isLoggedIn" cols="12" sm="4">
        <event-filter-status @filter-events="filterEvents" />
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
    query: {
      page: 1,
      status: "",
      userId: "",
    },
    infiniteId: +new Date(),
    fetchedEvents: [],
  }),

  computed: {
    ...mapGetters(["allEvents", "isLoggedIn", "loggedInUser"]),
  },

  mounted: async function () {
    // await this.getAllEvents(this.page);
  },

  // watch: {
  //   filterStatus: function (status) {
  //     console.log("watch hook", { status });
  //   },
  // },

  methods: {
    ...mapActions(["getAllEvents"]),

    async infiniteHandler($state) {
      await this.getAllEvents(this.query);

      if (this.allEvents.data.length > 0) {
        this.query.page += 1;

        this.fetchedEvents.push(...this.allEvents.data);

        $state.loaded();
      } else {
        $state.complete();
      }
    },

    filterEvents(filter) {
      if (filter !== "all") {
        this.query = {
          status: filter,
          page: 1,
          userId: this.loggedInUser.id,
        };

        this.fetchedEvents = [];
        this.infiniteId += 1;
      } else {
        this.query = {
          status: "",
          page: 1,
          userId: "",
        };

        this.fetchedEvents = [];
        this.infiniteId += 1;
      }
    },
  },
};
</script>

<style scoped>
</style>
