<template>
  <v-card style="position: sticky; top: 70px" tile>
    <v-list>
      <v-subheader
        style="height: 30px"
        class="primary--text pl-3 d-flex align-center"
      >
        <v-icon size="30px" left color="primary">mdi-account-group</v-icon>
        <span style="font-size: 1.3rem" class="pt-2 pl-2">
          {{ attendeesHeader }}
        </span>
      </v-subheader>

      <v-divider class="mt-2"></v-divider>

      <v-virtual-scroll :items="attendees" :item-height="60" max-height="300">
        <template v-slot:default="{ item }">
          <v-list-item>
            <v-list-item-avatar class="mr-1">
              <v-avatar color="purple" size="30" class="white--text">
                <v-img :src="item.photoURL || '/images/user.png'"></v-img>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <router-link
                style="cursor: pointer"
                tag="span"
                class="text-capitalize"
                :to="{ name: 'ProfilePage', params: { id: item.id } }"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </router-link>
            </v-list-item-content>

            <v-list-item-action v-if="isHost(item.id)">
              <v-chip label color="warning" class="px-2" style="height: 18px">
                host
              </v-chip>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-list>
  </v-card>
</template>

<script>
import helpers from "../../helpers";

export default {
  name: "EventDetailAttendees",

  props: {
    event: {
      type: Object,
    },
  },

  computed: {
    attendees() {
      return this.event.attendees;
    },

    attendeesHeader() {
      const len = this.attendees.length;
      return len === 0
        ? "No attendees yet"
        : len === 1
        ? "Attendee"
        : "Attendees";
    },

    // isHost() {
    //   return this.event?.attendees?.some(
    //     (a) => a.id === this.event.hostedBy.id
    //   );
    // },
  },

  data: () => ({
    benched: 0,
  }),

  methods: {
    isHost(id) {
      return id === this.event.hostedBy.id;
    },
  },
};
</script>

<style>
</style>
