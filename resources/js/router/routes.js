import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

import Login from "../components/auth/Login";
import Resend from "../components/auth/Resend";
import Register from "../components/auth/Register";
import EventForm from "../components/events/EventForm.vue";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: Home
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
        component: Profile
    },
    {
        path: "/create-event",
        name: "EventFormPage",
        component: EventForm
    },
    {
        path: "/events",
        name: "EventsPage",
        component: () =>
            import(
                /* webpackChunkName: "EventsPage" */ "../views/EventDashboard.vue"
            )
    }
];

export default routes;
