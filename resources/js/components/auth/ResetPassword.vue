<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5">
        <v-card>
          <v-toolbar dense flat color="success" class="white--text">
            <v-toolbar-title>Reset Your Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-5">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                type="password"
                dense
                append-icon="mdi-eye-off"
              ></v-text-field>
              <v-text-field
                v-model="password_confirmation"
                label="Password Confirmation"
                outlined
                type="password"
                dense
                append-icon="mdi-eye-off"
              ></v-text-field>

              <v-btn block depressed color="success">
                <v-icon left>mdi-send</v-icon>
                submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResetPassword",
};
</script>

<style scoped>
</style>
