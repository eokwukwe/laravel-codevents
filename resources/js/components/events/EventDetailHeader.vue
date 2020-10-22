<template>
  <v-card>
    <v-img
      :src="card.src"
      class="white--text"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="250px"
    >
      <v-card-title
        class="text-capitalize font-weight-bold"
        v-text="card.title"
      ></v-card-title>
      <v-card-subtitle class="grey--text darken-4" v-text="card.date">
      </v-card-subtitle>

      <v-card-subtitle class="white--text">
        Hosted by
        <router-link
          style="cursor: pointer"
          class="primary--text font-weight-bolder"
          tag="span"
          :to="{ name: 'ProfilePage' }"
        >
          {{ card.host }}
        </router-link>
      </v-card-subtitle>
    </v-img>

    <v-card-actions>
      <v-btn small depressed color="warning"> leave event </v-btn>
      <v-btn small depressed color="primary"> join event </v-btn>
      <v-spacer></v-spacer>

      <v-btn small depressed color="success">
        <v-icon small left>mdi-file-document-edit</v-icon>
        edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EventDetailHeader",

  data: () => ({
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
};
</script>

<style>
</style>
