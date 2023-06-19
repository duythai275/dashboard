import { regionLabels } from "../constants";
import { useEffect, useMemo, useRef, useState } from "react";

import { pull } from "@/utils/fetch";
import { getRowValue } from "../utils";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";

const Widget3 = ({ pepfarProvinces, outsidePepfarProvinces, setLoading }) => {
  const chartRef = useRef();
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  const year = 2022;
  const quarter = 2;

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
          const {
            newArv,
            relapse,
            transferredIn,
            transferredOut,
            lossFollowUp,
            dead,
          } = result;

          newArv[0] += values[0];
          relapse[0] += values[1];
          transferredIn[0] += values[2];
          transferredOut[0] += values[3];
          lossFollowUp[0] += values[4];
          dead[0] += values[5];

          if (idx < 7) {
            newArv[1] += values[0];
            relapse[1] += values[1];
            transferredIn[1] += values[2];
            transferredOut[1] += values[3];
            lossFollowUp[1] += values[4];
            dead[1] += values[5];
          }
          if (idx >= 7) {
            newArv[2] += values[0];
            relapse[2] += values[1];
            transferredIn[2] += values[2];
            transferredOut[2] += values[3];
            lossFollowUp[2] += values[4];
            dead[2] += values[5];
          }

          return {
            newArv,
            relapse,
            transferredIn,
            transferredOut,
            lossFollowUp,
            dead,
          };
        },
        {
          newArv: [0, 0, 0],
          relapse: [0, 0, 0],
          transferredIn: [0, 0, 0],
          transferredOut: [0, 0, 0],
          lossFollowUp: [0, 0, 0],
          dead: [0, 0, 0],
        }
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
            label: t("newArv"),
            data: regionLabels.map(
              () => (Math.random(0, 1) * 4000).toFixed() * 1
            ),
            backgroundColor: "#4caf50",
          },
          {
            label: t("relapse"),
            data: regionLabels.map(
              () => (Math.random(0, 1) * 4000).toFixed() * 1
            ),
            backgroundColor: "#2196f3",
          },
          {
            label: t("transferredIn"),
            data: regionLabels.map(
              () => (Math.random(0, 1) * 4000).toFixed() * 1
            ),
            backgroundColor: "#ff9800",
          },
          {
            label: t("transferredOut"),
            data: regionLabels.map(
              () => (Math.random(0, 1) * 4000).toFixed() * -1
            ),
            backgroundColor: "#ffca28",
            datalabels: {
              anchor: "start",
              align: "start",
            },
          },
          {
            label: t("lossFollowUp"),
            data: regionLabels.map(
              () => (Math.random(0, 1) * 4000).toFixed() * -1
            ),
            backgroundColor: "#40c4ff",
            datalabels: {
              anchor: "start",
              align: "start",
            },
          },
          {
            label: t("dead"),
            data: regionLabels.map(
              () => (Math.random(0, 1) * 4000).toFixed() * -1
            ),
            backgroundColor: "#00e676",
            datalabels: {
              anchor: "start",
              align: "start",
            },
          },
        ],
      }
    : null;

  return data && <BarChart data={chartConfigs} />;
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
