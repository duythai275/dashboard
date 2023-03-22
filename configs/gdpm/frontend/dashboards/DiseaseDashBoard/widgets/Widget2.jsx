import MultitypeChart from "@/components/Widgets/MultitypeChart";
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
  Typography,
} from "@mui/material";
import { getISOWeek } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

const Widget1 = ({ setLoading, code }) => {
  const { t } = useTranslation();
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
    for (let i = getISOWeek(new Date()) - 9; i <= getISOWeek(new Date()); i++) {
      weeks.push(`${new Date().getFullYear()}W${i}`);
    }
    return weeks.join(";");
  }, []);
  const getData = async () => {
    try {
      const listOu = ouGroups
        .find((item) => item.id === tabs[value].id)
        .organisationUnits.map((ou) => ou.id)
        .join(";");
      const result = await pull(
        `/api/analytics/events/query/PO07dgbJCgr.json?dimension=pe:${listPe}&dimension=ou:${listOu}&dimension=GIdhyQcAihV.Pip1eJUznxo&dimension=GIdhyQcAihV.Du5ydup8qQf:IN:${code}&stage=GIdhyQcAihV&displayProperty=NAME&totalPages=true&outputType=EVENT&desc=eventdate&outputIdScheme=UID&pageSize=100000`
      );
      if (result) {
        const eventDateIndex = result.headers.findIndex(
          (header) => header.name === "eventdate"
        );
        const statusIndex = result.headers.findIndex(
          (header) => header.name === "GIdhyQcAihV.Pip1eJUznxo"
        );

        const dataResult = listPe.split(";").map((week) => {
          const dataByWeek = result.rows.filter((row) => {
            getISOWeek(new Date(row[eventDateIndex])) === week;
          });
          const deadDataByWeek = dataByWeek.filter(
            (row) => row[statusIndex] === "3"
          );
          return {
            case: dataByWeek.length - deadDataByWeek.length,
            dead: deadDataByWeek.length,
          };
        });
        setData(dataResult);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab label={tab.label} />
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
            {listPe.split(";").map((week, index) => {
              return (
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>{week}</TableCell>
                  <TableCell sx={{ color: "#63bc5e" }}>
                    {data[index].case} Cases
                  </TableCell>
                  <TableCell sx={{ color: "#db4e4e" }}>
                    {data[index].dead} Death
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
