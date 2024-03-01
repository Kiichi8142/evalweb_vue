import EvaluationPageVue from "@/pages/EvaluationPage.vue";
import EvaluationsPageVue from "@/pages/EvaluationsPage.vue";
import DashboardPageVue from "@/pages/DashboardPage.vue";
import LoginPageVue from "@/pages/Auth/LoginPage.vue";
import HomePageVue from "@/pages/HomePage.vue";
import NotFoundErrorPageVue from "@/pages/errors/NotFoundErrorPage.vue";
import AccountPageVue from "@/pages/AccountPage.vue";
import AdminDashboardPageVue from "@/pages/Admin/AdminDashboardPage.vue";
import AdminManagePageVue from "@/pages/Admin/AdminManagePage.vue";
import EmployeeManageTabVue from "@/components/admin/EmployeeManageTab.vue";
import TeamManageTabVue from "@/components/admin/TeamManageTab.vue";

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
        name: 'admin.dashboard',
        meta: {
            admin: true,
            auth: true
        }
    },
    {
        path: '/admin/manage',
        component: AdminManagePageVue,
        name: 'admin.manage',
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'employees',
                name: 'admin.employees',
                component: EmployeeManageTabVue,
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'teams',
                name: 'admin.teams',
                component: TeamManageTabVue,
            },
        ],
        meta: {
            admin: true,
            auth: true
        }
    }
]

export default routes