import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";

const Widget4 = ({ setLoading }) => {
  const { hmisDataItems } = useMetadataStore(
    (state) => ({ hmisDataItems: state.hmisDataItems }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    const listPe = [];
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    while (true) {
      if (listPe.length === 36) {
        break;
      }
      listPe.push(`${year}${month < 10 ? `0${month}` : month}`);
      if (month === 1) {
        month = 12;
        year -= 1;
      } else {
        month -= 1;
      }
    }
    return listPe;
  }, []);

  useEffect(() => {
    if (additionalState.widget1234567Dashboard1Ready) {
      const response = {};
      response.data = additionalState.widget1234567Dashboard1Data.rows.map(
        (row) => ({
          pe: row[1],
          item: row[0],
          value: parseInt(row[3]),
        })
      );
      response.pes =
        additionalState.widget1234567Dashboard1Data.metaData.dimensions.pe
          .filter((item) => {
            if (listTargetPe.includes(item)) {
              return item;
            }
          })
          .reverse();
      setResult(response);
    }
    setLoading(!additionalState.widget1234567Dashboard1Ready);
  }, [additionalState.widget1234567Dashboard1Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      const dataItems = ["cwhEsbBe6Zs", "cPcvesqWRtH", "dJhWRKs0fcq"].map(
        (de) => {
          const foundDi = hmisDataItems.find((di) => di.id === de);
          return foundDi;
        }
      );
      const colors = [
        "rgb(168, 191, 36)",
        "rgb(81, 140, 195)",
        "rgb(215, 69, 84)",
      ];
      let currentData = {};
      currentData.labels = result.pes.map((pe) => {
        const year = pe.substring(0, 4);
        const month = pe.substring(4, 6);
        return month + "/" + year;
      });
      currentData.datasets = dataItems.map((di, index) => ({
        label: di[`name${localeName}`],
        data: result.pes.map((pe) => {
          const foundRow = result.data.filter(
            (row) => row.pe === pe && row.item === di.id
          );
          return foundRow.length
            ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
            : 0;
        }),
        borderColor: colors[index],
        backgroundColor: colors[index],
      }));

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <LineChart data={data} />;
};
export default withWidgetChildrenLoader(Widget4);
