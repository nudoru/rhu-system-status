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
  TODO
  BUG - if sortDirection isn't present in the format data, arrows don't work correctly on the header when sort clicks. Add validation step?

  OPT - Merge applyDefaultSort and onSortHeader click
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
    zebraRows: {
      type: Boolean,
      default: false,
    },
    zebraCols: {
      type: Boolean,
      default: false,
    },
    hoverRows: {
      type: Boolean,
      default: false,
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
      dataFormat: this.format, // needs to have sort applied from format
      tableData: this.applyDefaultSort(this.data),
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
        this.zebraRows ? "zebra-rows" : "",
        this.zebraCols ? "zebra-cols" : "",
        this.hoverRows ? "hover-rows" : "",
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
    applyDefaultSort(data) {
      // accessing prop not data because running in data init fn
      let firstSortHeader = this.format.reduce((acc, x, idx) => {
        if (x.sorted && acc === -1) {
          acc = idx;
        }
        return acc;
      }, -1);

      return sortObjectArray(
        this.format[firstSortHeader].sortPath,
        this.format[firstSortHeader].sortDirection,
        data
      );
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
