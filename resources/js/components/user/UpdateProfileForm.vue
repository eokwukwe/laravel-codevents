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

        <v-file-input
          dense
          filled
          outlined
          small-chips
          show-size
          prepend-icon=""
          label="Upload your profile immage"
          v-model="updateProfileData.image"
          :error-messages="imageErrors"
          @change="onFileChanged"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>

        <v-btn
          block
          depressed
          type="submit"
          color="primary lighten-0"
          :loading="userLoading"
          :disabled="$v.$invalid || hasImageError || userLoading"
        >
          <v-icon left>mdi-file-document-edit</v-icon>
          update
        </v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  minLength,
  numeric,
  maxValue,
} from "vuelidate/lib/validators";

import helpers from "../../helpers";

const minSize = (value) => console.log(value);

export default {
  name: "UpdateProfileForm",

  props: {
    profile: {
      type: Object,
    },
  },

  data: () => ({
    snackbar: false,
    uploadErrors: [],
    updateProfileData: {
      bio: "",
      name: "",
      phone: "",
      image: {},
    },
  }),

  validations: {
    updateProfileData: {
      name: { required },
      phone: { numeric, minLength: minLength(11) },
    },
  },

  computed: {
    ...mapGetters([
      "userErrors",
      "userLoading",
      "userActionSuccess",
      "userServerValidationErrors",
    ]),

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

      !this.$v.updateProfileData.phone.numeric &&
        errors.push("Phone number must be numbers.");

      !this.$v.updateProfileData.phone.minLength &&
        errors.push("Phone number must be at least 11 characters.");

      helpers.hasServerError(this.userServerValidationErrors, "phone") &&
        errors.push(this.userServerValidationErrors["phone"]);

      return errors;
    },

    imageErrors() {
      return this.uploadErrors;
    },

    hasImageError() {
      return this.uploadErrors.length > 0;
    },
  },

  created: function () {
    this.updateProfileData = {
      name: this.profile.name,
      phone: this.profile.phone,
      bio: this.profile.bio,
    };
  },

  methods: {
    ...mapActions([
      "clearErrors",
      "updateProfile",
      "getUserProfile",
      "getLoggedInUser",
    ]),

    async handleUpdateProfileSubmit() {
      this.clearErrors();

      let userData;

      if (this.updateProfileData.image) {
        let profileData = new FormData();

        profileData.append("name", this.updateProfileData.name);
        profileData.append("phone", this.updateProfileData.phone);
        profileData.append("bio", this.updateProfileData.bio);
        profileData.append("image", this.updateProfileData.image);

        userData = profileData;
      } else {
        userData = this.updateProfileData;
      }

      await this.updateProfile(userData);

      if (!this.userActionSuccess.status) return;

      this.$emit("profile-updated", this.userActionSuccess.message);

      await this.getUserProfile(this.profile.id);
      await this.getLoggedInUser()
    },

    onFileChanged(file) {
      this.uploadErrors = [];

      file &&
        file.size > 200000 &&
        this.uploadErrors.push("File size cannot be more than 2MB");

      file &&
        !["image/png", "image/jpeg", "image/jpg"].includes(file.type) &&
        this.uploadErrors.push(
          "File type can only be either: PNG, JPEG, or JPG"
        );

      this.updateProfileData.image = file;
    },
  },
};
</script>

<style scoped>
  .v-file-input.v-text-field--filled:not(.v-text-field--single-line)
    .v-file-input__text {
    padding-top: 5px !important;
  }
</style>
