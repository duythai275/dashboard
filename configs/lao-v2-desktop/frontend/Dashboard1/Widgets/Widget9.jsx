import { useEffect, useState } from "react";
import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";
import { shallow } from "zustand/shallow";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import DataGrid from "@/components/Widgets/DataGrid";

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
      let currentData = {
        columns: [],
        rows: [],
      };
      currentData.columns = result.pes.map((pe) => ({
        name: pe,
        header: pe,
        group: "peInfo",
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
        width: 300,
        group: "widgetGroup",
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
        groups={[
          {
            name: "peInfo",
            header: (() => (
              <div
                style={{ textAlign: "center" }}
              >{`NCLE: Communicable Disease {For Completeness} Reporting rate`}</div>
            ))(),
            group: "widgetGroup",
          },
          {
            name: "widgetGroup",
            header: (() => (
              <div style={{ textAlign: "center" }}>
                Notifiable Disease Reporting Rates by week, by province
              </div>
            ))(),
          },
        ]}
        columns={data.columns}
        rows={data.rows}
        showZebraRows={false}
      />
    )
  );
};
export default withWidgetChildrenLoader(Widget9);
