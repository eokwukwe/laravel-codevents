
import Login from "../components/auth/Login";
import Resend from "../components/auth/Resend";
import Register from "../components/auth/Register";
import EventForm from "../components/events/EventForm.vue";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";

import Profile from "../views/Profile.vue";
import EventDetail from "../views/EventDetail.vue";
import EventDashboard from "../views/EventDashboard.vue";

const routes = [
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
        component: Profile
        // component: () =>
        //     import(/* webpackChunkName: "ProfilePage" */ "../views/Profile.vue")
    },
    {
        path: "/events/add",
        name: "EventFormPage",
        component: EventForm
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventFormPage" */ "../components/events/EventForm.vue"
        //     )
    },
    {
        path: "/events",
        name: "EventsPage",
        component: EventDashboard
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventsPage" */ "../views/EventDashboard.vue"
        //     )
    },
    {
        path: "/events/:id/detail",
        name: "EventDetailPage",
        component: EventDetail
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventDetailPage" */ "../views/EventDetail.vue"
        //     )
    }
];

export default routes;
