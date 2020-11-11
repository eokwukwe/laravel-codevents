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
          label="Old Password"
          :error-messages="oldPasswordErrors"
          v-model="updatePasswordData.old_password"
          @blur="$v.updatePasswordData.old_password.$touch()"
          @input="$v.updatePasswordData.old_password.$touch()"
          :type="showOldPassword ? 'text' : 'password'"
          @click:append="showOldPassword = !showOldPassword"
          :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>

        <v-text-field
          dense
          filled
          outlined
          label="New Password"
          :error-messages="passwordErrors"
          v-model="updatePasswordData.password"
          @blur="$v.updatePasswordData.password.$touch()"
          @input="$v.updatePasswordData.password.$touch()"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>

        <v-text-field
          dense
          filled
          outlined
          label="Password Confirmation"
          :error-messages="passwordConfirmationErrors"
          v-model="updatePasswordData.password_confirmation"
          @blur="$v.updatePasswordData.password_confirmation.$touch()"
          @input="$v.updatePasswordData.password_confirmation.$touch()"
          :type="showPasswordConfirm ? 'text' : 'password'"
          @click:append="showPasswordConfirm = !showPasswordConfirm"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>

        <v-btn
          block
          depressed
          type="submit"
          color="primary lighten-0"
          :loading="userLoading"
          :disabled="$v.$invalid || userLoading"
        >
          <v-icon left>mdi-lock-reset</v-icon>
          update
        </v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

import helpers from "../../helpers";

export default {
  name: "UpdatePasswordForm",

  data: () => ({
    showPassword: false,
    showOldPassword: false,
    showPasswordConfirm: false,
    snackbar: false,
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
    ...mapGetters([
      "userErrors",
      "userLoading",
      "userActionSuccess",
      "userServerValidationErrors",
    ]),

    oldPasswordErrors() {
      const errors = [];

      if (!this.$v.updatePasswordData.old_password.$dirty) return errors;

      !this.$v.updatePasswordData.old_password.required &&
        errors.push("Old Password is required.");

      helpers.hasServerError(this.userServerValidationErrors, "old_password") &&
        errors.push(this.userServerValidationErrors["old_password"]);

      return errors;
    },

    passwordErrors() {
      const errors = [];

      if (!this.$v.updatePasswordData.password.$dirty) return errors;

      !this.$v.updatePasswordData.password.required &&
        errors.push("Password is required.");

      helpers.hasServerError(this.userServerValidationErrors, "password") &&
        errors.push(this.userServerValidationErrors["password"]);

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
    ...mapActions(["clearErrors", "updatePassword", "getUserProfile"]),

    async handleUpdatePasswordSubmit() {
      this.clearErrors();

      await this.updatePassword(this.updatePasswordData);

      if (!this.userActionSuccess.status) return;

      this.$emit("password-updated", this.userActionSuccess.message);

      helpers.clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.updatePasswordData,
      });
    },
  },
};
</script>

<style>
</style>
