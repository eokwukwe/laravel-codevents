<template>
  <v-item>
    <v-avatar
      style="cursor: pointer"
      @click="viewProfile"
      class="mr-1"
      size="30"
    >
      <v-img :src="attendee.photoURL || '/images/user.png'"></v-img>
    </v-avatar>
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

  methods: {
    viewProfile() {
      if (!this.$store.getters.isLoggedIn) {
        this.$store.dispatch("showAuthModal", {
          status: true,
          messageTitle: "Ooops!!! You're not logged in",
          messageContent: "You need to login in or register to proceed.",
        });
        return;
      }

      this.$router.push({
        name: "ProfilePage",
        params: { id: this.attendee.id },
      });
    },
  },
};
</script>

<style>
</style>
