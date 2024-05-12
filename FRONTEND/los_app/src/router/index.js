import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import Dashboard from "@/views/DashBoard.vue";
import TestComp from "@/components/TestComponent.vue";
import TestView from "@/views/TestView.vue";
import PageNotFound from "@/views/404PageNotFound.vue";
import ApplyPage from "@/views/ApplyPage.vue";
import ApplyCredit from "@/components/organism/ApplyCredit.vue";
import HomePage from "@/views/HomePage.vue";
import BerandaView from "@/views/BerandaView.vue";
import DetailProspectPage from "@/views/DetailProspectPage.vue";
import AccountSettings from "@/views/AccountSettings.vue";
import GeneralSettings from "@/views/GeneralSettings.vue";
import RekeningKoranSPA from "@/views/SPA/RekeningKoranSPA.vue";
import MutasiRekening from "@/views/SPA/MutasiRekening.vue";
import MainVisitDisplay from "@/views/task/visit/MainVisitDisplay.vue";
import ConfPage from "@/views/SPA/ConfPage.vue";
import MasterView from "@/views/master/masterView.vue";
import MenuView from "@/views/master/menuView.vue";
import BranchView from "@/views/master/branchView.vue";
import EmployeesView from "@/views/master/employeesView.vue";
import SettingsView from "@/views/master/settingsView.vue";
import UsersView from "@/views/master/usersView.vue";
import AddMenuView from "@/views/master/addMenuView.vue";
// slice
import BerandaSlice from "@/components/slice/BerandaSlice.vue";

const routes = [
  { path: "/", name: "landing", component: LandingPage },
  { path: "/beranda-slice", name: "beranda slice", component: BerandaSlice },
  { path: "/beranda", name: "beranda", component: BerandaView },
  { path: "/login", name: "Login", component: LoginPage },
  {
    path: "/dashboard",
    name: "Home",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "emails",
        component: TestView,
      },
    ],
  },
  { path: "/apply-loan", component: ApplyPage },
  {
    path: "/task",
    name: "task",
    props: true,
    component: BerandaView,
    children: [
      {
        path: "apply-loan",
        name: "input kunjungan",
        component: ApplyPage,
      },
      {
        name: "Form Pengajuan Kredit",
        path: "apply-credit/:prospectId",
        component: ApplyCredit,
      },
      {
        name: "Form Pengajuan Kredit",
        path: "apply-credit",
        component: ApplyCredit,
      },
      {
        path: "visit",
        component: MainVisitDisplay,
      },
      {
        path: "visit/:prospect",
        component: DetailProspectPage,
      },
    ],
  },
  {
    path: "/pengaturan",
    name: "akun",
    component: BerandaView,
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
        component: MenuView,
      },
      {
        name: "cabang",
        path: "branch",
        component: BranchView,
      },
      {
        name: "karyawan",
        path: "employees",
        component: EmployeesView,
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
        component: AddMenuView,
      },
    ],
  },
  { path: "/test-view", name: "Test", component: TestView },
  { path: "/home", name: "home", component: HomePage },
  { path: "/test-comp", name: "TestC", component: TestComp },
  {
    path: "/konfirmasi/:id",
    name: "conf-page",
    component: ConfPage,
  },
  {
    path: "/history-pay-spa",
    name: "history-pay",
    component: RekeningKoranSPA,
  },
  {
    path: "/history-acc-spa",
    name: "history-rekening",
    component: MutasiRekening,
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
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
