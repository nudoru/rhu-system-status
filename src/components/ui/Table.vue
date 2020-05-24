<style lang="scss" scoped></style>

<template>
  <table :class="cls()">
    <thead>
      <tr>
        <th
          scope="col"
          :class="headerCls(col)"
          v-for="(col, idx) in format"
          :key="idx"
        >
          {{ col.heading }}
          <i :class="headerIcon(col)" v-if="col.sortable"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rowData, ridx) in data" :key="ridx">
        <td v-for="(col, cidx) in format" :key="cidx">
          <slot :name="col.slot" :value="col.accessor(rowData)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
/*

- hover on sortable header
- click on sortable header
- col sort fn


    https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    https://listjs.com/
    https://github.com/nwoltman/string-natural-compare
    https://www.npmjs.com/package/fast-sort
    http://numeraljs.com/

    Input is object array
    data obj listing
        object key
        column heading
        sortable true/false
        sorted true/false
            asc/dsc
        data type? to help w/ sorting?
        sort fn?
        custom render fn: cellData => {}
         sortChanged callback? or event?
     */

export default {
  name: "Table",
  components: {},
  props: {
    data: {
      // Array of objects
      type: Array,
      required: true,
    },
    format: {
      // Array of objects
      type: Array,
      required: true,
    },
    alignTop: {
      type: Boolean,
      default: false,
    },
    sizeAuto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    cls() {
      return [
        "table",
        this.alignTop ? "top" : "",
        this.sizeAuto ? "auto" : "",
      ].join(" ");
    },
    headerCls(col) {
      return [col.sortable ? "sortable" : "", col.sorted ? "sorted" : ""].join(
        " "
      );
    },
    headerIcon(col) {
      if (col.sortable && col.sorted && col.sortDirection === 1) {
        return "fas fa-chevron-up  sort-icon";
      } else if (col.sortable && col.sorted && col.sortDirection === -1) {
        return "fas fa-chevron-down sort-icon";
      } else if (col.sortable) {
        return "far fa-circle sort-icon";
      }
      return "";
    },
  },
  mounted() {
    // console.log(this.format);
  },
};
</script>
