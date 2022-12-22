<template>
  <v-app>
    <v-main>
      <v-app-bar :collapse="false" :collapse-on-scroll="false" :elevation="2">
        <v-app-bar-nav-icon @click="toggleCollapse()"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ message }}</v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-model="isCollapsed"
        :expand-on-hover="true"
        :width="100"
        :floating="true"
        is-collapsed="isCollapsed"
        absolute
        temporary
      >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item to="/">
              <v-list_item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list_item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="loggedIn" to="/about">
              <v-list_item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list_item-icon>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="loggedIn" href="/logout">
              <v-list_item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list_item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!loggedIn" href="/login">
              <v-list_item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list_item-icon>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data: () => ({
    message: "nothing to see yet",
    isCollapsed: true,
  }),
  computed: {
    loggedIn() {
      let cp = this.$store.getters.ClientPrincipal;
      let loggedIn = cp != null;
      console.log(this.$store.loggedIn);
      console.log(
        `User ${JSON.stringify(
          cp == null ? "Not logged in!" : cp.userDetails
        )} ${loggedIn ? "logged in" : "not logged in"}.`
      );
      return loggedIn;
    },
    UserDetails: () => {
      return "Test";
      // this.$store.getters.ClientPrincipal.userDetails;
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
  async mounted() {
    const { clientPrincipal } = await (await fetch("/.auth/me")).json();
    console.log(clientPrincipal);
    this.$store.dispatch("login", clientPrincipal);
    this.$store.commit("loggedIn");
    var username = this.$store.getters.UserName || clientPrincipal.userDetails;
    axios
      .get("/api/message?name=" + username)
      .then((resp) => {
        console.log(resp.data.text);
        this.message = resp.data.text;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
        this.message = error.response.data;
      });
  },
};
</script>
