<template>
  <v-container class="fill-height">
    <v-snackbar color="success" :timeout="-1" top v-model="snackbarSuccess">
      {{ asyncSuccess.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="primary"
          class="font-weight-bold"
          v-bind="attrs"
          @click="snackbarSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar color="red" :timeout="6000" top v-model="snackbarError">
      {{ asyncError.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="primary"
          class="font-weight-bold"
          v-bind="attrs"
          @click="snackbarError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text title">
            Reset Your Password
          </v-card-title>

          <v-card-text class="pt-3 pb-5">
            <v-form @submit.prevent="handleResetPasswordSubmit">
              <v-text-field
                dense
                filled
                outlined
                type="password"
                label="Password"
                append-icon="mdi-eye-off"
                :error-messages="passwordErrors"
                v-model="passwordResetData.password"
                @blur="$v.passwordResetData.password.$touch()"
                @input="$v.passwordResetData.password.$touch()"
              ></v-text-field>
              <v-text-field
                dense
                filled
                outlined
                type="password"
                append-icon="mdi-eye-off"
                label="Password Confirmation"
                :error-messages="passwordConfirmationErrors"
                v-model="passwordResetData.password_confirmation"
                @blur="$v.passwordResetData.password_confirmation.$touch()"
                @input="$v.passwordResetData.password_confirmation.$touch()"
              ></v-text-field>

              <v-btn
                block
                depressed
                type="submit"
                color="primary lighten-0"
                :loading="authLoading"
                :disabled="$v.$invalid || authLoading"
              >
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
import { mapGetters, mapActions } from "vuex";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

import helpers from "../../helpers";

export default {
  name: "ResetPassword",

  data: () => ({
    snackbarError: false,
    snackbarSuccess: false,
    passwordResetData: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  }),

  validations: {
    passwordResetData: {
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  },

  computed: {
    ...mapGetters(["authLoading", "asyncSuccess", "asyncError"]),

    passwordErrors() {
      const errors = [];

      if (!this.$v.passwordResetData.password.$dirty) return errors;

      !this.$v.passwordResetData.password.required &&
        errors.push("Password is required.");

      return errors;
    },

    passwordConfirmationErrors() {
      const errors = [];

      if (!this.$v.passwordResetData.password_confirmation.$dirty)
        return errors;

      !this.$v.passwordResetData.password_confirmation.required &&
        errors.push("Password is required.");

      !this.$v.passwordResetData.password_confirmation.sameAsPassword &&
        errors.push("Passwords do not match");

      return errors;
    },
  },

  created: function () {
    this.passwordResetData.email = this.$route.query.email;
    this.passwordResetData.token = this.$route.params.token;
  },

  methods: {
    ...mapActions(["resetPassword"]),

    async handleResetPasswordSubmit() {
      await this.resetPassword(this.passwordResetData);

      if (!this.asyncSuccess.status) {
        this.snackbarError = true;
        return;
      }

      this.snackbarSuccess = true;

      helpers.clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.passwordResetData,
      });
    },
  },
};
</script>

<style scoped>
</style>
