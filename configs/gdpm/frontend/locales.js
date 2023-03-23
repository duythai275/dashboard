import {
  LAST_YEAR,
  THIS_YEAR,
  THIS_WEEK,
  LAST_WEEK,
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
      { key: "bulletin", value: "Bảng tin dịch bệnh" },
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
        key: "thisWeek_thisYear",
        value: `Tuần ${THIS_WEEK} - ${THIS_YEAR}`,
      },
      {
        key: "lastWeek_thisYear",
        value: `Tuần ${LAST_WEEK} - ${THIS_WEEK === 1 ? LAST_YEAR : THIS_YEAR}`,
      },
      {
        key: "status",
        value: "Trạng thái",
      },
      {
        key: "thisWeek_lastYear",
        value: `Tuần ${THIS_WEEK} - ${LAST_YEAR}`,
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
        key: "thisWeek_thisYear",
        value: `Week ${THIS_WEEK} - ${THIS_YEAR}`,
      },
      {
        key: "lastWeek_thisYear",
        value: `Week ${LAST_WEEK} - ${THIS_WEEK === 1 ? LAST_YEAR : THIS_YEAR}`,
      },
      {
        key: "status",
        value: "Status",
      },
      {
        key: "thisWeek_lastYear",
        value: `Week ${THIS_WEEK} - ${LAST_YEAR}`,
      },
    ],
  },
];
export default locales;
