import { getMonthName } from "./Dashboard1/common/function/getMonthName";

const locales = [
  {
    code: "lo",
    name: "Lao",
    translations: [
      {
        key: "dashboard1Title",
        value: "Mother and Child",
      },
      {
        key: "dashboard2Title",
        value: "SBA",
      },
      {
        key: "dashboard3Title",
        value: "Penta 3",
      },
      {
        key: "widget1.1Title",
        value: `Infant Death {{year}}`,
      },
      {
        key: "widget1.2Title",
        value: `Child Death {{year}}`,
      },
      {
        key: "widget1.3Title",
        value: `Maternal Death {{year}}`,
      },
      {
        key: "widget1.4Title",
        value: `Infant Mortality {{year}}`,
      },
      {
        key: "widget1.5Title",
        value: `Child Mortality {{year}}`,
      },
      {
        key: "widget1.6Title",
        value: `Maternal Mortality {{year}}`,
      },
      // {
      //   key: "widget1.4Title",
      //   value: "ຈຳນວນແມ່ແລະເດັກຕາຍໃນ 36​ເດືອນຜ່ານມາ",
      // },
      // {
      //   key: "widget1.5Title",
      //   value: "ຈຳນວນແມ່ຕາຍ",
      // },
      // {
      //   key: "widget1.6Title",
      //   value: "ຈຳນວນແມ່ແລະເດັກຕາຍໃນ 36​ເດືອນຜ່ານມາ",
      // },
      {
        key: "widget1.9Title",
        value: "ຈຳນວນເດັກຕາຍໃນ 5 ​ປີຜ່ານມາ",
      },
      // {
      //   key: "widget1.9Title",
      //   value: "PHEOC: ອັດຕາການລາຍງານຂໍ້ມູນພະຍາດເຝົ້າລະວັງຂອງແຕ່ລະແຂວງ",
      // },
      {
        key: "widget1.13Title",
        value: "NCLE Data Quality FEB 2023",
      },
      { key: "monthlyHeaderTitleOfWidget1.9", value: `{{month}} {{year}}` },
      { key: "weeklyHeaderTitleOfWidget1.9", value: `ອາທິດ{{month}} {{year}}` },
      { key: "widget1.1Date", value: `As on {{date}}` },
      { key: "lastPeriod", value: `Same period last year: {{value}}` },
      { key: "headerTitleWidget1.7", value: "Data/Period" },
      { key: "headerTitleWidget1.9", value: "Org Units/Period" },
      { key: "jan", value: "January" },
      { key: "feb", value: "Febuary" },
      { key: "mar", value: "March" },
      { key: "apr", value: "April" },
      { key: "may", value: "May" },
      { key: "jun", value: "June" },
      { key: "jul", value: "July" },
      { key: "aug", value: "August" },
      { key: "sep", value: "September" },
      { key: "oct", value: "October" },
      { key: "nov", value: "November" },
      { key: "dec", value: "December" },
      {
        key: "widget1.12Title",
        value: "Reporting Rate",
      },
      {
        key: "widget1.11.1Title",
        value: "Infant Death by Province Last Year",
      },
      {
        key: "widget1.11.2Title",
        value: "Child Death by Province Last Year",
      },
      {
        key: "widget1.11.3Title",
        value: "Maternal Death by Province Last Year",
      },
      {
        key: "widget1.10.1Title",
        value: "Infant mortality rate by Province Last Year",
      },
      {
        key: "widget1.10.2Title",
        value: "Child mortality rate by Province Last Year",
      },
      {
        key: "widget1.10.3Title",
        value: "Maternal mortality rate by Province Last Year",
      },
      {
        key: "widget1.7.1Title",
        value: "Infant Death",
      },
      {
        key: "widget1.7.2Title",
        value: "Child Death",
      },
      {
        key: "widget1.7.3Title",
        value: "Maternal Death",
      },
      {
        key: "widget1.8.1Title",
        value: "Infant mortality rate (annualised)",
      },
      {
        key: "widget1.8.2Title",
        value: "Child mortality rate (annualised)",
      },
      {
        key: "widget1.8.3Title",
        value: "Maternal mortality rate (annualised)",
      },
    ],
  },
  {
    code: "en",
    name: "English",
    translations: [
      {
        key: "dashboard1Title",
        value: "Mother and Child",
      },
      {
        key: "dashboard2Title",
        value: "SBA",
      },
      {
        key: "dashboard3Title",
        value: "Penta 3",
      },
      {
        key: "widget1.1Title",
        value: `Infant Death {{year}}`,
      },
      {
        key: "widget1.2Title",
        value: `Child Death {{year}}`,
      },
      {
        key: "widget1.3Title",
        value: `Maternal Death {{year}}`,
      },
      {
        key: "widget1.4Title",
        value: `Infant Mortality {{year}}`,
      },
      {
        key: "widget1.5Title",
        value: `Child Mortality {{year}}`,
      },
      {
        key: "widget1.6Title",
        value: `Maternal Mortality {{year}}`,
      },
      // {
      //   key: "widget1.4Title",
      //   value: "Maternal and child mortality in the last 36 months - Lao PDR",
      // },
      // {
      //   key: "widget1.5Title",
      //   value: "Maternal deaths by provinces last year",
      // },
      // {
      //   key: "widget1.6Title",
      //   value: "Maternal and child mortality in the last 36 months - Lao PDR",
      // },
      {
        key: "widget1.9Title",
        value: "Reported children under five deaths last 5 year - Lao PDR",
      },
      // {
      //   key: "widget1.9Title",
      //   value:
      //     "PHEOC Surveillance - 00. Reporting rate by province, last 4 weeks and last month",
      // },
      {
        key: "widget1.13Title",
        value: "NCLE Data Quality FEB 2023",
      },
      { key: "monthlyHeaderTitleOfWidget1.9", value: `{{month}} {{year}}` },
      { key: "weeklyHeaderTitleOfWidget1.9", value: `W{{month}} {{year}}` },
      { key: "widget1.1Date", value: `As on {{date}}` },
      { key: "lastPeriod", value: `Same period last year: {{value}}` },
      { key: "headerTitleWidget1.7", value: "Data/Period" },
      { key: "headerTitleWidget1.9", value: "Org Units/Period" },
      { key: "jan", value: "January" },
      { key: "feb", value: "Febuary" },
      { key: "mar", value: "March" },
      { key: "apr", value: "April" },
      { key: "may", value: "May" },
      { key: "jun", value: "June" },
      { key: "jul", value: "July" },
      { key: "aug", value: "August" },
      { key: "sep", value: "September" },
      { key: "oct", value: "October" },
      { key: "nov", value: "November" },
      { key: "dec", value: "December" },
      {
        key: "widget1.12Title",
        value: "Reporting Rate",
      },
      {
        key: "widget1.11.1Title",
        value: "Infant Death by Province Last Year",
      },
      {
        key: "widget1.11.2Title",
        value: "Child Death by Province Last Year",
      },
      {
        key: "widget1.11.3Title",
        value: "Maternal Death by Province Last Year",
      },
      {
        key: "widget1.10.1Title",
        value: "Infant mortality rate by Province Last Year",
      },
      {
        key: "widget1.10.2Title",
        value: "Child mortality rate by Province Last Year",
      },
      {
        key: "widget1.10.3Title",
        value: "Maternal mortality rate by Province Last Year",
      },

      {
        key: "widget1.7.1Title",
        value: "Infant Death",
      },
      {
        key: "widget1.7.2Title",
        value: "Child Death",
      },
      {
        key: "widget1.7.3Title",
        value: "Maternal Death",
      },
      {
        key: "widget1.8.1Title",
        value: "Infant mortality rate (annualised)",
      },
      {
        key: "widget1.8.2Title",
        value: "Child mortality rate (annualised)",
      },
      {
        key: "widget1.8.3Title",
        value: "Maternal mortality rate (annualised)",
      },
    ],
  },
];
export default locales;
