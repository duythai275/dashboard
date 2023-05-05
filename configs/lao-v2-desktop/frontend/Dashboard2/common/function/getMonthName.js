export function getMonthName(monthNumber, locale = "en-US") {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  if (locale === "en-US") {
    return date.toLocaleString(locale, {
      month: "long",
    });
  }
  return MONTH_NAMES[monthNumber - 1];
}

const MONTH_NAMES = [
  "ມັງກອນ",
  "ກຸມພາ",
  "ມີນາ",
  "ເມສາ",
  "ພຶດສະພາ",
  "ມີຖຸນາ",
  "ກໍລະກົດ",
  "ສິງຫາ",
  "ກັນຍາ",
  "ຕຸລາ",
  "ພະຈິກ",
  "ທັນວາ⁣",
];
