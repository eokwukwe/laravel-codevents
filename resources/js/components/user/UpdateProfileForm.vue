<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      style="min-height: 40px"
      class="primary--text text-capitalize"
    >
      Update Personal Information
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pt-3">
      <v-form @submit.prevent="handleUpdateProfileSubmit">
        <v-text-field
          dense
          filled
          outlined
          label="Name"
          append-icon="mdi-account"
          :error-messages="nameErrors"
          v-model="updateProfileData.name"
          @blur="$v.updateProfileData.name.$touch()"
          @input="$v.updateProfileData.name.$touch()"
        ></v-text-field>

        <v-text-field
          dense
          filled
          outlined
          type="number"
          label="Phone"
          append-icon="mdi-phone"
          :error-messages="phoneErrors"
          v-model="updateProfileData.phone"
          @blur="$v.updateProfileData.phone.$touch()"
          @input="$v.updateProfileData.phone.$touch()"
        ></v-text-field>

        <v-textarea
          rows="2"
          dense
          filled
          outlined
          label="Bio"
          append-icon="mdi-information"
          v-model="updateProfileData.bio"
          placeholder="Tell us something about yourself"
        ></v-textarea>

        <v-btn
          block
          depressed
          type="submit"
          color="primary lighten-0"
          :disabled="isSubmitting || $v.$invalid"
        >
          <v-icon left>mdi-file-document-edit</v-icon>
          update
        </v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import clearFormInput from "../../helpers/clearFormInput";

export default {
  name: "UpdateProfileForm",

  data: () => ({
    isSubmitting: false,
    updateProfileData: {
      bio: "",
      name: "",
      phone: "",
    },
  }),

  validations: {
    updateProfileData: {
      name: { required },
      phone: { minLength: minLength(11) },
    },
  },

  computed: {
    nameErrors() {
      const errors = [];

      if (!this.$v.updateProfileData.name.$dirty) return errors;

      !this.$v.updateProfileData.name.required &&
        errors.push("Name is required.");

      return errors;
    },

    phoneErrors() {
      const errors = [];

      if (!this.$v.updateProfileData.phone.$dirty) return errors;

      !this.$v.updateProfileData.phone.minLength &&
        errors.push("Phone number must be at least 11 characters.");

      return errors;
    },
  },

  methods: {
    handleUpdateProfileSubmit() {
      console.log(JSON.stringify(this.updateProfileData, null, 2));
      clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.updateProfileData,
      });
      console.log(JSON.stringify(this.updateProfileData, null, 2));
    },
  },
};
</script>

<style>
</style>
