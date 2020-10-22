<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      style="min-height: 40px"
      class="primary--text text-capitalize"
    >
      Update password
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pt-3">
      <v-form @submit.prevent="handleUpdatePasswordSubmit">
        <v-text-field
          dense
          filled
          outlined
          type="password"
          label="Old Password"
          append-icon="mdi-eye-off"
          :error-messages="oldPasswordErrors"
          v-model="updatePasswordData.old_password"
          @blur="$v.updatePasswordData.old_password.$touch()"
          @input="$v.updatePasswordData.old_password.$touch()"
        ></v-text-field>

        <v-text-field
          dense
          filled
          outlined
          type="password"
          label="New Password"
          append-icon="mdi-eye-off"
          :error-messages="passwordErrors"
          v-model="updatePasswordData.password"
          @blur="$v.updatePasswordData.password.$touch()"
          @input="$v.updatePasswordData.password.$touch()"
        ></v-text-field>

        <v-text-field
          dense
          filled
          outlined
          type="password"
          append-icon="mdi-eye-off"
          label="Password Confirmation"
          :error-messages="passwordConfirmationErrors"
          v-model="updatePasswordData.password_confirmation"
          @blur="$v.updatePasswordData.password_confirmation.$touch()"
          @input="$v.updatePasswordData.password_confirmation.$touch()"
        ></v-text-field>

        <v-btn
          block
          depressed
          type="submit"
          color="primary lighten-0"
          :disabled="isSubmitting || $v.$invalid"
        >
          <v-icon left>mdi-lock-reset</v-icon>
          change
        </v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

import clearFormInput from "../../helpers/clearFormInput";

export default {
  name: "UpdatePasswordForm",

  data: () => ({
    isSubmitting: false,
    updatePasswordData: {
      password: "",
      old_password: "",
      password_confirmation: "",
    },
  }),

  validations: {
    updatePasswordData: {
      old_password: { required },
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
    },
  },

  computed: {
    oldPasswordErrors() {
      const errors = [];

      if (!this.$v.updatePasswordData.old_password.$dirty) return errors;

      !this.$v.updatePasswordData.old_password.required &&
        errors.push("Old Password is required.");

      return errors;
    },

    passwordErrors() {
      const errors = [];

      if (!this.$v.updatePasswordData.password.$dirty) return errors;

      !this.$v.updatePasswordData.password.required &&
        errors.push("Password is required.");

      return errors;
    },

    passwordConfirmationErrors() {
      const errors = [];

      if (!this.$v.updatePasswordData.password_confirmation.$dirty)
        return errors;

      !this.$v.updatePasswordData.password_confirmation.required &&
        errors.push("Password is required.");

      !this.$v.updatePasswordData.password_confirmation.sameAsPassword &&
        errors.push("Passwords do not match");

      return errors;
    },
  },

  methods: {
    handleUpdatePasswordSubmit() {
      console.log(JSON.stringify(this.updatePasswordData, null, 2));
      clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.updatePasswordData,
      });
      console.log(JSON.stringify(this.updatePasswordData, null, 2));
    },
  },
};
</script>

<style>
</style>
