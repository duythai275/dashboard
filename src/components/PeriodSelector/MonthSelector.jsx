import { useTranslation } from "react-i18next";
import CustomSelect from "./CustomSelect";
export const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const MonthSelector = ({ change, period }) => {
  const { t } = useTranslation();

  const valueSet = MONTHS.map((month, index) => {
    return {
      value: index + 1,
      label: t(month),
    };
  });
  return (
    <div>
      <CustomSelect
        value={period.month}
        label={t("month")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          change(value, t(MONTHS[value - 1]));
        }}
      />
    </div>
  );
};

export default MonthSelector;
