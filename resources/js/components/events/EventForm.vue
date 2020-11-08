<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5">
        <v-card>
          <v-card-title class="primary--text title">
            Create Event
          </v-card-title>

          <v-form class="pb-5" @submit.prevent="handleEventSubmit">
            <v-card-text class="pb-1">
              <v-text-field
                dense
                filled
                outlined
                label="Event title"
                v-model="eventData.title"
                :error-messages="titleErrors"
                @blur="$v.eventData.title.$touch()"
                @input="$v.eventData.title.$touch()"
                append-icon="mdi-bookmark-check"
              ></v-text-field>

              <v-select
                dense
                filled
                outlined
                label="Event category"
                :items="categories"
                append-icon="mdi-view-list"
                v-model="eventData.category"
                :error-messages="categoryErrors"
                @blur="$v.eventData.category.$touch()"
                @input="$v.eventData.category.$touch()"
              ></v-select>

              <v-textarea
                dense
                filled
                rows="2"
                outlined
                auto-grow
                label="Event description"
                append-icon="mdi-information"
                v-model="eventData.description"
                :error-messages="descriptionErrors"
                @blur="$v.eventData.description.$touch()"
                @input="$v.eventData.description.$touch()"
              ></v-textarea>

              <v-menu
                offset-y
                min-width="290px"
                :nudge-right="40"
                v-model="dateMenu"
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    filled
                    readonly
                    outlined
                    v-on="on"
                    v-bind="attrs"
                    label="Event Date"
                    v-model="eventData.date"
                    append-icon="mdi-calendar"
                    :error-messages="dateErrors"
                    @blur="$v.eventData.date.$touch()"
                    @input="$v.eventData.date.$touch()"
                  ></v-text-field>
                </template>
                <v-date-picker
                  no-title
                  color="primary"
                  v-model="eventData.date"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>

              <v-menu
                ref="menu"
                offset-y
                max-width="290px"
                min-width="290px"
                :nudge-right="40"
                v-model="timeMenu"
                transition="scale-transition"
                :close-on-content-click="false"
                :return-value.sync="eventData.time"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    filled
                    readonly
                    outlined
                    v-on="on"
                    v-bind="attrs"
                    label="Event Time"
                    v-model="eventData.time"
                    :error-messages="timeErrors"
                    @blur="$v.eventData.time.$touch()"
                    @input="$v.eventData.time.$touch()"
                    append-icon="mdi-clock-time-four-outline"
                  ></v-text-field>
                </template>
                <v-time-picker
                  full-width
                  v-if="timeMenu"
                  v-model="eventData.time"
                  @click:minute="$refs.menu.save(eventData.time)"
                ></v-time-picker>
              </v-menu>

              <vuetify-google-autocomplete
                id="venue"
                dense
                filled
                outlined
                placeholder=""
                label="Event venue"
                v-model="eventData.venue"
                :error-messages="venueErrors"
                v-on:placechanged="getEventVenue"
                @blur="$v.eventData.venue.$touch()"
                @input="$v.eventData.venue.$touch()"
                append-icon="mdi-map-marker-radius"
              >
              </vuetify-google-autocomplete>
            </v-card-text>

            <v-card-actions class="pt-0 pr-4">
              <v-spacer></v-spacer>
              <v-btn
                depressed
                class="white--text btn--cancel"
                color="grey darken-2"
                :disabled="isSubmitting"
              >
                <v-icon small left>mdi-text-box-minus-outline</v-icon>
                Cancel
              </v-btn>

              <v-btn
                depressed
                type="submit"
                color="primary lighten-0"
                :disabled="isSubmitting || $v.$invalid"
              >
                <v-icon small left>mdi-text-box-plus-outline</v-icon>
                Add event
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import { mapGetters, mapActions } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";

import helpers from "../../helpers";
import { eventCategories } from "../../helpers/eventCategories";

const minDate = (value) => new Date(value) >= new Date();

export default {
  name: "EventForm",

  props: {
    id: { type: Number },
  },

  data: () => ({
    categories: eventCategories,
    dateMenu: false,
    timeMenu: false,
    isSubmitting: false,
    isEditing: false,
    eventData: {
      date: "",
      time: "",
      title: "",
      venue: "",
      venue_lat: "",
      venue_lng: "",
      category: "",
      description: "",
    },
  }),

  validations: {
    eventData: {
      date: { required, minDate },
      time: { required },
      title: { required },
      venue: { required },
      category: { required },
      description: { required },
    },
  },

  computed: {
    ...mapGetters(["singleEvent", "eventLoading", "loggedInUser"]),

    dateErrors() {
      const errors = [];

      if (!this.$v.eventData.date.$dirty) return errors;

      !this.$v.eventData.date.required &&
        errors.push("Event date is required.");

      !this.$v.eventData.date.minDate &&
        errors.push("Event date cannot be less than today.");

      return errors;
    },

    timeErrors() {
      const errors = [];

      if (!this.$v.eventData.time.$dirty) return errors;

      !this.$v.eventData.time.required &&
        errors.push("Event time is required.");

      return errors;
    },

    titleErrors() {
      const errors = [];

      if (!this.$v.eventData.title.$dirty) return errors;

      !this.$v.eventData.title.required &&
        errors.push("Event title is required.");

      return errors;
    },

    venueErrors() {
      const errors = [];

      if (!this.$v.eventData.venue.$dirty) return errors;

      !this.$v.eventData.venue.required &&
        errors.push("Event venue is required.");

      return errors;
    },

    categoryErrors() {
      const errors = [];

      if (!this.$v.eventData.category.$dirty) return errors;

      !this.$v.eventData.category.required &&
        errors.push("Event category is required.");

      return errors;
    },

    descriptionErrors() {
      const errors = [];

      if (!this.$v.eventData.description.$dirty) return errors;

      !this.$v.eventData.description.required &&
        errors.push("Event description is required.");

      return errors;
    },
  },

  created: async function () {
    console.log("it is created and isEditting is", this.isEditing);
    if (!this.id) return;


    this.isEditing = true;

    console.log(
      "after prop check is created and isEditting is",
      this.isEditing
    );

    await this.getSingleEvent(this.id);

    this.eventData = {
      date: format(parseISO(this.singleEvent.date), "yyyy-MM-dd"),
      time: format(parseISO(this.singleEvent.date), "HH:mm"),
      title: this.singleEvent.title,
      category: this.singleEvent.category,
      venue: this.singleEvent.venue.address,
      venue_lat: this.singleEvent.venue.lat,
      venue_lng: this.singleEvent.venue.lng,
      description: this.singleEvent.description,
    };
  },

  methods: {
    ...mapActions(["getSingleEvent"]),

    async handleEventSubmit() {
      this.eventData.date = new Date(
        `${this.eventData.date} ${this.eventData.time}`
      );

      delete this.eventData.time;

      console.log("before check isEditing ", this.isEditing);

      if (!this.isEditing) {
        console.log("creating a new event");
        helpers.logJSON(this.eventData);

        helpers.clearFormInput({
          validationReset: this.$v.$reset,
          formData: this.eventData,
        });
        return;
      }

      console.log("after check isEditing ", this.isEditing);

      helpers.logJSON(this.eventData);

      helpers.clearFormInput({
        validationReset: this.$v.$reset,
        formData: this.eventData,
      });
    },

    getEventVenue(addressData, placeResultData, id) {
      this.eventData.venue = placeResultData.formatted_address;
      this.eventData.venue_lat = addressData.latitude;
      this.eventData.venue_lng = addressData.longitude;
    },
  },
};
</script>

<style scoped>
</style>
