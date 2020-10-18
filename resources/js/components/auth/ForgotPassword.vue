<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5">
        <v-card>
          <v-toolbar dense flat color="success" class="white--text">
            <v-toolbar-title>Password Reset Link</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-5">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                dense
                append-icon="mdi-email"
              ></v-text-field>

              <v-btn block depressed color="success">
                <v-icon left>mdi-send</v-icon>
                submit
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text to="/login">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ForgotPassword",
};
</script>

<style scoped>
</style>
