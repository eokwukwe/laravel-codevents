import Vue from "vue";
import Vuelidate from "vuelidate";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";

import App from "./App.vue";
import router from "./router";
import vuetify from "../plugins/vuetify";

Vue.use(Vuelidate);
Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: process.env.MIX_GOOGLE_API_KEY
});
Vue.config.productionTip = false;

require("./bootstrap");

const app = new Vue({
    el: "#app",
    components: { App },
    // store,
    router,
    vuetify
});
