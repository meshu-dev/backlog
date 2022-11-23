import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/about",
      name: "about",
      meta: {
        requiresAuth: true
      },
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/item/new",
      name: "add-item",
      meta: {
        requiresAuth: true
      },
      component: () => import("../views/ItemFormView.vue")
    },
    {
      path: "/item/:id",
      name: "edit-item",
      props: true,
      meta: {
        requiresAuth: true
      },
      component: () => import("../views/ItemFormView.vue")
    }
  ],
});

// Redirect back to login page if logged out
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  authStore.verifyAuth();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('authStore', authStore, authStore.isLoggedIn);

    if (authStore.isLoggedIn === false) {
      next("login");
      return;
    }
  }
  next();
});

export default router;
