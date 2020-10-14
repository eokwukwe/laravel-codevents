import Vue from "vue";

import App from './App.vue'
import router from './router'
import vuetify from '../plugins/vuetify'

Vue.config.productionTip = false;

require("./bootstrap");

const app = new Vue({
    el: "#app",
    components: { App },
    // store,
    router,
    vuetify,
});
