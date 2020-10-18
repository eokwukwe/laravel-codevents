import Home from "../views/Home.vue";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
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
        path: "/forgot-password",
        name: "ForgotPasswordPage",
        component: ForgotPassword
    },
    {
        path: "/reset-password",
        name: "ResetPasswordPage",
        component: ResetPassword
    }
];

export default routes;
