import {
  LAST_YEAR,
  THIS_YEAR,
  THIS_WEEK,
  LAST_WEEK,
} from "./dashboards/BulletinDashboard/constants/constants";
import { hmfdLocale } from "./dashboards/HfmdDashboard/locales";
import { hivLocales } from "./dashboards/HivDashboard/locales";

const locales = [
  {
    code: "vi",
    name: "Tiếng Việt",
    translations: [
      ...hivLocales.vi,
      ...hmfdLocale.vi,
      { key: "hiv", value: "Tổng thể chương trình HIV" },
      {
        key: "dashboard1Title",
        value: "dashboard1Title",
      },
      { key: "bulletin", value: "Bảng tin dịch bệnh truyền nhiễm (TT54)" },
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
      //disease dashboard
      {
        key: "country",
        value: "Toàn quốc",
      },
      {
        key: "widget2Title",
        value: "trong 10 tuần qua",
      },
      {
        key: "northRegion",
        value: "Miền Bắc",
      },
      {
        key: "centralRegion",
        value: "Miền Trung",
      },
      {
        key: "centralHighlandsRegion",
        value: "Tây Nguyên",
      },
      {
        key: "southRegion",
        value: "Miền Nam",
      },
      {
        key: "case",
        value: "Ca mắc",
      },
      {
        key: "deathCase",
        value: "Ca tử vong",
      },
      { key: "week", value: "Tuần" },
      {
        key: "widget1Title",
        value: `Diễn biến bệnh {{diseaseName}} theo tuần`,
      },
      { key: "labelWidget1", value: "T{{week}}" },
      {
        key: "widget1TitleWithProvince",
        value: `Diễn biến bệnh {{diseaseName}} theo tuần tại {{provinceName}}`,
      },
      {
        key: "widget2Title",
        value: `Các ca mắc {{diseaseName}} trong 10 tuần qua`,
      },
      {
        key: "widget3.1Title",
        value: `Các ca mắc {{diseaseName}} - {{lastYear}} (đến tuần {{currentWeek}})`,
      },
      {
        key: "widget3.2Title",
        value: `Các ca mắc {{diseaseName}} - {{lastYear}} (tuần {{currentWeek}})`,
      },
      {
        key: "widget3.3Title",
        value: `Các ca tử vong {{diseaseName}} - {{lastYear}} (tuần {{currentWeek}})`,
      },
      {
        key: "widget4.1Title",
        value: `Phần trăm thay đổi số các ca mắc {{diseaseName}} giữa {{lastYear}} và {{currentYear}} (đến tuần {{currentWeek}})`,
      },
      {
        key: "widget4.2Title",
        value: `Phần trăm thay đổi số các ca mắc {{diseaseName}} giữa {{lastYear}} và {{currentYear}} (tuần {{currentWeek}})`,
      },
      {
        key: "widget4.3Title",
        value: `Phần trăm thay đổi số các ca tử vong {{diseaseName}} giữa {{lastYear}} và {{currentYear}} (đến tuần {{currentWeek}})`,
      },
      {
        key: "widget5.1Title",
        value: `Các ca mắc {{diseaseName}} - {{currentYear}} (đến tuần {{currentWeek}})`,
      },
      {
        key: "widget5.2Title",
        value: `Các ca mắc {{diseaseName}} - {{currentYear}} (tuần {{currentWeek}})`,
      },
      {
        key: "widget5.3Title",
        value: `Các ca tử vong {{diseaseName}} - {{currentYear}} (tuần {{currentWeek}})`,
      },
      {
        key: "widget6.1Title",
        value: `Top 10 tỉnh có số ca mắc {{diseaseName}}  cao nhất (đến tuần {{currentWeek}})`,
      },
      {
        key: "widget6.2Title",
        value: `Top 10 tỉnh có số ca mắc {{diseaseName}}  cao nhất (tuần {{currentWeek}})`,
      },
      { key: "arithmeticMeanLast5Year", value: "Trung bình 5 năm trước" },
      { key: "back", value: "Bảng tin" },
      { key: "dengue", value: "Bệnh sốt xuất huyết" },
      {
        key: "widget1DengueDashboardTitle",
        value: "Số ca mắc SXHD KVPN theo tuần 5 năm liền kề tại {{orgUnit}}",
      },
      { key: "legendWidget1DengueDashboard", value: "{{year}}" },
      {
        key: "widget2DengueDashboardTitle",
        value:
          "Số ca tử vong do SXHD cộng dồn theo tuần 5 năm liền kề tại {{orgUnit}}",
      },
      { key: "legendWidget2DengueDashboard", value: "{{year}}" },
      {
        key: "widget3DengueDashboardTitle",
        value:
          "Số ca mắc SXHD và tử vong do SXHD phân bố theo địa phương tại {{orgUnit}}",
      },
      { key: "selectYear", value: "Chọn năm" },
      { key: "selectUnit", value: "Chọn đơn vị" },
      {
        key: "widget4DengueDashboardTitle",
        value: "Số ca mắc SXHD theo nhóm tuổi tại {{orgUnit}}",
      },
      {
        key: "widget5DengueDashboardTitle",
        value: "Số ca tử vong do SXHD theo nhóm tuổi tại {{orgUnit}}",
      },
      {
        key: "widget6DengueDashboardTitle",
        value:
          "Số ca mắc SXHD phân bố theo nhóm tuổi và địa phương tại {{orgUnit}}",
      },
      {
        key: "widget7DengueDashboardTitle",
        value: "Số ca mắc SXHD theo độ nặng ca bệnh tại {{orgUnit}}",
      },
      {
        key: "widget8DengueDashboardTitle",
        value:
          "Số ca mắc SXHD theo độ nặng ca bệnh và địa phương tại {{orgUnit}}",
      },
      { key: "dengueSeverer", value: "SXHD/SXHD nặng" },
      { key: "dengueWarning", value: "SXHD/SXHD có cảnh báo" },
      {
        key: "widget1InfluenzaDashboardTitle",
        value: "Phân bố các típ vi rút cúm theo năm qua Hệ thống GSTĐ HCC",
      },
      {
        key: "widget2InfluenzaDashboardTitle",
        value: "Số ca giám sát trọng điểm cúm theo tuần",
      },
      {
        key: "widget3InfluenzaDashboardTitle",
        value: "Số ca giám sát trọng điểm cúm theo điểm giám sát",
      },
      {
        key: "widget4InfluenzaDashboardTitle",
        value: "Số ca giám sát trọng điểm cúm theo điểm giám sát và theo năm",
      },
      { key: "influenzaCases", value: "Số ca" },
      { key: "influenzaTotalCase", value: "Tổng Số ca" },
      { key: "influenza", value: "Giám sát trọng điểm Cúm" },
      {
        key: "variantSarsCov2",
        value: "Danh sách giảm sát biến thể SARS-CoV-2",
      },
      { key: "caseCovid19", value: "Danh sách ca bệnh COVID-19" },
    ],
  },
  {
    code: "en",
    name: "English",
    translations: [
      ...hivLocales.en,
      ...hmfdLocale.en,
      { key: "hiv", value: "HIV" },
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
      //disease dashboard
      {
        key: "country",
        value: "Country",
      },
      {
        key: "northRegion",
        value: "North Region",
      },
      {
        key: "centralRegion",
        value: "Central Region",
      },
      {
        key: "centralHighlandsRegion",
        value: "Central Highlands Region",
      },
      {
        key: "southRegion",
        value: "South Region",
      },
      {
        key: "case",
        value: "Cases",
      },
      {
        key: "deathCase",
        value: "Death Cases",
      },
      { key: "week", value: "Week" },
      { key: "widget1Title", value: `Weekly {{diseaseName}} cases` },

      { key: "labelWidget1", value: "W{{week}}" },
      {
        key: "widget1TitleWithProvince",
        value: `Weekly {{diseaseName}} {{provinceName}} cases`,
      },
      {
        key: "widget2Title",
        value: `{{diseaseName}} cases in last 10 weeks`,
      },
      {
        key: "widget3.1Title",
        value: `{{diseaseName}} cases - {{lastYear}} (upto week {{currentWeek}})`,
      },
      {
        key: "widget3.2Title",
        value: `{{diseaseName}} cases - {{lastYear}} (week {{currentWeek}})`,
      },
      {
        key: "widget3.3Title",
        value: `{{diseaseName}} death cases - {{lastYear}} (upto week {{currentWeek}})`,
      },
      {
        key: "widget4.1Title",
        value: `% change number of {{diseaseName}} cases between {{lastYear}} and {{currentYear}} (upto week {{currentWeek}})`,
      },
      {
        key: "widget4.2Title",
        value: `% change number of {{diseaseName}} cases between {{lastYear}} and {{currentYear}} (week {{currentWeek}})`,
      },
      {
        key: "widget4.3Title",
        value: `% change number of {{diseaseName}} death cases between {{lastYear}} and {{currentYear}} (upto week {{currentWeek}})`,
      },
      {
        key: "widget5.1Title",
        value: `{{diseaseName}} cases - {{currentYear}} (upto week {{currentWeek}})`,
      },
      {
        key: "widget5.2Title",
        value: `{{diseaseName}} cases - {{currentYear}} (week {{currentWeek}})`,
      },
      {
        key: "widget5.3Title",
        value: `{{diseaseName}} death cases - {{currentYear}} (upto week {{currentWeek}})`,
      },
      {
        key: "widget6.1Title",
        value: `Top 10 provinces with highest cumulative {{diseaseName}} cases (upto week {{currentWeek}})`,
      },
      {
        key: "widget6.2Title",
        value: `Top 10 provinces with highest {{diseaseName}} cases (week {{currentWeek}})`,
      },
      { key: "arithmeticMeanLast5Year", value: "Average last 5 years" },
      { key: "back", value: "Bulletin" },
      { key: "dengue", value: "Dengue Fever" },
      {
        key: "widget1DengueDashboardTitle",
        value: "Số ca mắc SXHD KVPN theo tuần 5 năm liền kề tại {{orgUnit}}",
      },
      { key: "legendWidget1DengueDashboard", value: "{{year}}" },
      {
        key: "widget2DengueDashboardTitle",
        value:
          "Số ca tử vong do SXHD cộng dồn theo tuần 5 năm liền kề tại {{orgUnit}}",
      },
      { key: "legendWidget2DengueDashboard", value: "{{year}}" },
      {
        key: "widget3DengueDashboardTitle",
        value:
          "Số ca mắc SXHD và tử vong do SXHD phân bố theo địa phương tại {{orgUnit}}",
      },
      { key: "selectYear", value: "Select year" },
      { key: "selectUnit", value: "Select Org Unit" },
      {
        key: "widget4DengueDashboardTitle",
        value: "Số ca mắc SXHD theo nhóm tuổi tại {{orgUnit}}",
      },
      {
        key: "widget5DengueDashboardTitle",
        value: "Số ca tử vong do SXHD theo nhóm tuổ tại {{orgUnit}}i",
      },
      {
        key: "widget6DengueDashboardTitle",
        value:
          "Số ca mắc SXHD phân bố theo nhóm tuổi và địa phương tại {{orgUnit}}",
      },
      {
        key: "widget7DengueDashboardTitle",
        value: "Số ca mắc SXHD theo độ nặng ca bệnh tại {{orgUnit}}",
      },
      {
        key: "widget8DengueDashboardTitle",
        value:
          "Số ca mắc SXHD theo độ nặng ca bệnh và địa phương tại {{orgUnit}}",
      },
      { key: "dengueSeverer", value: "SXHD/SXHD nặng" },
      { key: "dengueWarning", value: "SXHD/SXHD có cảnh báo" },
      {
        key: "widget1InfluenzaDashboardTitle",
        value: "Phân bố các típ vi rút cúm theo năm qua Hệ thống GSTĐ HCC",
      },
      {
        key: "widget2InfluenzaDashboardTitle",
        value: "Số ca giám sát trọng điểm cúm theo tuần",
      },
      {
        key: "widget3InfluenzaDashboardTitle",
        value: "Số ca giám sát trọng điểm cúm theo điểm giám sát",
      },
      {
        key: "widget4InfluenzaDashboardTitle",
        value: "Số ca giám sát trọng điểm cúm theo điểm giám sát và theo năm",
      },
      { key: "influenzaCases", value: "Số ca" },
      { key: "influenzaTotalCase", value: "Tổng Số ca" },
      { key: "influenza", value: "Influenza" },
      {
        key: "variantSarsCov2",
        value: "Danh sách giảm sát biến thể SARS-CoV-2",
      },
      { key: "caseCovid19", value: "Danh sách ca bệnh COVID-19" },
    ],
  },
];
export default locales;
