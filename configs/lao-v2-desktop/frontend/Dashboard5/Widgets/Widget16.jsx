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
  const { orgUnits, indicators, dataItems, options } = useMetadataStore(
    (state) => ({
      orgUnits: state.hmisOrgUnits,
      indicators: state.hmisIndicators,
      dataItems: state.hmisDataItems,
      options: state.hmisOptions,
    })
  );
  const { hmisDataItems } = useMetadataStore(
    (state) => ({
      hmisDataItems: state.hmisDataItems,
    }),
    shallow
  );

  const periodObject = {
    January: "jan",
    February: "feb",
    March: "mar",
    April: "apr",
    May: "may",
    June: "june",
    July: "jul",
    August: "aug",
    September: "sep",
    October: "oct",
    November: "nov",
    December: "dec",
  };

  const returnPeriodName = (value) => {
    let name = value;
    let year = value.split(" ")[1];
    Object.entries(periodObject).forEach((obj) => {
      if (value.includes(obj[0])) {
        name = `${t(obj[1])} ${year}`;
      }
    });
    return name;
  };

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
    const localeName = i18n.language === "en" ? "En" : "Lo";
    let currentData = {
      columns: [],
      rows: [],
    };
    console.log(additionalState.widgetDashboard5DataWidget16.metaData.items);
    currentData.columns = result.pes.map((pe, index) => ({
      name: pe,
      header: returnPeriodName(
        additionalState.widgetDashboard5DataWidget16.metaData.items[pe].name
      ),
      render: ({ value, rowIndex }) => {
        let color = "white";
        if (value < 60) {
          color = "#FA7D7D";
        } else {
          if (value >= 60 && value <= 90) {
            color = "#FAF69E";
          } else {
            color = "#97F0A7";
          }
        }
        return (
          <div style={{ background: color, paddingLeft: "10px" }}>
            <Typography>
              <b>{value}</b>
            </Typography>
          </div>
        );
      },
    }));
    currentData.columns.unshift({
      name: "ou",
      header: t("headerTitleWidget1.9"),
      width: 300,
    });
    currentData.rows = result.ous.map((org) => {
      const findOu = orgUnits.find((e) => e.id === org);
      const row = {
        ou: findOu ? (localeName === "En" ? findOu.nameEn : findOu.nameLo) : "",
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
