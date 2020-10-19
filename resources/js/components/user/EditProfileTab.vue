<template>
  <v-expansion-panels focusable>
    <v-row>
      <v-col cols="12" sm="6">
        <v-expansion-panel>
          <v-expansion-panel-header
            style="min-height: 40px"
            class="primary--text text-capitalize"
          >
            Change password
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pt-3">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                dense
                filled
                outlined
                type="password"
                label="Old Password"
                v-model="old_password"
                append-icon="mdi-eye-off"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                type="password"
                label="New Password"
                v-model="password"
                append-icon="mdi-eye-off"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                type="password"
                label="Password Confirmation"
                v-model="password_confirmation"
                append-icon="mdi-eye-off"
              ></v-text-field>

              <v-btn dark block depressed color="primary lighten-0">
                <v-icon left>mdi-lock-reset</v-icon>
                change
              </v-btn>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-col>

      <v-col cols="12" sm="6">
        <v-expansion-panel>
          <v-expansion-panel-header
            style="min-height: 40px"
            class="primary--text text-capitalize"
          >
            Update Personal Information
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pt-3">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                dense
                filled
                outlined
                label="Name"
                v-model="name"
                append-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                type="number"
                label="Phone"
                v-model="phone"
                append-icon="mdi-phone"
              ></v-text-field>

              <v-textarea
                rows="2"
                dense
                filled
                outlined
                label="Bio"
                v-model="bio"
                append-icon="mdi-information"
              ></v-textarea>

              <v-btn dark block depressed color="primary lighten-0">
                <v-icon left>mdi-file-document-edit</v-icon>
                update
              </v-btn>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-col>
    </v-row>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "EditProfileTab",
};
</script>

<style>
</style>
