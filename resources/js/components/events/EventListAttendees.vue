<template>
  <v-item>
    <router-link :to="{ name: 'ProfilePage', params: { id: attendee.id } }">
      <v-avatar class="mr-1" size="30">
        <v-img :src="attendee.photoURL || '/images/user.png'"></v-img>
      </v-avatar>
    </router-link>
  </v-item>
</template>

<script>
export default {
  name: "EventListAttendees",

  props: {
    attendee: {
      type: Object,
    },
  },
};
</script>

<style>
</style>
