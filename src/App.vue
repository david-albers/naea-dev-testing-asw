<template>
  <v-app>
    <v-main>
      <v-app-bar
        :collapse="isCollapsed"
        :collapse-on-scroll="!isCollapsed"
        :elevation="2"
      >
        <v-app-bar-nav-icon @click="toggleCollapse()"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ message }}</v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-model="isCollapsed"
        :expand-on-hover="false"
        :width="100"
        :floating="false"
        is-collapsed="!isCollapsed"
        absolute
        temporary
      >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item to="/about">
              <v-list_item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list_item-icon>
              <v-list-item-title>Home</v-list-item-title>
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
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
  async mounted() {
    axios
      .get("/api/message?name=Testing")
      .then((resp) => {
        console.log(resp.data.text);
        this.message = resp.data.text;
      })
      .catch(() => {
        this.message = "There was an issue!";
      });
    //const { text } = await (await fetch("/api/message?name=George")).json();
    //this.message = text;
  },
};
</script>
