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
import HeaderNav from "./components/HeaderNav";

const Widget1 = ({ setLoading }) => {
  const { hmisOrgUnits, surveyOptionSets } = useMetadataStore(
    (state) => ({
      hmisOrgUnits: state.hmisOrgUnits,
      surveyOptionSets: state.surveyOptionSets,
    }),
    shallow
  );

  const { i18n, t } = useTranslation();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("orgUnit");
  const [teis, setTeis] = useState(null);
  const [data, setData] = useState([]);
  const [ouList, setOuList] = useState([]);
  const [typeOfFacilities, setTypeOfFacilities] = useState([]);
  const [totalData, setTotalData] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOwnerships, setSelectedOwnerships] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const stableSortRows = useMemo(() => {
    if (data.length <= 0) return [];
    return stableSort(data, getComparator(order, orderBy));
  }, [JSON.stringify(data), order, orderBy]);

  const ouListLocale = useMemo(
    () =>
      ouList.length
        ? ouList.map((ou) => ({
            id: ou.id,
            name: i18n.language === "lo" ? ou.nameLo : ou.nameEn,
          }))
        : [],
    [i18n.language, JSON.stringify(ouList)]
  );

  const getTypeOfFacilities = () => {
    const typeOfFacilitiesOptionSetFound = surveyOptionSets.find(
      (optionSet) => optionSet.id === "sKdV9uzCd2Z"
    );

    if (!typeOfFacilitiesOptionSetFound) {
      return [];
    }

    const ouCell = [{ name: t("Ou/Facility"), id: "orgUnit" }];
    const dataTypeOfFacilities = ouCell.concat(
      typeOfFacilitiesOptionSetFound.options
    );

    dataTypeOfFacilities.push({ name: t("total"), id: "total" });
    return dataTypeOfFacilities;
  };

  const getOuList = (currentData) => {
    const ouListData = [];
    if (currentData) {
      currentData.forEach((tei) => {
        const found = ouListData.find((ou) => ou.id === tei.orgUnit);
        if (!found) {
          const ouFound = hmisOrgUnits.find((ou) => ou.id === tei.orgUnit);
          ouListData.push(ouFound);
        }
      });
    }
    return ouListData;
  };

  console.log({ selectedCategories, selectedOwnerships, selectedServices });

  const getMappedData = (teis, typeOfFacilities, ouList) => {
    if (teis && typeOfFacilities.length && ouList.length) {
      const mappedData = ouListLocale.map((ou) => {
        const cellData = {};
        typeOfFacilities.forEach((facility) => {
          let resultType = checkType(teis, [facility.code]);
          // resultType = checkCategory(resultType, selectedCategories);
          // resultType = checkOwnership(resultType, selectedOwnerships);
          // resultType = checkService(resultType, selectedServices);

          let count = 0;
          resultType.forEach(({ orgUnit }) => {
            if (orgUnit === ou.id) {
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
        cellData["orgUnit"] = ou.name;
        return { cellData };
      });

      const totalCellData = {};
      typeOfFacilities.forEach((facility) => {
        let totalOfColumn = 0;
        if (facility.id !== "orgUnit") {
          mappedData.forEach((row) => {
            totalOfColumn += row.cellData[facility.id];
          });
        } else {
          totalOfColumn = t("total");
        }

        totalCellData[facility.id] = totalOfColumn;
      });
      return { mappedData, totalCellData };
    }

    return;
  };

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterClose = (selectedList) => {
    setSelectedCategories(selectedList.selectedCategories);
    setSelectedOwnerships(selectedList.selectedOwnerships);
    setSelectedServices(selectedList.selectedServices);
  };

  const handleFilterReset = () => {
    setSelectedCategories([]);
    setSelectedOwnerships([]);
    setSelectedServices([]);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard2Widget1Data");
      const currentData = result?.data?.trackedEntityInstances;
      const typeOfFacilityData = getTypeOfFacilities();
      const ouListData = getOuList(currentData);

      setTypeOfFacilities(typeOfFacilityData);
      setOuList(ouListData);
      setTeis(currentData);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const result = getMappedData(teis, typeOfFacilities, ouListLocale);
    if (result) {
      const { mappedData, totalCellData } = result;
      setTotalData(totalCellData);
      setData(mappedData);
    }
  }, [
    JSON.stringify(teis),
    JSON.stringify(ouListLocale),
    JSON.stringify(typeOfFacilities),
  ]);

  return data.length && totalData ? (
    <Custom>
      <Box>
        {/* <HeaderNav
          onFilterClose={handleFilterClose}
          onFilterReset={handleFilterReset}
        /> */}
        <Paper sx={{ p: 0, borderRadius: 0 }}>
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
                        {i18n.language === "lo" &&
                        facility.id !== "orgUnit" &&
                        facility.id !== "total" &&
                        facility.translations.find(
                          (translation) =>
                            translation.locale === "lo" &&
                            translation.property === "NAME"
                        )
                          ? facility.translations.find(
                              (translation) =>
                                translation.locale === "lo" &&
                                translation.property === "NAME"
                            ).value
                          : facility.name}
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
                      {totalData[item.id]}
                    </TableCell>
                  ))}
                </TableRow>
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
