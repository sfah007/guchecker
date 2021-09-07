<template>
  <div>
    <v-tabs v-model="tab" centered>
      <v-tab>Input</v-tab>
      <v-tab>Results</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div class="px-5 pt-2 " style="height:100%">
          <div class="pb-5">
            <v-textarea
              solo
              :placeholder="cc"
              :cols="35"
              :rows="10"
              :rules="[(value) => !!value || 'Required.']"
              v-model="ccs"
            ></v-textarea>
            <v-text-field
              :loading="skcheck"
              label="Enter SK"
              placeholder="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              :rules="[(value) => !!value || 'Required.']"
              v-model="sk"
            ></v-text-field>
          </div>
          <div class="pb-5">
            <v-btn
              class="mr-5 mb-5"
              :loading="loading2"
              :disabled="loading2"
              color="success"
              @click="checkCC"
              style="width:150px"
            >
              Check
              <template v-slot:loader>
                <span>Checking...</span>
              </template>
            </v-btn>
            <v-btn
              class="mr-5 mb-5"
              elevation="2"
              color="primary"
              @click="checkSK"
              >Check SK</v-btn
            >
            <v-menu transition="scroll-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mb-5" color="secondary" v-bind="attrs" v-on="on">
                  {{ gate == 0 ? "Stripe Auth" : "Stripe Charge" }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group v-model="gate">
                  <v-list-item>
                    <v-list-item-title>Gate 1 : Stripe Auth</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      >Gate 2 : Stripe Charge</v-list-item-title
                    >
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
            <v-menu transition="scroll-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-5 mb-5"
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{
                    delay == 0
                      ? "1 second"
                      : delay == 1
                      ? "2 seconds"
                      : "3 seconds"
                  }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group v-model="delay">
                  <v-list-item>
                    <v-list-item-title>Delay : 1 second</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Delay : 2 seconds</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Delay : 3 seconds</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
            <v-switch
              v-model="switch1"
              class="pt-4 pb-4"
              inset
              label="Play Music While Checking"
            ></v-switch>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="pt-5">
          <div class="d-flex justify-space-around mb-4">
            <v-badge
              :content="dead.length"
              :value="dead.length"
              overlap
              color="grey"
            >
              <v-btn
                elevation="2"
                color="error"
                @click="changeTable(1)"
                style="width:50px"
                >Dead</v-btn
              >
            </v-badge>
            <v-badge
              :content="ccn.length"
              :value="ccn.length"
              overlap
              color="grey"
            >
              <v-btn
                elevation="2"
                color="primary"
                @click="changeTable(2)"
                style="width:50px"
                >CCN</v-btn
              >
            </v-badge>
            <v-badge
              :content="livecvv.length"
              :value="livecvv.length"
              overlap
              color="grey"
            >
              <v-btn
                elevation="2"
                color="success"
                @click="changeTable(3)"
                style="width:50px"
                >CVV</v-btn
              >
            </v-badge>
          </div>
          <div>
            <v-simple-table
              :class="{ 'd-none': current_table == 1 ? false : true }"
            >
              <thead>
                <tr>
                  <th class="text-center">
                    Number
                  </th>
                  <th class="text-center">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dead1 in dead" :key="dead1.number">
                  <td class="text-center">{{ dead1.number }}</td>
                  <td class="text-center">{{ dead1.result }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-simple-table
              :class="{ 'd-none': current_table == 2 ? false : true }"
            >
              <thead>
                <tr>
                  <th class="text-center">
                    Number
                  </th>
                  <th class="text-center">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ccn1 in ccn" :key="ccn1.number">
                  <td class="text-center">{{ ccn1.number }}</td>
                  <td class="text-center">{{ ccn1.number }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-simple-table
              :class="{ 'd-none': current_table == 3 ? false : true }"
            >
              <thead>
                <tr>
                  <th class="text-center">
                    Number
                  </th>
                  <th class="text-center">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cvv1 in livecvv" :key="cvv1.number">
                  <td class="text-center">{{ cvv1.number }}</td>
                  <td class="text-center">{{ cvv1.number }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar v-model="noti" :color="noticolor" :timeout="1500">
      {{ notitext }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="noti = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      cc:
        "Input Format\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx\nxxxxxxxxxxxxxxxx|xx|xxxx|xxx",
      dead: [{ number: "Quentin", result: "Gonus" }],
      ccn: [{ number: "Quentin", result: "Gonus" }],
      livecvv: [{ number: "Quentin", result: "Gonus" }],
      current_table: 0,
      tab: null,
      loading2: false,
      skcheck: false,
      switch1: false,
      gate: 0,
      delay: 0,
      noti: false,
      notitext: "Your SK is Live",
      noticolor: "success",
      ccs: "",
      sk: "",
    };
  },
  methods: {
    changeTable(table) {
      this.current_table = this.current_table == table ? 0 : table;
    },
    checkCC() {
      if (this.ccs == null || this.ccs == "") {
        this.notitext = "No CC input!";
        this.noticolor = "error";
        this.noti = true;
        return null;
      }
      this.loading2 = true;
    },
    checkSK() {
      if (this.sk == null || this.sk == "") {
        this.notitext = "No SK input!";
        this.noticolor = "error";
        this.noti = true;
        return null;
      }
      var data = {
        sk:
          "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",
      };

      var config = {
        method: "post",
        url: "https://asterian.dev/sk.php",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });
      this.skcheck = true;
      this.noti = true;
    },
  },
};
</script>

<style></style>
