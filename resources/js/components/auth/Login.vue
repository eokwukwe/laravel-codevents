<template>
  <v-container class="fill-height">
    <v-snackbar color="success" :timeout="6000" top v-model="snackbarSuccess">
      {{ asyncSuccess.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="primary"
          class="font-weight-bold"
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      multi-line
      color="red"
      :timeout="8000"
      top
      v-model="snackbarError"
      vertical
    >
      {{ asyncError.message }} Check your mail for the link or click below 👇 to
      request a new link. Remember to check your junk/spam.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          class="mr-2 px-2"
          :to="{ name: 'ResendLinkPage' }"
          small
          depressed
        >
          resend Link
        </v-btn>

        <v-btn
          text
          small
          color="primary"
          class="font-weight-bold"
          v-bind="attrs"
          @click="snackbarError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row class="d-flex flex-column" align="center" justify="center">
      <v-col v-if="invalidCredentials.error" cols="12" sm="7" md="5" lg="4">
        <v-alert type="error"> {{ invalidCredentials.message }} </v-alert>
      </v-col>

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
                label="Password"
                v-model="loginData.password"
                :error-messages="passwordErrors"
                @input="$v.loginData.password.$touch()"
                @blur="$v.loginData.password.$touch()"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
                    :loading="authLoading"
                    :disabled="$v.$invalid || authLoading"
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
            <v-btn color="info" text to="/forgot-password">
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
import isEmpty from "lodash.isempty";
import { mapGetters, mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

import helpers from "../../helpers";
import SocialAuthButtons from "./SocialAuthButtons";

export default {
  name: "Login",

  components: { SocialAuthButtons },

  data: () => ({
    showPassword: false,
    snackbarError: false,
    snackbarSuccess: false,
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
    ...mapGetters([
      "authLoading",
      "asyncError",
      "asyncSuccess",
      "serverValidationErrors",
    ]),

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

    invalidCredentials() {
      return (
        helpers.hasServerError(this.serverValidationErrors, "email") && {
          error: true,
          message: this.serverValidationErrors["email"],
        }
      );
    },
  },

  methods: {
    ...mapActions(["clearErrors", "login"]),

    async handleLoginSubmit() {
      this.clearErrors("serverValidationErrors");

      await this.login(this.loginData);

      if (!this.asyncSuccess.status && !isEmpty(this.asyncError)) {
        this.snackbarError = true;
        return;
      }

      if (!this.asyncSuccess.status) return;

      this.snackbarSuccess = true;

      helpers.clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.loginData,
      });
    },
  },
};
</script>

<style scoped>
</style>
