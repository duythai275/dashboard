import { LAST_YEAR, THIS_YEAR, THIS_WEEK, LAST_WEEK } from "./dashboards/BulletinDashboard/constants/constants";

const locales = [
  {
    code: "vi",
    name: "Tiếng Việt",
    translations: [
      {
        key: "dashboard1Title",
        value: "dashboard1Title"
      },
      { key: "bulletin", value: "Bảng tin dịch bệnh" },
      {
        key: "disease",
        value: "Tên bệnh"
      },
      {
        key: "cases",
        value: "Ca mắc"
      },
      {
        key: "deaths",
        value: "Ca tử vong"
      },
      {
        key: "thisWeek_thisYear",
        value: `Tuần ${THIS_WEEK} - ${THIS_YEAR}`
      },
      {
        key: "lastWeek_thisYear",
        value: `Tuần ${LAST_WEEK} - ${THIS_WEEK === 1 ? LAST_YEAR : THIS_YEAR}`
      },
      {
        key: "status",
        value: "Trạng thái"
      },
      {
        key: "thisWeek_lastYear",
        value: `Tuần ${THIS_WEEK} - ${LAST_YEAR}`
      },
      //disease dashboard
      {
        key: "country",
        value: "Toàn quốc"
      },
      {
        key: "widget2Title",
        value: "trong 10 tuần qua"
      },
      {
        key: "northRegion",
        value: "Miền Bắc"
      },
      {
        key: "centralRegion",
        value: "Miền Trung"
      },
      {
        key: "centralHighlandsRegion",
        value: "Tây Nguyên"
      },
      {
        key: "southRegion",
        value: "Miền Nam"
      },
      {
        key: "case",
        value: "Ca mắc"
      },
      {
        key: "deathCase",
        value: "Ca tử vong"
      },
      { key: "week", value: "Tuần" },
      { key: "widget1Title", value: `Diễn biến bệnh {{diseaseName}} theo tuần` }
    ]
  },
  {
    code: "en",
    name: "English",
    translations: [
      {
        key: "dashboard1Title",
        value: "dashboard1Title"
      },
      { key: "bulletin", value: "Bulletin" },
      {
        key: "disease",
        value: "Disease"
      },
      {
        key: "cases",
        value: "Cases"
      },
      {
        key: "deaths",
        value: "Deaths"
      },
      {
        key: "thisWeek_thisYear",
        value: `Week ${THIS_WEEK} - ${THIS_YEAR}`
      },
      {
        key: "lastWeek_thisYear",
        value: `Week ${LAST_WEEK} - ${THIS_WEEK === 1 ? LAST_YEAR : THIS_YEAR}`
      },
      {
        key: "status",
        value: "Status"
      },
      {
        key: "thisWeek_lastYear",
        value: `Week ${THIS_WEEK} - ${LAST_YEAR}`
      },
      //disease dashboard
      {
        key: "country",
        value: "Country"
      },
      {
        key: "northRegion",
        value: "North Region"
      },
      {
        key: "centralRegion",
        value: "Central Region"
      },
      {
        key: "centralHighlandsRegion",
        value: "Central Highlands Region"
      },
      {
        key: "southRegion",
        value: "South Region"
      },
      {
        key: "case",
        value: "Cases"
      },
      {
        key: "deathCase",
        value: "Death Cases"
      },
      { key: "week", value: "Week" },
      { key: "widget1Title", value: `Weekly {{diseaseName}} cases` }
    ]
  }
];
export default locales;
