<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5">
        <v-card>
          <v-toolbar dense flat color="success" class="white--text">
            <v-toolbar-title>Welcome Back</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-5">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                dense
                append-icon="mdi-email"
              ></v-text-field>

              <v-text-field
                dense
                outlined
                type="password"
                label="Password"
                v-model="password"
                append-icon="mdi-eye-off"
              ></v-text-field>

              <v-btn block depressed color="success">
                <v-icon left>mdi-login</v-icon>
                login</v-btn
              >
            </v-form>

            <v-row align="center" class="mt-3">
              <v-divider></v-divider>OR<v-divider></v-divider>
            </v-row>

            <v-row align="center" justify="center">
              <v-col cols="6">
                <v-btn dark color="blue lighten-1" block depressed>
                  <v-icon color="blue darken-4" left>mdi-facebook</v-icon>
                  facebook
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn dark color="red lighten-1" block depressed>
                  <v-icon color="red darken-4" left>mdi-google</v-icon>
                  google
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text to="/forgot-password">
              forgot your password?
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
</style>
