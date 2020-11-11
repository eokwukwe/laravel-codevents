<template>
  <v-expansion-panels focusable>
    <v-row>
      <v-col cols="12" sm="6">
        <update-password-form />
      </v-col>

      <v-col cols="12" sm="6">
        <update-profile-form :profile="profile" />
      </v-col>
    </v-row>
  </v-expansion-panels>
</template>

<script>
import UpdateProfileForm from "./UpdateProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default {
  name: "EditProfileTab",

  props: {
    profile: {
      type: Object,
    },
  },

  components: {
    UpdateProfileForm,
    UpdatePasswordForm,
  },
};
</script>

<style>
</style>
