import Input from "@/common/Input/Input";
import useAppState from "@/hooks/useAppState";
import { useTranslation } from "react-i18next";
import "./PeriodTypeSelector.css";
const PERIOD_TYPES = ["Yearly", "Monthly", "Quarterly", "Weekly", "Daily"];

const PeriodTypeSelector = () => {
  const { t } = useTranslation();
  const { state, action } = useAppState();
  const { period } = state.selection;

  return (
    <div className="period-type-selector-container">
      <Input
        value={period.periodType}
        label={t("pleaseSelectPeriodType")}
        valueType="TEXT"
        valueSet={PERIOD_TYPES.map((pt) => {
          return { value: pt, label: pt };
        })}
        change={(value) => {
          action.selectPeriod("periodType", value);
        }}
      />
    </div>
  );
};

export default PeriodTypeSelector;
