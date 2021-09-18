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
            <v-list-item-title>Adyen (Beta)</v-list-item-title>
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

        <v-list-item
          link
          @click="goToStripe2"
          :disabled="!isSVIP && !isVIP && !isTester"
        >
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Stripe Gate 2 (No SK)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          link
          @click="goToStripe3"
          :disabled="!isSVIP && !isVIP && !isTester"
        >
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Stripe Gate 3 (No SK)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToBT2" disabled>
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>BrainTree 2</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link @click="goToStripe4" disabled>
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Stripe Gate 4 (No SK)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- <v-list-item link @click="goToAuthorize" :disabled="!isSVIP && !isVIP"> -->
        <v-list-item link @click="goToAuthorize" disabled>
          <v-list-item-icon>
            <v-icon>mdi-diamond</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Authorize</v-list-item-title>
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
    goToStripe2() {
      this.currentGate = 4;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToBT2() {
      this.currentGate = 5;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToStripe3() {
      this.currentGate = 6;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToAuthorize() {
      this.currentGate = 7;
      this.drawer = !this.drawer;
      this.$root.$emit("gateChange", { currentGate: this.currentGate });
    },
    goToStripe4() {
      this.currentGate = 8;
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
