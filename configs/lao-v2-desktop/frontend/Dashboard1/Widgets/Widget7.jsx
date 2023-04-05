import { useState, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";

import DataGrid from "@/components/Widgets/DataGrid";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";

import { pull } from "../../utils";
import useDashboardStore from "@/state/dashboard";

const Widget7 = ({ setLoading }) => {
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

  const listTargetPe = useMemo(() => {
    const year = new Date().getFullYear();
    return [year, year - 1, year - 2, year - 3, year - 4];
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
        additionalState.widget1234567Dashboard1Data.metaData.dimensions.pe;
      response.dxs = [
        "sISjKc2LEDg",
        "FSLrz90vXKf",
        "cPcvesqWRtH",
        "kyVKK0JcRPJ",
        "cwhEsbBe6Zs",
        "dJhWRKs0fcq",
      ];
      setResult(response);
    }
    setLoading(!additionalState.widget1234567Dashboard1Ready);
  }, [additionalState.widget1234567Dashboard1Ready]);

  useEffect(() => {
    if (!result) return;
    const localeName = i18n.language === "en" ? "En" : "Lo";
    const dataItems = result.dxs.map((de) => {
      const foundDi = hmisDataItems.find((di) => di.id === de);
      return foundDi;
    });

    let currentData = {
      columns: [],
      rows: [],
    };
    currentData.columns = listTargetPe.map((pe, index) => ({
      name: pe,
      header: pe,
      render: ({ value, rowIndex }) => {
        if (index === result.pes.length - 1) {
          return <div>{value}</div>;
        }
        const previousYearValue = result.data
          .filter(
            (r) =>
              r.pe.includes(listTargetPe[index + 1]) &&
              r.item === dataItems[rowIndex].id
          )
          .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
        const isIncreased = previousYearValue
          ? value > previousYearValue
            ? true
            : value < previousYearValue
            ? false
            : null
          : null;

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>{value}</Typography>
            <Typography
              sx={{
                color: isIncreased ? "#E61B1B" : "#118861",
              }}
            >
              {isIncreased ? (
                <ArrowUpwardIcon />
              ) : isIncreased === false ? (
                <ArrowDownwardIcon />
              ) : (
                ""
              )}
            </Typography>
          </Box>
        );
      },
    }));
    currentData.columns.unshift({
      name: "di",
      header: t("data/period"),
      width: 300,
    });
    currentData.rows = dataItems.map((di) => {
      const row = {
        di: di[`name${localeName}`],
      };
      listTargetPe.forEach((pe) => {
        const foundValue = result.data.filter(
          (r) => r.pe.includes(pe) && r.item === di.id
        );
        row[pe] = foundValue.length
          ? foundValue.reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0)
          : "";
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

export default withWidgetChildrenLoader(Widget7);
