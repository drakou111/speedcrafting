import LoginView from "../components/LoginView.vue";
import SignupView from "../components/SignupView.vue";
import HomeView from "../components/HomeView.vue";
import SettingsView from "../components/SettingsView.vue";
import Logout from "../components/LogoutView.vue";
import NotFound from "../components/NotFoundView.vue";
import Profile from "../components/ProfileView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/settings",
        name: "Settings",
        component: SettingsView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
    },
    {
        path: "/signup",
        name: "Signup",
        component: SignupView,
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

export default routes;
