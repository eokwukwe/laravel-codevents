<template>
  <v-row align="center" justify="start" dense>
    <v-col v-for="(card, idx) in cards" :key="idx" cols="6" sm="3" md="2">
      <v-card>
        <v-img
          :src="card.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
        >
          <v-card-title v-text="card.name"></v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RelationshipTab",

  data: () => ({
    cards: [
      {
        name: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
        flex: 6,
      },
      {
        name: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
    ],
  }),
};
</script>

<style>
</style>
