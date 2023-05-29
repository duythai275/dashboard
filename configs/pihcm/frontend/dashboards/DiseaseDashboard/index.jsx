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
import { Box } from "@mui/material";

const DiseaseDashboard = ({ disease }) => {
  const { t, i18n } = useTranslation();
  const { diseases, communes } = useMetadataStore(
    (state) => ({
      communes: state.communes,
      diseases: state.diseases,
    }),
    shallow
  );
  const provinces = useMemo(() => {
    if (!communes) return null;
    return communes.filter((item) => item.level === 2);
  }, [communes]);
  const currentDisease = useMemo(
    () => diseases.find((item) => item.code === disease),
    [disease, JSON.stringify(diseases)]
  );
  const lastYear = useMemo(() => new Date().getFullYear() - 1, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const currentWeek = useMemo(() => getISOWeek(new Date()), []);
  const diseaseName = useMemo(
    () =>
      currentDisease.translations.find(
        (translation) =>
          translation.locale === i18n.language &&
          translation.property === "NAME"
      )?.value || currentDisease.name,
    [currentDisease, i18n.language]
  );
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 9, h: 50 },
        { i: "2", x: 9, y: 0, w: 2.9, h: 50 },
        { i: "3", x: 0, y: 50, w: 3, h: 50 },
        { i: "4", x: 3, y: 50, w: 3, h: 50 },
        { i: "5", x: 6, y: 50, w: 3, h: 50 },
        { i: "6", x: 9, y: 50, w: 2.9, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget1Title", { diseaseName }),
            widget: <Widget1 code={disease} ou={"S3kaCiYIP4B"} />,
          },
          ...provinces.map((province) => {
            return {
              title: t("widget1TitleWithProvince", {
                diseaseName,
                provinceName: province.name,
              }),
              widget: <Widget1 code={disease} ou={province.id} />,
            };
          }),
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget2Title", { diseaseName }),
            widget: <Widget2 code={disease} />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget3.1Title", { diseaseName, lastYear, currentWeek }),

            widget: <Widget3 code={disease} isUpto />,
          },
          {
            title: t("widget3.2Title", { diseaseName, lastYear, currentWeek }),

            widget: <Widget3 code={disease} />,
          },
          {
            title: t("widget3.3Title", { diseaseName, lastYear, currentWeek }),

            widget: <Widget3 code={disease} isDeath />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("widget4.1Title", {
              diseaseName,
              lastYear,
              currentYear,
              currentWeek,
            }),

            widget: <Widget4 code={disease} isUpto />,
          },
          {
            title: t("widget4.2Title", {
              diseaseName,
              lastYear,
              currentYear,
              currentWeek,
            }),

            widget: <Widget4 code={disease} />,
          },
          {
            title: t("widget4.3Title", {
              diseaseName,
              lastYear,
              currentYear,
              currentWeek,
            }),

            widget: <Widget4 code={disease} isDeath />,
          },
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={0}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget5.1Title", {
              diseaseName,
              currentYear,
              currentWeek,
            }),

            widget: <Widget5 code={disease} isUpto />,
          },
          {
            title: t("widget5.2Title", {
              diseaseName,
              currentYear,
              currentWeek,
            }),

            widget: <Widget5 code={disease} />,
          },
          {
            title: t("widget5.3Title", {
              diseaseName,
              currentYear,
              currentWeek,
            }),

            widget: <Widget5 code={disease} isDeath />,
          },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={0}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("widget6.1Title", {
              diseaseName,
              currentWeek,
            }),

            widget: <Widget6 code={disease} isUpto />,
          },
          {
            title: t("widget6.2Title", {
              diseaseName,
              currentWeek,
            }),

            widget: <Widget6 code={disease} />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};
export default DiseaseDashboard;
