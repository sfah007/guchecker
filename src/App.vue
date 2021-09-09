<template>
  <v-app>
    <LoadingScreen :isLoading="isLoading" :errors="errors" />
    <div v-if="!isLoading" data-aos="fade-left">
      <Nav />
      <MenuDrawer :isVIP="isVIP" />
      <v-main>
        <Card
          v-if="currentGate == 0"
          data-aos="fade-right"
          data-aos-duration="500"
        />
        <VIP v-if="currentGate == 1 && isVIP" :isVIP="isVIP" />
        <ProcessOut
          v-if="currentGate == 100"
          data-aos="fade-left"
          data-aos-duration="500"
        />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import MenuDrawer from "./components/MenuDrawer.vue";
import Card from "./components/Card.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import ProcessOut from "./components/ProcessOut.vue";
import VIP from "./components/VIP.vue";

export default {
  name: "App",

  components: {
    MenuDrawer,
    Nav,
    Card,
    LoadingScreen,
    ProcessOut,
    VIP,
  },

  data: () => ({
    isLoading: true,
    vip: ["GUGUGUGUGU"],
    psw: ["GUCLAN", "LUCID"],
    pswEnter: "",
    errors: "",
    currentGate: 0,
    isVIP: false,
  }),
  methods: {},
  created() {
    this.$vuetify.theme.dark = true;
    if (this.$session.exists()) {
      if (this.$session.has("logged")) {
        if (this.$session.get("logged")) {
          this.isVIP = this.$session.get("isVIP");
          this.isLoading = false;
          this.$root.$emit("loggedin");
        }
      }
    }
    this.$root.$on("logout", () => {
      this.isLoading = true;
      this.currentGate = 0;
      this.$session.destroy();
    });
    this.$root.$on("gateChange", ({ currentGate }) => {
      this.currentGate = currentGate;
    });
    this.$root.$on("login", ({ data }) => {
      this.$session.start();
      if (this.vip.includes(data) || this.psw.includes(data)) {
        this.errors = "";
        this.$session.set("logged", true);
        this.isLoading = false;
        this.isVIP = this.vip.includes(data);
        this.$session.set("isVIP", this.vip.includes(data));
        this.$root.$emit("loggedin");
      } else {
        this.errors = "Password is incorrect!";
      }
    });
  },
};
</script>
