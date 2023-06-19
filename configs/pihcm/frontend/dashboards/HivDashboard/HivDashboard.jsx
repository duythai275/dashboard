import { useTranslation } from "react-i18next";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { Widget1, Widget2, Widget3, Widget4 } from "./widgets";
import { useMemo } from "react";
import useMetadataStore from "@/state/metadata";
import {
  OUTSIDE_PEPFAR_PROVINCE_GROUP_ID,
  PEPFAR_PROVINCE_GROUP_ID,
} from "./constants";

const HivDashboard = () => {
  const { t } = useTranslation();
  const communes = useMetadataStore((state) => state.communes);

  const [pepfarProvinces, outsidePepfarProvinces] = useMemo(
    () =>
      communes?.reduce(
        (result, current) => {
          const pepfarFound = current.organisationUnitGroups.find(
            ({ id }) => id === PEPFAR_PROVINCE_GROUP_ID
          );
          if (pepfarFound) {
            result[0].push(current);
            return result;
          }

          const outsidePepfarFound = current.organisationUnitGroups.find(
            ({ id }) => id === OUTSIDE_PEPFAR_PROVINCE_GROUP_ID
          );
          if (outsidePepfarFound) {
            result[1].push(current);
            return result;
          }

          return result;
        },
        [[], []]
      ) || [[], []],
    [communes]
  );

  return (
    <ReactGridLayout
      isDraggable={false}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
      layout={[
        { i: "1", x: 0, y: 0, w: 6, h: 50 },
        { i: "2", x: 6, y: 0, w: 6, h: 50 },
        { i: "3", x: 0, y: 50, w: 6, h: 50 },
        { i: "4", x: 6, y: 50, w: 6, h: 50 },
      ]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={2}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget1Title", { month: 12, year: 2021 }),
            widget: (
              <Widget1 {...{ pepfarProvinces, outsidePepfarProvinces }} />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={2}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("arvTreatmentStatus"),
            widget: (
              <Widget2 {...{ pepfarProvinces, outsidePepfarProvinces }} />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={2}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget3Title", { quad: 4, year: 2021 }),
            widget: (
              <Widget3 {...{ pepfarProvinces, outsidePepfarProvinces }} />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={2}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget4Title"),
            widget: (
              <Widget4 {...{ pepfarProvinces, outsidePepfarProvinces }} />
            ),
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default HivDashboard;
