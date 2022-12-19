import { useEffect, useState } from "react";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pull } from "../utils";
import shallow from "zustand/shallow";

const Widget2 = ({ setLoading }) => {
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
      const result = await pull("/api/getWidget2Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      const ous = [
        "FRmrFTE63D0",
        "K27JzTKmBKh",
        "MBZYTqkEgwf",
        "RdNV4tTRNEo",
        "TOgZ99Jv0bN",
        "VWGSudnonm5",
        "W6sNfkJcXGC",
        "XKGgynPS1WZ",
        "YvLOmtTQD6b",
        "c4HrGRJoarj",
        "dOhqCNenSjS",
        "hRQsZhmvqgS",
        "hdeC7uX9Cko",
        "pFCZqWnXtoU",
        "quFXhkOJGB4",
        "rO2RVJWHpCe",
        "sv6c7CpPcrc",
        "vBWtCmNNnCG"
      ];

      const dataItems = ["cwhEsbBe6Zs", "cPcvesqWRtH", "dJhWRKs0fcq"].map((de) => {
        const foundDi = hmisDataItems.find((di) => di.id === de);
        return foundDi;
      });
      const colors = ["rgb(168, 191, 36)", "rgb(81, 140, 195)", "rgb(215, 69, 84)"];
      let currentData = {};
      currentData.labels = ous.map((row) => {
        const foundOu = hmisOrgUnits.find((ou) => ou.id === row);
        return foundOu[`name${localeName}`];
      });
      currentData.datasets = dataItems.map((di, index) => ({
        label: di[`name${localeName}`],
        data: ous.map((ou) => {
          const foundRow = result.find((row) => row.ou === ou && row.item === di.id);
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
export default withWidgetChildrenLoader(Widget2);
