<style lang="scss" scoped></style>

<template>
  <div>
    <div
      class="modal-cover"
      @click="() => (callback ? callback() : coverClick())"
    ></div>
    <div class="modal">
      <div class="title" v-if="title.length > 0">{{ title }}</div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="controls" v-if="controls !== null">
        <span v-for="(button, idx) in controls" :key="idx">
          <button
            @click="
              () => (button.callback ? button.callback() : defaultClick())
            "
            :class="button.cls ? button.cls : 'primary'"
          >
            {{ button.label }}
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    controls: {
      type: Array,
      default: null,
    },
    callback: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {},
  methods: {
    coverClick() {
      console.log("Cover click");
    },
    defaultClick() {
      console.log("Default click");
    },
  },
  mounted() {
    console.log(this.controls);
  },
};
</script>
