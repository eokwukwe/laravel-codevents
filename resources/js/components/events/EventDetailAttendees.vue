<template>
  <v-card style="position: sticky; top: 70px" tile>
    <v-list>
      <v-subheader style="height: 30px" class="primary--text pl-3 d-flex align-center">
        <v-icon size="30px" left color="primary">mdi-account-group</v-icon>
        <span style="font-size: 1.3rem" class="pt-2 pl-2">Attendees</span>
      </v-subheader>

      <v-divider class="mt-2"></v-divider>

      <v-virtual-scroll :items="attendees" :item-height="60" height="300">
        <template v-slot:default="{ item }">
          <v-list-item>
            <v-list-item-avatar class="mr-1">
              <v-avatar color="purple" size="36" class="white--text">
                <!-- {{ item.name }} -->
                <v-img :src="item.photoURL"></v-img>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <router-link
                style="cursor: pointer"
                tag="span"
                class="text-capitalize"
                :to="{ name: 'ProfilePage', params: { id: 1 } }"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </router-link>
            </v-list-item-content>

            <v-list-item-action>
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
export default {
  name: "EventDetailAttendees",

  data: () => ({
    benched: 0,

    attendees: [
      {
        name: "john doe",
        photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "john doe",
        photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "john doe",
        photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "john doe",
        photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      {
        name: "john doe",
        photoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
    ],
  }),
};
</script>

<style>
</style>
