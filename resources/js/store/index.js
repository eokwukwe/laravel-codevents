import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/user";
import auth from "./modules/auth";
import event from "./modules/event";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        event
    },
    plugins: [
        createPersistedState({
            paths: ["auth.isLoggedIn", "auth.loggedInUser"]
        })
    ]
});
