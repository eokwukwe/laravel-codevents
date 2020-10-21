<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="primary" size="25px">mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ card.description }}
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="primary" size="25px">mdi-calendar-clock</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ card.date }}
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="primary" size="25px">mdi-map-marker-radius</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <div class="d-flex align-center justify-space-between">
            <span>{{ card.venue }}</span>
            <v-btn
              outlined
              small
              color="primary"
              class="text-capitalize"
              @click="showMap = !showMap"
              >{{ showMapButtonText }}</v-btn
            >
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-show="showMap"></v-divider>

      <v-list-item v-show="showMap">
        <v-list-item-content>
          <v-img
            :src="card.src"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "EventDetailInfo",

  data: () => ({
    showMap: false,
    card: {
      title: "A trip to the empire house",
      src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      host: "fcode",
      date: "October 31, 2020 1:00 PM",
      description:
        "In the day of those coders, the code of codes was with code and the coders were coding",
      date: "October 31, 2020 1:00 PM",
      venue: "ikeja computer village, Pepple Street, Lagos, Nigeria",
    },
  }),

  computed: {
    showMapButtonText() {
      return this.showMap ? "hide map" : "show map";
    },
  },
};
</script>

<style>
</style>
