import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import request from "../api/request";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

function loggedIn() {
    return localStorage.getItem("token");
}

router.beforeEach(async (to, from, next) => {
    const currentUser = loggedIn();
    const guest = to.matched.some(record => record.meta.guest);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next({ name: "LoginPage", query: { redirectFrom: to.fullPath } });

        return;
    } else if (guest && currentUser) {
        next({ name: "EventsPage", query: { redirectFrom: to.fullPath } });

        return;
    } else {
        next();
    }
});

export default router;


// else if (requiresAuth && currentUser && to.name === "EventFormPage") {
//         const id = parseInt(to.params.id, 10);

//         if (!id) return;

//         const user = JSON.parse(localStorage.getItem("vuex"));

//         const { data } = await request().get(`/events/${id}`);

//         if (user.auth.loggedInUser.id !== data.data.hostedBy.id) {
//             next({ name: "EventsPage" });

//             return;
//         } else {
//             next();
//         }
