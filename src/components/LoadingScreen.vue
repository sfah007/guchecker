<template>
  <v-row
    :class="{ loader: true, fadeout: !isLoading }"
    data-aos="zoom-in"
    data-aos-duration="1000"
  >
    <v-container class="d-flex justify-center flex-column align-center">
      <div class="mb-5">
        <img
          src="../assets/title.jpg"
          alt="Logo"
          width="50px"
          height="50px"
          class="mb-2"
        />
        <p class="mb-4 qtitle">『{{ title }}』</p>
        <p class="qsubtitle">CC CHECKER</p>
        <p class="red--text">{{ errors }}</p>
        <v-text-field
          label="Enter Password"
          :rules="[(value) => !!value || 'Required.']"
          hide-details="auto"
          class="mx-auto"
          style="width:350px;"
          v-model="psw"
        ></v-text-field>

        <v-btn
          class="mt-10"
          color="light-blue"
          elevation="5"
          text
          @click="checkPsw"
          outlined
          >Login</v-btn
        >
      </div>
      <div class="banner">
        <div class="banner_left" data-aos="fade-up-right" data-aos-delay="900">
          <div class="divider"></div>
          <p>MADE BY</p>
          <p>
            <span class="yellow--text">『{{ title }}』</span>Team
          </p>
        </div>
        <div class="banner_right" data-aos="fade-up-left" data-aos-delay="900">
          <div class="divider"></div>
          <p>POWERED BY</p>
          <p class="yellow--text" @click="goToGu" style="cursor:pointer">
            GU 古
          </p>
        </div>
      </div>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["isLoading", "errors"],
  data() {
    return {
      psw: "",
      titl: "ＧｕＣｌ",
    };
  },
  computed: {
    title() {
      return this.titl.toUpperCase();
    },
  },
  methods: {
    checkPsw() {
      this.$root.$emit("login", { data: this.psw });
    },
    goToGu() {
      window.open("https://t.me/guclan", "_blank");
    },
  },
};
</script>

<style>
.divider {
  width: 20vw;
  height: 2px;
  background-color: white;
  position: relative;
  border: 1px solid white;
  margin-top: 100px;
  margin-bottom: 30px;
}
.banner {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  letter-spacing: 3.5px;
}
.loader {
  background-color: #0f0c2b;
  bottom: 0;
  color: white;
  display: block;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fadeout {
  animation: fadeout 2s forwards;
}

.qtitle {
  font-size: 5vw;
  color: gold;
}

.qsubtitle {
  font-size: 2vw;
  padding-bottom: 7vh;
  letter-spacing: 3px;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
@media screen and (max-width: 768px) {
  .qtitle {
    font-size: 15vw;
  }

  .qsubtitle {
    font-size: 8vw;
    padding-bottom: 7vh;
  }
  .divider {
    width: 40vw;
    margin-bottom: 15px;
  }
  .banner {
    letter-spacing: 1px;
  }
}
</style>
