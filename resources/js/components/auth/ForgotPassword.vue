<template>
  <v-container class="fill-height">
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
                :disabled="isSubmitting || $v.$invalid"
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
import { required, email } from "vuelidate/lib/validators";

import clearFormInput from "../../helpers/clearFormInput";

export default {
  name: "ForgotPassword",

  data: () => ({
    isSubmitting: false,
    forgotPasswordData: { email: "" },
  }),

  validations: {
    forgotPasswordData: { email: { required, email } },
  },

  computed: {
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
    handleForgotPasswordSubmit() {
      console.log(JSON.stringify(this.forgotPasswordData, null, 2));
      clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.forgotPasswordData,
      });
      console.log(JSON.stringify(this.forgotPasswordData, null, 2));
    },
  },
};
</script>

<style scoped>
</style>
