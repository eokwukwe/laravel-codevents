import Login from "../components/auth/Login";
import Resend from "../components/auth/Resend";
import Register from "../components/auth/Register";
import NotFound from "../components/common/NotFound";
import EventForm from "../components/events/EventForm";
import VerifyEmail from "../components/auth/VerifyEmail";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";
import SocialLoginRedirect from "../components/auth/SocialLoginRedirect";

import Profile from "../views/Profile.vue";
import EventDetail from "../views/EventDetail.vue";
import EventDashboard from "../views/EventDashboard.vue";

function castId(route) {
    const props = { ...route.params };
    props.id = +props.id;
    return props;
}

const routes = [
    {
        path: "/",
        name: "HomePage",
        meta: { guest: true }
    },
    {
        path: "/login",
        name: "LoginPage",
        component: Login,
        meta: { guest: true }
    },
    {
        path: "/oauth/:provider",
        name: "SocialLoginPage",
        component: SocialLoginRedirect,
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
        path: "/create-event",
        name: "CreateEventForm",
        component: EventForm,
        meta: { requiresAuth: true }
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventFormPage" */ "../components/events/EventForm.vue"
        //     )
    },
    {
        path: "/update-event/:id",
        name: "UpdateEventForm",
        component: EventForm,
        meta: { requiresAuth: true, requiresOwner: true },
        props: castId
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
        props: castId
        // component: () =>
        //     import(
        //         /* webpackChunkName: "EventDetailPage" */ "../views/EventDetail.vue"
        //     )
    },
    {
        path: "*",
        name: "NotFoundPage",
        component: NotFound,
    }
];

export default routes;
