<template>
  <v-container>
    <v-simple-table v-if="isSVIP">
      <thead>
        <tr>
          <th class="text-center">
            ID
          </th>
          <th class="text-center">
            Card
          </th>
          <th class="text-center">
            Date/Time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cvv1, index) in cvv" :key="index">
          <td class="text-center">{{ cvv1.id }}</td>
          <td class="text-center">{{ cvv1.cvv }}</td>
          <td class="text-center">{{ cvv1.date }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <p v-if="!isSVIP">You are not a VIP user.</p>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  props: ["isSVIP"],
  data() {
    return {
      cvv: [],
    };
  },
  created() {
    axios
      .post("http://localhost/get.php", {
        pass: "GUGUGUGUGU",
      })
      .then(({ data }) => {
        this.cvv = data;
      });
  },
};
</script>

<style></style>
