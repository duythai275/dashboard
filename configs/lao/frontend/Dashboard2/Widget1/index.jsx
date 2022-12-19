import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableSortLabel,
  Box,
} from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { visuallyHidden } from "@mui/utils";
import shallow from "zustand/shallow";

import { pull } from "../../utils";
import { checkType, getComparator, stableSort } from "./utils";
import useMetadataStore from "@/state/metadata";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import Custom from "@/components/Widgets/Custom";
import "./index.css";

const Widget1 = ({ setLoading }) => {
  const { hmisOrgUnits, surveyOptionSets } = useMetadataStore(
    (state) => ({
      hmisOrgUnits: state.hmisOrgUnits,
      surveyOptionSets: state.surveyOptionSets,
    }),
    shallow
  );

  const [teis, setTeis] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("orgUnit");
  const [data, setData] = useState([]);

  const typeOfFacilities = useMemo(() => {
    const typeOfFacilitiesOptionSetFound = surveyOptionSets.find(
      (optionSet) => optionSet.id === "sKdV9uzCd2Z"
    );

    if (!typeOfFacilitiesOptionSetFound) {
      return [];
    }

    const ouCell = [{ name: "Ou/Facility", id: "orgUnit" }];
    const dataTypeOfFacilities = ouCell.concat(
      typeOfFacilitiesOptionSetFound.options
    );

    dataTypeOfFacilities.push({ name: "Total", id: "total" });

    return dataTypeOfFacilities;
  }, [JSON.stringify(surveyOptionSets)]);

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSortRows = useMemo(() => {
    if (data.length <= 0) return [];
    return stableSort(data, getComparator(order, orderBy));
  }, [JSON.stringify(data), order, orderBy]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard2Widget1Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      const currentData = result.trackedEntityInstances;
      setTeis(currentData);
    })();
  }, [i18n.language, JSON.stringify(result)]);

  useEffect(() => {
    if (teis && typeOfFacilities) {
      const listOuId = [];
      teis.forEach((tei) => {
        const found = listOuId.find((ouId) => ouId === tei.orgUnit);
        if (!found) {
          listOuId.push(tei.orgUnit);
        }
      });

      const mappedData = listOuId.map((ouId) => {
        const cellData = {};
        const ouFound = hmisOrgUnits.find((ou) => ou.id === ouId);

        typeOfFacilities.forEach((facility) => {
          let resultType = checkType(teis, [facility.code]);

          // resultType = checkCategory(resultType, selectedCategories);
          // resultType = checkOwnership(resultType, selectedOwnerships);
          // resultType = checkService(resultType, selectedServices);

          let count = 0;
          resultType.forEach(({ orgUnit }) => {
            if (orgUnit === ouId) {
              count++;
            }
          });

          cellData[facility.id] = count;
        });

        let total = 0;
        for (const key in cellData) {
          total += cellData[key];
        }

        cellData["total"] = total;
        cellData["orgUnit"] = ouFound.nameEn;

        return { cellData };
      });

      setData(mappedData);
    }
  }, [JSON.stringify(teis), JSON.stringify(typeOfFacilities)]);

  return data.length ? (
    <Custom>
      <Box>
        {/* <HeaderNav /> */}
        <Paper sx={{ p: 0, borderRadius: 0, overflow: "hidden" }}>
          <TableContainer className="aggregate-summary" sx={{ p: 0 }}>
            <Table stickyHeader aria-label="sticky table" sx={{ p: 0 }}>
              <TableHead>
                <TableRow>
                  {typeOfFacilities.map((facility, idx) => (
                    <TableCell
                      key={facility.id}
                      sortDirection={orderBy === facility.id ? order : false}
                      sx={
                        idx === 0
                          ? {
                              position: "sticky",
                              left: 0,
                              background: "white",
                              zIndex: 800,
                            }
                          : {}
                      }
                    >
                      <TableSortLabel
                        active
                        direction={orderBy === facility.id ? order : "asc"}
                        onClick={handleRequestSort(facility.id)}
                        sx={{
                          whiteSpace: "nowrap",
                          "&.Mui-active": { color: "#fefefe" },
                          " svg": {
                            fontSize: "15px",
                          },
                          "& path": {
                            color: "#fefefe",
                          },
                        }}
                      >
                        {t(facility.name)}
                        {orderBy === facility.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSortRows.map(({ cellData }) => (
                  <TableRow>
                    {typeOfFacilities.map((item, idx) => (
                      <TableCell
                        sx={
                          idx === 0
                            ? {
                                position: "sticky",
                                left: 0,
                                background: "white",
                                zIndex: 800,
                              }
                            : {}
                        }
                      >
                        {cellData[item.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Custom>
  ) : (
    ""
  );
};
export default withWidgetChildrenLoader(Widget1);
