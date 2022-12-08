<template>
  <div class="about">
    <h1>This is an about page</h1>
    <code>{{ auth }}</code>
  </div>
</template>

<script>
import store from "../store";
export default {
  data: () => ({}),
  computed: {
    auth: () => {
      console.log(store.state);
      return store.getters.ClientPrincipal;
    },
  },
};
</script>

<style scoped>
.about {
  margin: 1em;
}
code {
  border: 1px solid #cccccc;
  padding: 2em;
  display: block;
}
</style>
