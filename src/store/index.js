import { createStore } from "vuex";
import { router } from "../router";

export default createStore({
  state: {
    clientPrincipal: null,
  },
  getters: {
    ClientPrincipal(state) {
      return state.clientPrincipal;
    },
  },
  mutations: {
    loggedIn: (state) => (state.clientPrincipal == null ? false : true),
    updateClientPrincipal: (state, clientPrincipal) => {
      state.clientPrincipal = clientPrincipal;
    },
    logout: (state) => {
      state.clientPrincipal = null;
    },
  },
  actions: {
    login({ commit }, clientPrincipal) {
      localStorage.setItem("clientPrincipal", JSON.stringify(clientPrincipal));
      commit("updateClientPrincipal", clientPrincipal);
      commit("loggedIn");
    },
    fetchClientPrincipal({ commit }) {
      commit("updateClientPrincipal", localStorage.getItem("clientPrincipal"));
    },
    logout({ commit }) {
      localStorage.removeItem("clientPrincipal");
      commit("updateClientPrincipal", null);
      commit("logout");
      router.push("/");
    },
  },
  modules: {},
});
