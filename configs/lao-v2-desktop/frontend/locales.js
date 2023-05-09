import { getMonthName } from "./Dashboard1/common/function/getMonthName";

const locales = [
  {
    code: "lo",
    name: "Lao",
    translations: [
      {
        key: "dashboard1Title",
        value: "Mortality",
      },
      {
        key: "dashboard2Title",
        value: "Skilled birth attendance (SBA)",
      },
      {
        key: "dashboard3Title",
        value: "Penta 3",
      },
      {
        key: "widget1.1Title",
        value: `Infant Death This Year`,
      },
      {
        key: "widget1.2Title",
        value: `Child Death This Year`,
      },
      {
        key: "widget1.3Title",
        value: `Maternal Death This Year`,
      },
      {
        key: "widget1.4Title",
        value: `Infant Mortality This Year`,
      },
      {
        key: "widget1.5Title",
        value: `Child Mortality This Year`,
      },
      {
        key: "widget1.6Title",
        value: `Maternal Mortality This Year`,
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
        value: "Reporting Rate - This Year",
      },
      {
        key: "widget1.11.1Title",
        value: "Infant Death by Province - This Year",
      },
      {
        key: "widget1.11.2Title",
        value: "Child Death by Province - This Year",
      },
      {
        key: "widget1.11.3Title",
        value: "Maternal Death by Province - This Year",
      },
      {
        key: "widget1.10.1Title",
        value: "Infant mortality rate (Annualised) by Province - This Year",
      },
      {
        key: "widget1.10.2Title",
        value: "Child mortality rate (Annualised) by Province - This Year",
      },
      {
        key: "widget1.10.3Title",
        value: "Maternal mortality rate (Annualised) by Province - This Year",
      },
      {
        key: "widget1.7.1Title",
        value: "Infant Death - Last 3 Years",
      },
      {
        key: "widget1.7.2Title",
        value: "Child Death - Last 3 Years",
      },
      {
        key: "widget1.7.3Title",
        value: "Maternal Death - Last 3 Years",
      },
      {
        key: "widget1.8.1Title",
        value: "Infant mortality rate (Annualised) - Last 3 Years",
      },
      {
        key: "widget1.8.2Title",
        value: "Child mortality rate (Annualised) - Last 3 Years",
      },
      {
        key: "widget1.8.3Title",
        value: "Maternal mortality rate (Annualised) - Last 3 Years",
      },
      {
        key: "widget2.1Title",
        value: "SBA Total - This year",
      },
      {
        key: "widget2.2Title",
        value: "Estimated live births - This year",
      },
      { key: "widget2.3Title", value: "SBA Coverage (Annualized) - This year" },
      {
        key: "widget2.4.1Title",
        value: "SBA Total - Last 3 years",
      },
      {
        key: "widget2.4.2Title",
        value: "SBA coverage (Annualized) - Last 3 years",
      },
      {
        key: "widget2.5.1Title",
        value: "SBA Total by Province - This year",
      },
      {
        key: "widget2.5.2Title",
        value: "SBA coverage (Annualized) by Province - This year",
      },
      {
        key: "widget2.6Title",
        value: "SBA Total by Provinces - This year",
      },
      {
        key: "widget2.7Title",
        value: "SBA Coverage (Annualized) by Province - This year",
      },
      {
        key: "widget2.8Title",
        value: "SBA: Reporting and Timeliness Rate by Province - This year",
      },
      { key: "widget2.9Title", value: "Repoting rate heat map" },
      {
        key: "widget4.1Title",
        value: "% Members registered",
      },
      {
        key: "widget4.2Title",
        value: "% Family without Family book number",
      },
      { key: "widget4.3Title", value: "Total family registered" },
      { key: "widget4.4Title", value: "Total members registered" },
      {
        key: "widget4.5Title",
        value: "% Members registered vs LSB",
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
      { key: "widget4.10Title", value: "Family with Disability" },
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
      {
        key: "lastUpdated",
        value: "Last updated",
      },
      { key: "asAt", value: "As at" },
      { key: "dashboard5_widget1.1Title", value: "VPD Total - This year" },
      { key: "dashboard5_widget2.1Title", value: "Dengue Total - This year" },
      { key: "dashboard5_widget3.1Title", value: "FWB Total - This year" },
      { key: "dashboard5_widget4.1Title", value: "SARI Total - This year" },
      {
        key: "dashboard5_widget5.1Title",
        value: "Zoonotic Diseases and Others Total - This year",
      },
      { key: "dashboard5_widget6.1Title", value: "VPD Total - This year" },
      {
        key: "dashboard5_widget7.1Title",
        value: "VPD Total by Province - This year",
      },
      { key: "dashboard5_widget8.1Title", value: "Dengue Total - This year" },
      {
        key: "dashboard5_widget9.1Title",
        value: "Dengue Total by Province - This year",
      },
      { key: "dashboard5_widget10.1Title", value: "FWB Total - This year" },
      {
        key: "dashboard5_widget11.1Title",
        value: "FWB Total by Province - This year",
      },
      { key: "dashboard5_widget12.1Title", value: "SARI Total - Last 3 years" },
      {
        key: "dashboard5_widget13.1Title",
        value: "SARI Total by Province - This year",
      },
      {
        key: "dashboard5_widget14.1Title",
        value: "Zoonotic Diseases and Others Total - This year",
      },
      {
        key: "dashboard5_widget15.1Title",
        value: "Zoonotic Diseases and Others Total - This year",
      },
      {
        key: "dashboard5_widget16.1Title",
        value: "Notifiable Disease Reporting Rate - This year",
      },
      {
        key: "dashboard5_widget17.1Title",
        value: "Notifiable Disease Reporting Rate (annualised) - This year",
      },
      {
        key: "dashboard5Title",
        value: "NCLE - 18 Notifiable Diseases Surveillance",
      },
      {
        key: "dashboard6_widget1Title",
        value: "Life Cycle Chart - Last 12 months",
      },
      {
        key: "dashboard6_widget2Title",
        value: "ANC1 - ANC4 Dropout Rate - Last 12 months",
      },
      {
        key: "dashboard6_widget3Title",
        value: "Penta1 - Penta3 Dropout Rate - Last 12 months",
      },
      {
        key: "dashboard6_widget4Title",
        value: "EPI Reporting and Timeliness Rate by Province - Last 12 months",
      },
      {
        key: "dashboard6Title",
        value: "Mother and Child",
      },
      {
        key: "REPORTING_RATE",
        value: "Reporting rate",
      },
      {
        key: "REPORTING_RATE_ON_TIME",
        value: "Reporting rate on time",
      },
      {
        key: "dataFromDhis2",
        value: "Data reported in DHIS2 only",
      },
      {
        key: "widget2.5.1LegendTitle",
        value: "SBA Total",
      },
      {
        key: "widget2.5.2LegendTitle",
        value: "MCH: SBA coverage (Annualized)",
      },
    ],
  },
  {
    code: "en",
    name: "English",
    translations: [
      {
        key: "dashboard1Title",
        value: "Mortality",
      },
      {
        key: "dashboard2Title",
        value: "Skilled birth attendance (SBA)",
      },
      {
        key: "dashboard3Title",
        value: "Penta 3",
      },
      {
        key: "widget1.1Title",
        value: `Infant Death This Year`,
      },
      {
        key: "widget1.2Title",
        value: `Child Death This Year`,
      },
      {
        key: "widget1.3Title",
        value: `Maternal Death This Year`,
      },
      {
        key: "widget1.4Title",
        value: `Infant Mortality This Year`,
      },
      {
        key: "widget1.5Title",
        value: `Child Mortality This Year`,
      },
      {
        key: "widget1.6Title",
        value: `Maternal Mortality This Year`,
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
        value: "Reporting Rate - This Year",
      },
      {
        key: "widget1.11.1Title",
        value: "Infant Death by Province - This Year",
      },
      {
        key: "widget1.11.2Title",
        value: "Child Death by Province - This Year",
      },
      {
        key: "widget1.11.3Title",
        value: "Maternal Death by Province - This Year",
      },
      {
        key: "widget1.10.1Title",
        value: "Infant mortality rate (Annualised) by Province - This Year",
      },
      {
        key: "widget1.10.2Title",
        value: "Child mortality rate (Annualised) by Province - This Year",
      },
      {
        key: "widget1.10.3Title",
        value: "Maternal mortality rate (Annualised) by Province - This Year",
      },
      {
        key: "widget1.7.1Title",
        value: "Infant Death - Last 3 Years",
      },
      {
        key: "widget1.7.2Title",
        value: "Child Death - Last 3 Years",
      },
      {
        key: "widget1.7.3Title",
        value: "Maternal Death - Last 3 Years",
      },
      {
        key: "widget1.8.1Title",
        value: "Infant mortality rate (Annualised) - Last 3 Years",
      },
      {
        key: "widget1.8.2Title",
        value: "Child mortality rate (Annualised) - Last 3 Years",
      },
      {
        key: "widget1.8.3Title",
        value: "Maternal mortality rate (Annualised) - Last 3 Years",
      },
      {
        key: "widget2.1Title",
        value: "SBA Total - This year",
      },
      {
        key: "widget2.2Title",
        value: "Estimated live births - This year",
      },
      { key: "widget2.3Title", value: "SBA Coverage (Annualized) - This year" },
      {
        key: "widget2.4.1Title",
        value: "SBA Total - Last 3 years",
      },
      {
        key: "widget2.4.2Title",
        value: "SBA coverage (Annualized) - Last 3 years",
      },
      {
        key: "widget2.5.1Title",
        value: "SBA Total by Province - This year",
      },
      {
        key: "widget2.5.2Title",
        value: "SBA coverage (Annualized) by Province - This year",
      },
      {
        key: "widget2.6Title",
        value: "SBA Total by Provinces - This year",
      },
      {
        key: "widget2.7Title",
        value: "SBA Coverage (Annualized) by Province - This year",
      },
      {
        key: "widget2.8Title",
        value: "SBA: Reporting and Timeliness Rate by Province - This year",
      },
      { key: "widget2.9Title", value: "Repoting rate heat map" },
      {
        key: "widget4.1Title",
        value: "% Members registered",
      },
      {
        key: "widget4.2Title",
        value: "% Family without Family book number",
      },
      { key: "widget4.3Title", value: "Total family registered" },
      { key: "widget4.4Title", value: "Total members registered" },
      {
        key: "widget4.5Title",
        value: "% Members registered vs LSB",
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
      { key: "widget4.10Title", value: "Family with Disability" },
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
      {
        key: "lastUpdated",
        value: "Last updated",
      },
      { key: "asAt", value: "As at" },
      { key: "dashboard5_widget1.1Title", value: "VPD Total - This year" },
      { key: "dashboard5_widget2.1Title", value: "Dengue Total - This year" },
      { key: "dashboard5_widget3.1Title", value: "FWB Total - This year" },
      { key: "dashboard5_widget4.1Title", value: "SARI Total - This year" },
      {
        key: "dashboard5_widget5.1Title",
        value: "Zoonotic Diseases and Others Total - This year",
      },
      { key: "dashboard5_widget6.1Title", value: "VPD Total - This year" },
      {
        key: "dashboard5_widget7.1Title",
        value: "VPD Total by Province - This year",
      },
      { key: "dashboard5_widget8.1Title", value: "Dengue Total - This year" },
      {
        key: "dashboard5_widget9.1Title",
        value: "Dengue Total by Province - This year",
      },
      { key: "dashboard5_widget10.1Title", value: "FWB Total - This year" },
      {
        key: "dashboard5_widget11.1Title",
        value: "FWB Total by Province - This year",
      },
      { key: "dashboard5_widget12.1Title", value: "SARI Total - Last 3 years" },
      {
        key: "dashboard5_widget13.1Title",
        value: "SARI Total by Province - This year",
      },
      {
        key: "dashboard5_widget14.1Title",
        value: "Zoonotic Diseases and Others Total - This year",
      },
      {
        key: "dashboard5_widget15.1Title",
        value: "Zoonotic Diseases and Others Total - This year",
      },
      {
        key: "dashboard5_widget16.1Title",
        value: "Notifiable Disease Reporting Rate - This year",
      },
      {
        key: "dashboard5_widget17.1Title",
        value: "Notifiable Disease Reporting Rate (annualised) - This year",
      },
      {
        key: "dashboard5Title",
        value: "NCLE - 18 Notifiable Diseases Surveillance",
      },
      {
        key: "dashboard6_widget1Title",
        value: "Life Cycle Chart - Last 12 months",
      },
      {
        key: "dashboard6_widget2Title",
        value: "ANC1 - ANC4 Dropout Rate - Last 12 months",
      },
      {
        key: "dashboard6_widget3Title",
        value: "Penta1 - Penta3 Dropout Rate - Last 12 months",
      },
      {
        key: "dashboard6_widget4Title",
        value: "EPI Reporting and Timeliness Rate by Province - Last 12 months",
      },
      {
        key: "dashboard6Title",
        value: "Mother and Child",
      },
      {
        key: "REPORTING_RATE",
        value: "Reporting rate",
      },
      {
        key: "REPORTING_RATE_ON_TIME",
        value: "Reporting rate on time",
      },
      {
        key: "dataFromDhis2",
        value: "Data reported in DHIS2 only",
      },
      {
        key: "widget2.5.1LegendTitle",
        value: "SBA Total",
      },
      {
        key: "widget2.5.2LegendTitle",
        value: "MCH: SBA coverage (Annualized)",
      },
    ],
  },
];
export default locales;
