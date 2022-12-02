<template>
  <v-sheet id="hellosheet" color="$primary" min-height="800px">
    <v-card text="cardtext" height="100%"></v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    testing: false,
    cardtext: "this is a text",
  }),
};
</script>
