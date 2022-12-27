import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { Box, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { pull } from "../../utils";
import { orgUnitFilter } from "../common/constant/orgUnitFilter";
import OrgUnitSelector from "@/components/OrgUnitSelector/OrgUnitSelector";

import "./index.css";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
const Widget1 = ({ setLoading }) => {
  const { i18n } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("Under 1 death");
  const [result, setResult] = useState(null);
  const orgUnits = useMetadataStore((state) => state.hmisOrgUnits);

  useEffect(() => {
    // (async () => {
    //   setLoading(true);
    //   const ouSelected = "IWp9dQGM0bS";
    //   const filter = orgUnitFilter.find((item) => item.level === 1);
    //   const result = await pull(
    //     `/api/getDashboard3Widget1Data?ou=${ouSelected}${filter.filter}`
    //   );
    //   console.log(result);
    //   setResult(result.data);
    //   setLoading(false);
    // })();
  }, []);

  const currentNameProperty = i18n.language === "en" ? "nameEn" : "nameLo";
  const converted = orgUnits.map((ou) => {
    return {
      id: ou.id,
      parent: ou.parent,
      level: ou.level,
      displayName: ou[currentNameProperty]
    };
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* <Tabs
        value={listTabs.findIndex((tab) => tab === selectedTab)}
        onChange={(e, value) => {
          setSelectedTab(listTabs[value]);
        }}
        // sx={{ backgroundColor: "gray" }}
      >
        {listTabs.map((tab) => {
          return <Tab label={tab} />;
        })}
      </Tabs>
      <Typography sx={{ fontWeight: "700" }}>{selectedTab}</Typography>
      <Table className="table-d3-w1">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderRight: "1px solid black" }} rowSpan={2} colSpan={1}>
              Org. units
            </TableCell>
            {periods.map((period) => {
              return (
                <TableCell align="center" rowSpan={1} colSpan={period.months.length}>
                  {period.year}
                </TableCell>
              );
            })}
            <TableCell sx={{ borderLeft: "1px solid black" }} rowSpan={2} colSpan={1}>
              Total under 1 death
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid black" }} rowSpan={2} colSpan={1}>
              Estimated live births
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid black" }} rowSpan={2} colSpan={1}>
              Under 1 death per 1000
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid black" }} rowSpan={2} colSpan={1}>
              Target
            </TableCell>
          </TableRow>
          <TableRow>
            {periods.map((period) => {
              return (
                <>
                  {period.months.map((month, index) => {
                    return (
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: index === period.months.length - 1 && "1px solid black"
                        }}
                      >
                        {month}
                      </TableCell>
                    );
                  })}
                </>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {orgUnits.map((orgUnit) => {
            return (
              <TableRow>
                <TableCell>{orgUnit}</TableCell>
                {periods.map((period) => {
                  return (
                    <>
                      {period.months.map((month) => {
                        return <TableCell></TableCell>;
                      })}
                    </>
                  );
                })}
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
      <OrgUnitSelector
        orgUnits={converted}
        accept={(ou) => {
          console.log(ou);
        }}
      />
    </Box>
  );
};

export default withWidgetChildrenLoader(Widget1);

const periods = [
  {
    year: 2021,
    months: [5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    year: 2022,
    months: [1, 2, 3, 4, 5]
  }
];

const orgUnits = ["Vientiane Capital", "Phongsali", "Louangnamtha", "oudomxai"];

const listTabs = ["Under 1 death", "Under 5 death", "Maternal death", "SBA delivery", "EPI Penta 3"];
