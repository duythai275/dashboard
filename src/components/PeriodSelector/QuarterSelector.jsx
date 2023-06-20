import { useTranslation } from "react-i18next";
import CustomSelect from "./CustomSelect";

const QuarterSelector = ({ change, period }) => {
  const { t } = useTranslation();
  const quarters = [1, 2, 3, 4];
  const valueSet = quarters.map((quarter, index) => {
    return {
      value: quarter,
      label: t("Q" + quarter),
    };
  });

  return (
    <div>
      <CustomSelect
        value={period.quarter}
        label={t("quarter")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          change(value, t("Q" + value));
        }}
      />
    </div>
  );
};

export default QuarterSelector;
