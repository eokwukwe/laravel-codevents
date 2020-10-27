<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text title">
            Create Account
          </v-card-title>

          <v-card-text class="py-3">
            <v-form @submit.prevent="handleRegisterSubmit">
              <v-text-field
                dense
                filled
                outlined
                label="Name"
                append-icon="mdi-account"
                v-model="registerData.name"
                :error-messages="nameErrors"
                @blur="$v.registerData.name.$touch()"
                @input="$v.registerData.name.$touch()"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                label="Email"
                append-icon="mdi-email"
                v-model="registerData.email"
                :error-messages="emailErrors"
                @blur="$v.registerData.email.$touch()"
                @input="$v.registerData.email.$touch()"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                type="password"
                label="Password"
                append-icon="mdi-eye-off"
                v-model="registerData.password"
                :error-messages="passwordErrors"
                @input="$v.registerData.password.$touch()"
                @blur="$v.registerData.password.$touch()"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                type="password"
                append-icon="mdi-eye-off"
                label="Password Confirmation"
                :error-messages="passwordConfirmationErrors"
                v-model="registerData.password_confirmation"
                @blur="$v.registerData.password_confirmation.$touch()"
                @input="$v.registerData.password_confirmation.$touch()"
              ></v-text-field>

              <v-row
                align="center"
                justify="space-between"
                class="px-3 primary--text darken-0"
              >
                <v-col class="pl-0" cols="6">
                  <social-auth-buttons />
                </v-col>

                <v-col class="d-flex justify-end pr-0" cols="6">
                  <v-btn
                    depressed
                    type="submit"
                    color="primary lighten-0"
                    :disabled="isSubmitting || $v.$invalid"
                  >
                    <v-icon left>mdi-account-plus</v-icon>
                    register
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" text to="/resend">resend link</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/login"> login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

import SocialAuthButtons from "./SocialAuthButtons";
import clearFormInput from "../../helpers/clearFormInput";

export default {
  name: "Register",

  components: { SocialAuthButtons },

  data: () => ({
    isSubmitting: false,
    registerData: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  }),

  validations: {
    registerData: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  },

  computed: {
    nameErrors() {
      const errors = [];

      if (!this.$v.registerData.name.$dirty) return errors;

      !this.$v.registerData.name.required && errors.push("Name is required.");

      return errors;
    },

    emailErrors() {
      const errors = [];

      if (!this.$v.registerData.email.$dirty) return errors;

      !this.$v.registerData.email.email && errors.push("Must be valid email");

      !this.$v.registerData.email.required && errors.push("Email is required");

      return errors;
    },

    passwordErrors() {
      const errors = [];

      if (!this.$v.registerData.password.$dirty) return errors;

      !this.$v.registerData.password.required &&
        errors.push("Password is required.");

      return errors;
    },

    passwordConfirmationErrors() {
      const errors = [];

      if (!this.$v.registerData.password_confirmation.$dirty) return errors;

      !this.$v.registerData.password_confirmation.required &&
        errors.push("Password is required.");

      !this.$v.registerData.password_confirmation.sameAsPassword &&
        errors.push("Passwords do not match");

      return errors;
    },
  },

  methods: {
    handleRegisterSubmit() {
      // this.$v.touch()
      console.log(JSON.stringify(this.registerData, null, 2));
      clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.registerData,
      });
      console.log(JSON.stringify(this.registerData, null, 2));
    },
  },
};
</script>

<style>
</style>
