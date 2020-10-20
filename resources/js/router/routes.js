import Home from "../views/Home.vue";
import Login from "../components/auth/Login";
import Resend from "../components/auth/Resend";
import Profile from "../components/user/Profile";
import Register from "../components/auth/Register";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";

import EventForm from "../components/events/EventForm.vue"

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
];

export default routes;
