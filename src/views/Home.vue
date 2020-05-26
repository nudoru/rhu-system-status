<style lang="scss" scoped>
.system-name {
  font-weight: $font-weight-bold;
  font-size: 1.2rem;
}
</style>

<template>
  <div class="container">
    <h1>System Availability</h1>
    <Table
      alignTop
      sizeAuto
      zebraRows
      hoverRows
      :data="getSystems"
      :format="[
        {
          heading: 'Status',
          slot: 'status',
          path: ['lastIncident', 'status'],
          sortable: true,
          sortDirection: 1,
        },
        {
          heading: 'System',
          slot: 'system',
          sortPath: ['name'],
          sortable: true,
          sortDirection: 0,
        },
        {
          heading: 'Last Update',
          slot: 'lastupdate',
          path: ['lastIncident'],
          sortPath: ['lastIncident', 'date'],
          sortable: true,
          sortDirection: -1,
          sorted: true,
        },
      ]"
    >
      <template v-slot:status="{ value }">
        <Icon
          :status="statusCodeToString(value)"
          :glyph="statusCodeToGlyph(value)"
        />
      </template>
      <template v-slot:system="{ value }">
        <router-link class="system-name" :to="'system/' + value.id">
          {{ value.name }}
        </router-link>
      </template>
      <template v-slot:lastupdate="{ value }">
        <Badge status="secondary" glyph="far fa-calendar-alt">{{
          value.date
        }}</Badge>
        <p>{{ value.message }}</p>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

import { statusCodeToGlyph, statusCodeToString } from "../libs/utilities";
import Table from "../components/ui/Table";

export default {
  name: "Home",
  components: { Table, Icon, Badge, Table },
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
