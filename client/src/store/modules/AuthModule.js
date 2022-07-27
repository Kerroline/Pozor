import { HOST_API_URL, ROLE_ADMIN_ID } from "@/store";
import { useCookies } from "vue3-cookies";
import request from "@/store/request";

export const authModule = {
  namespaced: true,
  state: () => ({
    isAuth: false,
    user: null,
  }),
  getters: {
    async getUserToken() {
      const { cookies } = useCookies();
      return cookies.get("jwt");
    },
    getUser(state) {
      return state.user;
    },
    isAuth(state) {
      return state.isAuth;
    },
    async isAuthAsync(state) {
      return state.isAuth;
    },
    isAdmin(state) {
      return state.user?.role?.id === ROLE_ADMIN_ID;
    },
  },
  mutations: {
    setAuth: (state, auth) => {
      state.isAuth = auth;
    },
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }, data) {
      try {
        const response = await request.loginUser(data);
        if (response.ok) {
          const content = await response.json();
          const user = content.data;
          commit("setAuth", true);
          commit("setUser", user);
          return true;
        }
      } catch (err) {
        commit("setAuth", false);
        commit("setUser", null);
        console.error(err);
        return false;
      }
    },
    async getUser({ commit }) {
      const { cookies } = useCookies();
      try {
        const response = await request.getUser(cookies, true);
        if (response.ok) {
          const content = await response.json();
          const user = content.data;
          commit("setAuth", true);
          commit("setUser", user);
        }
      } catch (err) {
        commit("setAuth", false);
        commit("setUser", null);
        console.error(err);
        return false;
      }
    },
    async logout({ commit }) {
      const { cookies } = useCookies();
      try {
        const response = await request.logoutUser(cookies, true);
        if (response.ok) {
          commit("setAuth", false);
          commit("setUser", null);
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};
