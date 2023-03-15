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
      const ATTRIBUTE_IDS = [
        "qs7l1gtT608",
        "cKpZaSvAxzK",
        "CsjieOOZ9pv",
        "NsOTMYIp3qX",
        "Bjh8c1UMXTZ",
        "In7PRC47OtU",
        "LlmU76ZZ77P",
        "N55gZ9oPehi",
        "Lazma6Rapgs",
        "KVaIZ8B0a1B",
        "WZ9PffiEDcO",
        "YKmbwdflzrG",
        "j5zwTrfUJf9",
        "mN2mzPmXotd",
        "pEyDXrIVO0b",
        "V9db007buZE",
        "KatN02ohdCd",
      ];
      const findHeaderIndex = (headers, name) => {
        const found = headers.findIndex((header) => header.name === name);
        return found;
      };
      const teiIndex = findHeaderIndex(result.data.headers, "tei");
      const orgUnitIndex = findHeaderIndex(result.data.headers, "ou");
      const enrollmentDateIndex = findHeaderIndex(
        result.data.headers,
        "enrollmentdate"
      );
      const eventIndex = findHeaderIndex(result.data.headers, "psi");
      const programStateIndex = findHeaderIndex(result.data.headers, "ps");
      const enrollmentIndex = findHeaderIndex(result.data.headers, "pi");
      const eventDateIndex = findHeaderIndex(result.data.headers, "eventdate");
      const listDataValueIndex = result.data.headers.map((item) => {
        if (
          item.name.includes("es7vEDfcKx8.") &&
          !ATTRIBUTE_IDS.includes(item.name.replace("es7vEDfcKx8.", ""))
        ) {
          return item;
        }
        return "";
      });
      const listAttributeIndex = result.data.headers.map((item) => {
        if (
          item.name.includes("es7vEDfcKx8.") &&
          ATTRIBUTE_IDS.includes(item.name.replace("es7vEDfcKx8.", ""))
        ) {
          return item;
        }
        return "";
      });

      let listTeiResult = [];
      result.data.rows.forEach((row) => {
        const target = listTeiResult.findIndex(
          (item) => item.trackedEntityInstance === row[teiIndex]
        );
        if (target !== -1) {
          listTeiResult[target].enrollments[0].events = [
            ...listTeiResult[target].enrollments.events,
            row,
          ];
          return;
        }
        const dataValues = listDataValueIndex
          .map((item, index) => {
            if (item) {
              const value =
                row[index] === "1"
                  ? "true"
                  : row[index] === "0"
                  ? "false"
                  : row[index];
              return {
                dataElement: item.name.replace("es7vEDfcKx8.", ""),
                value,
              };
            }
            return null;
          })
          .filter((item) => item);
        const attributes = listAttributeIndex
          .map((item, index) => {
            if (item) {
              const value =
                row[index] === "1"
                  ? "true"
                  : row[index] === "0"
                  ? "false"
                  : row[index];
              return {
                attribute: item.name.replace("es7vEDfcKx8.", ""),
                value,
              };
            }
            return null;
          })
          .filter((item) => item);
        const event = {
          event: row[eventIndex],
          program: "nOPMZMF91F6",
          programState: row[programStateIndex],
          orgUnit: row[orgUnitIndex],
          trackedEntityInstance: row[teiIndex],
          enrollment: row[enrollmentIndex],
          eventDate: row[eventDateIndex],
          dataValues,
        };
        const newTei = {
          attributes,
          trackedEntityInstance: row[teiIndex],
          orgUnit: row[orgUnitIndex],
          enrollments: [
            {
              program: "nOPMZMF91F6",
              events: [event],
              orgUnit: row[orgUnitIndex],
              trackedEntityInstance: row[teiIndex],
              enrollmentDate: row[enrollmentDateIndex],
              enrollment: row[enrollmentIndex],
            },
          ],
        };
        listTeiResult.push(newTei);
      });
      const currentData = listTeiResult;

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
        <Box sx={{ p: 1 }}>
          <TableContainer className="aggregate-summary">
            <Table stickyHeader sx={{ p: 0 }}>
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
                              background: "#fff",
                              zIndex: 800,
                            }
                          : {}
                      }
                    >
                      <Box>
                        <TableSortLabel
                          active
                          direction={orderBy === facility.id ? order : "asc"}
                          onClick={handleRequestSort(facility.id)}
                          sx={{
                            whiteSpace: "nowrap",
                            "&.Mui-active": {
                              color: "#555e68",
                              fontWeight: "bold",
                            },
                            " svg": {
                              ml: 1,
                              mt: "2px",
                              fontSize: "15px",
                            },
                            "& path": {
                              color: "#555e68",
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
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSortRows.map(({ cellData }, cellIdx) => (
                  <TableRow>
                    {typeOfFacilities.map((item, idx) => (
                      <TableCell
                        sx={
                          idx === 0
                            ? {
                                position: "sticky",
                                left: 0,
                                background:
                                  cellIdx % 2 !== 0 ? "white" : "#f8f8f8",
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
                              background: "#f8f8f8",
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
        </Box>
      </Box>
    </Custom>
  ) : (
    ""
  );
};
export default withWidgetChildrenLoader(Widget1);
