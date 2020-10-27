<template>
  <div class="white--text home">
    <div class="home--image">
      <img src="../../images/home.svg" alt="home image" />
    </div>
    <div class="home--info">
      <div class="text-h5">Welcome to</div>
      <div class="text-uppercase text-h4 mt-4 d-flex align-center">
        <span>
          <img width="48px" src="../../images/home-icon.png" alt="home logo" />
        </span>
        <span class="ml-3"> codevents </span>
      </div>
      <v-btn
        x-large
        :to="{ name: 'EventsPage' }"
        color="primary darken-0"
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

<style scoped lang="scss">
  .home {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: rgb(94, 53, 177);
    background: linear-gradient(
      90deg,
      rgba(94, 53, 177, 1) 5%,
      rgba(81, 45, 168, 1) 49%,
      rgba(92, 107, 192, 1) 94%
    );
    overflow: hidden;
  }

  .home--image {
    width: 100%;
    height: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  .home--info {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  @media only screen and (min-width: 420px) and (max-width: 820px) {
    .home--image {
      margin-top: 1.5rem;
    }

    .home--info {
      padding-top: 2rem;
    }
  }

  @media only screen and (min-width: 820px) {
    .home {
      flex-direction: row;
    }

    .home--image,
    .home--info {
      min-height: 100vh;
      max-height: 100vh;
    }

    .home--info {
      justify-content: center;
    }
  }
</style>
