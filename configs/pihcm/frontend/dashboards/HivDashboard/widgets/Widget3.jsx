import { regionLabels } from "../constants";
import { useEffect, useMemo, useState } from "react";

import { pull } from "@/utils/fetch";
import { getRowValue, sortArray } from "../utils";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ModalBarChart } from "../components";

const year = 2022;
const quarter = 2;

const Widget3 = ({ pepfarProvinces, outsidePepfarProvinces, setLoading }) => {
  const { t } = useTranslation();
  const [barData, setBarData] = useState(null);
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdxActive, setModalIdxActive] = useState(null);

  const baseDatasets = [
    {
      name: "newArv",
      label: t("newArv"),
      backgroundColor: "#4caf50",
    },
    {
      name: "relapse",
      label: t("relapse"),
      backgroundColor: "#2196f3",
    },
    {
      name: "transferredIn",
      label: t("transferredIn"),
      backgroundColor: "#ff9800",
    },
    {
      name: "transferredOut",
      label: t("transferredOut"),
      backgroundColor: "#ffca28",
      datalabels: {
        anchor: "start",
        align: "start",
      },
    },
    {
      name: "lossFollowUp",
      label: t("lossFollowUp"),
      backgroundColor: "#40c4ff",
      datalabels: {
        anchor: "start",
        align: "start",
      },
    },
    {
      name: "dead",
      label: t("dead"),
      backgroundColor: "#00e676",
      datalabels: {
        anchor: "start",
        align: "start",
      },
    },
  ];

  ///
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull(
        `/api/analytics.json?dimension=dx:${deIds.join(
          ";"
        )}&dimension=ou:${pepfarProvinces
          .concat(outsidePepfarProvinces)
          .map(({ id }) => id)
          .join(";")}&filter=pe:${year}Q${quarter}`
      );

      const getOuData = (ouList) =>
        ouList.map((ou) => {
          const values = getRowValue(result, deIds, ou);
          return { ou: ou.id, name: ou.displayName, values };
        });

      const resultPepfar = getOuData(pepfarProvinces);
      const resultOutsidePepfar = getOuData(outsidePepfarProvinces);

      const barData = resultPepfar.concat(resultOutsidePepfar).reduce(
        (result, { values }, idx) => {
          result["newArv"][0] += values[0];
          result["relapse"][0] += values[1];
          result["transferredIn"][0] += values[2];
          result["transferredOut"][0] += values[3];
          result["lossFollowUp"][0] += values[4];
          result["dead"][0] += values[5];

          if (idx < 7) {
            result["newArv"][1] += values[0];
            result["relapse"][1] += values[1];
            result["transferredIn"][1] += values[2];
            result["transferredOut"][1] += values[3];
            result["lossFollowUp"][1] += values[4];
            result["dead"][1] += values[5];
          }
          if (idx >= 7) {
            result["newArv"][2] += values[0];
            result["relapse"][2] += values[1];
            result["transferredIn"][2] += values[2];
            result["transferredOut"][2] += values[3];
            result["lossFollowUp"][2] += values[4];
            result["dead"][2] += values[5];
          }

          return result;
        },
        {
          newArv: [],
          relapse: [],
          transferredIn: [],
          transferredOut: [],
          lossFollowUp: [],
          dead: [],
        }
      );
      setLoading(false);
      setData({ resultPepfar, resultOutsidePepfar });
      setBarData(barData);
    })();
  }, [pepfarProvinces, outsidePepfarProvinces, year, quarter]);

  const chartConfigs = barData
    ? {
        labels: regionLabels.map((label) => t(label)),
        datasets: baseDatasets.map(
          ({ label, backgroundColor, name, datalabels }, idx) => ({
            label,
            datalabels,
            backgroundColor,
            data:
              idx < 3
                ? regionLabels.map(() => (Math.random(0, 1) * 4000).toFixed())
                : regionLabels.map(
                    () => (Math.random(0, 1) * 4000).toFixed() * -1
                  ),
          })
        ),
      }
    : null;

  const reduceChartData = (ouList) =>
    ouList.reduce(
      (result, { values }) => {
        result.newArv.push(values[0]);
        result.relapse.push(values[1]);
        result.transferredIn.push(values[2]);
        result.transferredOut.push(values[3]);
        result.lossFollowUp.push(values[4]);
        result.dead.push(values[5]);

        return result;
      },
      {
        newArv: [],
        relapse: [],
        transferredIn: [],
        transferredOut: [],
        lossFollowUp: [],
        dead: [],
      }
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
      datasets: baseDatasets.map(
        ({ label, name, backgroundColor, datalabels }, idx) => ({
          label,
          datalabels,
          backgroundColor,
          data:
            idx < 3
              ? labels.map(() => (Math.random(0, 1) * 4000).toFixed())
              : labels.map(() => (Math.random(0, 1) * 4000).toFixed() * -1),
        })
      ),
    };
  }, [data, modalIdxActive]);

  const handleClick = (data) => {
    setModalOpen(true);
    setModalIdxActive(data.index);
  };

  return (
    barData && (
      <Box sx={{ width: 1, height: 1 }}>
        {modalChartConfigs && (
          <ModalBarChart
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setModalIdxActive(null);
            }}
            barData={modalChartConfigs}
            title={`${t("HivDashboardWidget3Title", { quarter, year })} - ${t(
              regionLabels[modalIdxActive]
            )}`}
            w={
              modalIdxActive === 0
                ? "90dvw"
                : modalIdxActive === 2
                ? "80dvw"
                : null
            }
            h="75dvh"
          />
        )}
        <BarChart data={chartConfigs} handleClick={handleClick} />
      </Box>
    )
  );
};

const deIds = [
  "lIKvutrJPaN",
  "vJf9RXatvVQ",
  "kAguiO5T57l",
  "j5psc0i1zz5",
  "APMAXI8VaGh",
  "STooCvlxg5S",
];

export default withWidgetChildrenLoader(Widget3);
