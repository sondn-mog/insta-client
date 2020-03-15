import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: {
      requiresAuth: false
    }
  }
];

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("jwt")) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      // console.log("Logged in");
      next();
    }
  } else {
    if (localStorage.getItem("jwt")) {
      if (to.path == "/login" || to.path == "/register") {
        next({
          path: "/",
          query: { redirect: to.fullPath }
        });
        return;
      }
    }
    next();
  }
});

export default router;
