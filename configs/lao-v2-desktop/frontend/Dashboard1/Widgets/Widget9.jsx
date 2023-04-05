import { useEffect, useState } from "react";
import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";
import { shallow } from "zustand/shallow";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import DataGrid from "@/components/Widgets/DataGrid";
import { getMonthName } from "../common/function/getMonthName";
import {} from "date-fns/locale";

const Widget9 = ({ setLoading }) => {
  const { hmisOrgUnits } = useMetadataStore(
    (state) => ({ hmisOrgUnits: state.hmisOrgUnits }),
    shallow
  );
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard1Widget9Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (!result) return;
    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      const provinces = hmisOrgUnits.filter((ou) => ou.level === 2);
      const listOu = [];
      result.data.forEach((item) => {
        const foundOu = hmisOrgUnits.find((ou) => item.ou === ou.id);
        if (foundOu && !listOu.find((ou) => ou.id === foundOu.id)) {
          listOu.push(foundOu);
        }
      });
      const renderHeaderWithTranslation = (pe) => {
        if (pe.includes("W")) {
          const year = pe.slice(0, 4);
          const month = pe.slice(5);
          return t("weeklyHeaderTitleOfWidget1.9", { month, year });
        }
        const year = pe.slice(0, 4);
        const month = pe.slice(4);
        return t("monthlyHeaderTitleOfWidget1.9", {
          month: getMonthName(
            month * 1,
            localeName === "En" ? "en-US" : localeName
          ),
          year,
        });
      };
      let currentData = {
        columns: [],
        rows: [],
      };
      currentData.columns = result.pes.map((pe) => ({
        name: pe,
        header: renderHeaderWithTranslation(pe),
        flex: 1,
        onRender: (cellProps, { data }) => {
          const foundLegend = result.legendSets[0].legends.find(
            (legend) =>
              data[pe] < legend.endValue && data[pe] >= legend.startValue
          );
          cellProps.style.background = foundLegend?.color || "black";
        },
      }));
      currentData.columns.unshift({
        name: "ou",
        header: "",
        flex: 1,
        style: { fontWeight: "700" },
      });
      currentData.rows = listOu.map((ou) => {
        const row = {
          ou: ou[`name${localeName}`],
        };
        result.pes.forEach((pe) => {
          const foundValue = result.data.find(
            (r) => r.pe === pe && r.ou === ou.id
          );
          row[pe] = foundValue ? foundValue.value : "";
        });
        return row;
      });

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <DataGrid
        columns={data.columns}
        rows={data.rows}
        showZebraRows={false}
        defaultSortInfo={{ name: "ou", dir: 1 }}
      />
    )
  );
};
export default withWidgetChildrenLoader(Widget9);
