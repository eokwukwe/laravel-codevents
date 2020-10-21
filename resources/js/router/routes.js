import Home from "../views/Home.vue";

import Login from "../components/auth/Login";
import Resend from "../components/auth/Resend";
import Register from "../components/auth/Register";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../views/Home.vue")
    },
    {
        path: "/login",
        name: "LoginPage",
        component: Login
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: Register
    },
    {
        path: "/resend",
        name: "ResendLinkPage",
        component: Resend
    },
    {
        path: "/forgot-password",
        name: "ForgotPasswordPage",
        component: ForgotPassword
    },
    {
        path: "/reset-password",
        name: "ResetPasswordPage",
        component: ResetPassword
    },
    {
        path: "/users",
        name: "ProfilePage",
        component: () =>
            import(/* webpackChunkName: "ProfilePage" */ "../views/Profile.vue")
    },
    {
        path: "/create-event",
        name: "EventFormPage",
        component: () =>
            import(
                /* webpackChunkName: "EventFormPage" */ "../components/events/EventForm.vue"
            )
    },
    {
        path: "/events",
        name: "EventsPage",
        component: () =>
            import(
                /* webpackChunkName: "EventsPage" */ "../views/EventDashboard.vue"
            )
    },
    {
        path: "/events/:id/detail",
        name: "EventDetailPage",
        component: () =>
            import(
                /* webpackChunkName: "EventDetailPage" */ "../views/EventDetail.vue"
            )
    }
];

export default routes;
