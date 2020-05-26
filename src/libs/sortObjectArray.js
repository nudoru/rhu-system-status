import moment from "moment";
import { path } from "ramda";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const isNumber = (aKey, bKey) =>
  !isNaN(parseFloat(aKey)) && !isNaN(parseFloat(bKey));

// In sample data the dates are formatted: "November 5, 2019 3:41 AM"
// moment 'LLL' format
const isDate = (aKey, bKey) =>
  months.indexOf(aKey.toLowerCase().substring(0, 3)) != -1 &&
  months.indexOf(bKey.toLowerCase().substring(0, 3)) != -1;

export const sortObjectArray = (sortPath, direction, arry) => {
  return arry.sort((a, b) => {
    let aKey = path(sortPath, a),
      bKey = path(sortPath, b);

    if (isNumber(aKey, bKey)) {
      // Keep numbers from being compared as strings
      aKey = parseFloat(aKey);
      bKey = parseFloat(bKey);
    } else {
      if (isDate(aKey, bKey)) {
        aKey = moment(aKey, "LLL");
        bKey = moment(bKey, "LLL");
        if (direction === 1) {
          if (aKey.isBefore(bKey)) return -1;
          if (aKey.isAfter(bKey)) return 1;
        } else {
          if (aKey.isBefore(bKey)) return 1;
          if (aKey.isAfter(bKey)) return -1;
        }
        return;
      }
    }

    // Numbers and strings
    if (direction === 1) {
      if (aKey < bKey) return -1;
      if (aKey > bKey) return 1;
    } else {
      if (aKey < bKey) return 1;
      if (aKey > bKey) return -1;
    }
    return 0;
  });
};
