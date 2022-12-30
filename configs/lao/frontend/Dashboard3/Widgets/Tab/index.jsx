import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { RATIO } from "../../common/constant/ratio";
import { addCommaToNumber } from "../../common/function/addCommaToNumber";
import { getListPeriod } from "../../common/function/getListPeriod";

const MONTHS_IN_YEAR = 12;

const TabDetail = ({
  selectedPeriod,
  data,
  filteredSelectOrgUnit,
  listHeader,
  tab,
}) => {
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
          {listHeader.map((header) => {
            return (
              <TableCell
                sx={{ borderLeft: "1px solid black" }}
                rowSpan={2}
                colSpan={1}
              >
                {t(header)}
              </TableCell>
            );
          })}
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
          const estimatedLiveBirths =
            tab !== "epiPenta3"
              ? (
                  ((data.popLiveBirth.find((item) => item.ou === orgUnit.id)
                    ?.value &&
                    data.popLiveBirth.find((item) => item.ou === orgUnit.id)
                      ?.value * 1) ||
                    0) /
                  (MONTHS_IN_YEAR /
                    getListPeriod(selectedPeriod).listPeriod.length)
                ).toFixed(0)
              : (
                  ((data.est.find((item) => item.ou === orgUnit.id)?.value &&
                    data.est.find((item) => item.ou === orgUnit.id)?.value *
                      1) ||
                    0) /
                  (MONTHS_IN_YEAR /
                    getListPeriod(selectedPeriod).listPeriod.length)
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
                  <TableCell align="center">
                    {value && addCommaToNumber(value * 1)}
                  </TableCell>
                );
              })}
              <TableCell>{addCommaToNumber(total)}</TableCell>
              <TableCell>
                {addCommaToNumber(parseInt(estimatedLiveBirths)) || null}
              </TableCell>
              <TableCell>
                {(() => {
                  const ratio = RATIO[tab];
                  return parseInt(estimatedLiveBirths)
                    ? addCommaToNumber(
                        (
                          (total / parseInt(estimatedLiveBirths)) *
                          ratio
                        ).toFixed(0)
                      )
                    : null;
                })()}
                {["sbaDelivery", "epiPenta3"].includes(tab) ? "%" : null}
              </TableCell>
              <TableCell>{addCommaToNumber(target) ?? null}</TableCell>
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
                {addCommaToNumber(value)}
              </TableCell>
            );
          })}
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {(() => {
              const result = getListPeriod(selectedPeriod)
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
              return addCommaToNumber(result);
            })()}
          </TableCell>
          <TableCell sx={{ fontWeight: "700", fontSize: "14px" }}>
            {(() => {
              const result = filteredSelectOrgUnit
                .map((orgUnit) => {
                  const estimatedLiveBirths =
                    tab !== "epiPenta3"
                      ? (
                          ((data.popLiveBirth.find(
                            (item) => item.ou === orgUnit.id
                          )?.value &&
                            data.popLiveBirth.find(
                              (item) => item.ou === orgUnit.id
                            )?.value * 1) ||
                            0) /
                          (MONTHS_IN_YEAR /
                            getListPeriod(selectedPeriod).listPeriod.length)
                        ).toFixed(0)
                      : (
                          ((data.est.find((item) => item.ou === orgUnit.id)
                            ?.value &&
                            data.est.find((item) => item.ou === orgUnit.id)
                              ?.value * 1) ||
                            0) /
                          (MONTHS_IN_YEAR /
                            getListPeriod(selectedPeriod).listPeriod.length)
                        ).toFixed(0);
                  return estimatedLiveBirths;
                })
                .reduce((p, c) => p + (c ? c * 1 : 0), 0);
              return addCommaToNumber(result);
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
                  const estimatedLiveBirths =
                    tab !== "epiPenta3"
                      ? (
                          ((data.popLiveBirth.find(
                            (item) => item.ou === orgUnit.id
                          )?.value &&
                            data.popLiveBirth.find(
                              (item) => item.ou === orgUnit.id
                            )?.value * 1) ||
                            0) /
                          (MONTHS_IN_YEAR /
                            getListPeriod(selectedPeriod).listPeriod.length)
                        ).toFixed(0)
                      : (
                          ((data.est.find((item) => item.ou === orgUnit.id)
                            ?.value &&
                            data.est.find((item) => item.ou === orgUnit.id)
                              ?.value * 1) ||
                            0) /
                          (MONTHS_IN_YEAR /
                            getListPeriod(selectedPeriod).listPeriod.length)
                        ).toFixed(0);
                  return estimatedLiveBirths;
                })
                .reduce((p, c) => p + (c ? c * 1 : 0), 0);
              if (!parseInt(totalEst)) return 0;
              const ratio = RATIO[tab];

              return (
                addCommaToNumber(((total / totalEst) * ratio).toFixed(0)) +
                (["sbaDelivery", "epiPenta3"].includes(tab) ? "%" : "")
              );
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

export default TabDetail;
