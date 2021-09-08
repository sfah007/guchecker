<template>
  <v-app>
    <LoadingScreen :isLoading="isLoading" :errors="errors" />
    <div v-if="!isLoading" data-aos="fade-left">
      <Nav />
      <MenuDrawer />
      <v-main>
        <Card />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import MenuDrawer from "./components/MenuDrawer.vue";
import Card from "./components/Card.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
  name: "App",

  components: {
    MenuDrawer,
    Nav,
    Card,
    LoadingScreen,
  },

  data: () => ({
    isLoading: true,
    psw: ["GUCLAN", "LUCID"],
    pswEnter: "",
    errors: "",
  }),
  methods: {},
  created() {
    if (this.$session.exists()) {
      if (this.$session.has("logged")) {
        if (this.$session.get("logged")) {
          this.isLoading = false;
        }
      }
    }
    this.$root.$on("logout", () => {
      this.isLoading = true;
      this.$session.destroy();
    });
    this.$root.$on("login", ({ data }) => {
      if (this.psw.includes(data)) {
        this.errors = "";
        this.$session.start();
        this.$session.set("logged", true);
        this.isLoading = false;
      } else {
        this.errors = "Password is incorrect!";
      }
    });
    this.$vuetify.theme.dark = true;
  },
};
</script>
