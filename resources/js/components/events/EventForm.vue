<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="7" md="5">
        <v-card>
          <v-card-title class="primary--text title">
            Create Event
          </v-card-title>

          <v-form v-model="valid" lazy-validation ref="form">
            <v-card-text class="pb-0">
              <v-text-field
                dense
                filled
                outlined
                label="Title"
                v-model="title"
                append-icon="mdi-bookmark-check"
              ></v-text-field>

              <v-select
                v-model="category"
                :items="categories"
                label="Category"
                dense
                outlined
                filled
                append-icon="mdi-view-list"
              ></v-select>

              <v-textarea
                rows="2"
                dense
                filled
                outlined
                label="Description"
                v-model="description"
                append-icon="mdi-information"
              ></v-textarea>

              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Event Date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    filled
                  ></v-text-field>
                </template>
                <v-date-picker
                  no-title
                  color="primary"
                  v-model="date"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>

              <v-menu
                ref="menu"
                v-model="timeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="Event Time"
                    append-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    filled
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeMenu"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>

              <v-text-field
                dense
                filled
                outlined
                label="City"
                v-model="city"
                append-icon="mdi-map"
              ></v-text-field>

              <v-text-field
                dense
                filled
                outlined
                label="Venue"
                v-model="venue"
                append-icon="mdi-map-marker-radius"
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn small depressed dark color="grey darken-2">
                <v-icon small left>mdi-text-box-minus-outline</v-icon>
                Cancel
              </v-btn>

              <v-btn small depressed dark color="primary lighten-0">
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
export default {
  name: "EventForm",

  data: () => ({
    categories: [
      { key: "drinks", text: "Drinks", value: "drinks" },
      { key: "culture", text: "Culture", value: "culture" },
      { key: "film", text: "Film", value: "film" },
      { key: "food", text: "Food", value: "food" },
      { key: "music", text: "Music", value: "music" },
      { key: "travel", text: "Travel", value: "travel" },
    ],

    dateMenu: false,
    timeMenu: false,
    dateOnMenu: new Date().toISOString().substr(0, 10),
    date: "",
    time: "",
  }),
};
</script>

<style>
</style>
