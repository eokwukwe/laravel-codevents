<template>
  <nav id="nav">
    <v-navigation-drawer dark app temporary color="primary" v-model="drawer">
      <router-link
        to="/"
        tag="div"
        style="cursor: pointer"
        class="d-flex justify-center white--text py-2"
      >
        <span class="font-weight-light">CODEVENTS</span>
      </router-link>

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
          exact
          :to="{ name: link.routeName }"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- create event button-->
      <template v-slot:append>
        <div class="pa-2">
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-btn
                to="/create-event"
                small
                block
                depressed
                color="white--text success"
              >
                <v-icon small left dark>mdi-text-box-plus-outline</v-icon>
                add event
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-btn small block depressed color="white--text primary darken-3">
                <v-icon small left dark>mdi-exit-to-app</v-icon>
                logout
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat dense app color="white lighten-3">
      <v-container class="px-0 px-md-4">
        <span class="d-flex align-center">
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            class="primary--text hidden-md-and-up"
            style="margin-left: -14px"
          ></v-app-bar-nav-icon>

          <router-link
            to="/"
            tag="div"
            style="cursor: pointer"
            class="v-toolbar__title primary--text text-uppercase d-none d-sm-flex align-sm-center"
          >
            <span class="primary--text d-inline-flex align-center mr-1">
              <svg viewBox="0 0 511 511" height="25" width="25" fill="#311B92">
                <path
                  d="M506.76 242.828l-118.4-125.44c-7.277-7.718-19.424-8.07-27.142-.787-7.706 7.277-8.064 19.43-.781 27.142l105.965 112.256-105.965 112.269c-7.283 7.712-6.925 19.859.781 27.142a19.151 19.151 0 0013.178 5.235 19.172 19.172 0 0013.965-6.01l118.4-125.446c6.981-7.404 6.981-18.963-.001-26.361zM151.566 368.262L45.608 255.999l105.958-112.262c7.277-7.712 6.925-19.866-.787-27.142-7.706-7.277-19.866-6.925-27.142.787l-118.4 125.44c-6.982 7.398-6.982 18.963 0 26.362L123.643 394.63c3.776 4 8.864 6.016 13.965 6.016 4.723 0 9.466-1.741 13.171-5.242 7.719-7.277 8.064-19.43.787-27.142zM287.061 52.697c-10.477-1.587-20.282 5.606-21.882 16.083l-56.32 368.64c-1.6 10.483 5.6 20.282 16.083 21.882.986.147 1.958.218 2.925.218 9.325 0 17.504-6.803 18.957-16.301l56.32-368.64c1.6-10.484-5.6-20.282-16.083-21.882z"
                />
              </svg>
            </span>

            <span class="pt-1">CODEVENTS</span>
          </router-link>

          <router-link
            to="/"
            tag="div"
            style="cursor: pointer"
            class="primary--text font-weight-bold d-flex align-center d-sm-none"
          >
            <span class="primary--text d-inline-flex align-center">
              <svg viewBox="0 0 511 511" height="30" width="30" fill="#311B92">
                <path
                  d="M506.76 242.828l-118.4-125.44c-7.277-7.718-19.424-8.07-27.142-.787-7.706 7.277-8.064 19.43-.781 27.142l105.965 112.256-105.965 112.269c-7.283 7.712-6.925 19.859.781 27.142a19.151 19.151 0 0013.178 5.235 19.172 19.172 0 0013.965-6.01l118.4-125.446c6.981-7.404 6.981-18.963-.001-26.361zM151.566 368.262L45.608 255.999l105.958-112.262c7.277-7.712 6.925-19.866-.787-27.142-7.706-7.277-19.866-6.925-27.142.787l-118.4 125.44c-6.982 7.398-6.982 18.963 0 26.362L123.643 394.63c3.776 4 8.864 6.016 13.965 6.016 4.723 0 9.466-1.741 13.171-5.242 7.719-7.277 8.064-19.43.787-27.142zM287.061 52.697c-10.477-1.587-20.282 5.606-21.882 16.083l-56.32 368.64c-1.6 10.483 5.6 20.282 16.083 21.882.986.147 1.958.218 2.925.218 9.325 0 17.504-6.803 18.957-16.301l56.32-368.64c1.6-10.484-5.6-20.282-16.083-21.882z"
                />
              </svg>
            </span>
          </router-link>

          <v-btn
            router
            exact
            :to="{ name: 'EventsPage' }"
            class="ml-3"
            text
            small
            color="primary darken-2"
          >
            Events
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            router
            to="/create-event"
            class="mr-3 hidden-sm-and-down"
            small
            depressed
            color="white--text success"
          >
            add event
          </v-btn>

          <v-menu bottom left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark v-bind="attrs" v-on="on">
                <v-avatar size="36">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-btn>
              <!-- <v-btn text color="primary" dark v-bind="attrs" v-on="on">
                <v-avatar size="36">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-btn> -->
            </template>
            <v-list dense>
              <v-list-item
                v-for="(link, index) in links"
                :key="index"
                router
                :to="{name: link.routeName}"
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

          <v-btn to="/login" small outlined class="mr-2" color="primary">
            Login
          </v-btn>

          <v-btn to="/register" depressed small color="primary lighten-1">
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
        { icon: "mdi-view-dashboard", text: "Events", routeName: "EventsPage" },
        // { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        // { icon: "mdi-account", text: "Team", route: "/team" },
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
