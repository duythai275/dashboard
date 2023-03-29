import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import Widget1 from "./widgets/Widget1";
import RGL, { WidthProvider } from "react-grid-layout";
import Widget2 from "./widgets/Widget2";
const ReactGridLayout = WidthProvider(RGL);

import "./index.css";
import { useEffect, useMemo } from "react";
import Widget3 from "./widgets/Widget3";
import Widget5 from "./widgets/Widget5";
import Widget4 from "./widgets/Widget4";
import { getISOWeek } from "date-fns";
import Widget6 from "./widgets/Widget6";

const DiseaseDashboard = ({ disease, dashboardIndex }) => {
  const { t, i18n } = useTranslation();
  const { ouGroups, diseases } = useMetadataStore(
    (state) => ({
      ouGroups: state.ouGroups,
      diseases: state.diseases
    }),
    shallow
  );

  const currentDisease = useMemo(() => diseases.find((item) => item.code === disease), [disease, JSON.stringify(diseases)]);
  const lastYear = useMemo(() => new Date().getFullYear() - 1);
  const currentYear = useMemo(() => new Date().getFullYear());
  const currentWeek = useMemo(() => getISOWeek(new Date()));
  const foundTranslation = currentDisease.translations.find((translation) => translation.locale === i18n.language && translation.property === "NAME");
  const diseaseName = foundTranslation ? foundTranslation.value : currentDisease.name;
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 9, h: 50 },
        { i: "2", x: 9, y: 0, w: 2.9, h: 50 },
        { i: "3", x: 0, y: 50, w: 3, h: 50 },
        { i: "4", x: 3, y: 50, w: 3, h: 50 },
        { i: "5", x: 6, y: 50, w: 3, h: 50 },
        { i: "6", x: 9, y: 50, w: 2.9, h: 50 }
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={dashboardIndex}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1Title", { diseaseName }),
            widget: <Widget1 code={disease} ou={"S3kaCiYIP4B"} />
          },
          ...ouGroups[3].organisationUnits.map((province) => {
            return {
              title:
                i18n.language === "vi"
                  ? `Diễn biến bệnh ${currentDisease.translations[0]?.value} theo tuần tại ${province.name}`
                  : `Weekly ${currentDisease.name} ${province.name} cases`,
              widget: <Widget1 code={disease} ou={province.id} />
            };
          })
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={dashboardIndex}
        widgetIndex={1}
        childrenWidgets={[
          {
            title:
              i18n.language === "vi"
                ? `Các ca mắc ${currentDisease.translations[0]?.value} trong 10 tuần qua`
                : `${currentDisease.name} cases in last 10 weeks`,
            widget: <Widget2 code={disease} />
          }
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={dashboardIndex}
        widgetIndex={2}
        childrenWidgets={[
          {
            title:
              i18n.language === "vi"
                ? `Các ca mắc ${currentDisease.translations[0]?.value} - ${lastYear} (đến tuần ${currentWeek})`
                : `${currentDisease.name} cases - ${lastYear} (upto week ${currentWeek})`,
            widget: <Widget3 code={disease} isUpto />
          },
          {
            title:
              i18n.language === "vi"
                ? `Các ca mắc ${currentDisease.translations[0]?.value} - ${lastYear} (tuần ${currentWeek})`
                : `${currentDisease.name} cases - ${lastYear} (week ${currentWeek})`,
            widget: <Widget3 code={disease} />
          },
          {
            title:
              i18n.language === "vi"
                ? `Các ca tử vong ${currentDisease.translations[0]?.value} - ${lastYear} (đến tuần ${currentWeek})`
                : `${currentDisease.name} death cases - ${lastYear} (upto week ${currentWeek})`,
            widget: <Widget3 code={disease} isDeath />
          }
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={dashboardIndex}
        widgetIndex={3}
        childrenWidgets={[
          {
            title:
              i18n.language === "vi"
                ? `Phần trăm thay đổi số các ca mắc ${currentDisease.translations[0]?.value} giữa ${lastYear} và ${currentYear} (đến tuần ${currentWeek})`
                : `% change number of ${currentDisease.name} cases between ${lastYear} and ${currentYear} (upto week ${currentWeek})`,
            widget: <Widget4 code={disease} isUpto />
          },
          {
            title:
              i18n.language === "vi"
                ? `Phần trăm thay đổi số các ca mắc ${currentDisease.translations[0]?.value} giữa ${lastYear} và ${currentYear} (tuần ${currentWeek})`
                : `% change number of ${currentDisease.name} cases between ${lastYear} and ${currentYear} (week ${currentWeek})`,
            widget: <Widget4 code={disease} />
          },
          {
            title:
              i18n.language === "vi"
                ? `Phần trăm thay đổi số các ca tử vong ${currentDisease.translations[0]?.value} giữa ${lastYear} và ${currentYear} (đến tuần ${currentWeek})`
                : `% change number of ${currentDisease.name} death cases between ${lastYear} and ${currentYear} (upto week ${currentWeek})`,
            widget: <Widget4 code={disease} isDeath />
          }
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={dashboardIndex}
        widgetIndex={4}
        childrenWidgets={[
          {
            title:
              i18n.language === "vi"
                ? `Các ca mắc ${currentDisease.translations[0]?.value} - ${currentYear} (đến tuần ${currentWeek})`
                : `${currentDisease.name} cases - ${currentYear} (upto week ${currentWeek})`,
            widget: <Widget5 code={disease} isUpto />
          },
          {
            title:
              i18n.language === "vi"
                ? `Các ca mắc ${currentDisease.translations[0]?.value} - ${currentYear} (tuần ${currentWeek})`
                : `${currentDisease.name} cases - ${currentYear} (week ${currentWeek})`,
            widget: <Widget5 code={disease} />
          },
          {
            title:
              i18n.language === "vi"
                ? `Các ca tử vong ${currentDisease.translations[0]?.value} - ${currentYear} (đến tuần ${currentWeek})`
                : `${currentDisease.name} death cases - ${currentYear} (upto week ${currentWeek})`,
            widget: <Widget5 code={disease} isDeath />
          }
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={dashboardIndex}
        widgetIndex={5}
        childrenWidgets={[
          {
            title:
              i18n.language === "vi"
                ? `Top 10 tỉnh có số ca mắc ${currentDisease.translations[0]?.value} cao nhất (đến tuần ${currentWeek})`
                : `Top 10 provinces with highest cumulative ${currentDisease.name} cases (upto week ${currentWeek})`,
            widget: <Widget6 code={disease} isUpto />
          },
          {
            title:
              i18n.language === "vi"
                ? `Top 10 tỉnh có số ca mắc ${currentDisease.translations[0]?.value} cao nhất (tuần ${currentWeek})`
                : `Top 10 provinces with highest cumulative ${currentDisease.name} cases (week ${currentWeek})`,
            widget: <Widget6 code={disease} />
          }
        ]}
      />
    </ReactGridLayout>
  );
};
export default DiseaseDashboard;
