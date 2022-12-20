import { useState, useEffect } from "react";
import DataGrid from "@/components/Widgets/DataGrid";
import useMetadataStore from "@/state/metadata";
import shallow from "zustand/shallow";
import { useTranslation } from "react-i18next";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "../utils";

const Widget3 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const { hmisOrgUnits, hmisDataItems } = useMetadataStore(
    (state) => ({ hmisOrgUnits: state.hmisOrgUnits, hmisDataItems: state.hmisDataItems }),
    shallow
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getWidget3Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    const localeName = i18n.language === "en" ? "En" : "Lo";
    const dataItems = result.dxs.map((de) => {
      const foundDi = hmisDataItems.find((di) => di.id === de);
      return foundDi;
    });

    let currentData = {
      columns: [],
      rows: []
    };
    currentData.columns = result.pes.map((pe) => ({ name: pe, header: pe }));
    currentData.columns.unshift({ name: "di", header: t("data/period"), width: 300 });
    currentData.rows = dataItems.map((di) => {
      const row = {
        di: di[`name${localeName}`]
      };
      result.pes.forEach((pe) => {
        const foundValue = result.data.find((r) => r.pe === pe && r.item === di.id);
        row[pe] = foundValue ? foundValue.value : "";
      });
      return row;
    });
    // currentData.datasets = dataItems.map((di, index) => ({
    //   label: di[`name${localeName}`],
    //   data: result.pes.map((pe) => {
    //     const foundRow = result.data.find((row) => row.pe === pe && row.item === di.id);
    //     return foundRow ? foundRow.value : 0;
    //   }),
    //   borderColor: colors[index],
    //   backgroundColor: colors[index]
    // }));
    setData({ ...currentData });
  }, [i18n.language, JSON.stringify(result)]);

  return data && <DataGrid columns={data.columns} rows={data.rows} />;
};

export default withWidgetChildrenLoader(Widget3);
