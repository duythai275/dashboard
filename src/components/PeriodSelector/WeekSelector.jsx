import { useTranslation } from "react-i18next";
import moment from "moment";
import CustomSelect from "./CustomSelect";

const WeekSelector = ({ change, period }) => {
  const { t } = useTranslation();
  const { year } = period;
  let weeks = year ? moment([year, 1, 1]).isoWeeksInYear() : 0;
  const valueSet = [];
  for (let i = 1; i <= weeks; i++) {
    valueSet.push({
      value: i,
      label: t("week") + " " + i,
    });
  }
  return (
    <div>
      <CustomSelect
        value={period.week}
        label={t("week")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          change(value, t("week") + " " + value);
        }}
      />
    </div>
  );
};

export default WeekSelector;
