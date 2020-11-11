<template>
  <v-expansion-panels focusable>
    <v-snackbar color="success" :timeout="-1" top v-model="snackbar">
      {{ updateMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="primary"
          class="font-weight-bold"
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col cols="12" sm="6">
        <update-password-form @password-updated="showSnackbar" />
      </v-col>

      <v-col cols="12" sm="6">
        <update-profile-form
          :profile="profile"
          @profile-updated="showSnackbar"
        />
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

  data: () => ({
    snackbar: false,
    updateMessage: "",
  }),

  components: {
    UpdateProfileForm,
    UpdatePasswordForm,
  },

  methods: {
    showSnackbar(message) {
      this.updateMessage = message;
      this.snackbar = true;
    },
  },
};
</script>

<style>
</style>
