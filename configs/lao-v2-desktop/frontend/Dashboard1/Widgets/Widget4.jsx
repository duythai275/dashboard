import { useEffect, useState } from "react";
import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";
import { shallow } from "zustand/shallow";

const Widget4 = ({ setLoading }) => {
  const { hmisDataItems } = useMetadataStore(
    (state) => ({ hmisDataItems: state.hmisDataItems }),
    shallow
  );
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard1Widget4Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

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
          const foundRow = result.data.find(
            (row) => row.pe === pe && row.item === di.id
          );
          return foundRow ? foundRow.value : 0;
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
