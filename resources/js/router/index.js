import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

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

router.beforeEach((to, from, next) => {
    const currentUser = loggedIn();
    const guest = to.matched.some(record => record.meta.guest);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next({ name: "LoginPage", query: { redirectFrom: to.fullPath } });
        return;
    } else if (guest && currentUser) {
        next({ name: "EventsPage" });
        return;
    } else {
        next();
    }
});

export default router;
