import Login from "../components/auth/Login";
import Resend from "../components/auth/Resend";
import Register from "../components/auth/Register";
import EventForm from "../components/events/EventForm";
import VerifyEmail from "../components/auth/VerifyEmail";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";

import Profile from "../views/Profile.vue";
import EventDetail from "../views/EventDetail.vue";
import EventDashboard from "../views/EventDashboard.vue";

const routes = [
    {
        path: "/",
        meta: { guest: true }
    },
    {
        path: "/login",
        name: "LoginPage",
        component: Login,
        meta: { guest: true }
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: Register,
        meta: { guest: true }
    },
    {
        path: "/verification/verify/:id",
        name: "VerificationPage",
        component: VerifyEmail,
        meta: { guest: true }
    },
    {
        path: "/resend",
        name: "ResendLinkPage",
        component: Resend,
        meta: { guest: true }
    },
    {
        path: "/forgot-password",
        name: "ForgotPasswordPage",
        component: ForgotPassword,
        meta: { guest: true }
    },
    {
        path: "/password/reset/:token",
        name: "ResetPasswordPage",
        component: ResetPassword,
        meta: { guest: true }
    },
    {
        path: "/events",
        name: "EventsPage",
        component: EventDashboard,
        meta: { general: true }
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventsPage" */ "../views/EventDashboard.vue"
        //     )
    },
    {
        path: "/users/:id/profile",
        name: "ProfilePage",
        component: Profile,
        meta: { requiresAuth: true },
        props: true

        // component: () =>
        //     import(/* webpackChunkName: "ProfilePage" */ "../views/Profile.vue")
    },
    {
        path: "/events/add",
        name: "EventFormPage",
        component: EventForm,
        meta: { requiresAuth: true }
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventFormPage" */ "../components/events/EventForm.vue"
        //     )
    },
    {
        path: "/events/:id/details",
        name: "EventDetailPage",
        component: EventDetail,
        meta: { requiresAuth: true },
        props(route) {
            const props = { ...route.params };
            props.id = +props.id;
            return props;
        }
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventDetailPage" */ "../views/EventDetail.vue"
        //     )
    }
];

export default routes;
