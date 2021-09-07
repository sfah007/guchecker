<template>
  <v-app>
    <Nav />
    <MenuDrawer />
    <v-main>
      <Card />
    </v-main>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import MenuDrawer from "./components/MenuDrawer.vue";
import Card from "./components/Card.vue";

export default {
  name: "App",

  components: {
    MenuDrawer,
    Nav,
    Card,
  },

  data: () => ({}),
  methods: {},
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
