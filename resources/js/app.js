import Vue from "vue";
import Vuelidate from "vuelidate";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";

import store from "./store";
import App from "./App.vue";
import router from "./router";
import request from "./api/request";
import vuetify from "../plugins/vuetify";

require("./bootstrap");

Vue.use(Vuelidate);
Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: process.env.MIX_GOOGLE_API_KEY
});

Vue.config.productionTip = false;

request().interceptors.response.use(undefined, function(error) {
    if (
        error.response.status === 401 &&
        error.response.data.error.title === "Unauthenticated"
    ) {
        store.dispatch("clearLocalStorage");
        store.dispatch("showAuthModal", {
            status: true,
            messageTitle: "Your Session has Expired",
            messageContent: "Please, login again to continue."
        });
    }

    return Promise.reject(error);
});

const app = new Vue({
    el: "#app",
    components: { App },
    store,
    router,
    vuetify
});
