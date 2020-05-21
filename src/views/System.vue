<style lang="scss" scoped>
.system-name {
  font-weight: $font-weight-bold;
  font-size: 1.2rem;
}
</style>

<template>
  <div class="container">
    <div v-if="$route.params.id === ':id' || !$route.params.id">
      <h1>Select a system from the home page to view details</h1>
    </div>
    <div v-else>
      <h1>{{ systemDetails.name }}</h1>
      <Badge large status="info" glyph="fa fa-link"
        ><a :href="systemDetails.url">{{ systemDetails.url }}</a></Badge
      >
      <hr />
      <h2>Incident Log</h2>
      <table class="table auto top">
        <tbody>
          <tr v-for="(incident, idx) in systemDetails.incidents" :key="idx">
            <td>
              <Badge
                :status="statusCodeToString(incident.status)"
                :glyph="statusCodeToGlyph(incident.status)"
                >{{ incident.date }}</Badge
              >
            </td>
            <td>{{ incident.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

import { statusCodeToGlyph, statusCodeToString } from "../libs/utilities";

export default {
  name: "System",
  components: { Icon, Badge },
  props: {
    p: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      systemDetails: null,
    };
  },
  computed: {
    ...mapGetters(["getStatusEnum", "getSystems", "getSystemById"]),
  },
  methods: {
    statusCodeToString,
    statusCodeToGlyph,
    getSystemDetails() {
      return this.getSystemById(this.$route.params.id);
    },
  },
  beforeMount() {
    // Cache before it's drawn
    this.systemDetails = this.getSystemDetails();
  },
};
</script>
