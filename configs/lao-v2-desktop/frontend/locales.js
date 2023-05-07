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
      {
        key: "widget2.1Title",
        value: "Less than 1 year Death {{currentYear}}",
      },
      {
        key: "widget2.2Title",
        value: "Less than 5 year Death {{currentYear}}",
      },
      { key: "widget2.3Title", value: "Mother Death {{currentYear}}" },
      { key: "widget2.4.1Title", value: "Lao PDR - MCH: Total number of SBA" },
      {
        key: "widget2.4.2Title",
        value: "Lao PDR - MCH: SBA coverage (Annualized)",
      },
      { key: "widget2.5.1Title", value: "MCH: Total number of SBA" },
      { key: "widget2.5.2Title", value: "MCH: SBA coverage (Annualized)" },
      {
        key: "widget2.6Title",
        value: "SBA Coverage (Annualized) by provinces {{currentYear}}",
      },
      {
        key: "widget2.7Title",
        value: "SBA total by provinces {{currentYear}}",
      },
      { key: "widget2.8Title", value: "Reporting Rate" },
      { key: "widget2.9Title", value: "Repoting rate heat map" },
      {
        key: "widget4.1Title",
        value: "% members registered",
      },
      {
        key: "widget4.2Title",
        value: "% family without Family book number",
      },
      { key: "widget4.3Title", value: "total family registered" },
      { key: "widget4.4Title", value: "total members registered" },
      {
        key: "widget4.5Title",
        value: "% members registered vs LSB",
      },
      { key: "widget4.6Title", value: "Family source of water" },
      { key: "widget4.7Title", value: "Family sanitation" },
      {
        key: "widget4.8Title",
        value: "Member education",
      },
      {
        key: "widget4.9Title",
        value: "Members by Ethnicity",
      },
      { key: "widget4.10Title", value: "family with Disability" },
      {
        key: "dashboard4Title",
        value: "Family Health Information System (FHIS)",
      },
      { key: "lastMonth", value: `Last month: {{value}}` },
      {
        key: "dashboard3_widget1.1Title",
        value: `Penta3 Immunization total this month {{year}}`,
      },
      {
        key: "dashboard3_widget2.1Title",
        value: `Penta3 Immunization coverage this month {{year}}`,
      },
      {
        key: "dashboard3_widget3.1Title",
        value: `Penta3 Immunization total {{year}}`,
      },
      {
        key: "dashboard3_widget4.1Title",
        value: `Penta3 Immunization coverage {{year}}`,
      },
      {
        key: "dashboard3_widget5.1Title",
        value: `Monthly Penta3`,
      },
      {
        key: "dashboard3_widget6.1Title",
        value: `Monthly Penta 3 By Province`,
      },
      {
        key: "dashboard3_Widget9.1Title",
        value: `Epi Penta3 Coverage {{year}}`,
      },
      {
        key: "dashboard3_Widget10.1Title",
        value: `Monthly Penta 3 {{year}}`,
      },
      {
        key: "dashboard3_Widget11.1Title",
        value: `EPI DB Reporting and Timeliness Rate Lao PDR {{year}}`,
      },
      {
        key: "dashboard3_Widget12.1Title",
        value: `EPI DB Reporting Rate Heat Map Lao PDR {{year}}`,
      },
      {
        key: "target",
        value: "Target",
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
      {
        key: "widget2.1Title",
        value: "Less than 1 year Death {{currentYear}}",
      },
      {
        key: "widget2.2Title",
        value: "Less than 5 year Death {{currentYear}}",
      },
      { key: "widget2.3Title", value: "Mother Death {{currentYear}}" },
      { key: "widget2.4.1Title", value: "Lao PDR - MCH: Total number of SBA" },
      {
        key: "widget2.4.2Title",
        value: "Lao PDR - MCH: SBA coverage (Annualized)",
      },
      { key: "widget2.5.1Title", value: "MCH: Total number of SBA" },
      { key: "widget2.5.2Title", value: "MCH: SBA coverage (Annualized)" },
      {
        key: "widget2.6Title",
        value: "SBA Coverage (Annualized) by provinces {{currentYear}}",
      },
      {
        key: "widget2.7Title",
        value: "SBA total by provinces {{currentYear}}",
      },
      { key: "widget2.8Title", value: "Reporting Rate" },
      { key: "widget2.9Title", value: "Repoting rate heat map" },
      {
        key: "widget4.1Title",
        value: "% members registered",
      },
      {
        key: "widget4.2Title",
        value: "% family without Family book number",
      },
      { key: "widget4.3Title", value: "total family registered" },
      { key: "widget4.4Title", value: "total members registered" },
      {
        key: "widget4.5Title",
        value: "% members registered vs LSB",
      },
      { key: "widget4.6Title", value: "Family source of water" },
      { key: "widget4.7Title", value: "Family sanitation" },
      {
        key: "widget4.8Title",
        value: "Member education",
      },
      {
        key: "widget4.9Title",
        value: "Members by Ethnicity",
      },
      { key: "widget4.10Title", value: "family with Disability" },
      {
        key: "dashboard4Title",
        value: "Family Health Information System (FHIS)",
      },
      { key: "lastMonth", value: `Last month: {{value}}` },
      {
        key: "dashboard3_widget1.1Title",
        value: `Penta3 Immunization total this month {{year}}`,
      },
      {
        key: "dashboard3_widget2.1Title",
        value: `Penta3 Immunization coverage this month {{year}}`,
      },
      {
        key: "dashboard3_widget3.1Title",
        value: `Penta3 Immunization total {{year}}`,
      },
      {
        key: "dashboard3_widget4.1Title",
        value: `Penta3 Immunization coverage {{year}}`,
      },
      {
        key: "dashboard3_widget5.1Title",
        value: `Monthly Penta3`,
      },
      {
        key: "dashboard3_widget6.1Title",
        value: `Monthly Penta 3 By Province`,
      },
      {
        key: "dashboard3_Widget9.1Title",
        value: `Epi Penta3 Coverage {{year}}`,
      },
      {
        key: "dashboard3_Widget10.1Title",
        value: `Monthly Penta 3 {{year}}`,
      },
      {
        key: "dashboard3_Widget11.1Title",
        value: `EPI DB Reporting and Timeliness Rate Lao PDR {{year}}`,
      },
      {
        key: "dashboard3_Widget12.1Title",
        value: `EPI DB Reporting Rate Heat Map Lao PDR {{year}}`,
      },
      {
        key: "target",
        value: "Target",
      },
    ],
  },
];
export default locales;
