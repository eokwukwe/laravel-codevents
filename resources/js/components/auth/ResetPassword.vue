<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5" lg="4">
        <v-card>
          <v-card-title class="primary--text title">
            Reset Your Password
          </v-card-title>

          <v-card-text class="py-3">
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
                :disabled="isSubmitting || $v.$invalid"
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "ResetPassword",

  data: () => ({
    isSubmitting: false,
    passwordResetData: {
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

  methods: {
    handleResetPasswordSubmit() {
      // this.$v.touch()
      console.log(JSON.stringify(this.passwordResetData, null, 2));
    },
  },
};
</script>

<style scoped>
</style>
