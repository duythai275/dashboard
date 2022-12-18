import { useEffect, useState } from "react";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import axios from "axios";
import shallow from "zustand/shallow";

const Widget3 = ({ setLoading }) => {
  const { hmisOrgUnits, hmisDataItems } = useMetadataStore(
    (state) => ({ hmisOrgUnits: state.hmisOrgUnits, hmisDataItems: state.hmisDataItems }),
    shallow
  );
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await axios.get("/api/getWidget3Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";

      const dataItems = result.dxs.map((de) => {
        const foundDi = hmisDataItems.find((di) => di.id === de);
        return foundDi;
      });
      const colors = [
        "rgb(168, 191, 36)",
        "rgb(81, 140, 195)",
        "rgb(215, 69, 84)",
        "rgb(255, 158, 33)",
        "rgb(150, 143, 143)"
      ];
      let currentData = {};
      currentData.labels = result.pes;
      currentData.datasets = dataItems.map((di, index) => ({
        label: di[`name${localeName}`],
        data: result.pes.map((pe) => {
          const foundRow = result.data.find((row) => row.pe === pe && row.item === di.id);
          return foundRow ? foundRow.value : 0;
        }),
        borderColor: colors[index],
        backgroundColor: colors[index]
      }));

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget3);
