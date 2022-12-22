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
      console.log(store.getters.Claims);
      var claims = store.getters.Claims;
      if (claims != undefined) {
        return claims
          .filter((c) => c.typ == "roles")
          .map((r) => r.val)
          .join(", ");
      } else {
        return "No claims available!";
      }
    },
  },
  async mounted() {
    //console.log(store.getters.ClientPrincipal);
  },
};
</script>
