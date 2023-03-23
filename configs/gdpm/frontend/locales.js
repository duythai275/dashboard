import {
  LAST_YEAR,
  THIS_YEAR,
} from "./dashboards/Dashboard1/constants/constants";

const locales = [
  {
    code: "vi",
    name: "Tiếng Việt",
    translations: [
      {
        key: "dashboard1Title",
        value: "dashboard1Title",
      },
      { key: "bulletin", value: "Bảng tin" },
      {
        key: "disease",
        value: "Tên bệnh",
      },
      {
        key: "cases",
        value: "Ca mắc",
      },
      {
        key: "deaths",
        value: "Ca tử vong",
      },
      {
        key: "week12_currYear",
        value: "Tuần 12	- " + THIS_YEAR,
      },
      {
        key: "week11_currYear",
        value: "Tuần 11	- " + THIS_YEAR,
      },
      {
        key: "status",
        value: "Trạng thái",
      },
      {
        key: "week12_prevYear",
        value: "Tuần 12 - " + LAST_YEAR,
      },
    ],
  },
  {
    code: "en",
    name: "English",
    translations: [
      {
        key: "dashboard1Title",
        value: "dashboard1Title",
      },
      { key: "bulletin", value: "Bulletin" },
      {
        key: "disease",
        value: "Disease",
      },
      {
        key: "cases",
        value: "Cases",
      },
      {
        key: "deaths",
        value: "Deaths",
      },
      {
        key: "week12_currYear",
        value: "Week 12	- " + THIS_YEAR,
      },
      {
        key: "week11_currYear",
        value: "Week 11	- " + THIS_YEAR,
      },
      {
        key: "status",
        value: "Status",
      },
      {
        key: "week12_prevYear",
        value: "Week 12 - " + LAST_YEAR,
      },
    ],
  },
];
export default locales;
