<template>
  <div class="primary lighten-4 white--text home">
    <div class="d-flex justify-center align-center flex-column">
      <div class="text-h5">Welcome to</div>
      <div class="text-uppercase text-h4 mt-4 d-flex align-center">
        <span>
          <img
            width="48px"
            src="../../images/home-icon.png"
            alt="home logo"
          />
        </span>
        <span class="ml-3"> codevents </span>
      </div>
      <v-btn
        x-large
        :to="{ name: 'EventsPage' }"
        color="primary lighten-1"
        class="text-capitalize mt-5"
        style="font-size: 1.4rem"
      >
        get started

        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import request from "../api/request";

export default {
  name: "Home",
};
</script>

<style scoped>
  .home {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../images/home.svg');
     background-size: 100vw 40vh
  }
</style>
