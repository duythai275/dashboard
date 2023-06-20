import { useTranslation } from "react-i18next";
import moment from "moment";
import CustomSelect from "./CustomSelect";

const YearSelector = ({ change, period }) => {
  const { t } = useTranslation();
  const startYear = 1900;
  const currentYear = moment().year();
  let valueSet = [];

  for (let i = currentYear; i >= startYear; i--) {
    valueSet.push({
      label: i + "",
      value: i,
    });
  }
  return (
    <div>
      <CustomSelect
        value={period.year}
        label={t("year")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          change(value);
        }}
      />
    </div>
  );
};

export default YearSelector;
