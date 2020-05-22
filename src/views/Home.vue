<style lang="scss" scoped>
.system-name {
  font-weight: $font-weight-bold;
  font-size: 1.2rem;
}
</style>

<template>
  <div class="container">
    <h1>System Availability</h1>
    <table class="table auto top">
      <tbody>
        <tr v-for="(system, idx) in getSystems" :key="idx">
          <td>
            <Icon
              :status="statusCodeToString(system.lastIncident.status)"
              :glyph="statusCodeToGlyph(system.lastIncident.status)"
            />
          </td>
          <td>
            <router-link class="system-name" :to="'system/' + system.id">
              {{ system.name }}
            </router-link>
          </td>
          <td>
            <p>{{ system.lastIncident.message }}</p>
            <Badge status="neutral" glyph="far fa-calendar-alt">{{
              system.lastIncident.date
            }}</Badge>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

import { statusCodeToGlyph, statusCodeToString } from "../libs/utilities";

export default {
  name: "Home",
  components: { Icon, Badge },
  props: {
    p: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: true,
    };
  },
  computed: {
    ...mapGetters(["getStatusEnum", "getSystems", "getSystemById"]),
  },
  methods: {
    statusCodeToString,
    statusCodeToGlyph,
  },
};
</script>
