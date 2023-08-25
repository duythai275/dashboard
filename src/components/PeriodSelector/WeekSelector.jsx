import { useTranslation } from "react-i18next";
import moment from "moment";
import CustomSelect from "./CustomSelect";

const WeekSelector = ({ change, period, min, max }) => {
  const { t } = useTranslation();
  const { year } = period;
  let weeks =
    max ||
    (year
      ? year === new Date().getFullYear()
        ? moment(new Date()).isoWeek()
        : moment([year, 1, 1]).isoWeeksInYear()
      : 0);
  const valueSet = [];
  for (let i = min || 1; i <= weeks; i++) {
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
