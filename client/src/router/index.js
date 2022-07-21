import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";

import MainPage from "@/views/MainPage.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import MovieCardPage from "@/views/MovieCardPage.vue";
import Profile from "@/views/Profile.vue";
import CreateMovie from "@/views/CreateMovie.vue";
import MoviePage from "@/views/MoviesPage.vue";
import GenrePage from "@/views/GenresPage.vue";

import guest from "@/router/middleware.js/guest";
import auth from "@/router/middleware.js/auth";
import isAdmin from "@/router/middleware.js/isAdmin";
import middlewarePipeline from "@/router/middlewarePipeline";

const routes = [
  {
    path: "/",
    name: "main-page",
    component: MainPage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/movie-card/:id",
    name: "movieCard",
    component: MovieCardPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/create-movie",
    name: "createMovie",
    component: CreateMovie,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/movies",
    name: "movies",
    component: MoviePage,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/genres",
    name: "genres",
    component: GenrePage,
    meta: {
      middleware: [auth, isAdmin],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
