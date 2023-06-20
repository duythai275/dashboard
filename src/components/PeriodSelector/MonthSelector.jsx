import { useTranslation } from "react-i18next";
import CustomSelect from "./CustomSelect";

const MonthSelector = ({ change, period }) => {
  const { t } = useTranslation();
  const months = [
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
  const valueSet = months.map((month, index) => {
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
          change(value, t(months[value - 1]));
        }}
      />
    </div>
  );
};

export default MonthSelector;
