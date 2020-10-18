<template>
  <nav id="nav">
    <v-navigation-drawer app temporary class="nav-color" v-model="drawer">
      <v-toolbar-title class="d-flex justify-center white--text py-3">
        <span class="font-weight-light">LARAEVENTS</span>
      </v-toolbar-title>

      <v-divider></v-divider>

      <v-row justify="center" class="mt-2">
        <v-col cols="6">
          <v-avatar size="100">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" />
          </v-avatar>
          <p class="white--text subtitle-1 mt-1">The fCoder</p>
        </v-col>
      </v-row>

      <v-divider class="my-2"></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- create event button-->
      <template v-slot:append>
        <div class="pa-2">
          <v-row justify="center">
            <v-col cols="10">
              <v-btn block depressed color="white--text green darken-2">
                <v-icon left dark> mdi-text-box-plus-outline </v-icon>
                Create event
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat dense app class="nav-color">
      <v-container class="px-0 px-md-4">
        <span class="d-flex align-center">
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            class="white--text hidden-md-and-up"
            style="margin-left: -14px"
          ></v-app-bar-nav-icon>

          <v-toolbar-title class="white--text"> LARAEVENTS </v-toolbar-title>

          <v-btn router to="/" class="ml-3" text small color="grey lighten-5">
            Events
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            router
            to="/createEvents"
            class="mr-3 hidden-sm-and-down"
            small
            depressed
            color="white--text green lighten-0"
          >
            Create
          </v-btn>

          <v-menu bottom left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="primary" dark v-bind="attrs" v-on="on">
                <v-avatar size="36">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                v-for="(link, index) in links"
                :key="index"
                router
                :to="link.route"
                class=""
              >
                <v-list-item-icon class="mr-0">
                  <v-icon size="small">{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-2">{{
                    link.text
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn to="/login" small text class="mr-2" color="white">
            Login
          </v-btn>

          <v-btn to="/register" depressed small color="grey lighten-5">
            Register
          </v-btn>
        </span>
      </v-container>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",

  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account", text: "Team", route: "/team" },
      ],
    };
  },
};
</script>

<style scoped>
  .nav-color {
    background-image: linear-gradient(
      135deg,
      rgb(24, 42, 115) 0%,
      rgb(33, 138, 174) 69%,
      rgb(32, 167, 172) 89%
    );
  }
</style>
