<style lang="scss" scoped></style>

<template>
  <div v-if="isVisible">
    <div
      class="modal-cover"
      @click="() => (coverCallback ? coverCallback() : defaultClick())"
    ></div>
    <div :class="getModalCls()">
      <div class="title" v-if="title.length > 0">{{ title }}</div>
      <div class="glyph" v-if="glyph.length > 0">
        <Icon size="lg" :status="status" :glyph="glyph" />
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="controls" v-if="controls !== null">
        <div class="button-group-expanded-horizontal">
          <button
            v-for="(button, idx) in controls"
            :key="idx"
            @click="
              () => (button.callback ? button.callback() : defaultClick())
            "
            :class="button.cls ? button.cls : 'primary'"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateStatus } from "@/libs/uiComponentPropValidation.js";
import Icon from "./Icon";

export default {
  name: "Modal",
  components: { Icon },
  props: {
    title: {
      type: String,
      default: "",
    },
    controls: {
      type: Array,
      default: null,
    },
    coverCallback: {
      type: Function,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    glyph: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "neutral",
      validator: validateStatus,
    },
  },
  watch: {
    visible: function (newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.isVisible = this.newVal;
    },
  },
  data() {
    return {
      isVisible: this.visible,
    };
  },
  computed: {},
  methods: {
    defaultClick() {
      this.isVisible = !this.isVisible;
    },
    getModalCls() {
      return ["modal", this.status === "neutral" ? "" : this.status].join(" ");
    },
  },
};
</script>
