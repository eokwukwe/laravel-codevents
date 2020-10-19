<template>
  <v-card>
    <div class="d-flex flex-no-wrap align-center align-sm-start">
      <v-avatar class="ma-3" size="125">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
      </v-avatar>

      <div>
        <v-card-title class="headline text-capitalize"> denja man </v-card-title>

        <v-card-subtitle class="">
          I am a developer of developers
        </v-card-subtitle>

        <v-card-text class="d-none d-sm-flex flex-wrap py-0">
          <span> <v-icon small>mdi-phone</v-icon> 08083265474</span>
          <span class="ml-4">
            <v-icon small> mdi-email</v-icon> kmano.ksjjkshhhs@mann.com</span
          >
        </v-card-text>

        <v-card-text class="d-none d-sm-block py-0">
          <v-row align="center" justify="center">
            <v-col sm="6">
              <v-btn
                small
                class="white--text"
                color="primary lighten-2"
                depressed
              >
                Followers
                <span class="white--text stat followers mx-2">1000</span>
              </v-btn>
            </v-col>
            <v-col sm="6">
              <v-btn small class="white--text" color="success" depressed>
                Followings
                <span class="white--text stat followings mx-2">1000</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </div>

    <!-- Relationship stat for mobile -->
    <div class="d-sm-none">
      <v-card-text class="d-flex flex-wrap justify-start py-0">
        <span class="mr-3"> <v-icon small>mdi-phone</v-icon> 08083265474</span>
        <span>
          <v-icon small> mdi-email</v-icon> kmano.ksjjkshhhs@mann.com</span
        >
      </v-card-text>
      <v-card-text class="py-0">
        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-btn
              small
              class="white--text"
              color="primary lighten-2"
              depressed
            >
              Followers
              <span class="white--text stat followers ml-1">1000</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn small color="success" depressed>
              Followings
              <span class="white--text stat followings ml-1">1000</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
    <!--End of relationship stat for mobile -->
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
  .stat {
    padding: 2px 3px;
    border-radius: 2px;
    font-weight: bold;
  }

  .stat.followers {
    background-color: #0d47a1;
  }

  .stat.followings {
    background-color: #004d40;
  }
</style>
