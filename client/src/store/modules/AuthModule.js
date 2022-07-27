import { HOST_API_URL, ROLE_ADMIN_ID } from "@/store";
import { useCookies } from "vue3-cookies";

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
        const response = await fetch(`${HOST_API_URL}/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: data,
        });
        if (response.ok) {
          const content = await response.json();
          const user = content.data;

          // TODO: лишние комменты убрать
          //axios.defaults.headers.common["Authorization"] = 'Bearer ' + cookies.get("jwt");
          // TODO: поправить это говно, медоты называть с помощью camelCase
          commit("setAuth", true);
          commit("setUser", user);
          return true;
        }
      } catch (err) {
        // TODO: поправить это говно, медоты называть с помощью camelCase
        commit("setAuth", false);
        commit("setUser", null);
        console.error(err);
        return false;
      }
    },
    async getUser({ commit }) {
      const { cookies } = useCookies();
      try {
        const response = await fetch(`${HOST_API_URL}/getUser`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.get("jwt"),
          },
          credentials: "include",
        });
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
        const response = await fetch(`${HOST_API_URL}/logout`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + cookies.get("jwt"),
          },
          credentials: "include",
        });
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
