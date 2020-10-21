<template>
  <v-card class="mb-4">
    <div class="d-flex flex-no-wrap align-center">
      <v-avatar class="ml-3 mr-2 my-3" size="90">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
      </v-avatar>

      <div>
        <v-card-title class="text-capitalize primary--text font-weight-bold">
          trip to empire state
        </v-card-title>

        <v-card-subtitle>
          Hosted by
          <router-link
            style="cursor: pointer"
            class="primary--text"
            tag="span"
            :to="{ name: 'ProfilePage' }"
            >fCode</router-link
          >
        </v-card-subtitle>
      </div>
    </div>

    <v-divider></v-divider>

    <!-- Event date and time -->
    <v-card-text>
      <div>
        <span>
          <v-icon small>mdi-clock</v-icon>
          <span> October 31, 2020 1:00 PM</span>
        </span>
        <span class="ml-1 text-capitalize">
          <v-icon small>mdi-map-marker</v-icon>
          <span>ikeja computer village, Pepple Street, Lagos, Nigeria</span>
        </span>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <!-- Event attendees -->
    <v-card-text class="grey lighten-3 d-flex align-center">
      <v-item-group multiple>
        <v-item v-for="n in 3" :key="n">
          <router-link :to="{ name: 'ProfilePage' }">
            <v-avatar class="mr-1" size="36">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
          </router-link>
        </v-item>
      </v-item-group>
    </v-card-text>

    <v-divider class="my-0"></v-divider>

    <!-- Event description -->
    <v-card-text class="pb-0">
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure pariatur
        recusandae modi epudiandae, nihil culpa optio facilis nulla incidunt.
      </span>
    </v-card-text>

    <v-card-text class="py-0">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small text color="warning darken-3"> delete </v-btn>

        <v-btn
          router
          :to="{ name: 'EventDetailPage', params: { id: 1 } }"
          small
          depressed
          dark
          color="success px-3"
        >
          view
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EventList",
};
</script>

<style>
</style>
