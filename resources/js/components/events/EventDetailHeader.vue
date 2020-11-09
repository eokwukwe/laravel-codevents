<template>
  <v-card>
    <v-img
      :src="`/images/categoryImages/${event.category}.jpg`"
      class="white--text"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="250px"
    >
      <v-card-title
        class="text-capitalize font-weight-bold"
        v-text="event.title"
      ></v-card-title>
      <v-card-subtitle class="white--text darken-4">
        {{ formattedDate.dateTime }}
      </v-card-subtitle>

      <v-card-subtitle class="white--text">
        Hosted by
        <router-link
          style="cursor: pointer"
          class="primary--text font-weight-bolder"
          tag="span"
          :to="{ name: 'ProfilePage', params: { id: event.hostedBy.id } }"
        >
          {{ event.hostedBy.name }}
        </router-link>
      </v-card-subtitle>
    </v-img>

    <v-card-actions>
      <v-btn v-if="!isHost && isGoing" small depressed color="warning">
        leave event
      </v-btn>
      <v-btn v-if="!isHost && !isGoing" small depressed color="primary">
        join event
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'EventFormPage', params: { id: event.id, event: event } }"
        small
        depressed
        color="success"
        v-if="isHost"
      >
        <v-icon small left>mdi-file-document-edit</v-icon>
        update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import helpers from "../../helpers";

export default {
  name: "EventDetailHeader",

  props: {
    event: {
      type: Object,
    },
    isHost: {
      type: Boolean,
    },
    isGoing: {
      type: Boolean,
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
