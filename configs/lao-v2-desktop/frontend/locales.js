import { getMonthName } from "./Dashboard1/common/function/getMonthName";

const locales = [
  {
    code: "lo",
    name: "Lao",
    translations: [
      {
        key: "dashboard1Title",
        value: "M and C",
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
        value: `Less than 1 year Death {{year}}`,
      },
      {
        key: "widget1.2Title",
        value: `Less than 5 year Death {{year}}`,
      },
      {
        key: "widget1.3Title",
        value: `Mother Death {{year}}`,
      },
      {
        key: "widget1.4Title",
        value: "ຈຳນວນແມ່ແລະເດັກຕາຍໃນ 36​ເດືອນຜ່ານມາ",
      },
      {
        key: "widget1.5Title",
        value: "ຈຳນວນແມ່ຕາຍ",
      },
      {
        key: "widget1.6Title",
        value: "ຈຳນວນແມ່ແລະເດັກຕາຍໃນ 36​ເດືອນຜ່ານມາ",
      },
      {
        key: "widget1.7Title",
        value: "ຈຳນວນເດັກຕາຍໃນ 5 ​ປີຜ່ານມາ",
      },
      {
        key: "widget1.9Title",
        value: "PHEOC: ອັດຕາການລາຍງານຂໍ້ມູນພະຍາດເຝົ້າລະວັງຂອງແຕ່ລະແຂວງ",
      },
      {
        key: "widget1.10Title",
        value: "NCLE Data Quality FEB 2023",
      },
      { key: "monthlyHeaderTitleOfWidget1.9", value: `{{month}} {{year}}` },
      { key: "weeklyHeaderTitleOfWidget1.9", value: `ອາທິດ{{month}} {{year}}` },
      { key: "widget1.1Date", value: `As at {{date}}` },
      { key: "lastPeriod", value: `Same period last year: {{value}}` },
      { key: "headerTitleWidget1.7", value: "Data/Period" },
      { key: "headerTitleWidget1.9", value: "Org Units/Period" },
    ],
  },
  {
    code: "en",
    name: "English",
    translations: [
      {
        key: "dashboard1Title",
        value: "M and C",
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
        value: `Less than 1 year Death {{year}}`,
      },
      {
        key: "widget1.2Title",
        value: `Less than 5 year Death {{year}}`,
      },
      {
        key: "widget1.3Title",
        value: `Mother Death {{year}}`,
      },
      {
        key: "widget1.4Title",
        value: "Maternal and child mortality in the last 36 months - Lao PDR",
      },
      {
        key: "widget1.5Title",
        value: "Maternal deaths by provinces last year",
      },
      {
        key: "widget1.6Title",
        value: "Maternal and child mortality in the last 36 months - Lao PDR",
      },
      {
        key: "widget1.7Title",
        value: "Reported children under five deaths last 5 year - Lao PDR",
      },
      {
        key: "widget1.9Title",
        value:
          "PHEOC Surveillance - 00. Reporting rate by province, last 4 weeks and last month",
      },
      {
        key: "widget1.10Title",
        value: "NCLE Data Quality FEB 2023",
      },
      { key: "monthlyHeaderTitleOfWidget1.9", value: `{{month}} {{year}}` },
      { key: "weeklyHeaderTitleOfWidget1.9", value: `W{{month}} {{year}}` },
      { key: "widget1.1Date", value: `As at {{date}}` },
      { key: "lastPeriod", value: `Same period last year: {{value}}` },
      { key: "headerTitleWidget1.7", value: "Data/Period" },
      { key: "headerTitleWidget1.9", value: "Org Units/Period" },
    ],
  },
];
export default locales;
