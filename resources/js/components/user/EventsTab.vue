<template>
  <v-row dense>
    <v-col v-for="(card, idx) in cards" :key="idx" cols="12" sm="4" md="3">
      <v-card>
        <v-img
          :src="card.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
        >
          <v-card-title v-text="card.title"></v-card-title>
        </v-img>

        <v-card-actions>
          <span class="d-inline-flex align-center mr-3">
            <v-icon>mdi-calendar</v-icon>
            Jan 20, 2020
          </span>

          <span class="d-inline-flex align-center">
            <v-icon>mdi-clock</v-icon>
            12:30 AM
          </span>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EventsTab",

  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
    ],
  }),
};
</script>

<style>
</style>
