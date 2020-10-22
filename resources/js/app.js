import Vue from "vue";
import Vuelidate from "vuelidate";


import App from './App.vue'
import router from './router'
import vuetify from '../plugins/vuetify'

Vue.use(Vuelidate);
Vue.config.productionTip = false;

require("./bootstrap");

const app = new Vue({
    el: "#app",
    components: { App },
    // store,
    router,
    vuetify,
});
