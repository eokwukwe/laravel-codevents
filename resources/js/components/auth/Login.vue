<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text title">
            Welcome Back
          </v-card-title>

          <v-card-text class="py-3">
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

              <v-row
                align="center"
                justify="space-between"
                class="px-3 primary--text darken-0"
              >
                <v-col class="pl-0" cols="6">
                  <v-btn
                    icon
                    style="background-color: #bbdefb"
                    color="blue darken-3"
                    depressed
                  >
                    <v-icon size="30" color="blue darken-4"
                      >mdi-facebook</v-icon
                    >
                  </v-btn>

                  <v-btn
                    icon
                    style="background-color: #ffcdd2"
                    color="red darken-3"
                    depressed
                    class="ml-4"
                  >
                    <v-icon color="red darken-4">mdi-google</v-icon>
                  </v-btn>
                </v-col>


                <v-col class="d-flex justify-end pr-0" cols="6">
                  <v-btn
                    depressed
                    type="submit"
                    color="primary lighten-0"
                    :disabled="isSubmitting || $v.$invalid"
                  >
                    <v-icon left>mdi-login</v-icon>
                    login
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" text to="/forgot-password">
              forgot password?
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

import clearFormInput from "../../helpers/clearFormInput";

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
      clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.loginData,
      });
      console.log(JSON.stringify(this.loginData, null, 2));
    },
  },
};
</script>

<style scoped>
</style>
