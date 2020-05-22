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
    <Modal
      :visible="showModal"
      title="Some Modal"
      glyph="fa fa-air-freshener"
      status="primary"
      :controls="[
        {
          label: 'Close',
          cls: 'secondary outline link',
        },
        { label: 'Save', callback: handleModalSave },
      ]"
    >
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id orci
          elementum nisl bibendum tincidunt ac sit amet odio. Ut volutpat odio
          eu leo pellentesque cursus. In non dui vitae turpis mollis
          pellentesque a a erat. Phasellus sollicitudin imperdiet elit, egestas
          blandit ante tincidunt molestie. Proin in risus metus. Suspendisse
          eleifend nisl sit amet fringilla rhoncus. Quisque ultricies nunc orci,
          vel laoreet quam vehicula vel. Aliquam erat volutpat. Nulla tristique
          sem sit amet dui sollicitudin, at tristique lorem luctus. Pellentesque
          quam ligula, consequat gravida tincidunt sit amet, ultrices porttitor
          nisi. Nulla sodales, dui vel mollis bibendum, libero urna cursus
          tortor, lacinia pretium diam nunc ultricies nulla. Suspendisse
          convallis ultrices posuere. Sed diam lorem, interdum quis ornare quis,
          vulputate a urna. Nullam rutrum blandit libero, sed lobortis ex.
        </p>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

import { statusCodeToGlyph, statusCodeToString } from "../libs/utilities";
import Modal from "../components/ui/Modal";

export default {
  name: "Home",
  components: { Modal, Icon, Badge },
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
    handleModalClose() {
      console.log("Modal close");
    },
    handleModalSave() {
      console.log("Modal save!");
      this.showModal = false;
    },
  },
};
</script>
