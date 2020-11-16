<template>
  <div
    class="d-flex justify-center align-center flex-column text-center not-found"
  >
    <div class="mb-3 text-h3 white--text">My ohhh my....</div>
    <div class="text-h5 mb-5">
      It seems the page has not be crafted for now.
    </div>
    <v-btn color="primary" :to="{ name: 'EventsPage' }">go home</v-btn>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
  .not-found {
    height: 94vh;
    overflow-y: hidden;
    background-image: linear-gradient(
        to bottom,
        rgba(81, 45, 168, 0.8),
        rgba(94, 53, 177, 0.9)
      ),
      url("/images/not-found.png");
    background-position: center;
    background-size: contain;
  }
</style>
