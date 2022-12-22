<template>
  <v-sheet id="hellosheet" color="$primary" min-height="800px">
    <v-card :text="cardtext" height="100%"></v-card>
  </v-sheet>
</template>

<script>
import store from "../store";
export default {
  name: "HelloWorld",

  data: () => ({
    testing: false,
  }),
  computed: {
    cardtext: () => {
      //var v = store.state.dispatch("fetchClientPrincipal");
      console.log(store.getters.ClientPrincipal);
      //console.log(v);
      var cp = store.getters.ClientPrincipal;
      if (cp !== null) {
        var claims = cp.claims;
        if (claims != undefined) {
          return claims
            .filter((f) => f.type == "roles")
            .map((r) => r.val)
            .join(", ");
        } else {
          return "No claims available!";
        }
      } else {
        return "Not logged in!";
      }
    },
  },
  async mounted() {
    console.log(store.getters.ClientPrincipal);
  },
};
</script>
