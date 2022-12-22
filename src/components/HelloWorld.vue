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
      if (store.getters.ClientPrincipal !== null) {
        var claims = store.UserClaims;
        if (claims) {
          if (claims.length == 0) {
            return [store.getters.ClientPrincipal.userDetail];
          } else {
            return claims
              .filter((c) => c.typ == "roles")
              .map((r) => r.val)
              .join(", ");
          }
        } else {
          return "No claims available!";
        }
      } else {
        return "Please login to see details";
      }
    },
  },
  async mounted() {
    //console.log(store.getters.ClientPrincipal);
  },
};
</script>
