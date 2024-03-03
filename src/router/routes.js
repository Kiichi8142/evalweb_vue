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
import AdminTemplateDetailPage from "@/pages/Admin/AdminTemplateDetailPage.vue";
import AdminTemplatesPage from "@/pages/Admin/AdminTemplatesPage.vue";
import AdminTemplateDetailQuestionsPage from "@/pages/Admin/subroute/AdminTemplateDetailQuestionsPage.vue";
import AdminTemplateDetailManagePage from "@/pages/Admin/subroute/AdminTemplateDetailManagePage.vue";

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
                path: 'employees',
                name: 'admin.employees',
                component: EmployeeManageTabVue,
            },
            {
                path: 'teams',
                name: 'admin.teams',
                component: TeamManageTabVue,
            },
        ],
        meta: {
            admin: true,
            auth: true
        }
    },
    {
        path: '/admin/templates',
        component: AdminTemplatesPage,
        name: 'admin.templates',
        meta: {
            admin: true,
            auth: true
        }
    },
    {
        path: '/admin/templates/:id',
        component: AdminTemplateDetailPage,
        name: 'admin.template.detail',
        meta: {
            admin: true,
            auth: true
        },
        children: [
            {
                path: 'questions',
                name: 'admin.template.detail.questions',
                component: AdminTemplateDetailQuestionsPage,
            },
            {
                path: 'manage',
                name: 'admin.template.detail.manage',
                component: AdminTemplateDetailManagePage,
            },
        ],
    }
]

export default routes