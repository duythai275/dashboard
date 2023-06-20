import { useTranslation } from "react-i18next";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { Widget1, Widget2, Widget3, Widget4 } from "./widgets";
import { useMemo, useState } from "react";
import useMetadataStore from "@/state/metadata";
import {
  OUTSIDE_PEPFAR_PROVINCE_GROUP_ID,
  PEPFAR_PROVINCE_GROUP_ID,
} from "./constants";
import { IconButton, Popover } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import PeriodSelector from "@/components/PeriodSelector/PeriodSelector";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { sortArray } from "./utils";

const HivDashboard = () => {
  const { t, i18n } = useTranslation();
  const communes = useMetadataStore((state) => state.communes);
  const { changeAdditionalStateProperty } = useDashboardStore(
    (state) => ({
      changeAdditionalStateProperty: state.changeAdditionalStateProperty,
    }),
    shallow
  );
  const [anchorElW1, setAnchorElW1] = useState(null);
  const [anchorElW2, setAnchorElW2] = useState(null);
  const [anchorElW3, setAnchorElW3] = useState(null);
  const [anchorElW4, setAnchorElW4] = useState(null);

  const [pepfarProvinces, outsidePepfarProvinces] = useMemo(() => {
    if (!communes) return [[], []];
    const resultReduce = communes.reduce(
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
    ) || [[], []];

    return [sortArray(resultReduce[0]), sortArray(resultReduce[1])];
  }, [communes, i18n.language]);

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
        controlButtons={[
          <div>
            <IconButton
              onClick={(event) => {
                setAnchorElW1(event.currentTarget);
              }}
            >
              <FontAwesomeIcon icon={faGear} style={{ fontSize: 22 }} />
            </IconButton>
            <Popover
              open={Boolean(anchorElW1)}
              anchorEl={anchorElW1}
              onClose={() => {
                setAnchorElW1(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <PeriodSelector
                periodType={"Monthly"}
                handler={(period) => {
                  changeAdditionalStateProperty("periodForW1", period);
                }}
              />
            </Popover>
          </div>,
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={2}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget2Title"),
            widget: (
              <Widget2 {...{ pepfarProvinces, outsidePepfarProvinces }} />
            ),
          },
        ]}
        controlButtons={[
          <div>
            <IconButton
              onClick={(event) => {
                setAnchorElW2(event.currentTarget);
              }}
            >
              <FontAwesomeIcon icon={faGear} style={{ fontSize: 22 }} />
            </IconButton>
            <Popover
              open={Boolean(anchorElW2)}
              anchorEl={anchorElW2}
              onClose={() => {
                setAnchorElW2(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <PeriodSelector
                periodType={"Yearly"}
                handler={(period) => {
                  changeAdditionalStateProperty("periodForW2", period);
                }}
              />
            </Popover>
          </div>,
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={2}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget3Title", { quarter: 4, year: 2021 }),
            widget: (
              <Widget3 {...{ pepfarProvinces, outsidePepfarProvinces }} />
            ),
          },
        ]}
        controlButtons={[
          <div>
            <IconButton
              onClick={(event) => {
                setAnchorElW3(event.currentTarget);
              }}
            >
              <FontAwesomeIcon icon={faGear} style={{ fontSize: 22 }} />
            </IconButton>
            <Popover
              open={Boolean(anchorElW3)}
              anchorEl={anchorElW3}
              onClose={() => {
                setAnchorElW3(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <PeriodSelector
                periodType={"Quarterly"}
                handler={(period) => {
                  console.log(period);
                  changeAdditionalStateProperty("periodForW3", period);
                }}
              />
            </Popover>
          </div>,
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
        controlButtons={[
          <div>
            <IconButton
              onClick={(event) => {
                setAnchorElW4(event.currentTarget);
              }}
            >
              <FontAwesomeIcon icon={faGear} style={{ fontSize: 22 }} />
            </IconButton>
            <Popover
              open={Boolean(anchorElW4)}
              anchorEl={anchorElW4}
              onClose={() => {
                setAnchorElW4(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <PeriodSelector
                periodType={"Yearly"}
                handler={(period) => {
                  changeAdditionalStateProperty("periodForW4", period);
                }}
              />
            </Popover>
          </div>,
        ]}
      />
    </ReactGridLayout>
  );
};

const redIds = [
  "eupLO26vvX8",
  "ZzGVNzKxZdX",
  "eupLO26vvX8.CksScNpnanY",
  "ZzGVNzKxZdX.CksScNpnanY",
];

export default HivDashboard;
