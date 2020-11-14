import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import store from "../store";
import hasTokenExpired from "../helpers/hasTokenExpired";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

router.beforeEach(async (to, from, next) => {
    const authenticated = localStorage.getItem("token");
    const guest = to.matched.some(record => record.meta.guest);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresOwner = to.matched.some(record => record.meta.requiresOwner);

    const vuex = JSON.parse(localStorage.getItem("vuex"));
    const tokenExpiration = JSON.parse(localStorage.getItem("tokenExpiration"));

    let event;

    if (to.name === "UpdateEventForm") {
        await store.dispatch("getSingleEvent", parseInt(to.params.id, 10));
        event = store.getters.singleEvent;
    }

    if (requiresAuth && !authenticated) {
        next({ name: "LoginPage" });
    } else if (
        requiresAuth &&
        authenticated &&
        hasTokenExpired(tokenExpiration)
    ) {
        store.dispatch("clearLocalStorage");
        store.dispatch("showAuthModal", {
            status: true,
            messageTitle: "Your Session has Expired",
            messageContent: "Please, login again to continue."
        });
    } else if (guest && authenticated) {
        next({ name: "EventsPage" });
    } else if (requiresAuth && authenticated && requiresOwner) {
        if (vuex.auth.loggedInUser.id !== event.hostedBy.id) {
            next({ name: "EventsPage" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
