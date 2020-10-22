<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text lighten-3 title">
            Resend Verification Link
          </v-card-title>

          <v-card-text class="pb-0 pt-3">
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
                :disabled="isSubmitting || $v.$invalid"
              >
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
import { required, email } from "vuelidate/lib/validators";

import clearFormInput from "../../helpers/clearFormInput";

export default {
  name: "ResendLink",

  data: () => ({
    isSubmitting: false,
    resendLinkData: { email: "" },
  }),

  validations: {
    resendLinkData: { email: { required, email } },
  },

  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.resendLinkData.email.$dirty) return errors;

      !this.$v.resendLinkData.email.email && errors.push("Must be valid email");

      !this.$v.resendLinkData.email.required &&
        errors.push("Email is required");

      return errors;
    },
  },

  methods: {
    handleResendLinkSubmit() {
      console.log(JSON.stringify(this.resendLinkData, null, 2));
      clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.resendLinkData,
      });
      console.log(JSON.stringify(this.resendLinkData, null, 2));
    },
  },
};
</script>

<style scoped>
</style>
