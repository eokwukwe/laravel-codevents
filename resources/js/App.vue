<template>
  <v-app>
    <v-main>
      <div>
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>


<script>
import Home from "./views/Home";

export default {
  name: "App",

  components: {
    Home,
  },
};
</script>

<style>
  /* .h-screen {
                    min-height: 100vh;
                  } */
</style>
