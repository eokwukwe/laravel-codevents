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
          <v-card-title class="primary--text lighten-3 title">
            Resend Verification Link
          </v-card-title>

          <v-card-text class="pt-3 pb-5">
            <v-form @submit.prevent="handleResendLinkSubmit">
              <v-text-field
                dense
                filled
                outlined
                label="Email"
                append-icon="mdi-email"
                :error-messages="emailErrors"
                v-model="resendLinkData.email"
                @blur="$v.resendLinkData.email.$touch()"
                @input="$v.resendLinkData.email.$touch()"
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
import isEmpty from "lodash.isempty";
import { mapGetters, mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

import helpers from "../../helpers";

export default {
  name: "ResendLink",

  data: () => ({
    snackbarError: false,
    snackbarSuccess: false,
    resendLinkData: { email: "" },
  }),

  validations: {
    resendLinkData: { email: { required, email } },
  },

  computed: {
    ...mapGetters([
      "authLoading",
      "asyncSuccess",
      "asyncError",
      "serverValidationErrors",
    ]),

    emailErrors() {
      const errors = [];

      if (!this.$v.resendLinkData.email.$dirty) return errors;

      !this.$v.resendLinkData.email.email && errors.push("Must be valid email");

      !this.$v.resendLinkData.email.required &&
        errors.push("Email is required");

      helpers.hasServerError(this.serverValidationErrors, "email") &&
        errors.push(this.serverValidationErrors["email"]);

      return errors;
    },
  },

  methods: {
    ...mapActions(["clearErrors", "resend"]),

    async handleResendLinkSubmit() {
      this.clearErrors("serverValidationErrors");

      await this.resend(this.resendLinkData);

      if (!this.asyncSuccess.status && !isEmpty(this.asyncError)) {
        this.snackbarError = true;
        return;
      }

      if (!this.asyncSuccess.status) return;

      this.snackbarSuccess = true;

      helper.clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.resendLinkData,
      });
    },
  },
};
</script>

<style scoped>
</style>
