<style lang="scss" scoped></style>

<template>
  <table :class="cls()">
    <thead>
      <tr>
        <th
          scope="col"
          :class="headerCls(col)"
          v-for="(col, idx) in dataFormat"
          :key="idx"
          @click="
            (evt) => {
              col.sortable ? onSortHeaderClick(idx) : false;
            }
          "
        >
          {{ col.heading }}
          <i :class="headerIcon(col)" v-if="col.sortable"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rowData, ridx) in tableData" :key="ridx">
        <td v-for="(col, cidx) in dataFormat" :key="cidx">
          <slot :name="col.slot" :value="getCellValue(col, rowData)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
/*
  BUG
  - if sortDirection isn't present in the format data, arrows don't work correctly on the header when sort clicks. Add validation step?
  */

import { path } from "ramda";
import { sortObjectArray } from "../../libs/sortObjectArray";

export default {
  name: "Table",
  components: {},
  props: {
    data: {
      type: Array,
      required: true,
    },
    format: {
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
    return {
      tableData: this.data,
      dataFormat: this.format, // needs to have sort applied from format
      dataFilter: null,
    };
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
      // BUG, if sortDirection not present, then it's always up
      if (col.sortable && col.sorted && col.sortDirection === -1) {
        return "fas fa-chevron-up sort-icon";
      } else if (col.sortable && col.sorted && col.sortDirection === 1) {
        return "fas fa-chevron-down sort-icon";
      } else if (col.sortable) {
        return "far fa-circle sort-icon";
      }
      return "";
    },
    getCellValue(col, cell) {
      if (col.hasOwnProperty("path") && col.path !== null) {
        return path(col.path, cell);
      }
      return cell;
    },
    onSortHeaderClick(colIdx) {
      let column = this.dataFormat[colIdx];
      if (column.sorted) {
        column.sortDirection = column.sortDirection === 1 ? -1 : 1;
      } else {
        this.clearColumnSorts();
        column.sorted = true;
        if (
          !column.hasOwnProperty("sort sortDirection") ||
          column.sortDirection === 0 ||
          column.sortDirection === null
        ) {
          column.sortDirection = 1;
        }
      }

      let sortPath = column.hasOwnProperty("sortPath")
        ? column.sortPath
        : column.hasOwnProperty("path")
        ? column.path
        : null;

      if (!sortPath) {
        console.error(
          `There is no path or sortPath for column ${column.heading}!`
        );
        return;
      }

      this.tableData = sortObjectArray(
        sortPath,
        column.sortDirection,
        this.tableData
      );
    },
    clearColumnSorts() {
      this.dataFormat = this.dataFormat.map((col) => {
        if (col.sortable) {
          col.sorted = false;
        }
        return col;
      });
    },
  },
  mounted() {
    // console.log(this.format);
  },
};
</script>
