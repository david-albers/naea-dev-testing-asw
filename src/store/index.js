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
    UserClaims(state) {
      var cp = state.clientPrincipal;
      if (cp !== null) {
        return cp.claims;
      } else {
        return [];
      }
    },
    UserEmail(state) {
      var claims = state.Claims;
      if (claims.length > 0) {
        return claims.filter((c) => c.typ.endsWith("emailaddress")[0].val);
      } else {
        return "Not logged in.";
      }
    },
    UserName(state) {
      var claims = state.Claims;
      if (claims.length > 0) {
        return claims.filter((c) => c.typ === "name")[0].val;
      } else {
        return "Not logged in.";
      }
    },
    GivenName(state) {
      var claims = state.Claims;
      if (claims.length > 0) {
        return claims.filter((c) => c.typ.endsWith("claims/givenname")[0].val);
      } else {
        return "Not logged in.";
      }
    },
    SurName(state) {
      var claims = state.Claims;
      if (claims.length > 0) {
        return claims.filter((c) => c.typ.endsWith("claims/surname")[0].val);
      } else {
        return "Not logged in.";
      }
    },
  },
  mutations: {
    loggedIn: (state) => (state.clientPrincipal == null ? false : true),
    updateClientPrincipal: (state, clientPrincipal) => {
      state.clientPrincipal = clientPrincipal;
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
