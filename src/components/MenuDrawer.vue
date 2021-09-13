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
        <v-list-item link @click="goToStripe">
          <v-list-item-icon>
            <v-icon>mdi-garage</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Stripe</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToVIP" :class="{ 'd-none': !isSVIP }">
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>VIP</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToAdyen" :disabled="!isSVIP && !isVIP">
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Adyen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToBT" :disabled="!isSVIP && !isVIP">
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>BrainTree</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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
  props: ["isVIP", "isSVIP"],
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
    goToStripe() {
      this.currentGate = 0;
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
  },
  created() {
    this.$root.$on("drawerToggle", () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>
