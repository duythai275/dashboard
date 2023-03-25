import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import { pull } from "@/utils/fetch";
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { getISOWeek } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

const Widget1 = ({ setLoading, code }) => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const [data, setData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { ouGroups } = useMetadataStore(
    (state) => ({ ouGroups: state.ouGroups }),
    shallow
  );
  const listPe = useMemo(() => {
    const weeks = [];
    for (let i = getISOWeek(new Date()); i >= getISOWeek(new Date()) - 9; i--) {
      weeks.push(`${new Date().getFullYear()}W${i}`);
    }
    return weeks.join(";");
  }, []);
  const lastYear = useMemo(() => new Date().getFullYear() - 1);
  const currentYear = useMemo(() => new Date().getFullYear());
  const getData = async () => {
    try {
      setLoading(true);
      const listOu = ouGroups
        .find((item) => item.id === tabs[value].id)
        .organisationUnits.map((ou) => ou.id);
      const results = await Promise.all([
        pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_provinces&var=startYear:${lastYear}&var=endYear:${currentYear}`
        ),
        pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_deaths_provinces&var=startYear:${lastYear}&var=endYear:${currentYear}`
        ),
      ]);
      if (results) {
        const ouIndex = results[0].listGrid.headers.findIndex(
          (header) => header.name === "uidlevel2"
        );
        const weeklyIndex = results[0].listGrid.headers.findIndex(
          (header) => header.name === "weekly"
        );
        const diseaseIndex = results[0].listGrid.headers.findIndex(
          (header) => header.name === "Du5ydup8qQf"
        );
        const casesIndex = results[0].listGrid.headers.findIndex(
          (header) => header.name === "cases"
        );

        const dataResult = listPe.split(";").map((week) => {
          const dataByWeek = results[0].listGrid.rows
            .filter(
              (row) =>
                row[weeklyIndex] === week &&
                listOu.includes(row[ouIndex]) &&
                row[diseaseIndex] === code
            )
            .reduce((prev, curr) => prev + curr[casesIndex] * 1, 0);
          const deadDataByWeek = results[1].listGrid.rows
            .filter(
              (row) =>
                row[weeklyIndex] === week &&
                listOu.includes(row[ouIndex]) &&
                row[diseaseIndex] === code
            )
            .reduce((prev, curr) => prev + curr[casesIndex] * 1, 0);

          return {
            case: dataByWeek,
            dead: deadDataByWeek,
          };
        });
        setData(dataResult);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [value, code]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab label={t(tab.label)} />
          ))}
        </Tabs>
      </Box>
      {data && (
        <Table className="last-10-weeks-table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{t("case")}</TableCell>
              <TableCell>{t("deathCase")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPe.split(";").map((weekly, index) => {
              const year = weekly.slice(0, 4);
              const week = weekly.slice(5);
              const weekLabel =
                i18n.language === "vi"
                  ? `Tuần ${week} ${year}`
                  : `Week ${week} ${year}`;
              return (
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>{weekLabel}</TableCell>
                  <TableCell sx={{ color: "#63bc5e", fontWeight: "500" }}>
                    {data[index].case}
                  </TableCell>
                  <TableCell sx={{ color: "#db4e4e", fontWeight: "500" }}>
                    {data[index].dead}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default withWidgetChildrenLoader(Widget1);

const tabs = [
  { label: "northRegion", id: "gqdSIqMZvOG" },
  { label: "centralRegion", id: "LgSrUpV7Qmv" },
  { label: "centralHighlandsRegion", id: "Mvfn1MRfn7q" },
  { label: "southRegion", id: "n0F2Tl5rMe4" },
];
