<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text title">
            Password Reset Link
          </v-card-title>

          <v-card-text class="py-5">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                dense
                filled
                append-icon="mdi-email"
              ></v-text-field>

              <v-btn dark block depressed color="primary lighten-0">
                <v-icon left>mdi-send</v-icon>
                submit
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/login"> Login </v-btn>
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