import useMetadataStore from "@/state/metadata";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getListPeriod } from "../../common/function/getListPeriod";

const Tab4 = ({ selectedPeriod, data, filteredSelectOrgUnit }) => {
  const { i18n, t } = useTranslation();

  const currentNameProperty = i18n.language === "en" ? "nameEn" : "nameLo";
  if (!data) return null;
  return (
    <Table className="table-d3-w1">
      <TableHead>
        <TableRow>
          <TableCell
            sx={{ borderRight: "1px solid black" }}
            rowSpan={2}
            colSpan={1}
          >
            Org. units
          </TableCell>
          {getListPeriod(selectedPeriod).listYear.map((year) => {
            return (
              <TableCell
                align="center"
                rowSpan={1}
                colSpan={
                  getListPeriod(selectedPeriod).listPeriod.filter((item) =>
                    item.includes(`${year}`)
                  ).length
                }
              >
                {year}
              </TableCell>
            );
          })}
          <TableCell
            sx={{ borderLeft: "1px solid black" }}
            rowSpan={2}
            colSpan={1}
          >
            {t("total")}
          </TableCell>
          <TableCell
            sx={{ borderRight: "1px solid black" }}
            rowSpan={2}
            colSpan={1}
          >
            {t("estLiveBirths")}
          </TableCell>
          <TableCell
            sx={{ borderRight: "1px solid black" }}
            rowSpan={2}
            colSpan={1}
          >
            %
          </TableCell>
          <TableCell
            sx={{ borderRight: "1px solid black" }}
            rowSpan={2}
            colSpan={1}
          >
            {t("target")}
          </TableCell>
        </TableRow>
        <TableRow>
          {getListPeriod(selectedPeriod).listPeriod.map((period) => {
            const month = parseInt(period.slice(4));
            return <TableCell align="center">{month}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredSelectOrgUnit.map((orgUnit) => {
          let total = 0;
          const estimatedLiveBirths = (
            ((data.popLiveBirth.find((item) => item.ou === orgUnit.id)?.value &&
              data.popLiveBirth.find((item) => item.ou === orgUnit.id)?.value *
                1) ||
              0) /
            (12 / getListPeriod(selectedPeriod).listPeriod.length)
          ).toFixed(0);
          const target =
            data.target.find((item) => item.ou === orgUnit.id)?.value &&
            data.target.find((item) => item.ou === orgUnit.id)?.value * 1;
          return (
            <TableRow>
              <TableCell>{orgUnit[currentNameProperty]}</TableCell>
              {getListPeriod(selectedPeriod).listPeriod.map((period) => {
                const value = data.data.find(
                  (item) => item.pe === period && item.ou === orgUnit.id
                )?.value;
                total = value ? total + value * 1 : total;
                return (
                  <TableCell align="center">{value && value * 1}</TableCell>
                );
              })}
              <TableCell>{total}</TableCell>
              <TableCell>{estimatedLiveBirths}</TableCell>
              <TableCell>
                {(() =>
                  parseInt(estimatedLiveBirths)
                    ? ((total / estimatedLiveBirths) * 100).toFixed(0) + "%"
                    : null)()}
              </TableCell>
              <TableCell>{target || 0}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {t("total")}
          </TableCell>
          {getListPeriod(selectedPeriod).listPeriod.map((period) => {
            const value = data.data
              .filter(
                (item) =>
                  item.pe === period &&
                  filteredSelectOrgUnit
                    .map((orgUnit) => orgUnit.id)
                    .includes(item.ou)
              )
              .reduce((p, c) => {
                return p + (c?.value ? c?.value * 1 : 0);
              }, 0);
            return (
              <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
                {value}
              </TableCell>
            );
          })}
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {(() => {
              return getListPeriod(selectedPeriod)
                .listPeriod.map((period) => {
                  const value = data.data
                    .filter(
                      (item) =>
                        item.pe === period &&
                        filteredSelectOrgUnit
                          .map((orgUnit) => orgUnit.id)
                          .includes(item.ou)
                    )
                    .reduce((p, c) => {
                      return p + (c?.value ? c?.value * 1 : 0);
                    }, 0);
                  return value;
                })
                .reduce((p, c) => p + c, 0);
            })()}
          </TableCell>
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {(() => {
              return filteredSelectOrgUnit
                .map((orgUnit) => {
                  const estimatedLiveBirths = (
                    ((data.popLiveBirth.find((item) => item.ou === orgUnit.id)
                      ?.value &&
                      data.popLiveBirth.find((item) => item.ou === orgUnit.id)
                        ?.value * 1) ||
                      0) /
                    (12 / getListPeriod(selectedPeriod).listPeriod.length)
                  ).toFixed(0);
                  return estimatedLiveBirths;
                })
                .reduce((p, c) => p + (c ? c * 1 : 0), 0);
            })()}
          </TableCell>
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {(() => {
              const total = getListPeriod(selectedPeriod)
                .listPeriod.map((period) => {
                  const value = data.data
                    .filter(
                      (item) =>
                        item.pe === period &&
                        filteredSelectOrgUnit
                          .map((orgUnit) => orgUnit.id)
                          .includes(item.ou)
                    )
                    .reduce((p, c) => {
                      return p + (c?.value ? c?.value * 1 : 0);
                    }, 0);
                  return value;
                })
                .reduce((p, c) => p + c, 0);
              const totalEst = filteredSelectOrgUnit
                .map((orgUnit) => {
                  const estimatedLiveBirths = (
                    ((data.popLiveBirth.find((item) => item.ou === orgUnit.id)
                      ?.value &&
                      data.popLiveBirth.find((item) => item.ou === orgUnit.id)
                        ?.value * 1) ||
                      0) /
                    (12 / getListPeriod(selectedPeriod).listPeriod.length)
                  ).toFixed(0);
                  return estimatedLiveBirths;
                })
                .reduce((p, c) => p + (c ? c * 1 : 0), 0);
              return ((total / totalEst) * 100).toFixed(0) + "%";
            })()}
          </TableCell>
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {/* {(() => {
              return filteredSelectOrgUnit
                .map((orgUnit) => {
                  const target = (
                    (data.target.find((item) => item.ou === orgUnit.id)
                      ?.value &&
                      data.target.find((item) => item.ou === orgUnit.id)
                        ?.value * 1) /
                    (12 / getListPeriod(selectedPeriod).listPeriod.length)
                  ).toFixed(0);
                  return target;
                })
                .reduce((p, c) => p + (c ? c * 1 : 0), 0);
            })()} */}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Tab4;
