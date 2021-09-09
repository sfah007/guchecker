<template>
  <v-container>
    <v-simple-table v-if="isVIP">
      <thead>
        <tr>
          <th class="text-center">
            ID
          </th>
          <th class="text-center">
            Card
          </th>
          <th class="text-center">
            Operation
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cvv1, index) in cvv" :key="index">
          <td class="text-center">{{ cvv1.id }}</td>
          <td class="text-center">{{ cvv1.cvv }}</td>
          <td class="text-center">Nothing Yet</td>
        </tr>
      </tbody>
    </v-simple-table>
    <p v-if="!isVIP">You are not a VIP user.</p>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  props: ["isVIP"],
  data() {
    return {
      cvv: [],
    };
  },
  created() {
    axios
      .post("https://asterian.dev/get.php", {
        pass: "GUGUGUGUGU",
      })
      .then(({ data }) => {
        this.cvv = data;
      });
  },
};
</script>

<style></style>
