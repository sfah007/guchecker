<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/71.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ random_name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-group v-model="currentGate">
        <v-list-item link @click="goToStripe(0)">
          <v-list-item-icon>
            <v-icon>mdi-garage</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Stripe (With SK)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToBin">
          <v-list-item-icon>
            <v-icon>mdi-weather-hurricane</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Bin Checker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToVIP" :class="{ 'd-none': !isSVIP }">
          <v-list-item-icon>
            <v-icon>mdi-diamond-stone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>VIP</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToAdyen" disabled>
          <v-list-item-icon>
            <v-icon>mdi-diamond-stone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Adyen (Maintain)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToBT" :disabled="!isSVIP">
          <v-list-item-icon>
            <v-icon>mdi-diamond-stone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>BrainTree Charge: 1$</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToBT2" disabled>
          <v-list-item-icon>
            <v-icon>mdi-diamond-stone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>BrainTree 2 (Maintain)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToAuthorize" disabled>
          <v-list-item-icon>
            <v-icon>mdi-diamond-stone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Authorize (Maintain)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-group :value="false"
          ><template v-slot:activator>
            <v-list-item-title>Stripe Gates (No SK)</v-list-item-title>
          </template>
          <v-list-item
            link
            @click="goToStripe(4)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 2 Auth</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            @click="goToStripe(6)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 3 Auth</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            @click="goToStripe(8)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 4 Charge: 1.99$</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            @click="goToStripe(9)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 5 Charge: 5$</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            @click="goToStripe(10)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 6 Charge: 9$</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            @click="goToStripe(11)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 7 Charge: 0.5$</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            link
            @click="goToStripe(12)"
            :disabled="!isSVIP && !isVIP"
          >
            <v-list-item-icon>
              <v-icon>mdi-diamond-stone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Stripe 8 Charge: 0.5$</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: ["isVIP", "isSVIP", "isTester"],
  data() {
    return {
      drawer: null,
      random_name: "Gu Clan",
      currentGate: 0,
    };
  },
  methods: {
    logout() {
      this.$root.$emit("logout");
    },
    goToStripe(cg) {
      this.currentGate = cg;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToVIP() {
      this.currentGate = 1;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToAdyen() {
      this.currentGate = 2;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToBT() {
      this.currentGate = 3;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToBT2() {
      this.currentGate = 5;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToAuthorize() {
      this.currentGate = 7;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToBin() {
      this.currentGate = 13;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
  },
  created() {
    this.$root.$on("drawerToggle", () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>
