<template>
  <v-app>
    <LoadingScreen :isLoading="isLoading" :errors="errors" />
    <div v-if="!isLoading" data-aos="fade-left">
      <Nav />
      <MenuDrawer :isVIP="isVIP" :isSVIP="isSVIP" :isTester="isTester" />
      <v-main>
        <Card
          v-if="currentGate == 0"
          data-aos="fade-right"
          data-aos-duration="500"
        />
        <Bin v-if="currentGate == 13" />
        <VIP v-if="currentGate == 1 && isSVIP" :isSVIP="isSVIP" />
        <Adyen v-if="currentGate == 2" />
        <BrainTree v-if="currentGate == 3" />
        <Stripe2 v-if="currentGate == 4" />
        <BrainTree2 v-if="currentGate == 5" />
        <Stripe3 v-if="currentGate == 6" />
        <Authorize v-if="currentGate == 7" />
        <Stripe4 v-if="currentGate == 8" />
        <Stripe5 v-if="currentGate == 9" />
        <Stripe6 v-if="currentGate == 10" />
        <Stripe7 v-if="currentGate == 11" />
        <Stripe8 v-if="currentGate == 12" />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import MenuDrawer from "./components/MenuDrawer.vue";
import Card from "./components/Card.vue";
import Bin from "./components/Bin.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import Adyen from "./components/Adyen.vue";
import VIP from "./components/VIP.vue";
import BrainTree from "./components/BrainTree.vue";
import BrainTree2 from "./components/BrainTree2.vue";
import Authorize from "./components/Authorize.vue";
import Stripe2 from "./components/Stripe2.vue";
import Stripe3 from "./components/Stripe3.vue";
import Stripe4 from "./components/Stripe4.vue";
import Stripe5 from "./components/Stripe5.vue";
import Stripe6 from "./components/Stripe6.vue";
import Stripe7 from "./components/Stripe7.vue";
import Stripe8 from "./components/Stripe8.vue";

export default {
  name: "App",
  components: {
    MenuDrawer,
    Nav,
    Card,
    Bin,
    LoadingScreen,
    Adyen,
    VIP,
    BrainTree,
    BrainTree2,
    Authorize,
    Stripe2,
    Stripe3,
    Stripe4,
    Stripe5,
    Stripe6,
    Stripe7,
    Stripe8,
  },

  data: () => ({
    isLoading: true,
    vip: ["GUGUGUGUGU", "GUGUHAHAHEEE"],
    tester: ["HAHAEZBRO"],
    psw: ["GUCLAN"],
    supervip: ["GULOVE"],
    pswEnter: "",
    errors: "",
    currentGate: 0,
    isVIP: false,
    isSVIP: false,
    isTester: false,
  }),
  methods: {},
  created() {
    this.$vuetify.theme.dark = true;
    if (this.$session.exists()) {
      if (this.$session.has("logged")) {
        if (this.$session.get("logged")) {
          this.isVIP = this.$session.get("isVIP");
          this.isSVIP = this.$session.get("isSVIP");
          this.isTester = this.$session.get("isTester");
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
      if (
        this.vip.includes(data) ||
        this.psw.includes(data) ||
        this.tester.includes(data) ||
        this.supervip.includes(data)
      ) {
        this.errors = "";
        this.$session.set("logged", true);
        this.isLoading = false;
        this.isVIP = this.vip.includes(data);
        this.isSVIP = this.supervip.includes(data);
        this.isTester = this.tester.includes(data);
        this.$session.set("isVIP", this.vip.includes(data));
        this.$session.set("isSVIP", this.supervip.includes(data));
        this.$session.set("isTester", this.tester.includes(data));
        this.$root.$emit("loggedin");
      } else {
        this.errors = "Password is incorrect!";
      }
    });
  },
};
</script>
