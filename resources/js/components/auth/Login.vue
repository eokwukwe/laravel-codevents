<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text title">
            Welcome Back
          </v-card-title>

          <v-card-text class="pb-0 pt-3">
            <v-form @submit.prevent="handleLoginSubmit">
              <v-text-field
                dense
                filled
                outlined
                label="Email"
                append-icon="mdi-email"
                v-model="loginData.email"
                :error-messages="emailErrors"
                @input="$v.loginData.email.$touch()"
                @blur="$v.loginData.email.$touch()"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                type="password"
                label="Password"
                append-icon="mdi-eye-off"
                v-model="loginData.password"
                :error-messages="passwordErrors"
                @input="$v.loginData.password.$touch()"
                @blur="$v.loginData.password.$touch()"
              ></v-text-field>

              <v-btn
                block
                depressed
                type="submit"
                color="primary lighten-0"
                :disabled="isSubmitting || $v.$invalid"
              >
                <v-icon left>mdi-login</v-icon>
                login
              </v-btn>
            </v-form>

            <v-row align="center" class="mt-3 primary--text darken-0">
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
            <v-btn color="primary" text to="/forgot-password">
              forgot your password?
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/register"> register </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",

  data: () => ({
    valid: false,
    isSubmitting: false,
    loginData: {
      email: "",
      password: "",
    },
  }),

  validations: {
    loginData: {
      email: { required, email },
      password: { required },
    },
  },

  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.loginData.email.$dirty) return errors;
      
      !this.$v.loginData.email.email && errors.push("Must be valid email");
      
      !this.$v.loginData.email.required && errors.push("Email is required");
      
      return errors;
    },

    passwordErrors() {
      const errors = [];
      
      if (!this.$v.loginData.password.$dirty) return errors;
      
      !this.$v.loginData.password.required &&
        errors.push("Password is required.");
      
      return errors;
    },
  },

  methods: {
    handleLoginSubmit() {
      // this.$v.$touch();
      console.log(JSON.stringify(this.loginData, null, 2));
    },
  },
};
</script>

<style scoped>
</style>
