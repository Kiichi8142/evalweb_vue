import EvaluationPageVue from "@/pages/EvaluationPage.vue";
import EvaluationsPageVue from "@/pages/EvaluationsPage.vue";
import DashboardPageVue from "@/pages/DashboardPage.vue";
import LoginPageVue from "@/pages/Auth/LoginPage.vue";
import HomePageVue from "@/pages/HomePage.vue";
import NotFoundErrorPageVue from "@/pages/errors/NotFoundErrorPage.vue";
import AccountPageVue from "@/pages/AccountPage.vue";
import AdminDashboardPageVue from "@/pages/Admin/AdminDashboardPage.vue";

const routes = [
    {
        path: "/evaluations",
        component: EvaluationsPageVue,
        name: "evaluations",
        meta: {
            auth: true
        }
    },
    {
        path: "/evaluation/:id",
        component: EvaluationPageVue,
        name: "evaluation",
        meta: {
            auth: true
        }
    },
    {
        path: "/dashboard",
        component: DashboardPageVue,
        name: "dashboard",
        meta: {
            auth: true
        }
    },
    {
        path: "/account",
        component: AccountPageVue,
        name: "account",
        meta: {
            auth: true
        }
    },
    {
        path: "/login",
        component: LoginPageVue,
        name: "login",
        meta: {
            guest: true
        }
    },
    {
        path: "/",
        component: HomePageVue,
        name: "home",
        meta: {
            guest: true
        }
    },
    {
        path: "/:notFound(.*)",
        component: NotFoundErrorPageVue,
        name: "error.404",
        meta: {
            guest: true
        }
    },
    {
        path: '/admin/dashboard',
        component: AdminDashboardPageVue,
        name: 'admin_dashboard'
    }
]

export default routes