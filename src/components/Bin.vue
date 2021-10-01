<template>
  <div>
    <v-tabs v-model="tab" centered>
      <v-tab>Generate</v-tab>
      <v-tab>Checker</v-tab>
      <v-tab>Results</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div class="d-flex justify-center align-center" style="height:85vh">
          Coming Soon
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="px-5 pt-2 " style="height:85vh">
          <div class="pb-5">
            <p class="red--text">
              Multi Bin Checker<br />
              You can check 200 bins per check<br />
              with default rate 1 seconds.<br />
            </p>
          </div>
          <div class="pb-5">
            <v-textarea
              solo
              :placeholder="cc"
              :cols="35"
              :rows="10"
              v-model="ccs"
              :disabled="loading2"
            ></v-textarea>
          </div>
          <div class="pb-5">
            <v-btn
              class="mr-5 mb-5"
              v-if="!loading2"
              color="success"
              @click="checkCC"
              style="width:150px"
            >
              Check
            </v-btn>
            <v-btn
              class="mr-5 mb-5"
              color="error"
              v-if="loading2"
              @click="stopChecking"
            >
              Stop Checking
            </v-btn>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="pt-5">
          <div>
            <v-simple-table>
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
                <tr v-for="(ccn1, index) in ccn" :key="index">
                  <td class="text-center">{{ ccn1.number }}</td>
                  <td class="text-center">{{ ccn1.result }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-fab-transition>
      <v-btn
        v-show="current_table == 2 && dead.length != 0 && tab == 2"
        fixed
        bottom
        right
        fab
        class="mr-7 mb-10"
        @click="clearDead"
      >
        <v-icon color="error">mdi-delete</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="current_table == 2 && ccn.length != 0 && tab == 2"
        fixed
        bottom
        right
        fab
        class="mr-7 mb-10"
        @click="copyCCN"
      >
        <v-icon color="primary">mdi-content-copy</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="current_table == 3 && livecvv.length != 0 && tab == 2"
        fixed
        bottom
        right
        fab
        class="mr-7 mb-10"
        @click="copyCVV"
      >
        <v-icon color="success">mdi-content-copy</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-snackbar v-model="noti" :color="noticolor" :timeout="2500">
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
      dead: [],
      ccn: [],
      livecvv: [],
      current_table: 2,
      tab: 1,
      loading2: false,
      skcheck: false,
      switch1: false,
      noti: false,
      notitext: "",
      noticolor: "success",
      ccs: "",
      interuption: false,
      procout: false,
    };
  },
  methods: {
    copyCCN() {
      let tmptxt = "Bins\n---------------\nChecker: 『ＧｕＣｌ』 Gu(古)\n\n";
      this.ccn.forEach((item) => {
        tmptxt += item.number + " >" + item.result + "\n";
      });
      this.copyCode(tmptxt);
    },
    copyCVV() {
      let tmptxt =
        "CVV Cards\n---------------\nGateway: Stripe 8(NO SK)\nChecker: 『ＧｕＣｌ』 Gu(古)\n\n";
      this.livecvv.forEach((item) => {
        tmptxt += item.number + " >" + item.result + "\n";
      });
      this.copyCode(tmptxt);
    },
    copyCode(txt) {
      try {
        navigator.clipboard.writeText(txt);
        this.notitext = "Copied to Clipboard";
        this.noticolor = "success";
        this.noti = true;
      } catch (e) {
        this.notitext = "Sorry! Cannot copy to clipboard.";
        this.noticolor = "error";
        this.noti = true;
      }
    },
    stopChecking() {
      this.interuption = true;
    },
    clearDead() {
      this.dead = [];
    },
    changeTable(table) {
      this.current_table = this.current_table == table ? 0 : table;
    },
    deleteline() {
      let ccs = this.ccs.split("\n");
      ccs.splice(0, 1);
      this.ccs = ccs.join("\n");
    },
    checkCC() {
      if (this.ccs == null || this.ccs == "") {
        this.notitext = "No CC input!";
        this.noticolor = "error";
        this.noti = true;
        return null;
      }
      if (this.ccs.split("\n").length > 200) {
        this.notitext = "Only 200 cards per check!";
        this.noticolor = "error";
        this.noti = true;
        return null;
      }
      this.loading2 = true;
      let tmpdelay = 1000;
      let checkInterval = setInterval(() => {
        if (this.ccs == "" || this.interuption) {
          this.loading2 = false;
          clearInterval(checkInterval);
          this.interuption = false;
        } else {
          let tmpcc = this.ccs.split("\n")[0];
          this.bin(tmpcc);
          this.deleteline();
        }
      }, tmpdelay);
    },
    bin(cc) {
      axios
        .get("https://adyen.hostman.site/api/" + cc.split("|")[0])
        .then(({ data }) => {
          if (data.result == false) {
            this.ccn.push({
              number: cc.split("|")[0],
              result: "No Data Available",
            });
          } else {
            this.ccn.push({
              number: cc.split("|")[0],
              result: `${data.brand} | ${data.level} | ${data.type} | ${data.country}`,
            });
          }
        });
    },
  },
};
</script>

<style></style>
