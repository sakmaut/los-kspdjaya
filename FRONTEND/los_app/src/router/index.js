import TestComp from "@/components/TestComponent.vue";
import AccountSettings from "@/views/AccountSettings.vue";
import GeneralSettings from "@/views/GeneralSettings.vue";
import HomePage from "@/views/HomePage.vue";
import EmployeesView from "@/views/master/employeesView.vue";
import MasterView from "@/views/master/masterView.vue";
import SettingsView from "@/views/master/settingsView.vue";
import UsersView from "@/views/master/usersView.vue";
import { createRouter, createWebHistory } from "vue-router";
// slice

const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import("@/views/LandingPage.vue"),
  },
  {
    path: "/beranda-slice",
    name: "beranda slice",
    component: () => import("@/components/slice/BerandaSlice.vue"),
  },
  {
    path: "/beranda",
    name: "beranda",
    component: () => import("@/views/BerandaView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/task",
    name: "task",
    props: true,
    component: () => import("@/views/BerandaView.vue"),
    children: [
      {
        path: "new-survey",
        name: "input kunjungan",
        component: () => import("@/views/ApplyPage.vue"),
      },
      {
        path: "survey",
        name: "Survey",
        component: () => import("@/views/VisitPage.vue"),
      },
      {
        path: "survey-admin",
        name: "Survey Admin",
        component: () => import("@/views/VisitAdminPage.vue"),
      },
      {
        name: "Detail survey",
        path: "survey/:surveyId",
        component: () => import("@/views/DetailSurveyPage.vue"),
      },
      {
        name: "Detail approval survey",
        path: "approval/:surveyId",
        component: () => import("@/views/DetailSurveyPage.vue"),
      },
      {
        path: "approval",
        name: "approval",
        component: () => import("@/views/ApprovalPage.vue"),
      },
      {
        name: "Form Pengajuan Kredit",
        path: "apply-credit",
        component: () => import("@/views/VisitAdminPage.vue"),
      },
      {
        name: "Form Kredit",
        path: "form-credit/:prospect",
        component: import("@/components/organism/ApplyCredit.vue"),
      },
      {
        path: "visit",
        component: () => import("@/views/task/visit/MainVisitDisplay.vue"),
      },
      {
        path: "visit/:prospect",
        component: () => import("@/views/DetailProspectPage.vue"),
      },
    ],
  },
  {
    path: "/pengaturan",
    name: "akun",
    component: () => import("@/views/BerandaView.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "akun",
        component: AccountSettings,
      },
      {
        path: "umum",
        component: GeneralSettings,
      },
    ],
  },
  {
    path: "/master",
    name: "master",
    component: MasterView,
    meta: { requiresAuth: true },
    children: [
      {
        name: "menu",
        path: "menu",
        component: () => import("@/views/master/menuView.vue"),
      },
      {
        name: "cabang",
        path: "branch",
        component: () => import("@/views/master/branchView.vue"),
      },
      {
        name: "tambah cabang",
        path: "new-cabang",
        component: () => import("@/components/organism/addBranch.vue"),
      },
      {
        name: "karyawan",
        path: "employees",
        component: EmployeesView,
      },
      {
        name: "tambah karyawan",
        path: "new-karyawan",
        component: () => import("@/components/organism/addEmployee.vue"),
      },
      {
        name: "pengaturan",
        path: "settings",
        component: SettingsView,
      },
      {
        name: "Tambah pengaturan",
        path: "add-pengaturan",
        component: () => import("@/components/organism/addSettings.vue"),
      },
      {
        name: "penggunan",
        path: "users",
        component: UsersView,
      },
      {
        name: "Tambah Menu",
        path: "add-menu",
        component: () => import("@/views/master/addMenuView.vue"),
      },
    ],
  },
  { path: "/home", name: "home", component: HomePage },
  { path: "/test-comp", name: "TestC", component: TestComp },
  {
    path: "/konfirmasi/:id",
    name: "conf-page",
    component: () => import("@/views/SPA/ConfPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  };
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
