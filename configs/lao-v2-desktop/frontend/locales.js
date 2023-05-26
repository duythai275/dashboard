const locales = [
  {
    code: "lo",
    name: "ພາສາລາວ",
    translations: [
      {
        key: "dashboard1Title",
        value: "ແມ່ ແລະ ເດັກ: ການເສຍຊີວິດ"
      },
      {
        key: "dashboard2Title",
        value: "ເກີດລູກມີແພດຊ່ວຍ"
      },
      {
        key: "dashboard3Title",
        value: "Penta 3"
      },
      {
        key: "widget1.1Title",
        value: `ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ1ປີ ເສຍຊີວິດ (ກໍລະນີ) - ປີນີ້`
      },
      {
        key: "widget1.2Title",
        value: `ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ5ປີ ເສຍຊີວິດ (ກໍລະນີ) - ປີນີ້`
      },
      {
        key: "widget1.3Title",
        value: `ແມ່ ເສຍຊີວິດ (ກໍລະນີ) - ປີນີ້`
      },
      {
        key: "widget1.4Title",
        value: `ອັດຕາການເສຍຊີວິດ ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ1ປີ (ຕໍ່ 10,000) - ປີນີ້`
      },
      {
        key: "widget1.5Title",
        value: `ອັດຕາການເສຍຊີວິດ ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ5ປີ (ຕໍ່ 10,000) - ປີນີ້`
      },
      {
        key: "widget1.6Title",
        value: `ອັດຕາການເສຍຊີວິດ ແມ່ (ຕໍ່ 100,000) - ປີນີ້`
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
        value: "ຈຳນວນເດັກຕາຍໃນ 5 ​ປີຜ່ານມາ"
      },
      // {
      //   key: "widget1.9Title",
      //   value: "PHEOC: ອັດຕາການລາຍງານຂໍ້ມູນພະຍາດເຝົ້າລະວັງຂອງແຕ່ລະແຂວງ",
      // },
      {
        key: "widget1.13Title",
        value: "NCLE Data Quality FEB 2023"
      },
      { key: "monthlyHeaderTitleOfWidget1.9", value: `{{month}} {{year}}` },
      { key: "weeklyHeaderTitleOfWidget1.9", value: `ອາທິດ{{month}} {{year}}` },
      { key: "widget1.1Date", value: `As on {{date}}` },
      { key: "lastPeriod", value: `ໄລຍະເວລາດຽວກັນ ຂອງປີທີ່ແລ້ວ: {{value}}` },
      { key: "headerTitleWidget1.7", value: "ຂໍ້ມູນ/ຊ່ວງເວລາ" },
      { key: "headerTitleWidget1.9", value: "ຫົວໜ່ວຍການຈັດຕັ້ງ/ຊ່ວງເວລາ" },
      { key: "jan", value: "ເດືອນມັງກອນ" },
      { key: "feb", value: "ເດືອນກຸມພາ" },
      { key: "mar", value: "ເດືອນມີນາ" },
      { key: "apr", value: "ເດືອນເມສາ" },
      { key: "may", value: "ເດືອນພຶດສະພາ" },
      { key: "jun", value: "ເດືອນມິຖຸນາ" },
      { key: "jul", value: "ເດືອນກໍລະກົດ" },
      { key: "aug", value: "ເດືອນສິງຫາ" },
      { key: "sep", value: "ເດືອນກັນຍາ" },
      { key: "oct", value: "ເດືອນຕຸລາ" },
      { key: "nov", value: "ເດືອນພະຈິກ" },
      { key: "dec", value: "ເດືອນທັນວາ" },
      {
        key: "widget1.12Title",
        value: "ແມ່ແລະເດັກ: ອັດຕາການລາຍງານຂໍ້ມູນແລະລາຍງານຕົງເວລາ ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.11.1Title",
        value: "ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ1ປີ ເສຍຊີວິດ (ກໍລະນີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.11.2Title",
        value: "ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ5ປີ ເສຍຊີວິດ (ກໍລະນີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.11.3Title",
        value: "ແມ່ ເສຍຊີວິດ (ກໍລະນີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.10.1Title",
        value: "ອັດຕາການເສຍຊີວິດ ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ1ປີ (ສະເລ່ຍເປັນປີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.10.2Title",
        value: "ອັດຕາການເສຍຊີວິດ ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ5ປີ (ສະເລ່ຍເປັນປີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.10.3Title",
        value: "ອັດຕາການເສຍຊີວິດ ແມ່ (ສະເລ່ຍເປັນປີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget1.7.1Title",
        value: "ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ1ປີ ເສຍຊີວິດ (ກໍລະນີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget1.7.2Title",
        value: "ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ5ປີ ເສຍຊີວິດ (ກໍລະນີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget1.7.3Title",
        value: "ແມ່ ເສຍຊີວິດ (ກໍລະນີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget1.8.1Title",
        value: "ອັດຕາການເສຍຊີວິດ ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ1ປີ (ສະເລ່ຍເປັນປີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget1.8.2Title",
        value: "ອັດຕາການເສຍຊີວິດ ເດັກນ້ອຍອາຍຸຕ່ຳກວ່າ5ປີ (ສະເລ່ຍເປັນປີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget1.8.3Title",
        value: "ອັດຕາການເສຍຊີວິດ ແມ່ (ສະເລ່ຍເປັນປີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget2.1Title",
        value: "ເກີດລູກມີແພດຊ່ວຍ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "widget2.2Title",
        value: "ຄາດຄະເນການເກີດມີຊີວິດ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "widget2.3Title",
        value: "ອັດຕາການຄອບຄຸມ ຂອງການເກີດລູກມີແພດຊ່ວຍ (ສະເລ່ຍເປັນປີ) - ປີນີ້"
      },
      {
        key: "widget2.4.1Title",
        value: "ການເກີດລູກມີແພດຊ່ວຍ (ກໍລະນີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget2.4.2Title",
        value: "ອັດຕາການຄອບຄຸມ ຂອງການເກີດລູກມີແພດຊ່ວຍ (ສະເລ່ຍເປັນປີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "widget2.5.1Title",
        value: "ການເກີດລູກມີແພດຊ່ວຍ ເບິ່ງເປັນແຂວງ(ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "widget2.5.2Title",
        value: "ອັດຕາການຄອບຄຸມ ຂອງການເກີດລູກມີແພດຊ່ວຍ (ສະເລ່ຍເປັນປີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget2.6Title",
        value: "ການເກີດລູກມີແພດຊ່ວຍ ເບິ່ງເປັນແຂວງ(ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "widget2.7Title",
        value: "ອັດຕາການຄອບຄຸມ ຂອງການເກີດລູກມີແພດຊ່ວຍ (ສະເລ່ຍເປັນປີ) ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      {
        key: "widget2.8Title",
        value: "ການເກີດລູກມີແພດຊ່ວຍ: ອັດຕາການລາຍງານຂໍ້ມູນແລະລາຍງານຕົງເວລາ ເບິ່ງເປັນແຂວງ - ປີນີ້"
      },
      { key: "widget2.9Title", value: "Repoting rate heat map" },
      {
        key: "widget4.1Title",
        value: "% ສະມາຊິກຄອບຄົວທີ່ໄດ້ຮັບການລົງທະບຽນ"
      },
      {
        key: "widget4.2Title",
        value: "% ຂອງຄອບຄົວທີ່ບໍ່ມີເລກສຳມະໂນຄົວ"
      },
      { key: "widget4.3Title", value: "ຈຳນວນຂອງຄອບຄົວທີ່ໄດ້ຮັບການລົງທະບຽນ" },
      {
        key: "widget4.4Title",
        value: "ຈຳນວນຂອງສະມາຊິກຄອບຄົວທີ່ໄດ້ຮັບການລົງທະບຽນ"
      },
      {
        key: "widget4.5Title",
        value: "% ປຽບທຽບ ສະມາຊິກຄອບຄົວທີ່ໄດ້ຮັບການລົງທະບຽນ ກັບ ຕົວເລກຂອງສູນສະຖິຕິ"
      },
      { key: "widget4.6Title", value: "ປະເພດແຫຼ່ງນ້ຳຂອງຄອບຄົວ" },
      { key: "widget4.7Title", value: "ປະເພດວິດຖ່າຍຂອງຄອບຄົວ" },
      {
        key: "widget4.8Title",
        value: "ລະດັບການສຶກສາຂອງສະມາຊິກຄອບຄົວ"
      },
      {
        key: "widget4.9Title",
        value: "ປະເພດຊົນເຜົ່າຂອງສະມາຊິກຄອບຄົວ"
      },
      { key: "widget4.10Title", value: "ປະເພດຄວາມພິການຂອງຄອບຄົວ" },
      {
        key: "dashboard4Title",
        value: "ລະບົບຂໍ້ມູນຂ່າວສານແຟ້ມຄອບຄົວ"
      },
      { key: "lastMonth", value: `Last month: {{value}}` },
      {
        key: "dashboard3_widget1.1Title",
        value: `Penta3 Immunization total this month {{year}}`
      },
      {
        key: "dashboard3_widget2.1Title",
        value: `Penta3 Immunization coverage this month {{year}}`
      },
      {
        key: "dashboard3_widget3.1Title",
        value: `Penta3 Immunization total {{year}}`
      },
      {
        key: "dashboard3_widget4.1Title",
        value: `Penta3 Immunization coverage {{year}}`
      },
      {
        key: "dashboard3_widget5.1Title",
        value: `Monthly Penta3`
      },
      {
        key: "dashboard3_widget6.1Title",
        value: `Monthly Penta 3 By Province`
      },
      {
        key: "dashboard3_Widget9.1Title",
        value: `Epi Penta3 Coverage {{year}}`
      },
      {
        key: "dashboard3_Widget10.1Title",
        value: `Monthly Penta 3 {{year}}`
      },
      {
        key: "dashboard3_Widget11.1Title",
        value: `EPI DB Reporting and Timeliness Rate Lao PDR {{year}}`
      },
      {
        key: "dashboard3_Widget12.1Title",
        value: `EPI DB Reporting Rate Heat Map Lao PDR {{year}}`
      },
      {
        key: "target",
        value: "Target"
      },
      {
        key: "lastUpdated",
        value: "ອັບເດດລ່າສຸດ"
      },
      { key: "asAt", value: "ນະ ວັນທີ" },
      {
        key: "dashboard5_widget1.1Title",
        value: "ພະຍາດ/ອາການປ້ອງກັນດ້ວຍຢາວັກຊິນ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget2.1Title",
        value: "ໄຂ້​ຍຸງ​ລາຍ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget3.1Title",
        value: "ພະຍາດທີ່ເກີດຈາກອາຫານ ແລະ ນໍ້າ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget4.1Title",
        value: "ອາການຊຶມເຊື້ອລະບົບຫາຍໃຈຮຸນແຮງກະທັນຫັນ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget5.1Title",
        value: "ອາການຈາກສັດສູ່ຄົນ ແລະ ອຶ່ນໆ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget6.1Title",
        value: "ພະຍາດ/ອາການປ້ອງກັນດ້ວຍຢາວັກຊິນ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget7.1Title",
        value: "ພະຍາດ/ອາການປ້ອງກັນດ້ວຍຢາວັກຊິນ ເບິ່ງເປັນແຂວງ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget8.1Title",
        value: "ໄຂ້​ຍຸງ​ລາຍ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget9.1Title",
        value: "ໄຂ້​ຍຸງ​ລາຍ ເບິ່ງເປັນແຂວງ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget10.1Title",
        value: "ພະຍາດທີ່ເກີດຈາກອາຫານ ແລະ ນໍ້າ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget11.1Title",
        value: "ພະຍາດທີ່ເກີດຈາກອາຫານ ແລະ ນໍ້າ ເບິ່ງເປັນແຂວງ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget12.1Title",
        value: "ອາການຊຶມເຊື້ອລະບົບຫາຍໃຈຮຸນແຮງກະທັນຫັນ (ກໍລະນີ) - 3 ປີຜ່ານມາ"
      },
      {
        key: "dashboard5_widget13.1Title",
        value: "ອາການຊຶມເຊື້ອລະບົບຫາຍໃຈຮຸນແຮງກະທັນຫັນ ເບິ່ງເປັນແຂວງ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget14.1Title",
        value: "ອາການຈາກສັດສູ່ຄົນ ແລະ ອຶ່ນໆ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget15.1Title",
        value: "ອາການຈາກສັດສູ່ຄົນ ແລະ ອຶ່ນໆ (ກໍລະນີ) - ປີນີ້"
      },
      {
        key: "dashboard5_widget16.1Title",
        value: "ອັດຕາການລາຍງານຂໍ້ມູນພະຍາດເຝົ້າລະວັງຂອງແຕ່ລະແຂວງ - ປີນີ້"
      },
      {
        key: "dashboard5_widget17.1Title",
        value: "ອັດຕາການລາຍງານຂໍ້ມູນພະຍາດເຝົ້າລະວັງຂອງແຕ່ລະແຂວງ (ສະເລ່ຍເປັນປີ) - ປີນີ້"
      },
      {
        key: "dashboard5Title",
        value: "ສວລ - ເຝົ້າລະວັງ 18 ອາການພະຍາດ"
      },
      {
        key: "dashboard6_widget1Title",
        value: "ເສັ້ນສະແດງ ວົງຈອນຊີວິດ - 12 ເດືອນທີ່ຜ່ານມາ"
      },
      {
        key: "dashboard6_widget2Title",
        value: "ອັດຕາການຕົກຫຼົ່ນ ຂອງຈຳນວນແມ່ຍິງທີ່ມາກວດທ້ອງກ່ອນເກີດຄັ້ງທີ1 ແລະ ຄັ້ງທີ4 - 12 ເດືອນທີ່ຜ່ານມາ"
      },
      {
        key: "dashboard6_widget3Title",
        value: "ອັດຕາການຕົກຫຼົ່ນ ຂອງຈຳນວນທີ່ສັກຢາ Penta1 ແລະ Penta3 - 12 ເດືອນທີ່ຜ່ານມາ"
      },
      {
        key: "dashboard6_widget4Title",
        value: "ຂໍ້ມູນສັກຢາ: ອັດຕາການລາຍງານຂໍ້ມູນແລະລາຍງານຕົງເວລາ ເບິ່ງເປັນແຂວງ - 12 ເດືອນທີ່ຜ່ານມາ"
      },
      {
        key: "dashboard6Title",
        value: "ແມ່ ແລະ ເດັກ"
      },
      {
        key: "REPORTING_RATE",
        value: "ອັັດຕາການລາຍງານ"
      },
      {
        key: "REPORTING_RATE_ON_TIME",
        value: "ອັັດຕາການລາຍງານ ຕົງເວລາ"
      },
      {
        key: "dataFromDhis2",
        value: "ຂໍ້ມູນທີ່ລາຍງານໃນລະບົບ DHIS 2 ເທົ່ານັ້ນ"
      },
      {
        key: "widget2.5.1LegendTitle",
        value: "ຈຳນວນເກີດລູກມີແພດຊ່ວຍ ທັງໝົດ"
      },
      {
        key: "widget2.5.2LegendTitle",
        value: "MCH: ອັດຕາການຄອບຄຸມ ຂອງການເກີດລູກມີແພດຊ່ວຍ (ສະເລ່ຍເປັນປີ)"
      },
      {
        key: "dashboard7Title",
        value: "ຄູ່ມືລະບົບ HMIS ຂອງ ສປປລາວ"
      }
    ]
  },
  {
    code: "en",
    name: "English",
    translations: [
      {
        key: "dashboard1Title",
        value: "Mortality"
      },
      {
        key: "dashboard2Title",
        value: "Skilled birth attendance (SBA)"
      },
      {
        key: "dashboard3Title",
        value: "Penta 3"
      },
      {
        key: "widget1.1Title",
        value: `Infant Death This Year`
      },
      {
        key: "widget1.2Title",
        value: `Child Death This Year`
      },
      {
        key: "widget1.3Title",
        value: `Maternal Death This Year`
      },
      {
        key: "widget1.4Title",
        value: `Infant mortality (per 10,000) - This year`
      },
      {
        key: "widget1.5Title",
        value: `Child mortality (per 10,000) - This year`
      },
      {
        key: "widget1.6Title",
        value: `Maternal mortality (per 100,000) - This year`
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
        value: "Reported children under five deaths last 5 year - Lao PDR"
      },
      // {
      //   key: "widget1.9Title",
      //   value:
      //     "PHEOC Surveillance - 00. Reporting rate by province, last 4 weeks and last month",
      // },
      {
        key: "widget1.13Title",
        value: "NCLE Data Quality FEB 2023"
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
        value: "Reporting Rate - This Year"
      },
      {
        key: "widget1.11.1Title",
        value: "Infant Death by Province - This Year"
      },
      {
        key: "widget1.11.2Title",
        value: "Child Death by Province - This Year"
      },
      {
        key: "widget1.11.3Title",
        value: "Maternal Death by Province - This Year"
      },
      {
        key: "widget1.10.1Title",
        value: "Infant mortality rate (Annualised) by Province - This Year"
      },
      {
        key: "widget1.10.2Title",
        value: "Child mortality rate (Annualised) by Province - This Year"
      },
      {
        key: "widget1.10.3Title",
        value: "Maternal mortality rate (Annualised) by Province - This Year"
      },
      {
        key: "widget1.7.1Title",
        value: "Infant Death - Last 3 Years"
      },
      {
        key: "widget1.7.2Title",
        value: "Child Death - Last 3 Years"
      },
      {
        key: "widget1.7.3Title",
        value: "Maternal Death - Last 3 Years"
      },
      {
        key: "widget1.8.1Title",
        value: "Infant mortality rate (Annualised) - Last 3 Years"
      },
      {
        key: "widget1.8.2Title",
        value: "Child mortality rate (Annualised) - Last 3 Years"
      },
      {
        key: "widget1.8.3Title",
        value: "Maternal mortality rate (Annualised) - Last 3 Years"
      },
      {
        key: "widget2.1Title",
        value: "SBA Total - This year"
      },
      {
        key: "widget2.2Title",
        value: "Estimated live births - This year"
      },
      { key: "widget2.3Title", value: "SBA Coverage (Annualized) - This year" },
      {
        key: "widget2.4.1Title",
        value: "SBA Total - Last 3 years"
      },
      {
        key: "widget2.4.2Title",
        value: "SBA coverage (Annualized) - Last 3 years"
      },
      {
        key: "widget2.5.1Title",
        value: "SBA Total by Province - This year"
      },
      {
        key: "widget2.5.2Title",
        value: "SBA coverage (Annualized) by Province - This year"
      },
      {
        key: "widget2.6Title",
        value: "SBA Total by Provinces - This year"
      },
      {
        key: "widget2.7Title",
        value: "SBA Coverage (Annualized) by Province - This year"
      },
      {
        key: "widget2.8Title",
        value: "SBA: Reporting and Timeliness Rate by Province - This year"
      },
      { key: "widget2.9Title", value: "Repoting rate heat map" },
      {
        key: "widget4.1Title",
        value: "% Members registered"
      },
      {
        key: "widget4.2Title",
        value: "% Family without Family book number"
      },
      { key: "widget4.3Title", value: "Total family registered" },
      { key: "widget4.4Title", value: "Total members registered" },
      {
        key: "widget4.5Title",
        value: "% Members registered vs LSB"
      },
      { key: "widget4.6Title", value: "Family source of water" },
      { key: "widget4.7Title", value: "Family sanitation" },
      {
        key: "widget4.8Title",
        value: "Member education"
      },
      {
        key: "widget4.9Title",
        value: "Members by Ethnicity"
      },
      { key: "widget4.10Title", value: "Family with Disability" },
      {
        key: "dashboard4Title",
        value: "Family Health Information System (FHIS)"
      },
      { key: "lastMonth", value: `Last month: {{value}}` },
      {
        key: "dashboard3_widget1.1Title",
        value: `Penta3 Immunization total this month {{year}}`
      },
      {
        key: "dashboard3_widget2.1Title",
        value: `Penta3 Immunization coverage this month {{year}}`
      },
      {
        key: "dashboard3_widget3.1Title",
        value: `Penta3 Immunization total {{year}}`
      },
      {
        key: "dashboard3_widget4.1Title",
        value: `Penta3 Immunization coverage {{year}}`
      },
      {
        key: "dashboard3_widget5.1Title",
        value: `Monthly Penta3`
      },
      {
        key: "dashboard3_widget6.1Title",
        value: `Monthly Penta 3 By Province`
      },
      {
        key: "dashboard3_Widget9.1Title",
        value: `Epi Penta3 Coverage {{year}}`
      },
      {
        key: "dashboard3_Widget10.1Title",
        value: `Monthly Penta 3 {{year}}`
      },
      {
        key: "dashboard3_Widget11.1Title",
        value: `EPI DB Reporting and Timeliness Rate Lao PDR {{year}}`
      },
      {
        key: "dashboard3_Widget12.1Title",
        value: `EPI DB Reporting Rate Heat Map Lao PDR {{year}}`
      },
      {
        key: "target",
        value: "Target"
      },
      {
        key: "lastUpdated",
        value: "Last updated"
      },
      { key: "asAt", value: "As at" },
      { key: "dashboard5_widget1.1Title", value: "VPD Total - This year" },
      { key: "dashboard5_widget2.1Title", value: "Dengue Total - This year" },
      { key: "dashboard5_widget3.1Title", value: "FWB Total - This year" },
      { key: "dashboard5_widget4.1Title", value: "SARI Total - This year" },
      {
        key: "dashboard5_widget5.1Title",
        value: "Zoonotic Diseases and Others Total - This year"
      },
      { key: "dashboard5_widget6.1Title", value: "VPD Total - This year" },
      {
        key: "dashboard5_widget7.1Title",
        value: "VPD Total by Province - This year"
      },
      { key: "dashboard5_widget8.1Title", value: "Dengue Total - This year" },
      {
        key: "dashboard5_widget9.1Title",
        value: "Dengue Total by Province - This year"
      },
      { key: "dashboard5_widget10.1Title", value: "FWB Total - This year" },
      {
        key: "dashboard5_widget11.1Title",
        value: "FWB Total by Province - This year"
      },
      { key: "dashboard5_widget12.1Title", value: "SARI Total - Last 3 years" },
      {
        key: "dashboard5_widget13.1Title",
        value: "SARI Total by Province - This year"
      },
      {
        key: "dashboard5_widget14.1Title",
        value: "Zoonotic Diseases and Others Total - This year"
      },
      {
        key: "dashboard5_widget15.1Title",
        value: "Zoonotic Diseases and Others Total - This year"
      },
      {
        key: "dashboard5_widget16.1Title",
        value: "Notifiable Disease Reporting Rate - This year"
      },
      {
        key: "dashboard5_widget17.1Title",
        value: "Notifiable Disease Reporting Rate (annualised) - This year"
      },
      {
        key: "dashboard5Title",
        value: "NCLE - 18 Notifiable Diseases Surveillance"
      },
      {
        key: "dashboard6_widget1Title",
        value: "Life Cycle Chart - Last 12 months"
      },
      {
        key: "dashboard6_widget2Title",
        value: "ANC1 - ANC4 Dropout Rate - Last 12 months"
      },
      {
        key: "dashboard6_widget3Title",
        value: "Penta1 - Penta3 Dropout Rate - Last 12 months"
      },
      {
        key: "dashboard6_widget4Title",
        value: "EPI Reporting and Timeliness Rate by Province - Last 12 months"
      },
      {
        key: "dashboard6Title",
        value: "Mother and Child"
      },
      {
        key: "REPORTING_RATE",
        value: "Reporting rate"
      },
      {
        key: "REPORTING_RATE_ON_TIME",
        value: "Reporting rate on time"
      },
      {
        key: "dataFromDhis2",
        value: "Data reported in DHIS2 only"
      },
      {
        key: "widget2.5.1LegendTitle",
        value: "SBA Total"
      },
      {
        key: "widget2.5.2LegendTitle",
        value: "MCH: SBA coverage (Annualized)"
      },
      {
        key: "dashboard7Title",
        value: "HMIS Super Doc"
      }
    ]
  }
];

export default locales;
