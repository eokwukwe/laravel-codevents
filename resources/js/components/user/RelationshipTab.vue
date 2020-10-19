<template>
  <v-row align="center" justify="center" justify-sm="start" dense>
    <v-col v-for="card in cards" :key="card.name" cols="10" sm="4" md="3">
      <v-card>
        <v-img
          :src="card.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
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
