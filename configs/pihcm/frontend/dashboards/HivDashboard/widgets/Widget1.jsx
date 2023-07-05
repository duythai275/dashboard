import { Box } from "@mui/material";
import { regionLabels } from "../constants";
import { useTranslation } from "react-i18next";
import { memo, useEffect, useMemo, useState } from "react";

import { pull } from "@/utils/fetch";
import { getRowValue, sortArray } from "../utils";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { ModalBarChart } from "../components";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { getQuarter } from "date-fns";

const Widget1 = ({ pepfarProvinces, outsidePepfarProvinces, setLoading }) => {
  const { t } = useTranslation();
  const [barData, setBarData] = useState(null);
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdxActive, setModalIdxActive] = useState(null);
  const periodForW1 = useDashboardStore(
    (state) => state.additionalState.periodForW1,
    shallow
  );

  const baseDatasets = useMemo(() => {
    if (!periodForW1) return [];
    const { year, month } = periodForW1;
    const quarter = getQuarter(new Date().setMonth(month - 1));
    return [
      {
        name: "greenData",
        label: t("peopleNewHIVStatusUpto", { month, year }),
        backgroundColor: "#4caf50",
      },
      {
        name: "blueData",
        label: t("patientsOnART", { quarter, year }),
        backgroundColor: "#03a9f4",
      },
      {
        name: "redData",
        label: t("patientsWithSupressedVlResult", { year }),
        backgroundColor: "#ff9800",
      },
    ];
  }, [periodForW1]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!periodForW1) return;
      const { year, month } = periodForW1;
      const quarter = getQuarter(new Date().setMonth(month - 1));

      const [resultFrom2015, resultYearly, resultQuarterly, resultRed] =
        await Promise.all([
          pull(
            `/api/analytics.json?dimension=dx:${redIds.join(
              ";"
            )};${greenNumeratorIds.join(";")}&dimension=ou:${pepfarProvinces
              .concat(outsidePepfarProvinces)
              .map(({ id }) => id)
              .join(";")}&startDate=2015-1-1&endDate=${year}-${month}-1`
          ),
          pull(
            `/api/analytics.json?dimension=dx:${greenDenominatorId}&dimension=ou:${pepfarProvinces
              .concat(outsidePepfarProvinces)
              .map(({ id }) => id)
              .join(";")}&filter=pe:${year}`
          ),
          pull(
            `/api/analytics.json?dimension=dx:${blueNumeratorId}&dimension=ou:${pepfarProvinces
              .concat(outsidePepfarProvinces)
              .map(({ id }) => id)
              .join(";")}&filter=pe:${year}Q${quarter}`
          ),
          pull(
            `/api/analytics.json?dimension=dx:${redIds.join(
              ";"
            )}&dimension=iuEraM0pUfw:fLesQz5Kzmd&dimension=ou:${pepfarProvinces
              .concat(outsidePepfarProvinces)
              .map(({ id }) => id)
              .join(";")}&filter=pe:${year}`
          ),
        ]);

      const calculateGreen = (greenValue, ouId) => {
        const denominatorValue = getRowValue(
          resultYearly,
          [greenDenominatorId],
          ouId
        );

        if (!denominatorValue[0]) return 0;
        return Math.round((greenValue / parseInt(denominatorValue[0])) * 100);
      };

      const calculateBlue = (greenValue, ouId) => {
        const numeratorValue = getRowValue(
          resultQuarterly,
          [blueNumeratorId],
          ouId
        );

        if (!greenValue) return 0;
        return Math.round((parseInt(numeratorValue) / greenValue) * 100);
      };

      const calculateRed = (ouId) => {
        const redValues = getRowValue(resultRed, redIds, ouId);
        const numerator = parseInt(redValues[0]) + parseInt(redValues[1]);
        const denominator =
          parseInt(redValues[2]) + parseInt(redValues[3]) || 1;

        if (!denominator) return 0;
        return Math.round((numerator / denominator) * 100);
      };

      const getOuData = (ouList) =>
        ouList.map((ou) => {
          const greens = getRowValue(resultFrom2015, greenNumeratorIds, ou.id);
          const greenValue = parseInt(greens[0]) - parseInt(greens[1]);
          const green = calculateGreen(greenValue, ou.id);
          const blue = calculateBlue(greenValue, ou.id);
          const red = calculateRed(ou.id);
          return { ou: ou.id, name: ou.displayName, green, blue, red };
        });

      const resultPepfar = getOuData(pepfarProvinces);
      const resultOutsidePepfar = getOuData(outsidePepfarProvinces);

      const barData = resultPepfar.concat(resultOutsidePepfar).reduce(
        ({ redData, blueData, greenData }, { green, blue, red }, idx) => {
          //20 province
          redData[0] += red;
          blueData[0] += blue;
          greenData[0] += green;

          //7 province
          if (idx < 7) {
            redData[1] += red;
            blueData[1] += blue;
            greenData[1] += green;
          }

          //13 province
          if (idx >= 7) {
            redData[2] += red;
            blueData[2] += blue;
            greenData[2] += green;
          }
          return { redData, blueData, greenData };
        },
        { redData: [0, 0, 0], blueData: [0, 0, 0], greenData: [0, 0, 0] }
      );

      setLoading(false);
      setData({ resultPepfar, resultOutsidePepfar });
      setBarData(barData);
    })();
  }, [pepfarProvinces, outsidePepfarProvinces, periodForW1]);

  const chartConfigs = barData
    ? {
        labels: regionLabels.map((label) => t(label)),
        datasets: baseDatasets.map(({ label, backgroundColor, name }) => ({
          label,
          backgroundColor,
          data: barData[name].map((total) => total),
        })),
      }
    : null;

  const reduceChartData = (ouList) =>
    ouList.reduce(
      ({ redData, greenData, blueData }, { red, green, blue }) => {
        redData.push(red);
        greenData.push(green);
        blueData.push(blue);
        return { redData, greenData, blueData };
      },
      { redData: [], greenData: [], blueData: [] }
    );

  const modalChartConfigs = useMemo(() => {
    if (modalIdxActive === null || !data) return null;
    const { resultPepfar, resultOutsidePepfar } = data;

    let labels, chartData;
    switch (modalIdxActive) {
      case 0:
        labels = sortArray(
          resultPepfar.concat(resultOutsidePepfar),
          "name"
        ).map(({ name }) => name);
        chartData = reduceChartData(resultPepfar.concat(resultOutsidePepfar));
        break;
      case 1:
        labels = resultPepfar.map(({ name }) => name);
        chartData = reduceChartData(resultPepfar);
        break;
      case 2:
        labels = resultOutsidePepfar.map(({ name }) => name);
        chartData = reduceChartData(resultOutsidePepfar);
        break;
      default:
        break;
    }

    return {
      labels,
      datasets: baseDatasets.map(({ label, backgroundColor, name }) => ({
        label,
        backgroundColor,
        data: chartData[name].map((total, idx) => total),
      })),
    };
  }, [data, modalIdxActive]);

  const handleClick = (data) => {
    setModalOpen(true);
    setModalIdxActive(data.index);
  };

  return (
    data && (
      <Box sx={{ width: 1, height: 1 }}>
        {modalChartConfigs && (
          <ModalBarChart
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setModalIdxActive(null);
            }}
            barData={modalChartConfigs}
            title={`90-90-90 (${periodForW1.month}/${periodForW1.year}) - ${t(
              regionLabels[modalIdxActive]
            )}`}
            w={
              modalIdxActive === 0
                ? "90dvw"
                : modalIdxActive === 2
                ? "80dvw"
                : null
            }
          />
        )}
        <BarChart data={chartConfigs} handleClick={handleClick} />
      </Box>
    )
  );
};

const greenNumeratorIds = ["skMWmY6Xh4u", "nUvuS5zdYh6"];
const greenDenominatorId = "mnNIMaonNGZ";
const blueNumeratorId = "z2laIzG8Z1K";
const redIds = [
  "eupLO26vvX8",
  "ZzGVNzKxZdX",
  "eupLO26vvX8.CksScNpnanY",
  "ZzGVNzKxZdX.CksScNpnanY",
];

export default withWidgetChildrenLoader(memo(Widget1));
