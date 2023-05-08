import { useState, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import DataGrid from "@/components/Widgets/DataGrid";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";

const Widget16 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const additionalState = useDashboardStore((state) => state.additionalState);

  const { hmisDataItems } = useMetadataStore(
    (state) => ({
      hmisDataItems: state.hmisDataItems,
    }),
    shallow
  );

  useEffect(() => {
    if (additionalState.widgetDashboard5Widget16Ready) {
      const response = {};
      response.data = additionalState.widgetDashboard5DataWidget16.rows.map(
        (row) => ({
          pe: row[2],
          ou: row[1],
          item: row[0],
          value: parseFloat(row[3]).toFixed(1),
        })
      );
      response.pes =
        additionalState.widgetDashboard5DataWidget16.metaData.dimensions.pe;
      response.ous =
        additionalState.widgetDashboard5DataWidget16.metaData.dimensions.ou;
      setResult(response);
    }
    setLoading(!additionalState.widgetDashboard5Widget16Ready);
  }, [additionalState.widgetDashboard5Widget16Ready]);

  useEffect(() => {
    if (!result) return;
    let currentData = {
      columns: [],
      rows: [],
    };
    currentData.columns = result.pes.map((pe, index) => ({
      name: pe,
      header:
        additionalState.widgetDashboard5DataWidget16.metaData.items[pe].name,
    }));
    currentData.columns.unshift({
      name: "ou",
      header: t("headerTitleWidget1.9"),
      width: 300,
    });
    currentData.rows = result.ous.map((org) => {
      const row = {
        ou: additionalState.widgetDashboard5DataWidget16.metaData.items[org]
          .name,
      };
      result.pes.forEach((pe) => {
        const foundValue = result.data.find((e) => e.pe === pe && e.ou === org);
        if (foundValue) {
          row[pe] = foundValue ? foundValue.value : 0;
        }
      });
      return row;
    });
    currentData.rows = currentData.rows.sort((a, b) =>
      a.ou > b.ou ? 1 : b.ou > a.ou ? -1 : 0
    );
    setData({ ...currentData });
  }, [i18n.language, JSON.stringify(result)]);

  return data && <DataGrid columns={data.columns} rows={data.rows} />;
};

export default withWidgetChildrenLoader(Widget16);
