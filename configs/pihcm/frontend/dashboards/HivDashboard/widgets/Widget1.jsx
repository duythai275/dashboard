import { Box } from "@mui/material";
import { regionLabels } from "../constants";
import { useTranslation } from "react-i18next";
import { getElementAtEvent } from "react-chartjs-2";
import { useEffect, useMemo, useRef, useState } from "react";

import { pull } from "@/utils/fetch";
import { getRowValue } from "../utils";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

const Widget1 = ({ pepfarProvinces, outsidePepfarProvinces, setLoading }) => {
  const chartRef = useRef();

  const { t } = useTranslation();
  const [data, setData] = useState(null);

  const month = 5;
  const year = 2022;
  const quarter = 2;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [resultFrom2015, resultYearly, resultQuarterly] = await Promise.all(
        [
          pull(
            `/api/analytics.json?dimension=dx:${redIds.join(
              ";"
            )};${greenNumeratorIds.join(";")}&dimension=ou:${pepfarProvinces
              .concat(outsidePepfarProvinces)
              .map(({ id }) => id)
              .join(";")}&startDate=2015-1-1&endDate=${year}-${month}-1`
          ),
          pull(
            `/api/analytics.json?dimension=dx:${redIds.join(
              ";"
            )};${greenDenominatorId}&dimension=ou:${pepfarProvinces
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
        ]
      );

      const calculateGreen = (greenValue, ou) => {
        const denominatorValue = getRowValue(
          resultYearly,
          [greenDenominatorId],
          ou
        );
        return Math.round(
          (greenValue / parseInt(denominatorValue[0] || 1)) * 100
        );
      };

      const calculateBlue = (greenValue, ou) => {
        const numeratorValue = getRowValue(
          resultQuarterly,
          [blueNumeratorId],
          ou
        );
        return Math.round((parseInt(numeratorValue) / (greenValue || 1)) * 100);
      };

      const calculateRed = (ou) => {
        const redValues = getRowValue(resultYearly, redIds, ou);
        const numerator = parseInt(redValues[0]) + parseInt(redValues[1]);
        const denominator =
          parseInt(redValues[2]) + parseInt(redValues[3]) || 1;
        return Math.round((numerator / (denominator || 1)) * 100);
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
          redData[0] += red;
          blueData[0] += blue;
          greenData[0] += green;

          if (idx < 7) {
            redData[1] += red;
            blueData[1] += blue;
            greenData[1] += green;
          }
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
      setData(barData);
    })();
  }, [pepfarProvinces, outsidePepfarProvinces]);

  const chartConfigs = data
    ? {
        labels: regionLabels,
        datasets: [
          {
            label: t("peopleNewHIVStatusUpto", { month, year }),
            data: data.greenData.map((total) => Math.round(total / 20)),
            backgroundColor: "#4caf50",
          },
          {
            label: t("patientsOnART", { quarter, year }),
            data: data.blueData.map((total) => Math.round(Math.random() * 100)),
            backgroundColor: "#03a9f4",
          },
          {
            label: t("patientsWithSupressedVlResult", { year }),
            data: data.redData.map((total) => Math.round(Math.random() * 100)),
            backgroundColor: "#ff9800",
          },
        ],
      }
    : null;

  const handleClick = (e) => {
    console.log(getElementAtEvent(chartRef.current, e));
  };

  return (
    data && (
      <Box sx={{ width: 1, height: 1 }}>
        {/*  <ModalBarChart
        open={true}
        barData={chartConfigs}
        title="HivDashboardWidget1ModalTitle"
      /> */}
        <BarChart data={chartConfigs} onClick={handleClick} ref={chartRef} />
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

export default withWidgetChildrenLoader(Widget1);
