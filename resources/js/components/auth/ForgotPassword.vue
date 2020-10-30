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
            Password Reset Link
          </v-card-title>

          <v-card-text class="pb-5 pt-3">
            <v-form @submit.prevent="handleForgotPasswordSubmit">
              <v-text-field
                dense
                filled
                outlined
                label="Email"
                append-icon="mdi-email"
                :error-messages="emailErrors"
                v-model="forgotPasswordData.email"
                @blur="$v.forgotPasswordData.email.$touch()"
                @input="$v.forgotPasswordData.email.$touch()"
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

          <v-divider></v-divider>

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
import { mapGetters, mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

import helpers from "../../helpers";

export default {
  name: "ForgotPassword",

  data: () => ({
    snackbarError: false,
    snackbarSuccess: false,
    forgotPasswordData: { email: "" },
  }),

  validations: {
    forgotPasswordData: { email: { required, email } },
  },

  computed: {
    ...mapGetters(["authLoading", "asyncSuccess", "asyncError"]),

    emailErrors() {
      const errors = [];

      if (!this.$v.forgotPasswordData.email.$dirty) return errors;

      !this.$v.forgotPasswordData.email.email &&
        errors.push("Must be valid email");

      !this.$v.forgotPasswordData.email.required &&
        errors.push("Email is required");

      return errors;
    },
  },

  methods: {
    ...mapActions(["clearErrors", "passwordResetLink"]),

    async handleForgotPasswordSubmit() {
      this.clearErrors("asyncError");

      await this.passwordResetLink(this.forgotPasswordData);

      if (!this.asyncSuccess.status) {
        this.snackbarError = true;
        return;
      }

      this.snackbarSuccess = true;

      helpers.clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.forgotPasswordData,
      });
    },
  },
};
</script>

<style scoped>
</style>
